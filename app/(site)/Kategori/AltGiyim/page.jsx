'use client';

import { useState } from 'react';
import { useGetProductAltGiyimQuery } from '@/store/services/user/productUserApi';
import ProductsList from '@/app/components/ProductsList';
import { Spin } from 'antd';
import { motion } from 'framer-motion';
import Loading from '../../loading';

export default function AltGiyimPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    size: [],
    priceRange: 'all',
    sort: 'newest'
  });

  const { data, error, isLoading } = useGetProductAltGiyimQuery();
 data && console.log(data);
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Filtre değiştiğinde ilk sayfaya dön
  };

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Bir hata oluştu. Lütfen tekrar deneyin.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
   
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         

          {/* Products Grid */}
          <div className="lg:col-span-4">
            <ProductsList
              data={data?.data || []}
              pagination={data?.pagination}
              setPage={setPage}
              pageSize={20}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
