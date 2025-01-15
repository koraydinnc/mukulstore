import React from 'react';
import { Pagination, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import ProductCard from './ProductCard';

const ProductsList = ({ data, isLoading, page, setPage, pageSize = 12 }) => {
  const router = useRouter();

  if (isLoading) return <div className="flex justify-center py-10"><Spin size="large" /></div>;

  const handleProductClick = (id) => {
    router.push(`/urun/${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Tüm Ürünler
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 p-4 gap-6">
          {data?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product.id)}
            />
          ))}
        </div>
        {data?.totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination
              current={page}
              total={data.totalCount}
              pageSize={pageSize}
              onChange={(newPage) => setPage(newPage)}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;