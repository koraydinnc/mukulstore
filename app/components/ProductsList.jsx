'use client';

import React, { memo, useMemo } from 'react';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductsList = memo(({ data, isLoading, pageSize = 12, pagination, setPage }) => {
  const router = useRouter();

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(pagination?.totalCount / pageSize) || 1;
    const currentPage = pagination?.currentPage || 1;
    
    // Smart pagination logic - maximum 7 buttons
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
    
    return { totalPages, currentPage, visiblePages };
  }, [pagination?.totalCount, pagination?.currentPage, pageSize]);

  const { totalPages, currentPage, visiblePages } = paginationData;

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
      <div className="flex justify-center py-10">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div id="products-list-section" className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-2">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Tüm Ürünler
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
          {data?.map((product) => (
            <div key={product.id} className="cursor-pointer">
              <ProductCard
                product={product}
                onClick={() => handleProductClick(product.id)}
              />
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="mt-16 flex flex-col items-center gap-6">
            {/* Page Info */}
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                Sayfa <span className="font-bold text-blue-600">{currentPage}</span> / <span className="font-bold">{totalPages}</span>
                <span className="text-gray-400 ml-2">
                  (Toplam {pagination?.totalCount?.toLocaleString()} ürün)
                </span>
              </p>
            </div>

            {/* Modern Pagination */}
            <nav className="flex items-center">
              <div className="flex items-center bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-2 gap-1">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Önceki</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1 mx-2">
                  {visiblePages.map((page, index) => {
                    if (page === '...') {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-3 py-2 text-gray-400 font-medium"
                        >
                          ...
                        </span>
                      );
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`min-w-[48px] h-12 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-110'
                            : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5'
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
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                  disabled={currentPage === totalPages}
                >
                  <span className="hidden sm:inline">Sonraki</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </nav>

            {/* Quick Jump */}
            {totalPages > 10 && (
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">Hızlı Git:</span>
                <div className="flex gap-2">
                  {currentPage > 5 && (
                    <button
                      onClick={() => handlePageChange(1)}
                      className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium transition-colors"
                    >
                      İlk Sayfa
                    </button>
                  )}
                  {currentPage < totalPages - 4 && (
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="px-3 py-1.5 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 font-medium transition-colors"
                    >
                      Son Sayfa
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

ProductsList.displayName = 'ProductsList';

export default ProductsList;
