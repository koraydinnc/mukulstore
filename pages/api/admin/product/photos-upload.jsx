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
          const fileName = `${nanoid()}-${Date.now()}-${index}.jpg`;
          const storageRef = ref(storage, `products/${fileName}`);

          // Base64'ü temizle ve buffer'a çevir
          const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
          const imageBuffer = Buffer.from(base64Data, 'base64');

          // Firebase'e yükle
          const uploadResult = await uploadBytes(storageRef, imageBuffer, {
            contentType: 'image/jpeg'
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
