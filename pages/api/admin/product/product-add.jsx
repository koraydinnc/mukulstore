import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      title,
      description,
      price,
      discountPercentage,
      discountedPrice,
      images,
      featured,
      isPopular,
      categoryId,
      status,
      sizes, // [{ size: "44", stock: 0 }, { size: "45", stock: 3 }]
    } = req.body;

    if (!title || !price || !categoryId || !sizes || sizes.length === 0) {
      return res.status(400).json({ message: "Eksik alanlar var." });
    }

    // 1️⃣ Ürünü oluştur
    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price,
        discountPercentage,
        discountedPrice,
        images,
        featured,
        isPopular,
        categoryId,
        status,
      },
    });

    // 2️⃣ Bedenleri ekleyelim (ProductVariant modeli)
    const variants = sizes.map((size) => ({
      size: size.size,
      stock: size.stock,
      productId: newProduct.id,
    }));

    await prisma.productVariant.createMany({
      data: variants,
    });

    return res.status(201).json({ message: "Ürün başarıyla eklendi", product: newProduct, status:1 });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
