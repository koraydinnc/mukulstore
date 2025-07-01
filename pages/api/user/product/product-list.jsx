import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { 
                page = 1, 
                pageSize = 12, 
                sort = 'newest',
                category,
                size,
                priceRange,
                search 
            } = req.query;

            const pageNum = parseInt(page);
            const pageSizeNum = parseInt(pageSize);
            const skip = (pageNum - 1) * pageSizeNum;

            // Build where condition
            let whereCondition = {};

            // Category filter
            if (category && category !== 'all') {
                if (category.includes('-')) {
                    // Subcategory format: "categoryId-subcategoryId"
                    const [catId, subId] = category.split('-');
                    whereCondition.categoryId = parseInt(catId);
                    if (subId) {
                        whereCondition.subcategoryId = parseInt(subId);
                    }
                } else {
                    whereCondition.categoryId = parseInt(category);
                }
            }

            // Size filter - JSON field için (client-side filtering yapacağız)
            // Backend'de size filtering atlanıyor, frontend'de yapılacak

            // Price range filter
            if (priceRange && priceRange !== 'all') {
                const priceRanges = {
                    '1000-1500': { gte: 1000, lte: 1500 },
                    '1500-2000': { gte: 1500, lte: 2000 },
                    '2000-3000': { gte: 2000, lte: 3000 },
                    '3000-4000': { gte: 3000, lte: 4000 },
                    '4000-5000': { gte: 4000, lte: 5000 },
                    '5000-plus': { gte: 5000 }
                };
                
                if (priceRanges[priceRange]) {
                    whereCondition.price = priceRanges[priceRange];
                }
            }

            // Search filter
            if (search) {
                whereCondition.OR = [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ];
            }

            // Sort options
            let orderBy = {};
            switch (sort) {
                case 'price-low':
                    orderBy = { price: 'asc' };
                    break;
                case 'price-high':
                    orderBy = { price: 'desc' };
                    break;
                case 'name-asc':
                    orderBy = { title: 'asc' };
                    break;
                case 'name-desc':
                    orderBy = { title: 'desc' };
                    break;
                case 'newest':
                default:
                    orderBy = { createdAt: 'desc' };
                    break;
            }

            // Get total count with filters
            const totalCount = await prisma.product.count({
                where: whereCondition
            });

            // Get paginated products with includes
            const products = await prisma.product.findMany({
                where: whereCondition,
                skip: skip,
                take: pageSizeNum,
                orderBy: orderBy,
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });

            res.status(200).json({
                data: products,
                pagination: {
                    currentPage: pageNum,
                    pageSize: pageSizeNum,
                    totalCount: totalCount,
                    totalPages: Math.ceil(totalCount / pageSizeNum),
                    hasNext: pageNum < Math.ceil(totalCount / pageSizeNum),
                    hasPrev: pageNum > 1
                },
                filters: {
                    sort,
                    category,
                    priceRange,
                    search
                },
                message: 'Product list with filters'
            });

        } catch (error) {
            console.error('Product list API error:', error);
            res.status(500).json({
                data: [],
                pagination: {
                    currentPage: 1,
                    pageSize: 12,
                    totalCount: 0,
                    totalPages: 0,
                    hasNext: false,
                    hasPrev: false
                },
                message: 'Ürünler yüklenirken bir hata oluştu',
                error: error.message
            });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}