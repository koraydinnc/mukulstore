"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Check, CreditCard, Shield, Lock, CircleCheck, ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Breadcrumb from '@/app/components/Breadcrumb'

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const cartItems = useSelector((state) => state.cart.items)
  const totalAmount = useSelector((state) => state.cart.totalAmount)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expDate: '',
    cvv: ''
  })

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb />
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-12">
            <div className="flex items-center">
              <CircleCheck className="h-6 w-6 text-green-500" />
              <span className="ml-2 text-sm font-medium">Sepet</span>
            </div>
            <div className="h-px w-16 bg-green-500" />
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">2</div>
              <span className="ml-2 text-sm font-medium">Ödeme</span>
            </div>
            <div className="h-px w-16 bg-gray-200" />
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full border-2 border-gray-200 text-gray-400 flex items-center justify-center text-sm">3</div>
              <span className="ml-2 text-sm font-medium text-gray-400">Onay</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary Section - Moved to first position */}
          <div className="lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 sticky top-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-4">Sipariş Özeti</h3>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                      <div className="relative w-20 h-20">
                        <Image
                          src={`/uploads/${item.images[0]}`}
                          alt={item.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-500">Beden: {item.size}</p>
                        <div className="flex justify-between mt-1">
                          <span>₺{item.totalPrice}</span>
                          <span className="text-gray-500">x{item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Ara Toplam</span>
                      <span>₺{totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kargo</span>
                      <span className="text-green-600">Ücretsiz</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Toplam</span>
                      <span>₺{totalAmount}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Payment Form Section - Moved to second position */}
          <div className="space-y-6 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6">Ödeme Bilgileri</h2>
                <div className="mb-6">
                  <RadioGroup
                    defaultValue="credit-card"
                    onValueChange={setPaymentMethod}
                    className="grid grid-cols-3 gap-4"
                  >
                    <Label className="flex flex-col items-center justify-center border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                      <RadioGroupItem value="credit-card" className="sr-only" />
                      <CreditCard className="h-6 w-6 mb-2" />
                      <span className="text-sm">Kredi Kartı</span>
                    </Label>
                    {/* Add more payment methods as needed */}
                  </RadioGroup>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Kart Numarası</Label>
                    <div className="relative">
                      <Input 
                        placeholder="4242 4242 4242 4242"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({
                          ...cardData,
                          cardNumber: formatCardNumber(e.target.value)
                        })}
                        maxLength="19"
                        className="pl-12"
                      />
                      <CreditCard className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Kart Sahibi</Label>
                    <Input 
                      placeholder="Ad Soyad"
                      value={cardData.cardHolder}
                      onChange={(e) => setCardData({...cardData, cardHolder: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Son Kullanma Tarihi</Label>
                      <Input 
                        placeholder="AA/YY"
                        value={cardData.expDate}
                        onChange={(e) => setCardData({...cardData, expDate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Input 
                        placeholder="123"
                        type="password"
                        maxLength={3}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <Button 
                      className="w-full h-12 text-lg relative overflow-hidden"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                      ) : null}
                      {isLoading ? "İşleminiz Gerçekleştiriliyor..." : "Ödemeyi Tamamla"}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>

            {/* Security Badges with better styling */}
            <div className="grid grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm"
              >
                <Lock className="h-6 w-6 text-blue-500 mb-2" />
                <span className="text-sm text-gray-600 text-center">Güvenli Ödeme</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm"
              >
                <Shield className="h-6 w-6 text-blue-500 mb-2" />
                <span className="text-sm text-gray-600 text-center">256-bit SSL</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm"
              >
                <Check className="h-6 w-6 text-blue-500 mb-2" />
                <span className="text-sm text-gray-600 text-center">Garantili İşlem</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Payment Partners */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">Güvenli Ödeme Altyapısı</p>
          <div className="flex items-center justify-center space-x-8 opacity-70 hover:opacity-100 transition-opacity">
            <Image src='/iyzico_ile_ode_colored_horizontal.png' width={200} height={200}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage