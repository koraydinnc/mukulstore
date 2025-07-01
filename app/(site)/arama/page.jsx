"use client"
import { useEffect, useState, useCallback, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGetProductsListQuery } from '@/store/services/user/productUserApi';
import { useGetCategoriesQuery } from '@/store/services/admin/categoryApi';
import ProductsList from '@/app/components/ProductsList';
import ProductsFilter from '@/app/components/ProductsFilter';
import ProductSkeleton from '@/app/components/ProductSkeleton';
import { Search, ArrowLeft, Package } from 'lucide-react';
import { motion } from 'framer-motion';

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    size: [],
    priceRange: 'all',
    sort: 'newest'
  });

  const pageSize = 20;

  // Reset page when search query changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [activeFilters]);

  const { data: productsData, isLoading: productsLoading } = useGetProductsListQuery({
    page,
    pageSize,
    sort: activeFilters.sort,
    category: activeFilters.category.join(','),
    priceRange: activeFilters.priceRange,
    search: query,
  });

  const { data: categoriesData } = useGetCategoriesQuery();

  const handleFilterChange = useCallback((filters) => {
    setActiveFilters(filters);
  }, []);

  // Frontend size filtering (same logic as homepage)
  const displayProducts = useMemo(() => {
    if (!productsData?.data) return [];
    
    let filtered = [...productsData.data];
    
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
  }, []);

  const goBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={goBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <Search className="h-5 w-5 text-gray-400" />
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    Arama Sonuçları
                  </h1>
                  <p className="text-sm text-gray-500">
                    "<span className="font-medium text-gray-700">{query}</span>" için {finalTotalCount} ürün bulundu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <ProductsFilter
            onFilterChange={handleFilterChange}
            categories={categoriesData?.categories || []}
            totalResults={finalTotalCount}
          />
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {productsLoading ? (
            <ProductSkeleton count={20} />
          ) : !finalCurrentData?.length ? (
            <div className="text-center py-16">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-white rounded-full shadow-sm">
                  <Package className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Aradığınız Kriterlere Uygun Ürün Bulunamadı
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md">
                    "<span className="font-medium">{query}</span>" aramanız için seçtiğiniz filtrelere uygun bir ürün bulamadık.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <ProductsList
              pagination={paginationData}
              data={finalCurrentData}
              isLoading={productsLoading}
              page={page}
              setPage={setPage}
              pageSize={pageSize}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <ProductSkeleton count={20} />
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
} 