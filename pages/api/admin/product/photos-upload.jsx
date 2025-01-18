// import { IncomingForm } from 'formidable';
// import { bucket } from '@/lib/firebaseAdmin';
// import fs from 'fs/promises';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const form = new IncomingForm({
//       keepExtensions: true,
//     });

//     const [fields, files] = await new Promise((resolve, reject) => {
//       form.parse(req, (err, fields, files) => {
//         if (err) reject(err);
//         resolve([fields, files]);
//       });
//     });

//     if (!files.file) {
//       return res.status(400).json({ success: false, message: 'No file uploaded' });
//     }

//     const file = Array.isArray(files.file) ? files.file[0] : files.file;
//     const fileName = `products/${Date.now()}-${file.originalFilename.replace(/[^a-zA-Z0-9.-]/g, '-')}`;

//     try {
//       // Upload file to Firebase Storage
//       await bucket.upload(file.filepath, {
//         destination: fileName,
//         metadata: {
//           contentType: file.mimetype,
//           metadata: {
//             firebaseStorageDownloadTokens: Date.now().toString(),
//           },
//         },
//       });

//       // Get public URL
//       const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

//       // Clean up temp file
//       await fs.unlink(file.filepath);

//       return res.status(200).json({
//         success: true,
//         urls: [publicUrl]
//       });

//     } catch (uploadError) {
//       console.error('Firebase upload error:', uploadError);
//       return res.status(500).json({
//         success: false,
//         message: 'Firebase upload failed',
//         error: uploadError.message
//       });
//     }

//   } catch (error) {
//     console.error('Request handling error:', error);
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// }
