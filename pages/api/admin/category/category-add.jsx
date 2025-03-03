import prisma from "@/lib/prisma";

export default async function handler(req,res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Yalnızca POST istekleri destekleniyor.' });
    }
    
    try {
        const { name } = req.body;
    
        if (!name ) {
        return res.status(400).json({ message: 'İsim alanı eksik!' });
        }
    
        
        const category = await prisma.category.create({
        data: {
            name: name.trim(),
        },
        });
    
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}