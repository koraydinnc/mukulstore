import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: true,
        shippingAddress: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Siparişleri çekme hatası:', error);
    return res.status(500).json({ error: 'Siparişler alınamadı', details: error.message });
  }
}
