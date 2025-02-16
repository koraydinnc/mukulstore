import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { addToCart } from '@/store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '@/store/slices/favoritesSlice';
import { Card } from '@/components/ui/card';
import { Heart, ShoppingCart, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import openNotification from './Toaster';
import { Badge, Button, Skeleton } from 'antd';

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);
  const isFavorite = favorites.some((item) => item.id === product.id);
  console.log(product)
  const handleAddToCart = () => {
    if (!selectedSize) {
      return openNotification({
        variant: 'destructive',
        title: 'Beden Seçimi Gerekli',
        description: 'Lütfen bir beden seçiniz.',
      });
    }

    const isInCart = cartItems.some(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (isInCart) {
      return openNotification({
        variant: 'default',
        title: 'Ürün Zaten Sepetinizde',
        description: 'Bu ürün seçili beden ile zaten sepetinizde bulunuyor.',
      });
    }

    dispatch(addToCart({ product, selectedSize }));
    openNotification({
      variant: 'success',
      title: 'Sepete Eklendi',
      description: `${product.title} sepete eklendi.`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/Sepetim');
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
      openNotification({
        variant: 'default',
        title: 'Favorilerden Çıkarıldı',
        description: `${product.title} favorilerinizden çıkarıldı.`,
      });
    } else {
      dispatch(addToFavorites(product));
      openNotification({
        variant: 'success',
        title: 'Favorilere Eklendi',
        description: `${product.title} favorilerinize eklendi.`,
      });
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size === selectedSize ? null : size);
  };

  const renderStockStatus = (stock) => (
    stock < 10 ? (
      <span className="text-xs text-red-600 font-semibold animate-pulse">
        Son {stock} adet!
      </span>
    ) : (
      <span className="text-sm text-gray-500">Stok: {stock}</span>
    )
  );

  const getImagePath = (imagePath) => {
    if (!imagePath) return '/placeholder.jpg';
    // Firebase URL'lerini doğrudan kullan
    if (imagePath.includes('firebasestorage.googleapis.com')) {
      return imagePath;
    }
    // Yerel dosyalar için
    return imagePath.startsWith('/') ? imagePath : `/uploads/${imagePath}`;
  };

  const cardVariants = {
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="h-full w-full"
    >
      <Card 
        onClick={() => router.push(`/Urunler/${product.id}`)}
        className="relative h-full overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
      >
      {product.discountPercentage > 0 && (
          <div className="absolute top-0 left-0 z-10">
            <div className="bg-red-500 text-white px-3 py-1.5 rounded-br-xl
              shadow-lg transform hover:scale-105 transition-all duration-200">
              <div className="flex items-center gap-1">
                <span className="text-base font-bold">%{product.discountPercentage}</span>
                <span className="text-xs uppercase tracking-wider">İndirim</span>
              </div>
            </div>
          </div>
        )}

        {/* Product Image Container - Updated image loading handling */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          )}
          <Image
            src={getImagePath(product.images[0])}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 768px) 33vw, 33vw"
            className={`object-cover transition-all duration-300 hover:scale-105 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            priority={false}
            quality={75}
            loading="lazy"
          />
          
          {/* Favorite Button - Boyutları ve görünürlüğü artırıldı */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
            className={`absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full 
              ${isFavorite 
                ? 'bg-red-50 hover:bg-red-100' 
                : 'bg-transparent hover:bg-transparent'} 
              backdrop-blur-sm shadow-lg hover:shadow-xl
              flex items-center justify-center transform
              transition-all duration-300 ease-in-out z-20
              group hover:scale-110 active:scale-95`}
            aria-label={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5
                ${isFavorite 
                  ? 'fill-red-500 text-red-500' 
                  : 'stroke-gray-600 group-hover:stroke-red-500'
                } 
                transition-all duration-300 ease-in-out
                group-hover:scale-110 group-active:scale-90`}
            />
            {isFavorite && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              />
            )}
          </button>

        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-sm sm:text-lg leading-tight line-clamp-2">
              {product.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Price Section - Responsive düzenleme */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-2xl font-bold text-blue-600">
              ₺{product.discountedPrice || product.price}
            </span>
            {product.discountedPrice && (
              <span className="text-xs sm:text-sm line-through text-gray-400">
                ₺{product.price}
              </span>
            )}
          </div>

          {/* Size Selection - Grid yapısı düzeltildi */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
            {product.sizes.map((size) => (
              <Button
                key={size.size}
                type={selectedSize === size.size ? "primary" : "default"}
                disabled={size.stock === 0}
                onClick={(e) => 
                {
                  e.stopPropagation();
                  handleSizeSelect(size.size);
                }
                }
                className={`relative h-8 sm:h-10 px-1 sm:px-2 text-xs sm:text-sm ${
                  size.stock === 0 ? 'opacity-50' : ''
                }`}
              >
                {size.size}
                {size.stock <= 3 && size.stock > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-[10px] sm:text-xs
                    flex items-center justify-center bg-red-500 text-white rounded-full">
                    {size.stock}
                  </span>
                )}
              </Button>
            ))}
          </div>

          {/* Action Buttons - Updated with stopPropagation */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-2">
            <Button
              type="primary"
              size="middle"
              onClick={(e) => {
                e.stopPropagation();  // Prevent navigation
                handleAddToCart();
              }}
              className="bg-blue-600 hover:bg-blue-700 min-w-12 w-full min-h-[40px] sm:h-10 sm:text-sm
                flex items-center justify-center gap-2.5"
            >
              <ShoppingCart className="w-4 h-4 sm:w-4 sm:h-5 mr-1 sm:mr-1 flex-shrink-0" />
              <span className="w-auto md:flex justify-center hidden items-center text-nowrap min-w-5">
                Sepete Ekle
              </span>
            </Button>

            <Button
              size="middle"
              onClick={(e) => {
                e.stopPropagation();  // Prevent navigation
                handleBuyNow();
              }}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 min-h-[40px] sm:h-10 
                text-[11px] leading-3 sm:text-sm px-1 sm:px-3"
            >
              <span className="whitespace-nowrap">Hemen Al</span>
            </Button>
          </div>

          {/* Stock Status - Responsive yazı boyutu */}
          {product.totalStock < 10 && (
            <div className="text-center">
              <span className="text-xs sm:text-sm text-red-600 font-medium animate-pulse">
                Son {product.totalStock} ürün!
              </span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
