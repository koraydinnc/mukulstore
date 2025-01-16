import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '@/store/slices/favoritesSlice';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import openNotification from './Toaster';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product, onClick }) => {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);
  const isFavorite = favorites.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      openNotification({
        variant: "destructive",
        title: "Beden Seçimi Gerekli",
        description: "Lütfen bir beden seçiniz.",
      });
      return;
    }

    const existingCartItem = cartItems.find(
      item => item.id === product.id && item.size === selectedSize
    );

    if (existingCartItem) {
      openNotification({
        variant: "default",
        title: "Ürün Zaten Sepetinizde",
        description: "Bu ürün seçili beden ile zaten sepetinizde bulunuyor.",
      });
      return;
    }

    dispatch(addToCart({ product, selectedSize }));

  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/Sepetim');
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
      openNotification({
        variant: "default",
        title: "Favorilerden Çıkarıldı",
        description: `${product.title} favorilerinizden çıkarıldı.`,
      });
    } else {
      dispatch(addToFavorites(product));
      openNotification({
        variant: "success",
        title: "Favorilere Eklendi",
        description: `${product.title} favorilerinize eklendi.`,
      });
    }
  };

  const renderStockStatus = (stock) => {
    if (stock < 10) {
      return (
        <div className="flex flex-col items-end">
          <span className="text-xs text-red-600 font-semibold animate-pulse">
            Son {stock} adet!
          </span>
        </div>
      );
    }
    return <span className="text-sm text-gray-500">Stok: {stock}</span>;
  };

  const handleSizeSelect = (size) => {
    if (selectedSize === size) {
      setSelectedSize(null);
    
    } else {
      setSelectedSize(size);
  
    }
  };

  const renderSizes = (sizes) => {
    if (!sizes || sizes.length === 0) return null;
  
    return (
      <div className="mt-2 w-full sm:overflow-auto">
        <p className="text-sm text-gray-600 mb-1">Bedenler:</p>
        <div className="flex flex-wrap gap-1 sm:flex-col max-w-full overflow-auto pb-2">
          {sizes.map((sizeItem, index) => (
            <div
              key={index}
              onClick={() => sizeItem.stock > 0 && handleSizeSelect(sizeItem.size)}
              className={`
                cursor-pointer transition-all duration-200 transform
                ${selectedSize === sizeItem.size ? 'scale-105' : ''}
                ${sizeItem.stock === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
              `}
            >
              <Badge
                count={sizeItem.stock}
                showZero
                overflowCount={99}
                className={`mr-2 mt-4 my-1 shrink-0`}
              >
                <span className={`
                  inline-flex items-center justify-center px-3 py-2 text-sm
                  ${selectedSize === sizeItem.size 
                    ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-400' 
                    : 'bg-gray-100 text-gray-800'}
                  ${sizeItem.stock > 0 ? '' : 'bg-gray-50 text-gray-400'}
                  sm:rounded-lg border whitespace-nowrap font-medium
                  transition-all duration-200
                `}>
                  {sizeItem.size}
                </span>
              </Badge>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

  const getImagePath = (imagePath) => {
    if (!imagePath) return '/placeholder.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/')) return imagePath;
    return `/uploads/${imagePath}`; // Ensure leading slash for relative paths
  };

  return (
    <Card className="h-full cursor-pointer p-2 sm:p-4 flex flex-col hover:shadow-lg transition-shadow duration-200" >
      <CardHeader onClick={() => handleBuyNow(product.id)} className="p-0">
        <div className="relative w-full pt-[133%]"> {/* 4:3 aspect ratio */}
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
        <div className='mt-2 text-start flex'> 
          {renderStockStatus(product.sizes.reduce((total, size) => total + size.stock, 0))}
        </div>
        <div className="mt-0 line-clamp-1">
          {renderSizes(product.sizes)}
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
            <Heart className={`w-5 h-12 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;