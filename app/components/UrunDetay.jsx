"use client";

import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button, Rate, Badge, Divider } from 'antd';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShoppingCart, Heart, Truck, Shield, RefreshCw, Check } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';

const UrunDetay = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();

  // Carousel setup
  const [mainCarouselRef, mainEmbla] = useEmblaCarousel({ loop: true, dragFree: true });
  const [thumbCarouselRef, thumbEmbla] = useEmblaCarousel({ containScroll: "keepSnaps", dragFree: true, slidesToScroll: 1 });

  // Sync carousels and active index
  useEffect(() => {
    if (!mainEmbla) return;

    const onSelect = () => {
      setActiveIndex(mainEmbla.selectedScrollSnap());
      setSelectedImage(mainEmbla.selectedScrollSnap());
    };

    mainEmbla.on('select', onSelect);
    return () => mainEmbla.off('select', onSelect);
  }, [mainEmbla]);

  // Carousel Controls
  const scrollPrev = useCallback(() => {
    if (mainEmbla) mainEmbla.scrollPrev();
  }, [mainEmbla]);

  const scrollNext = useCallback(() => {
    if (mainEmbla) mainEmbla.scrollNext();
  }, [mainEmbla]);

  const onThumbClick = useCallback((index) => {
    if (!mainEmbla || !thumbEmbla) return;
    mainEmbla.scrollTo(index);
  }, [mainEmbla, thumbEmbla]);

  const handleImageSelect = useCallback((index) => {
    setSelectedImage(index);
  }, []);

  const handleSizeSelect = useCallback((size) => {
    setSelectedSize(size);
  }, []);

  const getImagePath = (imagePath) => {
    if (!imagePath) return '/placeholder.jpg';
    if (imagePath.includes('firebasestorage.googleapis.com')) {
      return imagePath;
    }
    return imagePath.startsWith('/') ? imagePath : `/uploads/${imagePath}`;
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Lütfen bir beden seçin');
      return;
    }
    dispatch(addToCart({ product: data, selectedSize }));
  };

  const renderProductGallery = () => (
    <div className="lg:w-1/2 space-y-4">
      <div className="relative rounded-xl overflow-hidden bg-gray-100">
        {data?.discountPercentage > 0 && (
          <motion.div 
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className="absolute top-4 left-4 z-30"
          >
            <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">%{data.discountPercentage}</span>
                <span className="text-sm uppercase tracking-wider">İndirim</span>
              </div>
              <div className="text-xs mt-1 text-red-100">
                {data.price - data.discountedPrice}₺ Tasarruf
              </div>
            </div>
          </motion.div>
        )}

        <div className="overflow-hidden" ref={mainCarouselRef}>
          <div className="flex touch-pan-y">
            {data?.images?.map((image, index) => (
              <div key={index} className="relative flex-[0_0_100%] min-w-100">
                <div className="relative aspect-square">
                  <Image
                    src={getImagePath(image)}
                    alt={`${data?.title || 'Ürün'} - ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover bg-white min-w-full min-h-[100px]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative px-4">
        <div className="overflow-hidden" ref={thumbCarouselRef}>
          <div className="flex gap-2">
            {data?.images?.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                onClick={() => onThumbClick(index)}
                className={`relative flex-[0_0_20%] aspect-square rounded-lg overflow-hidden 
                  ${activeIndex === index ? 'ring-2 ring-blue-500' : 'opacity-70'}`}
              >
                <Image
                  src={getImagePath(image)}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="20vw"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductInfo = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="lg:w-1/2 space-y-8"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>

      <div className="space-y-2">
        <div className="flex items-baseline gap-4">
          <span className="text-3xl font-bold text-gray-900">
            {data.discountedPrice}₺
          </span>
          {data.discountPercentage > 0 && (
            <>
              <span className="text-xl text-gray-500 line-through">
                {data.price}₺
              </span>
              <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
                %{data?.discountPercentage} indirim
              </span>
            </>
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

      <div className="space-y-6">
        <div className="flex gap-4">
          <Button
            onClick={handleAddToCart}
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
          <p className="font-medium">Hızlı Kargo</p>
          <p className="text-sm text-gray-500">
            14:00'a kadar sipariş verin, aynı gün kargoda!
          </p>
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
          <p className="font-medium">Kolay İade</p>
          <p className="text-sm text-gray-500">14 gün içinde ücretsiz iade</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {renderProductGallery()}
        {renderProductInfo()}
      </div>
    </div>
  );
};

export default UrunDetay;