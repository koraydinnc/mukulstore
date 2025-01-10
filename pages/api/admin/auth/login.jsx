import { compare } from 'bcryptjs';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email ve şifre zorunludur' 
            });
        }

        const admin = await prisma.admin.findUnique({ 
            where: { email }
        });

        if (!admin) {
            return res.status(401).json({ 
                message: 'Geçersiz email veya şifre' 
            });
        }

        const isPasswordValid = await compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: 'Geçersiz email veya şifre' 
            });
        }

        const { password: _, ...adminData } = admin;

        return res.status(200).json({
            message: 'Giriş başarılı',
            admin: adminData
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ 
            message: 'Bir hata oluştu. Lütfen tekrar deneyin.' 
        });
    } finally {
        await prisma.$disconnect();
    }
}