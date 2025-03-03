import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { title, description, price, discountPercentage, images, stock, featured, isPopular, categoryId, status } = req.body;

    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ message: 'Request body is not valid' });
    }

    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    if (!title || !description || !price || !stock || !categoryId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate and parse input data
    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock);
    const parsedCategoryId = parseInt(categoryId);
    const parsedDiscountPercentage = discountPercentage ? parseFloat(discountPercentage) : null;

    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: 'Invalid price value' });
    }

    if (isNaN(parsedStock)) {
      return res.status(400).json({ message: 'Invalid stock value' });
    }

    if (isNaN(parsedCategoryId)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    try {
      // Find the product in the database
      const product = await prisma.product.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Update the product
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          price: parsedPrice,
          discountPercentage: parsedDiscountPercentage,
          images,
          stock: parsedStock,
          featured,
          isPopular,
          categoryId: parsedCategoryId,
          status,
          updatedAt: new Date(),
        },
      });

      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Could not update product', error: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}