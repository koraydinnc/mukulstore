import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { id } = req.body;

      // ID kontrolü
      if (!id) {
        return res.status(400).json({ message: "Ürün ID gerekli!" });
      }

      // Ürünü veritabanından bulma
      const selectedProduct = await prisma.product.findUnique({
        where: {
          id: Number(id), // ID'nin bir sayı olduğundan emin oluyoruz
        },
      });

      if (!selectedProduct) {
        return res.status(404).json({ message: "Ürün bulunamadı!" });
      }

      return res.status(200).json(selectedProduct);
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
