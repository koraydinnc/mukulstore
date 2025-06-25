import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // İlk 8 ürünü popular yap
            const products = await prisma.product.findMany({
                take: 8,
                orderBy: {
                    createdAt: 'desc'
                }
            });

            if (products.length === 0) {
                return res.status(404).json({
                    message: 'No products found'
                });
            }

            // Bu ürünleri popular yap
            const productIds = products.map(p => p.id);
            
            await prisma.product.updateMany({
                where: {
                    id: {
                        in: productIds
                    }
                },
                data: {
                    isPopular: true
                }
            });

            return res.status(200).json({
                message: `${products.length} products marked as popular`,
                productIds
            });

        } catch (error) {
            console.error('Make popular API error:', error);
            return res.status(500).json({
                message: 'Server error',
                error: error.message
            });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
} 