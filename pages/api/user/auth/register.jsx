import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, name, surname, email, password, confirmPassword } = req.body;
    console.log("Incoming registration request:", { username, name, surname, email });

    if (!name || !email ||!surname|| !password || !confirmPassword || !username) {
            return res.status(400).json({ message: 'name,  surname , email ve password alanları boş bırakılamaz.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({message: 'Şifreler eşleşmiyor.'})
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Geçerli bir email adresi giriniz.' });
    }

    // Şifre karmaşıklığını kontrol et
    if (password.length < 6) {
      return res.status(400).json({ message: 'Şifre en az 6 karakter olmalıdır.' });
    }

    try {
      // Önce kullanıcı kontrolü yapalım
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: email },
            { username: username }
          ]
        }
      });

      if (existingUser) {
        return res.status(400).json({ 
          message: existingUser.email === email 
            ? 'Bu email zaten kayıtlı.' 
            : 'Bu kullanıcı adı zaten kullanılıyor.'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          username,
          name,
          surname,
          email,
          password: hashedPassword,
        },
      });

      // Hassas bilgileri çıkaralım
      const { password: _, ...userWithoutPassword } = newUser;

      return res.status(200).json({ 
        message: 'Kullanıcı başarıyla oluşturuldu.',
        data: userWithoutPassword,
        status: 1
      });

    } catch (error) {
      console.error('Detaylı hata:', error); // Tam hata detayını görelim
      return res.status(500).json({ 
        message: 'Kayıt işlemi sırasında bir hata oluştu', 
        error: error.message,
        code: error.code
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
