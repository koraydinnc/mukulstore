import prisma from "@/lib/prisma";


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      categoryId,
      description,
      discountPercentage,
      featured,
      images,
      isPopular,
      price,
      status,
      stock,
      title
    } = req.body;

    if (!title || !price || !categoryId) {
      return res.status(400).json({ message: 'Title, price, and categoryId are required' });
    }

    try {
      const newProduct = await prisma.product.create({
        data: {
          categoryId: parseInt(categoryId),
          description,
          discountPercentage: discountPercentage ? parseFloat(discountPercentage) : null,
          featured,
          images,
          isPopular,
          price: parseFloat(price),
          status,
          stock: parseInt(stock),
          title,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      res.status(201).json({ message: 'Ürün Oluşturuldu', status:1, product: newProduct });
    } catch (error) {
      res.status(500).json({ message: 'Could not create product', error: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}