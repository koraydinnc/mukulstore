"use client"
import { useEffect, useState, useCallback, useRef, Suspense, useMemo } from 'react';
import { useGetPopularProductsQuery, useGetProductsListQuery } from '@/store/services/user/productUserApi';
import { useGetCategoriesQuery } from '@/store/services/admin/categoryApi';
import Loading from './loading';
import BannerCampaign from '../components/bannerCampaign';
import ProductSkeleton from '../components/ProductSkeleton';
import { PackageSearch } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Lazy load heavy components
const TrendProducts = dynamic(() => import('../components/trendProducts'), {
  loading: () => (
    <div className="container mx-auto py-8 px-4">
      <ProductSkeleton count={4} gridCols="grid-cols-2 md:grid-cols-4" />
    </div>
  ),
  ssr: false
});

const ProductsFilter = dynamic(() => import('../components/ProductsFilter'), {
  loading: () => (
    <div className="animate-pulse h-16 bg-gray-100 rounded-lg border" />
  ),
  ssr: false
});

const ProductsList = dynamic(() => import('../components/ProductsList'), {
  loading: () => (
    <ProductSkeleton count={8} />
  ),
  ssr: false
});

export default function Home({params}) {
  const [page, setPage] = useState(1);
  const [showProducts, setShowProducts] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    size: [],
    priceRange: 'all',
    sort: 'newest'
  });
  const filterRef = useRef();
  const pageSize = 4;


  const { data: trendData, isLoading: trendLoading } = useGetPopularProductsQuery({
    page: 1,
    limit: 4,
  }, {
    skip: false 
  });

  const { data: productsData, isLoading: productsLoading } = useGetProductsListQuery({
    page,
    pageSize,
    sort: activeFilters.sort,
    category: activeFilters.category.join(','),
    priceRange: activeFilters.priceRange,
  }, {
    skip: !showProducts 
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery(undefined, {
    skip: !showProducts 
  });

    useEffect(() => {
    const timer = setTimeout(() => {
      setShowProducts(true);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [activeFilters]);



  const handleFilterChange = useCallback((filters) => {
    setActiveFilters(filters);
  }, []);

  // Frontend'de sadece size filtrelemesi yapıyoruz, diğerleri API'de
  const displayProducts = useMemo(() => {
    if (!productsData?.data) return [];
    
    let filtered = [...productsData.data];
    
    // Size filtrelemesi frontend'de yapılıyor
    if (activeFilters.size.length > 0) {
      filtered = filtered.filter(product => {
        if (!product.sizes || !Array.isArray(product.sizes)) return false;
        return activeFilters.size.some(filterSize => 
          product.sizes.some(productSize => 
            productSize.size === filterSize
          )
        );
      });
    }
    
    return filtered;
  }, [productsData?.data, activeFilters.size]);

  // Size filtresi varsa frontend pagination, yoksa API pagination kullan
  const useFrontendPagination = activeFilters.size.length > 0;
  const finalTotalCount = useFrontendPagination ? displayProducts.length : (productsData?.pagination?.totalCount || 0);
  const finalTotalPages = useFrontendPagination ? Math.ceil(displayProducts.length / pageSize) : (productsData?.pagination?.totalPages || 1);
  const finalCurrentData = useFrontendPagination ? displayProducts.slice((page - 1) * pageSize, page * pageSize) : displayProducts;

  const paginationData = {
    totalCount: finalTotalCount,
    totalPages: finalTotalPages,
    currentPage: page,
    hasNext: page < finalTotalPages,
    hasPrev: page > 1
  };

  const handleClearFilters = useCallback(() => {
    setActiveFilters({
      category: [],
      size: [],
      priceRange: 'all',
      sort: 'newest'
    });
    if (filterRef.current?.clearFilters) {
      filterRef.current.clearFilters();
    }
  }, []);

 

  return (
    <main className="overflow-x-hidden bg-white min-h-screen">
      <section>
        <BannerCampaign />
      </section>
  
      <section>
        <TrendProducts data={trendData} isLoading={trendLoading} />
      </section>
  
      {showProducts && (
        <>
          <Suspense fallback={
            <div className="container mx-auto px-4 py-8">
              <div className="animate-pulse h-16 bg-gray-100 rounded-lg border" />
            </div>
          }>
            <section className="container mx-auto px-4 py-8">
              <ProductsFilter
                ref={filterRef}
                onFilterChange={handleFilterChange}
                categories={categoriesData?.categories || []}
                totalResults={finalTotalCount}
              />
            </section>
          </Suspense>
  
          <section className="container mx-auto px-4">
            {productsLoading || categoriesLoading ? (
              <ProductSkeleton count={8} />
            ) : !finalCurrentData?.length ? (
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
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Filtreleri Temizle
                </button>
              </motion.div>
            ) : (
              <Suspense fallback={<ProductSkeleton count={8} />}>
                <ProductsList
                  pagination={paginationData}
                  data={finalCurrentData}
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
