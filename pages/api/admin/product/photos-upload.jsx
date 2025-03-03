import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { images } = req.body;

    if (!Array.isArray(images)) {
      return res.status(400).json({
        success: false,
        message: 'Images must be an array'
      });
    }

    const uploadedUrls = await Promise.all(
      images.map(async (base64Image, index) => {
        try {
          // Base64'ü temizle ve dosya tipini tespit et
          const match = base64Image.match(/^data:image\/(jpeg|jpg|png);base64,/);
          if (!match) {
            throw new Error(`Image ${index} is not a valid JPEG or PNG file`);
          }

          const mimeType = match[1] === 'jpg' ? 'jpeg' : match[1];
          const fileExtension = mimeType === 'jpeg' ? 'jpg' : 'png';
          const fileName = `${nanoid()}-${Date.now()}-${index}.${fileExtension}`;
          const storageRef = ref(storage, `products/${fileName}`);

          // Base64 veriyi temizle ve buffer'a çevir
          const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
          const imageBuffer = Buffer.from(base64Data, 'base64');

          // Dosya boyutunu kontrol et
          if (imageBuffer.length > 1 * 1024 * 1024) {
            throw new Error(`Image ${index} is larger than 1MB`);
          }

          // Firebase'e yükle
          const uploadResult = await uploadBytes(storageRef, imageBuffer, {
            contentType: `image/${mimeType}`
          });

          // URL al
          const downloadURL = await getDownloadURL(uploadResult.ref);
          console.log(`Image ${index + 1} uploaded:`, downloadURL);

          return downloadURL;
        } catch (error) {
          console.error(`Error uploading image ${index}:`, error);
          throw new Error(`Failed to upload image ${index}`);
        }
      })
    );

    return res.status(200).json({
      success: true,
      imageUrls: uploadedUrls,
      message: 'All images uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload images',
      error: error.message
    });
  }
}