"use client"
import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Loader2, ServerCrash, ArrowRight, TrendingUp } from 'lucide-react';
import { useLazyGetProductsListQuery } from '@/store/services/user/productUserApi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
    }, [value, delay]);
  return debouncedValue;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 350);
  const router = useRouter();
  const containerRef = useRef(null);

  const [triggerSearch, { data, isLoading, isFetching, isError }] = useLazyGetProductsListQuery();
  
  useEffect(() => {
    if (debouncedQuery.trim().length > 1) {
      triggerSearch({ 
        search: debouncedQuery, 
        pageSize: 6,
        page: 1 
      });
    }
  }, [debouncedQuery, triggerSearch]);

  const closeDropdown = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleProductSelect = (productId) => {
    router.push(`/Urunler/${productId}`);
    setQuery('');
    closeDropdown();
  };
  
  const handleViewAll = () => {
    // Arama sayfasına yönlendir
    router.push(`/arama?q=${encodeURIComponent(debouncedQuery)}`);
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDropdown]);

  const products = data?.data || [];
  const totalResults = data?.pagination?.totalCount || 0;
  const showDropdown = isFocused && query.length > 1;

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Ürün, marka veya kategori ara..."
          className="w-full pl-10 pr-24 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm 
                   placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                   focus:border-blue-500 focus:bg-white transition-all duration-200 
                   hover:bg-gray-100 hover:border-gray-300"
        />
        {(isLoading || isFetching) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
          </div>
        )}
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden"
          >
            {/* Loading State */}
            {isFetching ? (
              <div className="p-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm font-medium">Aranıyor...</span>
                </div>
              </div>
            ) : isError ? (
              /* Error State */
              <div className="p-6 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-2 bg-red-50 rounded-full">
                    <ServerCrash className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="text-sm text-red-600 font-medium">Arama sırasında bir hata oluştu</div>
                  <div className="text-xs text-gray-500">Lütfen tekrar deneyin</div>
                </div>
              </div>
            ) : products.length === 0 ? (
              /* No Results State */
              <div className="p-6 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 bg-gray-50 rounded-full">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800 mb-1">
                      Sonuç bulunamadı
                    </div>
                    <div className="text-xs text-gray-500">
                      "<span className="font-medium">{debouncedQuery}</span>" için bir ürün bulamadık
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Results */
              <div>
                {/* Search Header - Fixed positioning removed */}
                <div className="bg-gray-50 border-b border-gray-100 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700">Arama Sonuçları</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                      {totalResults} ürün
                    </span>
                  </div>
                </div>

                {/* Product List - max height with scroll */}
                <div className="max-h-80 overflow-y-auto p-2">
                  {products.map((product, index) => (
                    <motion.button
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleProductSelect(product.id)}
                      className="w-full text-left p-3 flex items-center space-x-3 rounded-xl 
                               hover:bg-gray-50 transition-all duration-200 group"
                    >
                      {/* Product Image */}
                      <div className="relative">
                        <Image
                          src={product.images[0] || '/logo.png'}
                          alt={product.title}
                          width={48}
                          height={48}
                          className="rounded-lg object-cover w-12 h-12 border border-gray-100 
                                   group-hover:border-gray-200 transition-colors"
                        />
                        {product.discountPercentage && (
                          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                                        px-1.5 py-0.5 rounded-full font-medium">
                            -{product.discountPercentage}%
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm truncate group-hover:text-blue-600 
                                      transition-colors">
                          {product.title}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm font-semibold text-green-600">
                            {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                          </span>
                          {product.category && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                              {product.category.name}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Arrow Icon */}
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 
                                           group-hover:translate-x-1 transition-all duration-200" />
                    </motion.button>
                  ))}
                </div>

                {/* View All Button - Fixed positioning removed */}
                {totalResults > 6 && !isFetching && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <button
                      onClick={handleViewAll}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 
                               rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <span>Tüm {totalResults} sonucu gör</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}