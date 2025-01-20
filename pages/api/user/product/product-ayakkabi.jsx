export default async function (req,res) {
    if (req.method === 'GET') {
         try {
            const products = await prisma.product.findMany({
                where: {
                    categoryId: 3
                }
            })
            return res.status(200).json({data: products, message: 'Popular product list'});
         } catch (error) {
            return res.status(500).json({message: 'Sunucu hatası'});
         }
    }
}