'use client';

import { useState } from 'react';
import { useGetProductUstGiyimQuery } from '@/store/services/user/productUserApi';
import ProductsList from '@/app/components/ProductsList';
import { motion } from 'framer-motion';
import { Shirt, Ruler, Filter, X } from 'lucide-react';
import Loading from '../../loading';

export default function UstGiyimPage() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetProductUstGiyimQuery();

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Bir hata oluştu. Lütfen tekrar deneyin.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <motion.div 
            className="absolute inset-0"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            style={{
              backgroundImage: 'url("/pattern.svg")',
              backgroundSize: 'cover'
            }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 relative">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.4 }}
              className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
            >
              <Shirt className="w-8 h-8" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Üst Giyim Koleksiyonu
            </h1>
            <p className="text-lg text-white/90 mb-8">
              En yeni ve trend üst giyim ürünlerimizi keşfedin. 
              Şıklığınızı tamamlayacak parçalar burada.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{data?.data?.length || 0}</div>
                <div className="text-sm text-white/80">Ürün</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">%40</div>
                <div className="text-sm text-white/80">İndirim</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">7/24</div>
                <div className="text-sm text-white/80">Destek</div>
              </div>
            </div>
          </motion.div>
        </div>

   
      </motion.div>



      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <ProductsList
          data={data?.data || []}
          pagination={data?.pagination}
          setPage={setPage}
          pageSize={20}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}