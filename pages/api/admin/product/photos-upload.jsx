import { IncomingForm } from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Form verisini kendimiz parse edeceğiz
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Public klasöründeki uploads dizinini oluştur
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // Formidable formu oluştur
    const form = new IncomingForm({
      uploadDir, // Dosyalar bu dizine yüklenecek
      keepExtensions: true, // Dosya uzantılarını koru
      multiples: true, // Birden fazla dosya yüklenmesine izin ver
    });

    const formData = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const { files } = formData;
    const fileArray = files.files ? (Array.isArray(files.files) ? files.files : [files.files]) : [];

    const urls = fileArray.map((file) => {
      // Her bir dosyanın URL'sini oluştur
      return `/uploads/${path.basename(file.filepath)}`;
    });

    // Başarılı yanıt döndür
    return res.status(200).json({
      success: true,
      urls, // URL'leri içeren bir dizi döndür
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error uploading files',
      error: error.message,
    });
  }
}
