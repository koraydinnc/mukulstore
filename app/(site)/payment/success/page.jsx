'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, CreditCard, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('orderId');
  const transactionId = searchParams.get('transactionId');

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      // Sipariş detaylarını getir
      const response = await fetch(`/api/admin/orders-5534/${orderId}`);
      const data = await response.json();
      
      if (data.success) {
        setOrderDetails(data.order);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ödemeniz Başarılı!
          </h1>
          <p className="text-lg text-gray-600">
            Siparişiniz başarıyla oluşturuldu ve ödemeniz alındı.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sipariş Bilgileri */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Package className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Sipariş Detayları</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sipariş No:</span>
                  <span className="font-medium">{orderId}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">İşlem No:</span>
                  <span className="font-medium">{transactionId}</span>
                </div>
                
                {orderDetails && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Toplam Tutar:</span>
                      <span className="font-medium text-green-600">
                        ₺{orderDetails.totalAmount}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ödeme Tarihi:</span>
                      <span className="font-medium">
                        {new Date(orderDetails.paymentDetails?.paymentDate).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Ödeme Bilgileri */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Ödeme Bilgileri</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ödeme Yöntemi:</span>
                  <span className="font-medium">Kredi Kartı</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Banka:</span>
                  <span className="font-medium">VakıfBank</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Durum:</span>
                  <span className="font-medium text-green-600">Onaylandı</span>
                </div>
                
                {orderDetails?.paymentDetails?.authCode && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Onay Kodu:</span>
                    <span className="font-medium">{orderDetails.paymentDetails.authCode}</span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sonraki Adımlar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Sonraki Adımlar</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium">Sipariş Hazırlanıyor</p>
                  <p className="text-sm text-gray-600">
                    Siparişiniz hazırlanma aşamasında. E-posta ile bilgilendirileceksiniz.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium text-gray-600">Kargo Teslimi</p>
                  <p className="text-sm text-gray-600">
                    Siparişiniz 1-3 iş günü içinde kargoya teslim edilecek.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium text-gray-600">Teslimat</p>
                  <p className="text-sm text-gray-600">
                    Siparişiniz adresinize teslim edilecek.
                  </p>
                </div>
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
            onClick={() => router.push('/orders')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Siparişlerimi Görüntüle
          </Button>
          
          <Button
            variant="outline"
            onClick={() => router.push('/')}
          >
            Alışverişe Devam Et
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
