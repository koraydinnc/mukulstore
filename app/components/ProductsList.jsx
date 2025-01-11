import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Pagination, Spin, Badge } from 'antd';

const ProductsList = ({ data, isLoading, page, setPage, pageSize = 12 }) => {
  if (isLoading) return <div className="flex justify-center py-10"><Spin size="large" /></div>;

  const renderStockStatus = (stock) => {
    if (stock < 10) {
      return (
        <div className="flex flex-col items-end">
          <span className="text-sm text-gray-500">Stok: {stock}</span>
          <span className="text-xs text-red-600 font-semibold animate-pulse">
            Son {stock} adet!
          </span>
        </div>
      );
    }
    return <span className="text-sm text-gray-500">Stok: {stock}</span>;
  };

  const renderSizes = (sizes) => {
    if (!sizes || sizes.length === 0) return null;
    
    return (
      <div className="mt-2">
        <p className="text-sm text-gray-600 mb-1">Mevcut Bedenler:</p>
        <div className="flex flex-wrap gap-1">
          {sizes.map((sizeItem, index) => (
            <Badge
              key={index}
              count={sizeItem.stock}
              showZero
              overflowCount={99}
              className="cursor-pointer mr-4 my-4"
            >
              <span className={`
                inline-flex items-center justify-center px-2 py-1 text-xs 
                ${sizeItem.stock > 0 ? 'bg-gray-100 text-gray-800' : 'bg-gray-50 text-gray-400'}
                rounded border
                ${sizeItem.stock > 0 ? 'border-gray-200' : 'border-gray-100'}
              `} >
                {sizeItem.size}
              </span>
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Tüm Ürünler
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 p-12 gap-6">
          {data?.data?.map((product) => (
            <Card key={product.id} className="shadow-lg hover:shadow-2xl hover:scale-105 transition-all transform rounded-xl bg-white">
              <CardHeader className="p-0">
                <div className="relative pt-[100%]"> {/* 1:1 aspect ratio */}
                  <img
                    src={product.images?.[0] ? `/uploads/${product.images[0]}` : '/placeholder.jpg'}
                    alt={product.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-bold truncate">{product.title}</CardTitle>
                <p className="text-gray-600 line-clamp-2">{product.description}</p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-800">₺{product.discountedPrice || product.price}</span>
                    {product.discountPercentage > 0 && (
                      <span className="text-sm line-through text-gray-500">₺{product.price}</span>
                    )}
                  </div>
                  {product.discountPercentage > 0 && (
                    <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      %{product.discountPercentage} İndirim
                    </span>
                  )}
                </div>
                {renderSizes(product.sizes)}
              </CardContent>
              <CardFooter className="p-4 flex justify-between items-center border-t">
                <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all">
                  Satın Al
                </button>
                {renderStockStatus(product.sizes.reduce((total, size) => total + size.stock, 0))}
              </CardFooter>
            </Card>
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
  );
};

export default ProductsList;