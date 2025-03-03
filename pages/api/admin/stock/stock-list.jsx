import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const productsStock = await prisma.product.findMany({
      include: {
        variants: true, // Beden ve stok bilgilerini de getiriyoruz
      },
    });

    return res.status(200).json(productsStock);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
