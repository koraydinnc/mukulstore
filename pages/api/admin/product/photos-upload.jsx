import { IncomingForm } from 'formidable';
import AWS from 'aws-sdk';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

// AWS S3 yapılandırması
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // .env dosyasından alın
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = new IncomingForm({ multiples: true, keepExtensions: true });

    const formData = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const fileArray = formData.files.files
      ? Array.isArray(formData.files.files)
        ? formData.files.files
        : [formData.files.files]
      : [];

    const uploadedUrls = await Promise.all(
      fileArray.map(async (file) => {
        const fileContent = await fs.readFile(file.filepath);
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `uploads/${file.newFilename}`,
          Body: fileContent,
          ContentType: file.mimetype,
        };
        

        const uploadResult = await s3.upload(uploadParams).promise();
        return uploadResult.Location; // Yüklenen dosyanın URL'si
      })
    );

    return res.status(200).json({
      success: true,
      urls: uploadedUrls, // Yüklenen dosyaların URL'lerini döndür
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
