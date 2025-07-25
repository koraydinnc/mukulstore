import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;  // Correct way to access query params in Next.js API route

    if (!id) {
      return res.status(400).json({ message: 'category ID is required' });
    }

    try {
      const category = await prisma.category.findUnique({
        where: { id: parseInt(id) },
      });

      if (!category) {
        return res.status(404).json({ message: 'category not found' });
      }


      await prisma.category.delete({
        where: { id: parseInt(id) }, // Correct way to delete by id
      });

      res.status(200).json({ message: 'category deleted', category });
    } catch (error) {
      res.status(500).json({ message: 'Could not delete category', error: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}