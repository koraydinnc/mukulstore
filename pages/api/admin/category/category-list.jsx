import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get query parameters for filtering and sorting
    const { sort = 'createdAt', order = 'desc', search } = req.query;

    // Build where clause for search
    const where = search 
      ? { name: { contains: search, mode: 'insensitive' } }
      : {};

    // Get categories with product count
    const categories = await prisma.category.findMany({
      where,
      orderBy: { [sort]: order },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    // Format response
    const formattedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      productCount: category._count.products,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt
    }));

    return res.status(200).json({
      success: true,
      categories: formattedCategories
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
}