import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { 
                featured = 'false', 
                page = '1', 
                limit = '10' 
            } = req.query;

            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            // Featured parametresi için where condition
            const whereCondition = {
                isPopular: true,
                // Eğer featured true ise, sadece featured ürünleri getir
                ...(featured === 'true' && { featured: true })
            };

            const products = await prisma.product.findMany({
                where: whereCondition,
                take: limitNum,
                skip: skip,
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    category: true
                }
            });

            // Total count for pagination
            const totalCount = await prisma.product.count({
                where: whereCondition
            });

            const pagination = {
                currentPage: pageNum,
                totalPages: Math.ceil(totalCount / limitNum),
                totalCount,
                hasNext: pageNum < Math.ceil(totalCount / limitNum),
                hasPrev: pageNum > 1
            };

            return res.status(200).json({
                data: products, 
                pagination,
                message: 'Popular product list'
            });

        } catch (error) {
            console.error('Popular products API error:', error);
            return res.status(500).json({
                data: [],
                message: 'Server error',
                error: error.message
            });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}