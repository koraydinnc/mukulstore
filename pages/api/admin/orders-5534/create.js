import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      orderId,
      cartItems,
      shippingAddress,
      totalAmount,
      paymentDetails,
      customerInfo
    } = req.body;

    // Validation
    if (!orderId || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ 
        error: 'Geçersiz sipariş bilgileri',
        details: 'orderId, cartItems gerekli alanlar'
      });
    }

    // Create order with items and shipping address
    const order = await prisma.order.create({
      data: {
        id: orderId,
        status: paymentDetails?.status || 'PENDING',
        totalAmount: totalAmount || 0,
        paymentMethod: paymentDetails?.paymentMethod || 'vakifbank_pos',
        paymentStatus: paymentDetails?.paymentStatus || 'pending',
        transactionId: paymentDetails?.transactionId,
        authCode: paymentDetails?.authCode,
        customerEmail: customerInfo?.email,
        customerPhone: customerInfo?.phone,
        
        // Create shipping address if provided
        ...(shippingAddress && {
          shippingAddress: {
            create: {
              firstName: shippingAddress.firstName || '',
              lastName: shippingAddress.lastName || '',
              company: shippingAddress.company || '',
              address: shippingAddress.address || '',
              city: shippingAddress.city || '',
              district: shippingAddress.district || '',
              postalCode: shippingAddress.postalCode || '',
              country: shippingAddress.country || 'Turkey',
              phone: shippingAddress.phone || ''
            }
          }
        }),
        
        // Create order items
        orderItems: {
          create: cartItems.map(item => ({
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

    return res.status(201).json({
      success: true,
      message: 'Sipariş başarıyla oluşturuldu',
      order: order
    });

  } catch (error) {
    console.error('Order creation error:', error);
    
    // Check if order already exists
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: 'Sipariş zaten mevcut',
        details: 'Bu sipariş ID ile zaten bir sipariş oluşturulmuş'
      });
    }

    return res.status(500).json({
      error: 'Sipariş oluşturulamadı',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  } finally {
    await prisma.$disconnect();
  }
}
