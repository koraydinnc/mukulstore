"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Check, CreditCard, Shield, Lock, CircleCheck, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";
import './globals.css'

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Format card number input
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    const newErrors = {};
    if (!cardData.cardNumber) newErrors.cardNumber = "Kart numarası gereklidir.";
    if (!cardData.cardHolder) newErrors.cardHolder = "Kart sahibinin adı gereklidir.";
    if (!cardData.expDate) newErrors.expDate = "Son kullanma tarihi gereklidir.";
    if (!cardData.cvv) newErrors.cvv = "CVV gereklidir.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      alert("Ödeme başarılı!");
    } else {
      setIsLoading(false);
    }
  };

  // Add input focus handlers
  const handleInputFocus = (inputName) => {
    // Only flip the card when focusing on CVV
    setIsCardFlipped(inputName === 'cvv');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb />
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
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
          {/* Order Summary Section */}
          <div className="lg:order-2">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
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

          {/* Payment Form Section */}
          <div className="space-y-6 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <CreditCard className="h-6 w-6" />
                    Ödeme Bilgileri
                  </h2>
                </div>

                {/* Card Body */}
                <div className="p-8 bg-white/80 backdrop-blur-sm space-y-8">
                  {/* Virtual Card Preview with 3D Flip */}
                  <div className="credit-card h-48 w-full">
                    <motion.div
                      className="credit-card-inner"
                      animate={{ rotateY: isCardFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Front of Card */}
                      <div className="credit-card-front bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 text-white shadow-2xl">
                        <div className="h-full flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div className="flex gap-2">
                               <Image src="/logo_band_colored@3x.png" width={200} height={200} />
                            </div>
                            <motion.div
                              animate={{ rotateY: [0, 360] }}
                              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
                            >
                              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2"/>
                                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </motion.div>
                          </div>
                          <div>
                            <div className="font-mono text-xl tracking-wider">
                              {cardData.cardNumber || "•••• •••• •••• ••••"}
                            </div>
                            <div className="flex justify-between mt-4">
                              <div className="text-sm opacity-75">
                                <div className="text-xs">Kart Sahibi</div>
                                <div className="font-medium tracking-wider">
                                  {cardData.cardHolder || "AD SOYAD"}
                                </div>
                              </div>
                              <div className="text-sm opacity-75">
                                <div className="text-xs">Son Kullanma</div>
                                <div className="font-medium">{cardData.expDate || "AA/YY"}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Back of Card */}
                      <div className="credit-card-back bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-xl p-6 text-white shadow-2xl">
                        <div className="w-full h-8 bg-gray-600 mt-4" />
                        <div className="w-full h-10 bg-white mt-4 px-3 flex items-center justify-end">
                          <div className="font-mono text-gray-800">{cardData.cvv || '•••'}</div>
                        </div>
                        <div className="mt-4 text-xs text-gray-300">
                          CVV numarası kartınızın arkasındaki son 3 hanedir.
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Payment Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Kart Numarası</Label>
                        <div className="mt-1 relative">
                          <Input
                            placeholder="0000 0000 0000 0000"
                            value={cardData.cardNumber}
                            onChange={(e) => setCardData({ ...cardData, cardNumber: formatCardNumber(e.target.value) })}
                            maxLength="19"
                            className={`pl-12 py-6 text-lg font-mono ${errors.cardNumber ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
                            onFocus={() => handleInputFocus('number')}
                          />
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        {errors.cardNumber && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="text-red-500 text-sm mt-1"
                          >
                            {errors.cardNumber}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">Kart Üzerindeki İsim</Label>
                        <Input
                          placeholder="AD SOYAD"
                          value={cardData.cardHolder}
                          onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value.toUpperCase() })}
                          className={`py-6 text-lg uppercase ${errors.cardHolder ? "border-red-500" : ""}`}
                          onFocus={() => handleInputFocus('name')}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Son Kullanma Tarihi</Label>
                          <Input
                            placeholder="AA/YY"
                            value={cardData.expDate}
                            onChange={(e) => setCardData({ ...cardData, expDate: e.target.value })}
                            className={`py-6 text-lg font-mono ${errors.expDate ? "border-red-500" : ""}`}
                            onFocus={() => handleInputFocus('expiry')}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Güvenlik Kodu</Label>
                          <Input
                            placeholder="CVV"
                            type="text"
                            maxLength={3}
                            value={cardData.cvv}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                            className={`py-6 text-lg font-mono ${errors.cvv ? "border-red-500" : ""}`}
                            onFocus={() => handleInputFocus('cvv')}
                            onBlur={() => setIsCardFlipped(false)}
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-14 text-md bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg relative overflow-hidden"
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          />
                          <span>İşleminiz Gerçekleştiriliyor...</span>
                        </>
                      ) : (
                        <span className="flex items-center justify-center gap-2 ">
                          <Shield className="h-5 w-5" />
                          Güvenli Ödeme Yap - ₺{totalAmount}
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              </Card>
            </motion.div>

            {/* Security Badges */}
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

            {/* Payment Partners */}
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500 mb-4">Güvenli Ödeme Altyapısı</p>
              <div className="flex items-center justify-center space-x-8 opacity-70 hover:opacity-100 transition-opacity">
                <Image src="/iyzico_ile_ode_colored_horizontal.png" width={200} height={200} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default PaymentPage;
