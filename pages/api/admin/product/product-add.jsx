import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      title,
      description,
      price,
      discountPercentage,
      images = [],
      stock,
      featured = false,
      isPopular = false,
      categoryId,
      status = 'ACTIVE',
      sizes
    } = req.body;

    if (!title || isNaN(price) || !categoryId) {
      return res.status(400).json({ message: 'Title, valid price, image, and categoryId are required' });
    }



   console.log(sizes)

    try {
      const discountedPrice =
        discountPercentage && price
          ? parseFloat((price - (price * discountPercentage) / 100).toFixed(2))
          : null;

          const newProduct = await prisma.product.create({
            data: {
              categoryId: parseInt(categoryId),
              description,
              discountPercentage: discountPercentage ? parseFloat(discountPercentage) : null,
              discountedPrice,
              featured,
              images,
              isPopular,
              price: parseFloat(price),
              status,
              stock: parseInt(stock),
              title,
              sizes
            },})
     console.log(newProduct)
      res.status(201).json({ message: 'Ürün Oluşturuldu', status: 1, product: newProduct });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Ürün oluşturulamadı', status: 0, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
