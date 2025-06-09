import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { tempOrderStorage } from './vakifbank-payment.jsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const VAKIFBANK_CONFIG = {
  MERCHANT_ID: process.env.VAKIFBANK_MERCHANT_ID,
  TERMINAL_ID: process.env.VAKIFBANK_TERMINAL_ID,
};

// VakıfBank yanıtını doğrula (hash olmadan basit doğrulama)
function validateVakifBankResponse(data) {
  // Temel alanların varlığını kontrol et
  const requiredFields = ['MerchantId', 'TerminalId', 'ResponseCode'];
  return requiredFields.every(field => data[field] !== undefined);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method Not Allowed' 
    });
  }

  try {
    const {
      MerchantId,
      TerminalId,
      AuthCode,
      ResponseCode,
      ResponseMessage,
      TransactionId,
      OrderId,
      Amount,
      ...otherParams
    } = req.body;

    // Temel doğrulama (hash olmadan)
    if (!validateVakifBankResponse({ MerchantId, TerminalId, ResponseCode })) {
      console.error('VakıfBank response validation failed');
      return res.status(400).json({
        success: false,
        message: 'Geçersiz yanıt formatı'
      });
    }

    // Merchant ID ve Terminal ID kontrolü
    if (MerchantId !== VAKIFBANK_CONFIG.MERCHANT_ID || TerminalId !== VAKIFBANK_CONFIG.TERMINAL_ID) {
      console.error('Merchant/Terminal ID mismatch');
      return res.status(400).json({
        success: false,
        message: 'Güvenlik doğrulaması başarısız'
      });
    }

    // Başarılı işlem kontrolü
    if (ResponseCode === '00' || ResponseCode === '0000') {
      // Başarılı ödeme
      // Burada sipariş durumunu güncelle
      await updateOrderStatus(OrderId, 'completed', {
        transactionId: TransactionId,
        authCode: AuthCode,
        amount: Amount,
        paymentDate: new Date().toISOString(),
        paymentMethod: 'vakifbank_pos'
      });

      // Kullanıcıyı başarı sayfasına yönlendir
      return res.redirect(302, `/payment/success?orderId=${OrderId}&transactionId=${TransactionId}`);
    } else {
      // Başarısız ödeme
      await updateOrderStatus(OrderId, 'failed', {
        errorCode: ResponseCode,
        errorMessage: ResponseMessage,
        failureDate: new Date().toISOString()
      });

      // Kullanıcıyı hata sayfasına yönlendir
      return res.redirect(302, `/payment/error?orderId=${OrderId}&error=${encodeURIComponent(ResponseMessage)}`);
    }

  } catch (error) {
    console.error('3D Secure callback error:', error);
    return res.redirect(302, '/payment/error?error=system_error');
  }
}

// Sipariş durumunu güncelleme ve sipariş oluşturma fonksiyonu
async function updateOrderStatus(orderId, status, paymentDetails) {
  try {
    // Geçici depodan sipariş bilgilerini al
    const tempOrderData = tempOrderStorage.get(orderId);
    
    if (!tempOrderData) {
      console.error(`Temporary order data not found for order: ${orderId}`);
      return false;
    }

    console.log(`Creating order ${orderId} with status ${status}`, {
      paymentDetails,
      tempOrderData,
      updatedAt: new Date().toISOString()
    });

    // Doğrudan veritabanına sipariş oluştur
    const order = await prisma.order.create({
      data: {
        id: orderId,
        status: status === 'completed' ? 'COMPLETED' : 'FAILED',
        totalAmount: tempOrderData.totalAmount || 0,
        paymentMethod: 'vakifbank_pos',
        paymentStatus: status === 'completed' ? 'paid' : 'failed',
        transactionId: paymentDetails.transactionId,
        authCode: paymentDetails.authCode,
        customerEmail: tempOrderData.customerInfo?.email,
        customerPhone: tempOrderData.customerInfo?.phone,
        
        // Create shipping address if provided
        ...(tempOrderData.shippingAddress && {
          shippingAddress: {
            create: {
              firstName: tempOrderData.shippingAddress.firstName || '',
              lastName: tempOrderData.shippingAddress.lastName || '',
              company: tempOrderData.shippingAddress.company || '',
              address: tempOrderData.shippingAddress.address || '',
              city: tempOrderData.shippingAddress.city || '',
              district: tempOrderData.shippingAddress.district || '',
              postalCode: tempOrderData.shippingAddress.postalCode || '',
              country: tempOrderData.shippingAddress.country || 'Turkey',
              phone: tempOrderData.shippingAddress.phone || ''
            }
          }
        }),
        
        // Create order items
        orderItems: {
          create: (tempOrderData.cartItems || []).map(item => ({
            productId: item.id?.toString() || '',
            productTitle: item.title || '',
            productImage: item.images?.[0] || '',
            size: item.size || '',
            color: item.color || '',
            quantity: item.quantity || 1,
            price: item.price || 0,
            totalPrice: (item.price || 0) * (item.quantity || 1)
          }))
        }
      },
      include: {
        orderItems: true,
        shippingAddress: true
      }
    });

    console.log('Order created successfully:', order.id);
    
    // Geçici depodan sil
    tempOrderStorage.delete(orderId);
    
    // İsteğe bağlı: Gerçek zamanlı güncelleme için broadcast API'sini çağır
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mukulstore.com';
      await fetch(`${baseUrl}/api/admin/sales/broadcast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          status,
          paymentMethod: 'VakıfBank',
          transactionId: paymentDetails.transactionId,
          totalAmount: tempOrderData.totalAmount,
          items: tempOrderData.cartItems,
          customerInfo: tempOrderData.customerInfo
        })
      });
    } catch (broadcastError) {
      console.log('Broadcast error (non-critical):', broadcastError.message);
    }
    
    return true;

  } catch (error) {
    console.error('Error creating order:', error);
    
    // Check if order already exists
    if (error.code === 'P2002') {
      console.log('Order already exists, this is okay');
      return true;
    }
    
    return false;
  } finally {
    await prisma.$disconnect();
  }
}
