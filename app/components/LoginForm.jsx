'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { FcGoogle } from 'react-icons/fc'
import { BsApple } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { RegisterForm } from "./RegisterForm"

export function LoginForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Login logic here
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("flex flex-col gap-6 w-full", className)}
      {...props}
    >
      <AnimatePresence mode="wait">
        {!isRegister ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden w-full shadow-lg">
              <CardContent className="grid md:grid-cols-[1fr,1fr] p-0">
                {/* Form Section */}
                <div className="p-8 lg:p-12">
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold">Tekrar Hoş Geldiniz</h1>
                      <p className="text-muted-foreground">
                        Hesabınıza giriş yaparak kaldığınız yerden devam edin
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="relative">
                          <Label htmlFor="email" className="text-base">
                            Email
                          </Label>
                          <div className="relative">
                            <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="ornek@email.com"
                              required
                              className="pl-10 h-12"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-base">
                              Şifre
                            </Label>
                            <Button
                              variant="link"
                              className="px-0 font-normal text-xs text-primary hover:text-primary/90"
                            >
                              Şifremi Unuttum?
                            </Button>
                          </div>
                          <div className="relative">
                            <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                            <Input
                              id="password"
                              type="password"
                              required
                              className="pl-10 h-12"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
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
                          {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                        </span>
                      </Button>
                    </form>

                    {/* Mobile Register Button - New Addition */}
                    <div className="md:hidden text-center">
                      <p className="text-sm text-gray-600 mb-4">Hesabınız yok mu?</p>
                      <Button
                        variant="outline"
                        className="w-full h-12 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                        onClick={() => setIsRegister(true)}
                      >
                        Hesap Oluştur
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-background text-muted-foreground">
                          Veya şununla devam et
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <Button variant="outline" className="h-12 space-x-2">
                        <FcGoogle className="h-5 w-5" />
                        <span className="sr-only">Google ile giriş yap</span>
                      </Button>
                      <Button variant="outline" className="h-12 space-x-2">
                        <BsApple className="h-5 w-5" />
                        <span className="sr-only">Apple ile giriş yap</span>
                      </Button>
                      <Button variant="outline" className="h-12 space-x-2">
                        <FaFacebook className="h-5 w-5 text-blue-600" />
                        <span className="sr-only">Facebook ile giriş yap</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Image Section */}
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800">
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div className="relative h-full p-12 flex flex-col justify-between text-white">
                    <div className="space-y-6">
                      <h2 className="text-3xl font-bold">Yeni misiniz?</h2>
                      <p className="text-blue-50">
                        Hemen ücretsiz hesap oluşturun ve avantajlardan yararlanın.
                      </p>
                      <Button
                        variant="outline"
                        className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-colors"
                        onClick={() => setIsRegister(true)}
                      >
                        Hesap Oluştur
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
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <RegisterForm onBackToLogin={() => setIsRegister(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <p className="text-center text-sm text-muted-foreground">
        Devam ederek{" "}
        <a href="#" className="underline hover:text-primary">Kullanım Şartları</a>
        {" "}ve{" "}
        <a href="#" className="underline hover:text-primary">Gizlilik Politikası</a>
        'nı kabul etmiş olursunuz.
      </p>
    </motion.div>
  )
}
