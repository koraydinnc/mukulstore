import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { email, password } = req.body;

  if (req.method === 'POST') {
    try {
      if (!email || !password) {
        return res.status(400).json({ status: 0, message: 'Email ve Password Giriniz!' });
      }

      const existingAdmin = await prisma.admin.findUnique({
        where: { email },
      });

      if (!existingAdmin) {
        return res.status(400).json({ message: 'Bu email kayıtlı değil.' });
      }

      const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Geçersiz şifre.' });
      }

      // JWT oluşturma
      const token = jwt.sign(
        { id: existingAdmin.id, email: existingAdmin.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({ status: 1, token, message: 'Giriş başarılı!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 0, message: 'Bir Hata Oluştu!', error: error.message });
    }
  } else {
    return res.status(405).json({ status: 0, message: 'Yalnızca POST istekleri kabul edilir.' });
  }
}