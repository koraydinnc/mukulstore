"use client"

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import openNotification from '@/app/components/Toaster';
import Breadcrumb from '@/app/components/Breadcrumb';

const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
 const pathname = usePathname()
  const handleQuantityChange = (itemId, size, quantity) => {
    dispatch(updateQuantity({ id: itemId, size, quantity: parseInt(quantity) }));
  };
  const handleRemoveItem = (itemId, size) => {
    dispatch(removeFromCart({ id: itemId, size }));
    openNotification({
      title: "Ürün Sepetten Çıkarıldı",
      variant: "destructive",
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    openNotification({
      title: "Sepet Temizlendi",
      variant: "destructive",
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
      
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-bold mb-2">Sepetiniz Boş</h1>
          <p className="text-gray-600 mb-4">
            Sepetinizde henüz ürün bulunmamaktadır.
          </p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" /> Alışverişe Başla
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb />
         </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Order Summary - Moving to top */}
          <div className="lg:col-span-1 order-1 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6 sticky top-6"
            >
              {/* Hide checkout buttons on payment page */}
              {!pathname.includes('/Odeme') && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Sipariş Özeti</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Ara Toplam</span>
                      <span className="font-medium">₺{totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kargo</span>
                      <span className="text-green-600 font-medium flex items-center">
                        <span className="line-through text-gray-400 text-sm mr-2">₺49.90</span>
                        Ücretsiz
                      </span>
                    </div>
                    <div className="pt-4 mt-4 border-t border-dashed">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Toplam</span>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-blue-600">₺{totalAmount}</span>
                          <p className="text-sm text-gray-500 mt-1">KDV Dahil</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href="/Sepetim/Bilgiler" className="block">
                      <Button 
                        className="w-full h-14 bg-blue-600 hover:bg-blue-700 transform transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-blue-500/30"
                      >
                        <CreditCard className="mr-2 h-5 w-5 text-white" />
                        <span className='text-white'>Güvenli Ödemeye Geç</span>
                      </Button>
                    </Link>
                    
                    <Link href="/" className="block">
                      <Button 
                        variant="outline" 
                        className="w-full h-12 border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-gray-800"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Alışverişe Devam Et
                      </Button>
                    </Link>
                  </div>
                </>
              )}

              {/* Güvenli Ödeme Bilgileri */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Image 
                    src={'/logo_band_colored@3x.png'}
                    alt="Mastercard Visa Amex"
                    width={200}
                    height={40}
                  />
                </div>
                <div className="text-xs text-gray-500 text-center space-y-2">
                  <p className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    256-bit SSL Güvenli Ödeme
                  </p>
                  <p>24/7 Güvenli Alışveriş</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cart Items - Moving below payment */}
          <div className="lg:col-span-2 order-2 lg:order-2">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                Sepetim ({cartItems.length} Ürün)
              </h1>
              <Button 
                variant="outline" 
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Sepeti Temizle</span>
              </Button>
            </div>
              
            <ScrollArea className="h-[600px] pr-4">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-4 bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24">
                          <Image
                            src={`${item.images[0]}` || '/images/placeholder.png'}
                            alt={item.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-500">Beden: {item.size}</p>
                          <div className="mt-2 flex items-center gap-4">
                            <Select
                              value={item.quantity.toString()}
                              onValueChange={(value) => handleQuantityChange(item.id, item.size, value)}
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className='bg-white'>
                                {[1, 2, 3, 4, 5].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id, item.size)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">₺{item.totalPrice}</p>
                          {item.discountPercentage > 0 && (
                            <p className="text-sm text-green-600">%{item.discountPercentage} İndirim</p>
                          )}
                        </div>
                      </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CartPage