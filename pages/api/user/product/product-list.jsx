import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 20;
            const skip = (page - 1) * pageSize;

            // Get total count of products
            const totalCount = await prisma.product.count();

            // Get paginated products
            const products = await prisma.product.findMany({
                skip: skip,
                take: pageSize,
                orderBy: {
                    createdAt: 'desc'  // En yeni ürünler önce
                }
            });

            res.status(200).json({
                data: products,
                pagination: {
                    currentPage: page,
                    pageSize: pageSize,
                    totalCount: totalCount,
                    totalPages: Math.ceil(totalCount / pageSize)
                },
                message: 'Product list'
            });

        } catch (error) {
            res.status(500).json({
                message: 'Ürünler yüklenirken bir hata oluştu',
                error: error.message
            });
        }
    }
}