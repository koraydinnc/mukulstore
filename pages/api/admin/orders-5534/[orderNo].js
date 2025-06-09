import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { orderNo } = req.query;

  try {
    const order = await prisma.order.findUnique({
      where: { orderNo },
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
        shippingAddress: true
      }
    });

    if (!order) {
      return res.status(404).json({ error: "Sipariş bulunamadı" });
    }

    return res.status(200).json({ order });
  } catch (error) {
    console.error("Sipariş getirme hatası:", error);
    return res.status(500).json({ error: "Sipariş getirilirken bir hata oluştu" });
  }
}