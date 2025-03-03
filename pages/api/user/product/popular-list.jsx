import prisma from "@/lib/prisma";

export default async function handler(req,res) {
     if (req.method === 'GET') {
         
        const products = await prisma.product.findMany({
            where: {
                isPopular: true
            }
        })
       

        return res.status(200).json({data: products, message: 'Popular product list'});

     }
}