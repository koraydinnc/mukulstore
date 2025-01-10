import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const { email, password } = req.body
           
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email ve şifre alanları boş bırakılamaz.' 
            })
        }

        const existingAdmin = await prisma.admin.findUnique({
            where: { email }
        })

        if (existingAdmin) {
            return res.status(400).json({ 
                message: 'Bu email zaten kayıtlı.' 
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10) 
         
        const newAdmin = await prisma.admin.create({
            data: {
                email,
                password: hashedPassword
            }
        })


        return res.status(201).json({
            message: 'Admin başarıyla oluşturuldu.',
            admin: newAdmin
        })

    } catch (error) {
        console.error('Registration error:', error.message)
        return res.status(500).json({ 
            message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
            error: error.message 
        })
    } finally {
        await prisma.$disconnect()
    }
}