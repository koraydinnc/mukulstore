import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: 4
      },
 
    });

    if (!products) {
      return res.status(404).json({
        status: 0,
        message: 'Ürün bulunamadı',
        data: []
      });
    }

    return res.status(200).json({
      status: 1,
      message: 'İndirimli Ürünleri Listelendi',
      data: products
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      status: 0,
      message: 'Sunucu hatası',
      error: error.message
    });
  }
}