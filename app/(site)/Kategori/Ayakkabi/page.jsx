'use client';

import { useState } from 'react';
import { useGetProductsListQuery } from '@/store/services/user/productUserApi';
import ProductsList from '@/app/components/ProductsList';
import { motion } from 'framer-motion';
import Loading from '../../loading';
import { Shovel } from 'lucide-react';

export default function AyakkabiPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    sizes: [],
    onlyInStock: false,
    onlyDiscounted: false
  });

  const { data, error, isLoading } = useGetProductsListQuery({
    page,
    pageSize: 20,
    category: 'ayakkabi'
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  // Filter the products based on selected filters
  const filteredProducts = data?.data?.filter(product => {
    const price = product.discountedPrice || product.price;
    const inPriceRange = price >= filters.priceRange[0] && price <= filters.priceRange[1];
    const hasSize = filters.sizes.length === 0 || product.sizes.some(s => filters.sizes.includes(s.size));
    const inStock = !filters.onlyInStock || product.sizes.some(s => s.stock > 0);
    const isDiscounted = !filters.onlyDiscounted || product.discountPercentage > 0;

    return inPriceRange && hasSize && inStock && isDiscounted;
  });

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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 mb-8"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Shovel className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Ayakkabı Koleksiyonu
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            En yeni ve trend ayakkabı modellerimizi keşfedin. 
            Konfor ve şıklığı bir arada sunan özel koleksiyonumuz sizlerle.
          </p>
        </div>
      </motion.div>

      {/* Filters */}

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <ProductsList
          data={filteredProducts || []}
          pagination={data?.pagination}
          setPage={setPage}
          pageSize={20}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}