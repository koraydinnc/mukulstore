"use client";

import React, { useState, useCallback } from 'react';
import { Button, Rate, Badge, Divider } from 'antd';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Truck, 
  Shield, 
  RefreshCw,
  Check,
} from 'lucide-react';

const UrunDetay = ({ data }) => {
  // Tüm state'leri en üstte tanımlayalım
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  // Event handler'ları useCallback ile saralım
  const handleImageSelect = useCallback((index) => {
    setSelectedImage(index);
  }, []);

  const handleSizeSelect = useCallback((size) => {
    setSelectedSize(size);
  }, []);

  // Render fonksiyonlarını bileşenin içinde tanımlayalım
  const renderProductImages = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="lg:w-1/2 space-y-6"
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
        <motion.img
          key={selectedImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={`/uploads/${data.images[selectedImage]}`}
          className="w-full h-full object-cover"
          alt={data.title}
        />
        {data.discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full">
            %{data.discountPercentage} İndirim
          </div>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto py-2">
        {data.images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageSelect(index)}
            className={`relative ml-2 flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ${
              selectedImage === index ? 'ring-2 ring-blue-500' : 'opacity-70'
            }`}
          >
            <img
              src={`/uploads/${image}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );

  const renderProductInfo = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="lg:w-1/2 space-y-8"
    >
      {/* Başlık */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>

      {/* Fiyat Bilgisi */}
      <div className="space-y-2">
  <div className="flex items-baseline gap-4">
    <span className="text-3xl font-bold text-gray-900">
      {data.discountedPrice}₺
    </span>
    {data.discountPercentage > 0 && (
      <span className="text-xl text-gray-500 line-through">
        {data.price}₺
      </span>
    )}
  </div>

  <div className="text-green-600 font-medium flex flex-col items-start space-y-2">
    <div className="flex items-center gap-2">
      <Check size={16} className="inline mr-1" />
      Stokta mevcut
    </div>
    <div className="flex items-center gap-2">
      <Check size={16} className="inline mr-1" />
      İthal Orijinal Ürün
    </div>
  </div>
</div>


      {/* Beden Seçimi */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Beden Seç</h3>
        <div className="flex flex-wrap gap-3">
          {data.sizes.map((size) => (
            <button
              key={size.size}
              onClick={() => handleSizeSelect(size.size)}
              disabled={size.stock === 0}
              className={`px-4 py-2 rounded-lg border-2 transition-all
                ${size.stock === 0 
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                  : selectedSize === size.size
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-500'
                }`}
            >
              {size.size}
            </button>
          ))}
        </div>
      </div>

      {/* Butonlar ve Diğer Bilgiler */}
      <div className="space-y-6">
        <div className="flex gap-4">
          <Button
            type="primary"
            size="large"
            icon={<ShoppingCart size={20} />}
            className="flex-1 h-14 text-lg bg-blue-600 hover:bg-blue-700"
          >
            Sepete Ekle
          </Button>
          <Button
            size="large"
            icon={<Heart size={20} />}
            className="h-14 w-14 flex items-center justify-center"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 border-t pt-8">
          {renderFeatures()}
        </div>

        <Divider />
        <div className="prose prose-blue">
          <h3 className="text-lg font-semibold">Ürün Açıklaması</h3>
          <p className="text-gray-600">{data.description}</p>
        </div>
      </div>
    </motion.div>
  );

  const renderFeatures = () => (
    <>
      <div className="flex items-center gap-3">
        <Truck className="text-blue-600" size={24} />
        <div>
          <p className="font-medium">Ücretsiz Kargo</p>
          <p className="text-sm text-gray-500">2-4 iş günü</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Shield className="text-blue-600" size={24} />
        <div>
          <p className="font-medium">Güvenli Alışveriş</p>
          <p className="text-sm text-gray-500">SSL güvencesi</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <RefreshCw className="text-blue-600" size={24} />
        <div>
          <p className="font-medium">Kolay Değişim</p>
          <p className="text-sm text-gray-500">7 gün içinde</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {renderProductImages()}
        {renderProductInfo()}
      </div>
    </div>
  );
};

export default UrunDetay;