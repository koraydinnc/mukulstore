import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const filePath = path.join(process.cwd(), 'public', 'uploads', url);

    try {
      fs.unlinkSync(filePath);
      return res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Could not delete image', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}