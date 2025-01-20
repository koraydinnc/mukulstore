import prisma from "@/lib/prisma";

export default async function handler(req,res) {
    if (req.method === 'GET') {
         try {
            const products = await prisma.product.findMany({
                where: {
                    categoryId: 2
                }
            })
            return res.status(200).json({data: products, message: 'Popular product list'});
         } catch (error) {
            return res.status(500).json({message: 'Sunucu hatası', error: error.message});
         }
    }
}