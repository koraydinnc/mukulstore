import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'GET') {
           try {
                const products = await prisma.product.findMany({});
                res.status(200).json({data: products, message:'Product list'});
           } catch (error) {
            
           }
    }
}