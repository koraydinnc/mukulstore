"use client"

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowLeft, 
  CreditCard, 
  Plus, 
  Minus,
  Package,
  Shield,
  Truck,
  ArrowRight,
  Heart,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import openNotification from '@/app/components/Toaster';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import TrendProducts from '@/app/components/trendProducts';

const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const pathname = usePathname();

  const handleQuantityChange = (itemId, size, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id: itemId, size, quantity: parseInt(quantity) }));
    }
  };

  const handleRemoveItem = (itemId, size) => {
    dispatch(removeFromCart({ id: itemId, size }));
    openNotification({
      title: "Ürün Sepetten Çıkarıldı",
      description: "Ürün başarıyla sepetinizden kaldırıldı.",
      variant: "default",
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    openNotification({
      title: "Sepet Temizlendi",
      description: "Tüm ürünler sepetinizden kaldırıldı.",
      variant: "default",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (cartItems.length === 0) {
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
      >
        {/* Header with pattern */}
        <div className="relative bg-white border-b border-gray-100">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
          <div className="relative container mx-auto py-6 px-4">
            <motion.div variants={itemVariants}>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Ana Sayfa</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Sepetim</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>
          </div>
        </div>

        {/* Empty Cart Content */}
        <div className="container mx-auto py-16 px-4">
          <motion.div 
            variants={itemVariants}
            className="max-w-md mx-auto text-center"
          >
            <Card className="shadow-smborder-0 bg-white/80 backdrop-blur-sm p-8">
              <CardContent className="space-y-6">
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center"
                  >
                    <ShoppingBag className="w-12 h-12 text-blue-600" />
                  </motion.div>
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Sepetiniz Boş
                  </h1>
                  <p className="text-gray-600">
                    Sepetinizde henüz ürün bulunmamaktadır. Alışverişe başlayarak favori ürünlerinizi sepete ekleyebilirsiniz.
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  <Link href="/" className="block">
                    <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Alışverişe Başla
                    </Button>
                  </Link>
                  
                  <Link href="/Kategori/IndirimliUrunler" className="block">
                    <Button variant="outline" className="w-full h-10 border-gray-200 hover:bg-gray-50">
                      <Star className="mr-2 h-4 w-4" />
                      İndirimli Ürünleri İncele
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      {/* Header with pattern */}
      <div className="relative bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="relative container mx-auto py-6 px-4">
          <motion.div variants={itemVariants}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Ana Sayfa</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Sepetim</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-2 ">
            <Card className=" border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Sepetim
                    </CardTitle>
                    <p className="text-gray-600 mt-2">
                      {totalQuantity} ürün • Toplam: ₺{totalAmount?.toLocaleString('tr-TR')}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Sepeti Temizle</span>
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-200"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
                          <Image
                            src={item.images[0].includes("firebasestorage.googleapis.com") ? item.images[0] : `/uploads/${item.images[0]}`}
                            alt={item.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                          {item.discountPercentage > 0 && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              -%{item.discountPercentage}
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <Link 
                                href={`/Urunler/${item.id}`}
                                className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2"
                              >
                                {item.title}
                              </Link>
                              <div className="flex items-center gap-3 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  Beden: {item.size}
                                </Badge>
                                {item.discountPercentage > 0 && (
                                  <Badge className="bg-green-100 text-green-700 text-xs">
                                    %{item.discountPercentage} İndirim
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            {/* Remove Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id, item.size)}
                              className="text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="w-8 h-8 p-0 rounded-full"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                
                                <span className="text-lg font-medium min-w-[30px] text-center">
                                  {item.quantity}
                                </span>
                                
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                                  disabled={item.quantity >= 10}
                                  className="w-8 h-8 p-0 rounded-full"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="text-xl font-bold text-gray-900">
                                ₺{((item.discountedPrice || item.price) * item.quantity).toLocaleString('tr-TR')}
                              </div>
                              {item.discountedPrice && item.price !== item.discountedPrice && (
                                <div className="text-sm text-gray-500 line-through">
                                  ₺{(item.price * item.quantity).toLocaleString('tr-TR')}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

                     {/* Sidebar - Order Summary */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* İki kartı eşit yükseklikte grid'de yerleştir */}
            <div className="grid grid-rows-1 gap-6 h-auto">
              {/* Sipariş Özeti */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm sticky top-6 flex flex-col min-h-[600px]">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Package className="w-6 h-6" />
                    Sipariş Özeti
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Ara Toplam ({totalQuantity} ürün):</span>
                      <span className="font-medium">₺{totalAmount?.toLocaleString('tr-TR')}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Kargo:</span>
                      <div className="text-right">
                        <span className="font-medium text-green-600">Ücretsiz</span>
                        <div className="text-sm text-gray-400 line-through">₺49.90</div>
                      </div>
                    </div>
                    
                    {/* Ek bilgiler için daha fazla alan */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 text-green-700">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-medium">Ücretsiz Kargo Avantajı</span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        299₺ ve üzeri alışverişlerde kargo ücretsiz!
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 text-blue-700">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm font-medium">14 Gün İade Garantisi</span>
                      </div>
                      <p className="text-xs text-blue-600 mt-1">
                        Beğenmediğiniz ürünleri koşulsuz iade edebilirsiniz.
                      </p>
                    </div>

                    <Separator />
                    
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xl font-semibold">Toplam:</span>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-blue-600">₺{totalAmount?.toLocaleString('tr-TR')}</span>
                        <div className="text-sm text-gray-500">KDV Dahil</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4 pt-4">
                    <Link href="/Sepetim/Bilgiler" className="block">
                      <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 text-lg">
                        <CreditCard className="mr-2 h-6 w-6" />
                        Güvenli Ödemeye Geç
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    
                    <Link href="/" className="block">
                      <Button 
                        variant="outline" 
                        className="w-full h-12 border-gray-200 hover:bg-gray-50 text-base"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Alışverişe Devam Et
                      </Button>
                    </Link>

                    {/* Güvenlik bilgileri */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-center gap-4">
                        <div className="text-center">
                          <Shield className="w-6 h-6 text-green-600 mx-auto mb-1" />
                          <span className="text-xs text-gray-600">SSL Güvenlik</span>
                        </div>
                        <div className="text-center">
                          <Truck className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                          <span className="text-xs text-gray-600">Hızlı Teslimat</span>
                        </div>
                        <div className="text-center">
                          <Package className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                          <span className="text-xs text-gray-600">Güvenli Paket</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
           </motion.div>
                 </div>
       </div>

       
     </motion.div>
   );
 };
 
 export default CartPage;