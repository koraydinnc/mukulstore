"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Check, CreditCard, Shield, Lock, CircleCheck, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SalesAgreementCheckbox from '@/app/components/SalesAgreementCheckbox';
import './globals.css'
import Breadcrumb from "@/app/components/Breadcrumb";
import { Modal } from "antd";
import { useRouter } from "next/navigation";

const MESAFELI_SOZLESME = `MUKUL STORE – Mesafeli Satış Sözleşmesi\n\nMadde 1 - Taraflar\n1.1. Satıcı:\nUnvan: MUKUL STORE\nAdres: [Satıcı Adresi]\nTelefon: [Telefon Numarası]\nE-Posta: [E-posta Adresi]\n\n1.2. Alıcı:\nAdı-Soyadı: [Alıcı Adı Soyadı]\nAdres: [Teslimat Adresi]\nTelefon: [Telefon Numarası]\nE-Posta: [E-posta Adresi]\n\nMadde 2 - Konu\nİşbu sözleşmenin konusu, Alıcı’nın Satıcı’ya ait [www.mukulstore.com] internet sitesinden elektronik ortamda sipariş verdiği, aşağıda nitelikleri ve satış fiyatı belirtilen ürün/hizmetlerin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerini düzenler.\n\nMadde 3 - Ürün Bilgileri\nÜrün(ler): [Ürün Adı, Miktarı, Renk/Model, Birim Fiyatı, Toplam Tutar]\nTeslimat Adresi: [Teslimat Adresi]\nTeslim Edilecek Kişi: [Ad-Soyad]\nFatura Adresi: [Fatura Adresi]\n\nMadde 4 - Genel Hükümler\n- Alıcı, sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini kabul ve beyan eder.\n- Ürün, yasal 30 günlük süre aşılmamak koşulu ile her bir ürün için Alıcı’nın yerleşim yeri uzaklığına bağlı olarak internet sitesinde belirtilen süre içinde Alıcı’ya veya gösterdiği adresteki kişi/kuruluşa teslim edilir.\n- Alıcı, teslim sırasında ürünü kontrol etmekle yükümlüdür. Hasarlı veya ambalajı açılmış ürün teslim alınmamalı, tutanak tutulmalıdır.\n\nMadde 5 - Cayma Hakkı\n- Alıcı, 14 gün içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahiptir.\n- Cayma hakkı süresi, ürünün Alıcı’ya teslim edildiği gün başlar.\n- Cayma hakkının kullanılması için bu süre içinde Satıcı’ya e-posta veya yazılı olarak bildirim yapılmalıdır.\n- Ürün iadesi Satıcı’nın belirttiği adrese, eksiksiz, kullanılmamış ve faturasının aslı ile yapılmalıdır.\n\nMadde 6 - Uyuşmazlık Durumu\nİşbu sözleşmeden kaynaklanabilecek uyuşmazlıklarda, Ticaret Bakanlığı tarafından her yıl belirlenen parasal sınırlar dâhilinde Alıcinin yerleşim yerindeki Tüketici Hakem Heyetleri veya Tüketici Mahkemeleri yetkilidir.\n\nMadde 7 - Yürürlük\nİşbu sözleşme, Alıcı tarafından elektronik ortamda onaylandığı tarihte yürürlüğe girer.`;

const KVKK_METNI = `MUKUL STORE – Kişisel Verilerin Korunması Hakkında Aydınlatma Metni\n\nİşbu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, veri sorumlusu sıfatıyla MUKUL STORE tarafından hazırlanmıştır.\n\n1. Veri Sorumlusu\nVeri Sorumlusu: MUKUL STORE\nAdres: [Adresiniz]\nE-posta: [E-posta]\nTelefon: [Telefon]\n\n2. Toplanan Kişisel Veriler\nWeb sitemiz üzerinden sipariş verirken veya üye olurken aşağıdaki kişisel verileriniz toplanmaktadır:\n- Kimlik Bilgisi (Ad, Soyad)\n- İletişim Bilgisi (E-posta, Telefon, Adres)\n- Müşteri İşlem Verisi (Sipariş geçmişi, fatura bilgileri)\n- Ödeme Bilgileri (Kart bilgileri üçüncü taraf ödeme sağlayıcılar üzerinden güvenli biçimde işlenmektedir)\n\n3. Kişisel Verilerin İşlenme Amaçları\nKişisel verileriniz, aşağıdaki amaçlarla işlenmektedir:\n- Siparişlerin alınması ve teslimat süreçlerinin yürütülmesi\n- Müşteri destek hizmetlerinin sunulması\n- Mevzuattan doğan yükümlülüklerin yerine getirilmesi\n- Kampanya ve promosyon bildirimlerinin yapılması (açık rıza ile)\n\n4. Hukuki Sebep ve Aktarım\nVerileriniz, 6698 sayılı KVKK’nın 5. ve 6. maddelerinde belirtilen veri işleme şartlarına uygun olarak; açık rıza, sözleşmenin kurulması ve ifası, hukuki yükümlülüklerin yerine getirilmesi gibi sebeplerle işlenmektedir.\nVerileriniz, hizmet aldığımız kargo firmaları, ödeme altyapısı sağlayıcıları ve e-posta servis sağlayıcılarla paylaşılabilir.\n\n5. Haklarınız\nKVKK’nın 11. maddesi uyarınca:\n- Kişisel verilerinizin işlenip işlenmediğini öğrenme,\n- İşlenmişse buna ilişkin bilgi talep etme,\n- Düzeltme veya silinmesini isteme,\n- İtiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz.\nBu hakları kullanmak için bizimle [e-posta adresiniz] üzerinden iletişime geçebilirsiniz.`;

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
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
  const [agreementAccepted, setAgreementAccepted] = useState(false);
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!sozlesmeAccepted || !kvkkAccepted) {
      alert('Lütfen Mesafeli Satış Sözleşmesi ve KVKK metnini kabul ediniz.');
      return;
    }

    setIsLoading(true);
    const newErrors = {};
    if (!cardData.cardNumber) newErrors.cardNumber = "Kart numarası gereklidir.";
    if (!cardData.cardHolder) newErrors.cardHolder = "Kart sahibinin adı gereklidir.";
    if (!cardData.expDate) newErrors.expDate = "Son kullanma tarihi gereklidir.";
    if (!cardData.cvv) newErrors.cvv = "CVV gereklidir.";
    setErrors(newErrors);    if (Object.keys(newErrors).length === 0) {
      try {
        // Kart tarihini parse et
        const [month, year] = cardData.expDate.split('/');
          // VakıfBank ödeme API'sine istek gönder
        const paymentData = {
          cardNumber: cardData.cardNumber.replace(/\s/g, ''),
          cardHolderName: cardData.cardHolder,
          expiryMonth: month?.padStart(2, '0'),
          expiryYear: year?.length === 2 ? '20' + year : year,
          cvv: cardData.cvv,
          amount: totalAmount,
          orderId: `ORDER_${Date.now()}`,
          customerInfo: {
            email: '', // Kullanıcı email'i eklenebilir
            phone: '', // Kullanıcı telefonu eklenebilir
          },
          installmentCount: 0, // Taksit sayısı
          use3DSecure: true, // 3D Secure kullan
          // Sepet bilgilerini ekle
          cartItems: cartItems,
          shippingAddress: addressInfo,
        };

        const response = await fetch('/api/user/payment/vakifbank-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });

        const result = await response.json();        if (result.success) {
          if (result.requires3D) {
            // 3D Secure yönlendirmesi için form oluştur ve submit et
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = result.redirectUrl;
            document.body.appendChild(tempDiv);
            
            // Form'u otomatik submit et
            const form = tempDiv.querySelector('form');
            if (form) {
              form.submit();
            } else {
              // Fallback: yeni pencerede aç
              const paymentWindow = window.open('', 'vakifbank_3ds', 'width=600,height=700,scrollbars=yes,resizable=yes');
              paymentWindow.document.write(result.redirectUrl);
              paymentWindow.document.close();
            }
          } else {
            // Direkt ödeme başarılı (test mode veya direkt ödeme)
            console.log('Payment successful:', result);
            alert('Ödeme başarıyla tamamlandı!');
            router.push(`/payment/success?orderId=${result.orderId || result.transactionId}&transactionId=${result.transactionId}`);
          }
        }else {
          throw new Error(result.message || 'Ödeme başarısız');
        }
      } catch (error) {
        console.error('Ödeme hatası:', error);
        router.push(`/payment/error?error=${encodeURIComponent(error.message)}`);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const handleInputFocus = (inputName) => {
    setIsCardFlipped(inputName === 'cvv');
  };

  const isCardDataValid = () => {
    // Card number validation (16 digits, removing spaces)
    const cardNumberValid = cardData.cardNumber.replace(/\s/g, '').length === 16;
    
    // Card holder validation (not empty)
    const cardHolderValid = cardData.cardHolder.trim().length > 0;
    
    // More flexible expiry date validation
    const expDateValid = /^\d{1,2}\/\d{2}$/.test(cardData.expDate);
    
    // CVV validation (3 digits)
    const cvvValid = /^\d{3}$/.test(cardData.cvv);
    
    return cardNumberValid && cardHolderValid && expDateValid && cvvValid;
  };

  // Expiry date input için event handler ekleyin:
  const handleExpDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // 2 karakterden fazlaysa ve / işareti yoksa ekle
    if (value.length >= 2 && !value.includes('/')) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    
    // Maksimum uzunluk 5 karakter (MM/YY)
    if (value.length <= 5) {
      setCardData({ ...cardData, expDate: value });
    }
  };

  // CVV input için event handler:
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCardData({ ...cardData, cvv: value });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  

        {/* Progress Steps */}
        <Breadcrumb/>

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
                          src={`${item.images[0]}`}
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
                            onChange={handleExpDateChange}
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
                            onChange={handleCvvChange}
                            className={`py-6 text-lg font-mono ${errors.cvv ? "border-red-500" : ""}`}
                            onFocus={() => handleInputFocus('cvv')}
                            onBlur={() => setIsCardFlipped(false)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="sozlesme"
                          checked={sozlesmeAccepted}
                          onChange={e => setSozlesmeAccepted(e.target.checked)}
                          className="accent-blue-600 w-5 h-5"
                        />
                        <label htmlFor="sozlesme" className="text-sm text-gray-700">
                          <button type="button" className="underline text-blue-600 hover:text-blue-800" onClick={() => setSozlesmeVisible(true)}>
                            Mesafeli Satış Sözleşmesi
                          </button>
                          'ni okudum ve kabul ediyorum.'
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="kvkk"
                          checked={kvkkAccepted}
                          onChange={e => setKvkkAccepted(e.target.checked)}
                          className="accent-blue-600 w-5 h-5"
                        />
                        <label htmlFor="kvkk" className="text-sm text-gray-700">
                          <button type="button" className="underline text-blue-600 hover:text-blue-800" onClick={() => setKvkkVisible(true)}>
                            KVKK Aydınlatma Metni
                          </button>
                          'ni okudum ve kabul ediyorum.'
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading || !isCardDataValid() || !sozlesmeAccepted || !kvkkAccepted}
                      className={`w-full h-14 text-md ${
                        (!isCardDataValid() || !sozlesmeAccepted || !kvkkAccepted) 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                      } text-white rounded-lg relative overflow-hidden`}
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
      <Modal
        open={sozlesmeVisible}
        onCancel={() => setSozlesmeVisible(false)}
        footer={null}
        title="Mesafeli Satış Sözleşmesi"
        width={700}
        centered
      >
        <pre className="whitespace-pre-wrap text-sm max-h-[60vh] overflow-y-auto font-sans">{MESAFELI_SOZLESME}</pre>
      </Modal>
      <Modal
        open={kvkkVisible}
        onCancel={() => setKvkkVisible(false)}
        footer={null}
        title="KVKK Aydınlatma Metni"
        width={700}
        centered
      >
        <pre className="whitespace-pre-wrap text-sm max-h-[60vh] overflow-y-auto font-sans">{KVKK_METNI}</pre>
      </Modal>
    </div>
  );
};



export default PaymentPage;
