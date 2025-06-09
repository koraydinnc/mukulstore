import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
 
  // TEST: Her zaman başarılı dönen sahte sipariş
  // Gerçek sipariş oluşturma kodunu geçici olarak devre dışı bırakıyoruz
  // const orderNo = generateOrderNumber();
  // return res.status(201).json({
  //   success: true,
  //   order: {
  //     orderNo,
  //     status: 'completed',
  //     paymentStatus: 'paid',
  //     createdAt: new Date(),
  //     shippingAddress: req.body.shippingAddress || {},
  //     orderItems: req.body.cartItems || []
  //   },
  //   message: 'Sipariş başarıyla oluşturuldu (test)' 
  // });

  // ...gerçek kod aşağıda...
  try {
    // Kullanıcı kimliği olmadan sipariş oluşturma
    const { cartItems, totalAmount, shippingAddress, paymentInfo } = req.body;
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Sepet boş.' });
    }
    if (!shippingAddress) {
      return res.status(400).json({ error: 'Adres bilgisi eksik.' });
    }

    // Benzersiz sipariş numarası oluştur
    const orderNo = generateOrderNumber();

    // Ana sipariş kaydı
    const order = await prisma.order.create({
      data: {
        orderNo,
        totalAmount,
        status: 'completed',
        paymentStatus: 'paid',
        shippingAddress: {
          create: {
            fullName: shippingAddress.fullName || `${shippingAddress.firstName || ''} ${shippingAddress.lastName || ''}`.trim(),
            address: shippingAddress.address,
            city: shippingAddress.city,
            zipCode: shippingAddress.zipCode || "",
            phone: shippingAddress.phone
          }
        },
        orderItems: {
          create: cartItems.map(item => ({
            productId: item.id, // id tipi Int olmalı
            quantity: item.quantity,
            size: item.size,
            price: item.price,
            totalPrice: item.totalPrice
          }))
        }
      },
      include: {
        orderItems: true,
        shippingAddress: true
      }
    });

    return res.status(201).json({ 
      success: true, 
      order,
      message: 'Sipariş başarıyla oluşturuldu'
    });
  } catch (error) {
    console.error('Sipariş oluşturma hatası:', error);
    return res.status(500).json({ 
      error: 'Sipariş oluşturulurken bir hata oluştu', 
      details: error.message 
    });
  }
}

// Benzersiz takip numarası oluştur
function generateOrderNumber() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 10000);
  return `MS-${timestamp}-${random}`;
}