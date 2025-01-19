'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Truck,
  RefreshCw,
  ShieldCheck,
  X
} from 'lucide-react';
import './global.css';  
import WhatsAppContact from './whatsapp';

export default function Footer() {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const footerLinks = {
    kurumsal: [
      { title: 'Hakkımızda', href: '/Hakkimizda' },
      { title: 'Sıkça Sorulan Sorular', href: '/sss' },
      { title: 'Sipariş Takibi', href: '/siparis-takibi' },
      { title: 'İade ve Değişim', href: '/iade-degisim' },
      { title: 'Kargo ve Teslimat', href: '/kargo-teslimat' }
    ],
    yasal: [
      { title: 'Kullanım Koşulları', onClick: () => openModal('terms') },
      { title: 'Gizlilik Politikası', onClick: () => openModal('privacy') },
      { title: 'Mesafeli Satış Sözleşmesi', onClick: () => openModal('sales') }
    ]
  };

  const advantages = [
    { icon: <Truck className="h-6 w-6" />, text: 'Hızlı Kargo' },
    { icon: <RefreshCw className="h-6 w-6" />, text: 'Kolay Değişim' },
    { icon: <CreditCard className="h-6 w-6" />, text: 'Güvenli Ödeme' },
    { icon: <ShieldCheck className="h-6 w-6" />, text: '%100 Müşteri Memnuniyeti' }
  ];

  const contact = {
    iletişi: '+90 541 806 61 55 ',
    email: 'mukulstore@gmail.com',
    address: 'Çay, özgür kundura, Ünye Cd. No:17, 55600 Terme/Samsun'
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const modalContents = {
    terms: {
      title: 'Teslimat ve İade Şartları',
      content: (
        <div className="space-y-6">
          <p className="font-medium">Müşterilerimizin memnuniyeti bizim için önceliklidir. Mukul Store olarak, sizlere kaliteli hizmet sunmayı taahhüt ediyoruz. Teslimat ve iade işlemleriyle ilgili şu koşullar geçerlidir:</p>
          
          <div>
            <h3 className="font-semibold mb-2">Teslimat Koşulları</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Siparişleriniz, sipariş onayının ardından 1-3 iş günü içinde kargoya teslim edilir.</li>
              <li>Teslimat süresi, bulunduğunuz bölgeye bağlı olarak değişiklik gösterebilir. Kargo firmaları tarafından belirtilen tahmini teslimat süresi genellikle 2-7 iş günü arasındadır.</li>
              <li>Siparişinizin durumu ile ilgili bilgi almak için "Hesabım" bölümünden sipariş takip sistemimizi kullanabilirsiniz.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">İade Koşulları</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>İade talebinizi, teslimat tarihinden itibaren 14 gün içinde mukulstore@gmail.com adresine bildirmeniz gerekmektedir.</li>
              <li>İade edilecek ürünlerin kullanılmamış, orijinal ambalajında ve eksiksiz olması gerekmektedir.</li>
              <li>Hijyen kuralları nedeniyle, iç giyim ve çorap gibi ürünlerin iadesi kabul edilmemektedir.</li>
              <li>İade kargo ücretleri, kullanıcıya aittir. Ancak, hasarlı veya yanlış ürün teslimi durumunda kargo ücreti Mukul Store tarafından karşılanır.</li>
              <li>İadeniz onaylandıktan sonra, ücretiniz 7 iş günü içinde orijinal ödeme yönteminize geri ödenir.</li>
            </ul>
          </div>
        </div>
      )
    },
    privacy: {
      title: 'Gizlilik Politikası',
      content: (
        <div className="space-y-6">
          <p className='font-medium'>Gizlilik Sözleşmesi

Mukul Store olarak, müşterilerimizin gizliliğine önem veriyoruz. Web sitemizi kullanırken paylaştığınız kişisel bilgilerin korunması için gerekli tüm tedbirleri almaktayız.

Kişisel Bilgilerin Toplanması

Alışveriş sırasında isim, adres, e-posta ve telefon numarası gibi kişisel bilgilerinizi topluyoruz.

Bu bilgiler, siparişlerinizin doğru şekilde teslim edilmesi ve size daha iyi hizmet sunulması amacıyla kullanılır.

Bilgilerin Paylaşılması

Kişisel bilgileriniz, yasal zorunluluklar veya hizmet sağlayıcılarla paylaşılmadıkça 3. kişilerle paylaşılmaz.

Ödeme bilgileri, güvenli şifreleme protokolleriyle korunur ve i÷erikler tarafımızdan saklanmaz.

Çerez Politikaları

Web sitemizde, kullanıcı deneyimini geliştirmek ve size özel teklifler sunmak için çerezler kullanılmaktadır.

Güvenlik

Kredi kartı bilgileriniz ve diğer kişisel bilgileriniz, güvenli sunucular aracılığıyla korunur.</p>          

        </div>
      )
    },
    sales: {
      title: 'Mesafeli Satış Sözleşmesi',
      content: (
        <div className="space-y-6">
              <p className='font-medium'>
              Mesafeli Satış Sözleşmesi

Bu sözleşme, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca düzenlenmiştir. Mukul Store ("Satıcı") ile müşteri ("Alıcı") arasında şu şartlar dahilinde bir satış söz konusu olmaktadır:

Sözleşmenin Konusu

Bu sözleşme, Alıcı'nın Mukul Store'dan elektronik ortamda sipariş verdiği ürün/hizmetlerin teslimi ve ilgili tarafların hak ve yükümlülüklerini kapsar.

Ürün/Hizmet Bilgileri

Sipariş verilen ürünler, web sitesinde belirtilen özelliklere uygun olarak Alıcı'ya teslim edilir.

Ödeme Koşulları

Alıcı, siparişin bedelini kredi kartı veya diğer ödeme yöntemleriyle öder.

Teslimat

Teslimat, Alıcı'nın bildirdiği adrese yapılır. Teslimat süresi, sipariş onayından itibaren 1-7 iş günü arasındadır.

Cayma Hakkı

Alıcı, ürünü teslim aldıktan sonraki 14 gün içinde cayma hakkını kullanabilir. Cayma hakkına ilişkin talepler, mukulstore@gmail.com adresine iletilmelidir.

Cayma hakkı, kullanılmamış ürünler için geçerlidir.

Uyuşmazlıkların Çözümü

Taraflar arasındaki uyuşmazlıklarda Türkiye Cumhuriyeti mahkemeleri yetkilidir.
              </p>
        </div>
      )
    }
  };

  return (
    <footer className="bg-white border-t">
      {/* Advantages Section */}
      <div className="border-b">
        <div className="container mx-auto py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {advantages.map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-3 p-4">
                <div className="text-blue-600">{item.icon}</div>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image 
              src="/logo.png" 
              alt="Mukul Logo" 
              width={120} 
              height={40}
              className="mb-4 bg-black rounded-2xl"
            />
            <p className="text-sm text-gray-600 leading-relaxed">
              Kaliteli ürünler, uygun fiyatlar ve müşteri memnuniyeti odaklı hizmet.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-blue-600">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pink-600">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-600">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Combined Links Section */}
          <div>
            <h3 className="font-semibold mb-4">Kurumsal</h3>
            <ul className="space-y-2">
              {footerLinks.kurumsal.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">İletişim</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-blue-600" />
                 <span>{contact.iletişi}</span>
                <WhatsAppContact />
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>{contact.email}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span>{contact.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container mx-auto py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © 2025 Mukul Store. Tüm hakları saklıdır.
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {footerLinks.yasal.map((link, index) => (
                <button
                  key={index}
                  onClick={link.onClick}
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  {link.title}
                </button>
              ))}
            </div>
            <div>
              <Image
                src="/logo_band_colored@3x.png"
                alt="Ödeme Yöntemleri"
                width={200}
                height={30}
                className="opacity-75"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-3xl max-h-[90vh] mx-auto"
              >
                <div className="bg-white rounded-lg shadow-xl flex flex-col h-full">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">
                      {modalContent && modalContents[modalContent].title}
                    </h2>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="p-6 overflow-y-auto custom-scrollbar">
                    {modalContent && modalContents[modalContent].content}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </footer>
  );
}
