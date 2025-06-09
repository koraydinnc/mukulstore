'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { XCircle, AlertTriangle, CreditCard, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PaymentErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get('orderId');
  const error = searchParams.get('error');

  const getErrorMessage = (errorType) => {
    const errorMessages = {
      'insufficient_funds': 'Kartınızda yeterli bakiye bulunmuyor.',
      'invalid_card': 'Kart bilgileri geçersiz.',
      'expired_card': 'Kartınızın son kullanma tarihi geçmiş.',
      'card_declined': 'Kartınız reddedildi. Bankanızla iletişime geçin.',
      'system_error': 'Sistem hatası oluştu. Lütfen tekrar deneyin.',
      'timeout': 'İşlem zaman aşımına uğradı.',
      'fraud_detected': 'Güvenlik nedeniyle işlem engellendi.',
      'invalid_cvv': 'CVV kodu hatalı.',
      'transaction_failed': 'İşlem başarısız.',
    };

    return errorMessages[errorType] || 'Bilinmeyen bir hata oluştu.';
  };

  const getErrorSolution = (errorType) => {
    const solutions = {
      'insufficient_funds': 'Lütfen farklı bir kart deneyin veya kartınıza yeterli bakiye yükleyin.',
      'invalid_card': 'Kart bilgilerinizi kontrol edip tekrar deneyin.',
      'expired_card': 'Geçerli bir kart ile tekrar deneyin.',
      'card_declined': 'Bankanızdan onay aldıktan sonra tekrar deneyin.',
      'system_error': 'Birkaç dakika sonra tekrar deneyiniz.',
      'timeout': 'İnternet bağlantınızı kontrol edip tekrar deneyin.',
      'fraud_detected': 'Bankanızla iletişime geçin.',
      'invalid_cvv': 'CVV kodunuzu doğru girip tekrar deneyin.',
      'transaction_failed': 'Bilgilerinizi kontrol edip tekrar deneyin.',
    };

    return solutions[errorType] || 'Müşteri hizmetleri ile iletişime geçin.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <XCircle className="h-20 w-20 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ödeme Başarısız
          </h1>
          <p className="text-lg text-gray-600">
            Üzgünüz, ödeme işlemi tamamlanamadı.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hata Detayları */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                <h2 className="text-xl font-semibold">Hata Detayları</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-1">Hata Nedeni:</p>
                  <p className="font-medium text-red-600">
                    {getErrorMessage(error)}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-600 mb-1">Çözüm Önerisi:</p>
                  <p className="text-gray-800">
                    {getErrorSolution(error)}
                  </p>
                </div>
                
                {orderId && (
                  <div>
                    <p className="text-gray-600 mb-1">Sipariş Referansı:</p>
                    <p className="font-medium">{orderId}</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Ödeme Seçenekleri */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Ödeme Seçenekleri</h2>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-2">Farklı Kart Deneyin</h3>
                  <p className="text-sm text-gray-600">
                    Başka bir kredi kartı veya banka kartı ile ödeme yapabilirsiniz.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium mb-2">Güvenli Ödeme</h3>
                  <p className="text-sm text-gray-600">
                    Tüm ödemeleriniz SSL sertifikası ile korunmaktadır.
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium mb-2">Müşteri Desteği</h3>
                  <p className="text-sm text-gray-600">
                    Sorun devam ederse 0850 XXX XX XX numaralı telefonu arayın.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Yaygın Sorunlar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Yaygın Sorunlar ve Çözümleri</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Kart Bilgileri</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Kart numarasını kontrol edin</li>
                  <li>• Son kullanma tarihini doğrulayın</li>
                  <li>• CVV kodunu kontrol edin</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Güvenlik</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 3D Secure şifrenizi doğru girin</li>
                  <li>• SMS kodunu kontrol edin</li>
                  <li>• Kartınızın online alışverişe açık olduğundan emin olun</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Aksiyon Butonları */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => router.push('/Sepetim/Odeme')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Tekrar Dene
          </Button>
          
          <Button
            variant="outline"
            onClick={() => router.push('/Sepetim')}
          >
            Sepete Dön
          </Button>
          
          <Button
            variant="outline"
            onClick={() => router.push('/')}
          >
            Ana Sayfaya Dön
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
