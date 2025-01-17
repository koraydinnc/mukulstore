import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '@/store/slices/favoritesSlice';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import openNotification from './Toaster';
import { Badge, Button } from 'antd';

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);
  const isFavorite = favorites.some((item) => item.id === product.id);

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
    return imagePath.startsWith('http') || imagePath.startsWith('/')
      ? imagePath
      : `/uploads/${imagePath}`;
  };

  

  return (
    <Card className="h-full cursor-pointer p-2 sm:p-4 flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardHeader onClick={() => handleBuyNow(product.id)} className="p-0">
        <div className="relative w-full pt-[133%]">
          <Image
            src={getImagePath(product.images[0])}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            priority={false}
            loading="lazy"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-4 flex-1 space-y-2">
        <CardTitle className="text-base sm:text-lg font-bold truncate">{product.title}</CardTitle>
        <p className="text-gray-600 line-clamp-2 text-xs sm:text-sm">{product.description}</p>
        <div className="space-y-1">
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
        <div className="mt-2 flex">{renderStockStatus(product.sizes.reduce((total, size) => total + size.stock, 0))}</div>
        <div className="mt-2 w-full">
  <p className="text-sm text-gray-600 mb-2">Bedenler:</p>
  <div className="flex flex-wrap gap-2">
    {product.sizes.map((size) => {
      const isSelected = selectedSize === size.size;
      const isOutOfStock = size.stock === 0;

      return (
        <Button
          key={size.size}
          type={isSelected ? "primary" : "default"}
          disabled={isOutOfStock}
          onClick={(e) => {
            e.stopPropagation();
            handleSizeSelect(size.size);
          }}
          className={`
            min-w-[45px] h-9 px-2 py-1 rounded-lg
            ${isSelected 
              ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' 
              : 'bg-white'}
            ${isOutOfStock 
              ? 'opacity-40 cursor-not-allowed' 
              : 'hover:border-blue-400 hover:text-blue-600'}
            relative group transition-all duration-200
          `}
        >
          <span className="text-sm font-medium">{size.size}</span>
          {/* Stok Göstergesi */}
          {size.stock > 0 && size.stock <= 3 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white px-1 rounded-full">
              {size.stock}
            </span>
          )}
          {/* Hover Tooltip */}
          {isOutOfStock && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 
              bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 
              group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Stokta Yok
            </span>
          )}
        </Button>
      );
    })}
  </div>
</div>

      </CardContent>
      <CardFooter className="p-0 pt-4 mt-auto space-y-2">
        <div className="flex gap-2 w-full">
          <Button
            type="primary"
            size="default"
            icon={<ShoppingCart className="w-5 h-5" />}
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            <span className="hidden sm:inline">Sepete Ekle</span>
          </Button>
          <Button
            size="default"
            variant="outline"
            className={`aspect-square p-2 h-12 ${isFavorite ? 'text-red-500' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
