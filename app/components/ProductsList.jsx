'use client';

import React, { memo, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductsList = memo(({ data, isLoading, pageSize = 12, pagination, setPage }) => {
  const router = useRouter();

  const totalPages = pagination?.totalPages || 1;
  const currentPage = pagination?.currentPage || 1;

  let visiblePages = [];
  if (totalPages <= 7) {
    visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage <= 4) {
      visiblePages = [1, 2, 3, 4, 5, '...', totalPages];
    } else if (currentPage >= totalPages - 3) {
      visiblePages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      visiblePages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      const productListElement = document.getElementById('products-list-section');
      if (productListElement) {
        productListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleProductClick = (id) => {
    router.push(`/urun/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-6 sm:py-8 lg:py-12">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8 lg:mb-10">
            Tüm Ürünler
          </h2>
          <ProductSkeleton count={8} />
        </div>
      </div>
    );
  }

  return (
    <div id="products-list-section" className="min-h-screen bg-white py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8 lg:mb-10">
          Tüm Ürünler
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 items-stretch">
          {data?.map((product) => (
            <div key={product.id} className="cursor-pointer">
              <ProductCard
                product={product}
                onClick={() => handleProductClick(product.id)}
              />
            </div>
          ))}
        </div>
        {/* Always show pagination info */}
        <div className="mt-8 sm:mt-12 lg:mt-16 flex flex-col items-center gap-4 sm:gap-6">
          {/* Page Info - Always visible */}
          <div className="text-center px-4">
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              {totalPages > 1 ? (
                <>
                  <span className="block sm:inline">
                    Sayfa <span className="font-bold text-blue-600">{currentPage}</span> / <span className="font-bold">{totalPages}</span>
                  </span>
                  <span className="block sm:inline text-gray-400 sm:ml-2 mt-1 sm:mt-0">
                    (Toplam {pagination?.totalCount?.toLocaleString()} ürün)
                  </span>
                </>
              ) : (
                <span className="text-gray-600">
                  Toplam <span className="font-bold text-blue-600">{pagination?.totalCount?.toLocaleString()}</span> ürün gösteriliyor
                </span>
              )}
            </p>
          </div>

          {/* Pagination Navigation - Only show if more than 1 page */}
          {totalPages > 1 && (
            <nav className="flex items-center w-full max-w-4xl px-2 sm:px-4">
              <div className="flex items-center bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200 sm:border-2 sm:border-gray-100 p-1 sm:p-2 gap-1 w-full justify-center overflow-x-auto">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline">Önceki</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-0.5 sm:gap-1 mx-1 sm:mx-2 flex-1 justify-center">
                  {visiblePages.map((page, index) => {
                    if (page === '...') {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-1 sm:px-3 py-1 sm:py-2 text-gray-400 font-medium text-xs sm:text-sm"
                        >
                          ...
                        </span>
                      );
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`min-w-[32px] sm:min-w-[48px] h-8 sm:h-12 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md sm:shadow-lg transform scale-105 sm:scale-110'
                            : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm sm:hover:shadow-md hover:-translate-y-0.5'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                  disabled={currentPage === totalPages}
                >
                  <span className="hidden md:inline">Sonraki</span>
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </nav>
          )}

          {/* Quick Jump - Only show if more than 10 pages */}
          {totalPages > 10 && (
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm px-4">
              <span className="text-gray-600 whitespace-nowrap">Hızlı Git:</span>
              <div className="flex gap-2">
                {currentPage > 5 && (
                  <button
                    onClick={() => handlePageChange(1)}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-100 text-blue-600 rounded-md sm:rounded-lg hover:bg-blue-200 font-medium transition-colors text-xs sm:text-sm"
                  >
                    İlk Sayfa
                  </button>
                )}
                {currentPage < totalPages - 4 && (
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-purple-100 text-purple-600 rounded-md sm:rounded-lg hover:bg-purple-200 font-medium transition-colors text-xs sm:text-sm"
                  >
                    Son Sayfa
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

ProductsList.displayName = 'ProductsList';

export default ProductsList;
