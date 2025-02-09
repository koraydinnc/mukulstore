import prisma from "@/lib/prisma";
import { storage } from "@/lib/firebase";
import { ref, deleteObject } from "firebase/storage";

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ status: 0, message: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const formData = req.body;

    // Validasyon: formData'nın geçerli olduğuna emin olalım
    const { 
      title, 
      description, 
      price, 
      discountPercentage, 
      images,
      deletedImages, 
      newImages, 
      featured, 
      isPopular, 
      categoryId, 
      status,
      sizes
    } = formData;

    if (!title || !description || !price) {
      return res.status(400).json({ status: 0, message: 'Missing required fields' });
    }

    // Önce mevcut ürünü ve fotoğraflarını al
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
      select: { images: true }
    });

    // Silinecek fotoğrafları Firebase'den sil
    if (Array.isArray(deletedImages) && deletedImages.length > 0) {
      await Promise.all(
        deletedImages.map(async (imageUrl) => {
          try {
            const imageName = imageUrl.split('/').pop().split('?')[0];
            const imageRef = ref(storage, `products/${imageName}`);
            await deleteObject(imageRef);
          } catch (error) {
            console.error('Error deleting image:', error);
          }
        })
      );
    }

    // Yeni fotoğrafları yükle
    let uploadedImageUrls = [];
    if (Array.isArray(newImages) && newImages.length > 0) {
      const uploadResponse = await fetch('/api/admin/product/photos-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: newImages })
      });

      const uploadResult = await uploadResponse.json();
      if (uploadResult.success) {
        uploadedImageUrls = uploadResult.imageUrls;
      } else {
        return res.status(500).json({ status: 0, message: 'Failed to upload images' });
      }
    }

    // Mevcut fotoğraflardan silinmeyenleri al ve yeni fotoğrafları ekle
    const updatedImages = [
      ...existingProduct.images.filter(img => !deletedImages?.includes(img)),
      ...uploadedImageUrls
    ];

    // Transaction kullanarak ürün ve varyantları güncelle
    const updatedProduct = await prisma.$transaction(async (prisma) => {
      // Önce ürünü güncelle
      const product = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          price: Number(price), // Fiyatın sayısal bir değere dönüştürülmesi gerekebilir
          discountPercentage: Number(discountPercentage), // Aynı şekilde
          images: updatedImages,
          featured: Boolean(featured),
          isPopular: Boolean(isPopular),
          categoryId: Number(categoryId),
          status: status || 'ACTIVE',
          updatedAt: new Date()
        }
      });

      // Varyant işlemleri burada yapılabilir

      return product;
    });

    return res.status(200).json({
      status: 1,
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({
      status: 0,
      message: 'Failed to update product',
      error: error.message || 'Unknown error occurred'
    });
  } finally {
    await prisma.$disconnect();
  }
}
