"use client"
import { useEffect, useState, useCallback, useRef, Suspense } from 'react';
import { useGetPopularProductsQuery, useGetProductsListQuery } from '@/store/services/user/productUserApi';
import { useGetCategoriesQuery } from '@/store/services/admin/categoryApi';
import Loading from './loading';
import BannerCampaign from '../components/bannerCampaign';
import { PackageSearch } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Lazy load heavy components
const TrendProducts = dynamic(() => import('../components/trendProducts'), {
  loading: () => (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-lg" />
        ))}
      </div>
    </div>
  ),
  ssr: false
});

const ProductsFilter = dynamic(() => import('../components/ProductsFilter'), {
  loading: () => (
    <div className="animate-pulse h-16 bg-gray-200 rounded-lg" />
  ),
  ssr: false
});

const ProductsList = dynamic(() => import('../components/ProductsList'), {
  loading: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-200 h-80 rounded-lg" />
      ))}
    </div>
  ),
  ssr: false
});

export default function Home({params}) {
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const filterRef = useRef();
  const pageSize = 12; // Daha az ürün yükle

  // Priority loading - önce banner, sonra trend, son ürünler
  const { data: trendData, isLoading: trendLoading } = useGetPopularProductsQuery({
    featured: true,
    page: 1,
    limit: 4,
  }, {
    skip: false // İlk yükleme
  });

  const { data: productsData, isLoading: productsLoading } = useGetProductsListQuery({
    page,
    limit: pageSize,
  }, {
    skip: !showProducts // Lazy load products
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery(undefined, {
    skip: !showProducts // Categories'i de lazy load et
  });
  // Progressive loading - banner yüklendikten sonra ürünleri yükle
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProducts(true);
    }, 1000); // Banner'dan sonra 1 saniye bekle

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (productsData) {
      setFilteredProducts(productsData.data);
      setPagination(productsData.pagination);
    }
  }, [productsData]);



  const handleFilterChange = useCallback((filters) => {
    if (!productsData?.data) return;

    let filtered = [...productsData.data];

    if (filters.category.length > 0) {
      filtered = filtered.filter(product => {
        return filters.category.some(cat => {
          const [mainCat] = cat.split('-');
          return product.categoryId === parseInt(mainCat);
        });
      });
    }

    // Beden filtresi
    if (filters.size.length > 0) {
      filtered = filtered.filter(product => 
        filters.size.some(size => 
          product.sizes.some(s => s.size === size)
        )
      );
    }

    // Fiyat aralığı filtresi
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        const price = product.discountedPrice || product.price;
        if (filters.priceRange === '5000-plus') {
          return price >= 5000;
        }
        return price >= min && price <= max;
      });
    }

    // Sıralama
    if (filters.sort) {
      filtered.sort((a, b) => {
        const priceA = a.discountedPrice || a.price;
        const priceB = b.discountedPrice || b.price;
        
        switch (filters.sort) {
          case 'price-low':
            return priceA - priceB;
          case 'price-high':
            return priceB - priceA;
          case 'name-asc':
            return a.title.localeCompare(b.title);
          case 'name-desc':
            return b.title.localeCompare(a.title);
          case 'newest':
            return new Date(b.createdAt) - new Date(a.createdAt);
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(filtered);
  }, [productsData?.data]);

  const handleClearFilters = useCallback(() => {
    if (filterRef.current?.clearFilters) {
      filterRef.current.clearFilters();
    }
  }, []);

 
  // Ana loading'i kaldır, sadece component loading'leri kullan

  return (
    <main className="overflow-x-hidden bg-white min-h-screen">
      {/* Critical - Banner hemen yükle */}
      <section>
        <BannerCampaign />
      </section>
  
      {/* Trend Products - Banner'dan sonra */}
      <section>
        <TrendProducts data={trendData} isLoading={trendLoading} />
      </section>
  
      {/* Products Section - Progressive loading */}
      {showProducts && (
        <>
          <Suspense fallback={
            <div className="container mx-auto px-4 py-8">
              <div className="animate-pulse h-16 bg-gray-200 rounded-lg" />
            </div>
          }>
            <section className="container mx-auto px-4 py-8">
              <ProductsFilter
                ref={filterRef}
                onFilterChange={handleFilterChange}
                categories={categoriesData?.categories || []}
                totalResults={filteredProducts.length}
              />
            </section>
          </Suspense>
  
          <section className="container mx-auto px-4">
            {productsLoading || categoriesLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-200 h-80 rounded-lg" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-16"
              >
                <div className="bg-gray-50 p-6 rounded-full mb-6">
                  <PackageSearch className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Aradığınız Kriterlere Uygun Ürün Bulunamadı
                </h3>
                <p className="text-gray-500 text-center max-w-md mb-8">
                  Filtreleme kriterlerinizi değiştirerek daha fazla ürün görüntüleyebilirsiniz.
                </p>
              </motion.div>
            ) : (
              <Suspense fallback={
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-200 h-80 rounded-lg" />
                  ))}
                </div>
              }>
                <ProductsList
                  pagination={pagination}
                  data={filteredProducts}
                  isLoading={productsLoading}
                  page={page}
                  setPage={setPage}
                  pageSize={pageSize}
                />
              </Suspense>
            )}
          </section>
        </>
      )}
    </main>
  );
}
