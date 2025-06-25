'use client';

import React from 'react';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductsList = ({ data, isLoading, pageSize = 20, pagination, setPage }) => {
  const router = useRouter();

  const totalPages = Math.ceil(pagination?.totalCount / pageSize) || 1;
  const currentPage = pagination?.currentPage || 1;

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
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 cursor-pointer gap-2 items-stretch">
          {data?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product.id)}
            />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 '
                }`}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Önceki
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      currentPage === page
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 '
                }`}
                disabled={currentPage === totalPages}
              >
                Sonraki
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
