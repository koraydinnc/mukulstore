'use client';

import { useState } from 'react';
import { useGetProductSaleQuery } from '@/store/services/user/productUserApi';
import ProductsList from '@/app/components/ProductsList';
import { Spin } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../../loading';
import { Tag, Percent, TrendingDown, ArrowDownRight } from 'lucide-react';

export default function IndirimlerPage() {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data, error, isLoading } = useGetProductSaleQuery({
    page,
    pageSize
  });

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <p className="text-red-500">Bir hata oluştu. Lütfen tekrar deneyin.</p>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gray-50"
      >
        {/* Hero Section */}
        <motion.div 
          className="relative bg-gradient-to-r from-red-600 via-red-500 to-red-600 py-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="absolute inset-0 bg-black opacity-10"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
          <div className="container mx-auto px-4 relative">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white text-center mb-6"
              variants={itemVariants}
            >
              Büyük İndirim Fırsatları
            </motion.h1>
            <motion.p 
              className="text-red-100 text-center max-w-2xl mx-auto mb-8"
              variants={itemVariants}
            >
              En yüksek indirim oranına sahip ürünlerimizi keşfedin.
              Sınırlı süre için kaçırılmayacak fırsatlar!
            </motion.p>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
              variants={containerVariants}
            >
              {[
                { icon: <Tag className="w-6 h-6" />, text: "İndirimli Ürünler", value: data?.data.length || 0 },
                { icon: <Percent className="w-6 h-6" />, text: "İndirim Oranına Kadar", value: "40%" },
                { icon: <TrendingDown className="w-6 h-6" />, text: "Özel Fırsatlar", value: "Her Gün" },
                { icon: <ArrowDownRight className="w-6 h-6" />, text: "En Düşük Fiyatlar", value: "Garantili" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
                >
                  <motion.div 
                    className="text-white/90 flex justify-center mb-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.text}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="container mx-auto px-4 py-8"
          variants={itemVariants}
        >
          <ProductsList
            data={data?.data || []}
            pagination={data?.pagination}
            setPage={setPage}
            pageSize={pageSize}
            isLoading={isLoading}
          />
        </motion.div>

       
      </motion.div>
    </AnimatePresence>
  );
}
