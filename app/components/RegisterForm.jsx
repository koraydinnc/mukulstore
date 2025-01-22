'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { useState } from "react"
import { HiMail, HiUser } from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { FcGoogle } from 'react-icons/fc'

export function RegisterForm({ onBackToLogin }) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Register logic here
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <Card className="overflow-hidden w-full shadow-lg">
      <CardContent className="grid md:grid-cols-[1fr,1fr] p-0">
        {/* Banner Section - Now on the left */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800">
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="relative h-full p-12 flex flex-col justify-between text-white">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Hoş Geldiniz!</h2>
              <p className="text-blue-50">
                Üyelik avantajlarından yararlanmak için:
              </p>
              <ul className="space-y-3 text-blue-50">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"/>
                  Özel kampanyalardan haberdar olun
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"/>
                  Siparişlerinizi kolayca takip edin
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"/>
                  Favori ürünlerinizi kaydedin
                </li>
              </ul>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-colors"
                onClick={onBackToLogin}
              >
                Giriş Yap
              </Button>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-blue-100">Güvenli alışverişin adresi</p>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg backdrop-blur-sm" />
                <div className="w-12 h-12 bg-white/10 rounded-lg backdrop-blur-sm" />
                <div className="w-12 h-12 bg-white/10 rounded-lg backdrop-blur-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Section - Now on the right */}
        <div className="p-8 lg:p-12">
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Hesap Oluştur</h1>
              <p className="text-muted-foreground">
                Hemen üye olun ve alışverişe başlayın
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Name Input */}
                <div className="relative">
                  <Label htmlFor="name">Ad Soyad</Label>
                  <div className="relative">
                    <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                    <Input
                      id="name"
                      type="text"
                      required
                      className="pl-10 h-12"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                    <Input
                      id="email"
                      type="email"
                      required
                      className="pl-10 h-12"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                {/* Password Inputs */}
                <div className="space-y-4">
                  <div className="relative">
                    <Label htmlFor="password">Şifre</Label>
                    <div className="relative">
                      <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                      <Input
                        id="password"
                        type="password"
                        required
                        className="pl-10 h-12"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                    <div className="relative">
                      <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        required
                        className="pl-10 h-12"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base relative overflow-hidden"
                disabled={isLoading}
              >
                <motion.div
                  animate={isLoading ? { x: "100%" } : { x: "0%" }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700"
                />
                <span className="relative z-10">
                  {isLoading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
                </span>
              </Button>
            </form>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-500">
                Zaten hesabınız var mı?{" "}
                <Button
                  variant="link"
                  className="text-primary hover:text-primary/90 p-0"
                  onClick={onBackToLogin}
                >
                  Giriş Yap
                </Button>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
