"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  CreditCard, 
  Shield, 
  Lock, 
  ChevronLeft, 
  Package,
  Truck,
  ArrowRight,
  Wallet,
  Building,
  User,
  Calendar,
  AlertCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const MESAFELI_SOZLESME = `MUKUL STORE – Mesafeli Satış Sözleşmesi

Madde 1 - Taraflar
1.1. Satıcı:
Unvan: MUKUL STORE
Adres: [Satıcı Adresi]
Telefon: [Telefon Numarası]
E-Posta: [E-posta Adresi]

1.2. Alıcı:
Adı-Soyadı: [Alıcı Adı Soyadı]
Adres: [Teslimat Adresi]
Telefon: [Telefon Numarası]
E-Posta: [E-posta Adresi]

Madde 2 - Konu
İşbu sözleşmenin konusu, Alıcı'nın Satıcı'ya ait [www.mukulstore.com] internet sitesinden elektronik ortamda sipariş verdiği, aşağıda nitelikleri ve satış fiyatı belirtilen ürün/hizmetlerin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerini düzenler.

Madde 3 - Ürün Bilgileri
Ürün(ler): [Ürün Adı, Miktarı, Renk/Model, Birim Fiyatı, Toplam Tutar]
Teslimat Adresi: [Teslimat Adresi]
Teslim Edilecek Kişi: [Ad-Soyad]
Fatura Adresi: [Fatura Adresi]

Madde 4 - Genel Hükümler
- Alıcı, sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini kabul ve beyan eder.
- Ürün, yasal 30 günlük süre aşılmamak koşulu ile her bir ürün için Alıcı'nın yerleşim yeri uzaklığına bağlı olarak internet sitesinde belirtilen süre içinde Alıcı'ya veya gösterdiği adresteki kişi/kuruluşa teslim edilir.
- Alıcı, teslim sırasında ürünü kontrol etmekle yükümlüdür. Hasarlı veya ambalajı açılmış ürün teslim alınmamalı, tutanak tutulmalıdır.

Madde 5 - Cayma Hakkı
- Alıcı, 14 gün içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahiptir.
- Cayma hakkı süresi, ürünün Alıcı'ya teslim edildiği gün başlar.
- Cayma hakkının kullanılması için bu süre içinde Satıcı'ya e-posta veya yazılı olarak bildirim yapılmalıdır.
- Ürün iadesi Satıcı'nın belirttiği adrese, eksiksiz, kullanılmamış ve faturasının aslı ile yapılmalıdır.

Madde 6 - Uyuşmazlık Durumu
İşbu sözleşmeden kaynaklanabilecek uyuşmazlıklarda, Ticaret Bakanlığı tarafından her yıl belirlenen parasal sınırlar dâhilinde Alıcının yerleşim yerindeki Tüketici Hakem Heyetleri veya Tüketici Mahkemeleri yetkilidir.

Madde 7 - Yürürlük
İşbu sözleşme, Alıcı tarafından elektronik ortamda onaylandığı tarihte yürürlüğe girer.`;

const KVKK_METNI = `MUKUL STORE – Kişisel Verilerin Korunması Hakkında Aydınlatma Metni

İşbu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, veri sorumlusu sıfatıyla MUKUL STORE tarafından hazırlanmıştır.

1. Veri Sorumlusu
Veri Sorumlusu: MUKUL STORE
Adres: [Adresiniz]
E-posta: [E-posta]
Telefon: [Telefon]

2. Toplanan Kişisel Veriler
Web sitemiz üzerinden sipariş verirken veya üye olurken aşağıdaki kişisel verileriniz toplanmaktadır:
- Kimlik Bilgisi (Ad, Soyad)
- İletişim Bilgisi (E-posta, Telefon, Adres)
- Müşteri İşlem Verisi (Sipariş geçmişi, fatura bilgileri)
- Ödeme Bilgileri (Kart bilgileri üçüncü taraf ödeme sağlayıcılar üzerinden güvenli biçimde işlenmektedir)

3. Kişisel Verilerin İşlenme Amaçları
Kişisel verileriniz, aşağıdaki amaçlarla işlenmektedir:
- Siparişlerin alınması ve teslimat süreçlerinin yürütülmesi
- Müşteri destek hizmetlerinin sunulması
- Mevzuattan doğan yükümlülüklerin yerine getirilmesi
- Kampanya ve promosyon bildirimlerinin yapılması (açık rıza ile)

4. Hukuki Sebep ve Aktarım
Verileriniz, 6698 sayılı KVKK'nın 5. ve 6. maddelerinde belirtilen veri işleme şartlarına uygun olarak; açık rıza, sözleşmenin kurulması ve ifası, hukuki yükümlülüklerin yerine getirilmesi gibi sebeplerle işlenmektedir.
Verileriniz, hizmet aldığımız kargo firmaları, ödeme altyapısı sağlayıcıları ve e-posta servis sağlayıcılarla paylaşılabilir.

5. Haklarınız
KVKK'nın 11. maddesi uyarınca:
- Kişisel verilerinizin işlenip işlenmediğini öğrenme,
- İşlenmişse buna ilişkin bilgi talep etme,
- Düzeltme veya silinmesini isteme,
- İtiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz.
Bu hakları kullanmak için bizimle [e-posta adresiniz] üzerinden iletişime geçebilirsiniz.`;

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const addressInfo = useSelector((state) => state.cart.addressInfo);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [sozlesmeVisible, setSozlesmeVisible] = useState(false);
  const [kvkkVisible, setKvkkVisible] = useState(false);
  const [sozlesmeAccepted, setSozlesmeAccepted] = useState(false);
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!sozlesmeAccepted || !kvkkAccepted) {
      alert('Lütfen Mesafeli Satış Sözleşmesi ve KVKK metnini kabul ediniz.');
      return;
    }

    setIsLoading(true);
    const newErrors = {};
    
    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = "Geçerli bir kart numarası girin (16 hane)";
    }
    if (!cardData.cardHolder?.trim()) {
      newErrors.cardHolder = "Kart sahibinin adı gereklidir";
    }
    if (!cardData.expDate || !/^\d{2}\/\d{2}$/.test(cardData.expDate)) {
      newErrors.expDate = "Son kullanma tarihi gereklidir (AA/YY)";
    }
    if (!cardData.cvv || cardData.cvv.length !== 3) {
      newErrors.cvv = "CVV gereklidir (3 hane)";
    }
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const paymentData = {
          cardNumber: cardData.cardNumber.replace(/\s/g, ''),
          cardHolderName: cardData.cardHolder,
          expiryDate: cardData.expDate,
          cvv: cardData.cvv,
          amount: totalAmount,
          currency: 'TRY',
          description: `Mukul Store Sipariş - ${cartItems.length} ürün`,
        };

        const response = await fetch('/api/user/payment/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });

        const result = await response.json();

        if (result.success) {
          console.log('Payment successful:', result);
          router.push(`/payment/success?orderId=${result.data?.transactionId}&transactionId=${result.data?.transactionId}`);
        } else {
          throw new Error(result.message || 'Ödeme başarısız');
        }
      } catch (error) {
        console.error('Ödeme hatası:', error);
        router.push(`/payment/error?error=${encodeURIComponent(error.message)}`);
      }
    }
    setIsLoading(false);
  };

  const handleInputChange = (field, value) => {
    setCardData({ ...cardData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleInputFocus = (inputName) => {
    setIsCardFlipped(inputName === 'cvv');
  };

  const handleExpDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2 && !value.includes('/')) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length <= 5) {
      handleInputChange('expDate', value);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      handleInputChange('cvv', value);
    }
  };

  const isFormValid = () => {
    return cardData.cardNumber.replace(/\s/g, '').length === 16 &&
           cardData.cardHolder.trim().length > 0 &&
           /^\d{2}\/\d{2}$/.test(cardData.expDate) &&
           cardData.cvv.length === 3 &&
           sozlesmeAccepted &&
           kvkkAccepted;
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
                  <BreadcrumbLink href="/Sepetim">Sepetim</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/Sepetim/Bilgiler">Teslimat Bilgileri</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Ödeme</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form - Main Content */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Güvenli Ödeme
                    </CardTitle>
                    <p className="text-gray-600 mt-2">
                      Siparişinizi güvenli ödeme altyapımızla tamamlayın
                    </p>
                  </div>
                  <Badge variant="outline" className="px-4 py-2 text-sm bg-green-50 text-green-700 border-green-200">
                    256-bit SSL
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Virtual Credit Card */}
                <div className="relative">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Kart Bilgileri</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"></div>
                  
                  <div className="perspective-1000 h-56 mb-8">
                    <motion.div
                      className="relative w-full h-full preserve-3d duration-700"
                      animate={{ rotateY: isCardFlipped ? 180 : 0 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Front of Card */}
                      <div className="absolute inset-0 w-full h-full backface-hidden">
                        <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl p-6 text-white shadow-2xl h-full flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div className="flex gap-2">
                              <Image src="/logo.png" width={40} height={40} alt="Logo" className="rounded-lg" />
                            </div>
                            <div className="text-right">
                              <div className="text-xs opacity-75">MUKUL STORE</div>
                              <div className="text-xs opacity-60">DEBIT CARD</div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="font-mono text-2xl tracking-wider">
                              {cardData.cardNumber || "•••• •••• •••• ••••"}
                            </div>
                            <div className="flex justify-between items-end">
                              <div>
                                <div className="text-xs opacity-75 mb-1">Kart Sahibi</div>
                                <div className="font-medium tracking-wider text-sm">
                                  {cardData.cardHolder || "AD SOYAD"}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs opacity-75 mb-1">Son Kullanma</div>
                                <div className="font-mono text-sm">{cardData.expDate || "AA/YY"}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Back of Card */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                        <div className="bg-gradient-to-br from-gray-800 via-blue-800 to-purple-800 rounded-2xl p-6 text-white shadow-2xl h-full">
                          <div className="w-full h-12 bg-black mt-6 rounded"></div>
                          <div className="w-full h-10 bg-white mt-6 rounded px-4 flex items-center justify-end">
                            <div className="font-mono text-black text-lg">{cardData.cvv || '•••'}</div>
                          </div>
                          <div className="mt-4 text-xs opacity-75">
                            CVV numarası kartınızın arkasındaki son 3 hanedir
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Kart Numarası *
                      </Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          value={cardData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                          maxLength="19"
                          className={`h-12 text-lg font-mono pl-12 transition-all duration-200 ${
                            errors.cardNumber ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'
                          }`}
                          onFocus={() => handleInputFocus('number')}
                        />
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                      {errors.cardNumber && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.cardNumber}
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardHolder" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Kart Üzerindeki İsim *
                      </Label>
                      <Input
                        id="cardHolder"
                        placeholder="AD SOYAD"
                        value={cardData.cardHolder}
                        onChange={(e) => handleInputChange('cardHolder', e.target.value.toUpperCase())}
                        className={`h-12 text-lg uppercase transition-all duration-200 ${
                          errors.cardHolder ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'
                        }`}
                        onFocus={() => handleInputFocus('name')}
                      />
                      {errors.cardHolder && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.cardHolder}
                        </motion.p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expDate" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Son Kullanma *
                        </Label>
                        <Input
                          id="expDate"
                          placeholder="AA/YY"
                          value={cardData.expDate}
                          onChange={handleExpDateChange}
                          className={`h-12 text-lg font-mono transition-all duration-200 ${
                            errors.expDate ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'
                          }`}
                          onFocus={() => handleInputFocus('expiry')}
                        />
                        {errors.expDate && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-600 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.expDate}
                          </motion.p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          CVV *
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="•••"
                          type="text"
                          maxLength={3}
                          value={cardData.cvv}
                          onChange={handleCvvChange}
                          className={`h-12 text-lg font-mono transition-all duration-200 ${
                            errors.cvv ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'
                          }`}
                          onFocus={() => handleInputFocus('cvv')}
                          onBlur={() => setIsCardFlipped(false)}
                        />
                        {errors.cvv && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-600 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.cvv}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Legal Agreements */}
                  <div className="space-y-4 pt-6 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-800">Sözleşmeler ve Onaylar</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="sozlesme"
                          checked={sozlesmeAccepted}
                          onChange={e => setSozlesmeAccepted(e.target.checked)}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                        />
                        <label htmlFor="sozlesme" className="text-sm text-gray-700 leading-relaxed">
                          <button 
                            type="button" 
                            className="underline text-blue-600 hover:text-blue-800 font-medium"
                            onClick={() => setSozlesmeVisible(true)}
                          >
                            Mesafeli Satış Sözleşmesi
                          </button>
                          'ni okudum ve kabul ediyorum.
                        </label>
                      </div>
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="kvkk"
                          checked={kvkkAccepted}
                          onChange={e => setKvkkAccepted(e.target.checked)}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                        />
                        <label htmlFor="kvkk" className="text-sm text-gray-700 leading-relaxed">
                          <button 
                            type="button" 
                            className="underline text-blue-600 hover:text-blue-800 font-medium"
                            onClick={() => setKvkkVisible(true)}
                          >
                            KVKK Aydınlatma Metni
                          </button>
                          'ni okudum ve kabul ediyorum.
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isLoading || !isFormValid()}
                      className={`w-full h-14 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 ${
                        !isFormValid() 
                          ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-xl'
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>İşleminiz Gerçekleştiriliyor...</span>
                        </div>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Shield className="h-5 w-5" />
                          Güvenli Ödeme Yap - ₺{totalAmount?.toLocaleString('tr-TR')}
                          <ArrowRight className="h-5 w-5 ml-1" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Security Badges */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 mt-6"
            >
              {[
                { icon: Lock, title: "Güvenli Ödeme", desc: "256-bit SSL" },
                { icon: Shield, title: "Güvenilir", desc: "PCI DSS Uyumlu" },
                { icon: Check, title: "Garantili", desc: "İşlem Güvencesi" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100"
                >
                  <item.icon className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-800">{item.title}</span>
                  <span className="text-xs text-gray-600">{item.desc}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Sidebar - Order Summary */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Sipariş Özeti */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm sticky top-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="w-5 h-5" />
                  Sipariş Özeti
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Ürünler */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={item.images[0].includes("firebasestorage.googleapis.com") ? item.images[0] : `/uploads/${item.images[0]}`}
                          alt={item.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{item.title}</h4>
                        <p className="text-xs text-gray-500">Beden: {item.size} • Adet: {item.quantity}</p>
                        <div className="text-sm font-medium text-gray-900">
                          ₺{((item.discountedPrice || item.price) * item.quantity).toLocaleString('tr-TR')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                {/* Fiyat Detayları */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ara Toplam ({totalQuantity} ürün):</span>
                    <span className="font-medium">₺{totalAmount?.toLocaleString('tr-TR')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kargo:</span>
                    <span className="font-medium text-green-600">Ücretsiz</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Toplam:</span>
                    <span className="text-xl font-bold text-blue-600">₺{totalAmount?.toLocaleString('tr-TR')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teslimat Bilgileri */}
            {addressInfo && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Truck className="w-5 h-5" />
                    Teslimat Adresi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">
                      {addressInfo.firstName} {addressInfo.lastName}
                    </div>
                    <div className="text-gray-600 mt-1">
                      {addressInfo.address}
                    </div>
                    <div className="text-gray-600">
                      {addressInfo.district}, {addressInfo.city}
                    </div>
                    <div className="text-gray-600 mt-2">
                      {addressInfo.phone}
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link 
                      href="/Sepetim/Bilgiler"
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Adresi Değiştir
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Security */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <Image 
                      src="/iyzico_ile_ode_colored_horizontal.png" 
                      width={150} 
                      height={60} 
                      alt="Güvenli Ödeme"
                      className="opacity-80"
                    />
                  </div>
                  <div className="text-sm text-green-700">
                    <div className="font-semibold">Güvenli Ödeme Altyapısı</div>
                    <div className="text-xs mt-1">Kart bilgileriniz güvenle şifrelenir</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={sozlesmeVisible}
        onCancel={() => setSozlesmeVisible(false)}
        footer={null}
        title="Mesafeli Satış Sözleşmesi"
        width={800}
        className="font-sans"
      >
        <div className="max-h-96 overflow-y-auto p-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
            {MESAFELI_SOZLESME}
          </pre>
        </div>
      </Modal>

      <Modal
        open={kvkkVisible}
        onCancel={() => setKvkkVisible(false)}
        footer={null}
        title="KVKK Aydınlatma Metni"
        width={800}
        className="font-sans"
      >
        <div className="max-h-96 overflow-y-auto p-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
            {KVKK_METNI}
          </pre>
        </div>
      </Modal>

      {/* Custom Styles */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </motion.div>
  );
};

export default PaymentPage;
