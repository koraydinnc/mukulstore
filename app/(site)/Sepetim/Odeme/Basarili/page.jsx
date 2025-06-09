"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Package, ShoppingBag, Truck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';

const OrderSuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNo = searchParams.get('orderNo');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNo) {
      fetchOrderDetails(orderNo);
    }
  }, [orderNo]);

  const fetchOrderDetails = async (orderNo) => {
    try {
      const response = await fetch(`/api/admin/orders-5534/${orderNo}`);
      const data = await response.json();
      
      if (response.ok) {
        setOrder(data.order);
      } else {
        console.error('Sipariş detayları alınamadı:', data.error);
      }
    } catch (error) {
      console.error('Sipariş detayları alınamadı:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center bg-green-100 w-20 h-20 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Siparişiniz Alındı!</h1>
          <p className="text-lg text-gray-600 mt-2">
            Sipariş takip numaranız: <span className="font-semibold">{orderNo}</span>
          </p>
          <p className="text-gray-500 mt-2">Sipariş durumunuzu hesabınızdan takip edebilirsiniz.</p>
        </motion.div>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Sipariş detayları yükleniyor...</p>
          </div>
        ) : (
          <Card className="p-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
                Sipariş Özeti
              </h2>
              
              <div className="space-y-6">
                {order?.orderItems?.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.title}</h4>
                      <p className="text-sm text-gray-500">Beden: {item.size}</p>
                      <div className="flex justify-between mt-1">
                        <span>₺{item.price}</span>
                        <span className="text-gray-500">x{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Ara Toplam</span>
                    <span>₺{order?.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kargo</span>
                    <span className="text-green-600">Ücretsiz</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Toplam</span>
                    <span>₺{order?.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600" />
                Teslimat Bilgileri
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{order?.shippingAddress?.fullName}</p>
                <p className="text-gray-600 mt-1">{order?.shippingAddress?.address}</p>
                <p className="text-gray-600">{order?.shippingAddress?.city}, {order?.shippingAddress?.zipCode}</p>
                <p className="text-gray-600 mt-1">{order?.shippingAddress?.phone}</p>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            
              <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Link href="/Kategoriler">
                  Alışverişe Devam Et
                </Link>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderSuccessPage;