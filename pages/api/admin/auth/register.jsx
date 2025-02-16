import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req,res) {

     const {email, password} = req.body

     if (req.method === 'POST') {

        try {

            if (!email || !password) {
                   return res.status(400).json({status:0 , message: 'Email ve Password Giriniz!'})
            }

            const existingAdmin = await prisma.admin.findUnique({
                where: { email },
              });
        
              if (existingAdmin) {
                return res.status(400).json({ message: 'Bu email zaten kayıtlı.' });
              }

            const passwordHash = await bcrypt.hash(password, 10)



            const newAdmin = await prisma.admin.create({
                data: {
                    email: email,
                    password: passwordHash
                }
            })

        
            return res.status(200).json({status:1, data: newAdmin, message:'Admin Oluşturuldu!'})
             
        } catch (error) {
            console.error(error)
            return res.status(500).json({status:0, message:'Bir Hata Oluştu!'})
        }
        
     }
}