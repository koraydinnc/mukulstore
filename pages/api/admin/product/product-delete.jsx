import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;  // Correct way to access query params in Next.js API route

    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }


      await prisma.product.delete({
        where: { id: parseInt(id) }, // Correct way to delete by id
      });

      res.status(200).json({ message: 'Product deleted', product });
    } catch (error) {
      res.status(500).json({ message: 'Could not delete product', error: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
