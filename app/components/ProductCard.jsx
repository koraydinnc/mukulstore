import React, { useState, memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { addToCart } from "@/store/slices/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/store/slices/favoritesSlice";
import { Card } from "@/components/ui/card";
import { Heart, ShoppingCart, Loader2, Eye, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import openNotification from "./Toaster";
import { Badge, Button, Select, Skeleton, Tooltip } from "antd";

const ProductCard = memo(({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);
  
  // Memoize expensive calculations
  const isFavorite = useMemo(() => 
    favorites.some((item) => item.id === product.id), 
    [favorites, product.id]
  );

  const stockInfo = useMemo(() => {
    const totalStock = product.stock || 0;
    if (totalStock === 0)
      return { status: "out", text: "Stokta Yok", color: "text-red-500" };
    if (totalStock <= 3)
      return {
        status: "low",
        text: `Son ${totalStock} adet!`,
        color: "text-orange-500",
      };
    if (totalStock <= 10)
      return {
        status: "medium",
        text: `${totalStock} adet`,
        color: "text-yellow-600",
      };
    return { status: "good", text: "Stokta", color: "text-green-600" };
  }, [product.stock]);

  const imagePath = useMemo(() => {
    const path = product.images?.[0];
    if (!path) return "/placeholder.jpg";
    if (path.includes("firebasestorage.googleapis.com")) return path;
    return path.startsWith("/") ? path : `/uploads/${path}`;
  }, [product.images]);

  const handleAddToCart = (e) => {
    e?.stopPropagation();
    if (!selectedSize) {
      return openNotification({
        variant: "destructive",
        title: "Beden Seçimi Gerekli",
        description: "Lütfen bir beden seçiniz.",
      });
    }

    const isInCart = cartItems.some(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (isInCart) {
      return openNotification({
        variant: "default",
        title: "Ürün Zaten Sepetinizde",
        description: "Bu ürün seçili beden ile zaten sepetinizde bulunuyor.",
      });
    }

    dispatch(addToCart({ product, selectedSize }));
    openNotification({
      variant: "success",
      title: "Sepete Eklendi",
      description: `${product.title} sepete eklendi.`,
    });
  };

  const handleBuyNow = (e) => {
    e?.stopPropagation();
    handleAddToCart(e);
    router.push("/Sepetim");
  };

  const toggleFavorite = (e) => {
    e?.stopPropagation();
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

  const handleSizeSelect = (size) => {
    setSelectedSize(size === selectedSize ? null : size);
  };

  const handleQuickView = (e) => {
    e?.stopPropagation();
    router.push(`/Urunler/${product.id}`);
  };

  const getImagePath = (imagePath) => {
    if (!imagePath) return "/placeholder.jpg";
    if (imagePath.includes("firebasestorage.googleapis.com")) {
      return imagePath;
    }
    return imagePath.startsWith("/") ? imagePath : `/uploads/${imagePath}`;
  };



  const cardVariants = {
    initial: {
      y: 0,
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const overlayVariants = {
    initial: { opacity: 0, y: 10 },
    hover: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full w-full group p-2"
    >
      <Card className="relative h-full overflow-hidden rounded-2xl bg-white border-0 transition-all duration-300 cursor-pointer flex flex-col">
        {/* Discount Badge */}
        <AnimatePresence>
          {product.discountPercentage > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: -12 }}
              className="absolute top-3 left-3 z-20"
            >
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full ">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold">
                    -%{product.discountPercentage}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stock Badge */}
        {stockInfo.status !== "good" && (
          <div className="absolute top-3 right-14 z-20">
            <Badge
              count={stockInfo.text}
              style={{
                backgroundColor:
                  stockInfo.status === "out" ? "#ef4444" : "#f59e0b",
                fontSize: "10px",
                height: "20px",
                borderRadius: "10px",
              }}
            />
          </div>
        )}

        {/* Product Image Container */}
        <div
          className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 flex-shrink-0"
          onClick={() => router.push(`/Urunler/${product.id}`)}
        >
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                <span className="text-xs text-gray-400">Yükleniyor...</span>
              </div>
            </div>
          )}

          <motion.div variants={imageVariants} className="h-full w-full">
            <Image
              src={imagePath}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className={`object-cover transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              priority={false}
              quality={75}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </motion.div>

          <motion.div
            variants={overlayVariants}
            className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"
          >
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <Tooltip title="Hızlı Görüntüle">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<Eye className="w-4 h-4" />}
                  onClick={handleQuickView}
                  className="bg-white text-gray-800 border-0 hover:bg-gray-100 "
                />
              </Tooltip>

              <Button
                type="primary"
                onClick={handleAddToCart}
                disabled={!selectedSize || stockInfo.status === "out"}
                className="flex-1 bg-blue-600 hover:bg-blue-700 border-0 rounded-full  font-medium"
                icon={<ShoppingCart className="w-4 h-4" />}
              >
                {selectedSize ? "Sepete Ekle" : "Beden Seç"}
              </Button>
            </div>
          </motion.div>

          <Tooltip
            title={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
          >
            <motion.button
              onClick={toggleFavorite}
              className={`absolute top-3 right-3 w-10 h-10 rounded-full 
                ${isFavorite ? "bg-red-50" : "bg-white/90 backdrop-blur-sm"} 
                 flex items-center justify-center 
                transform transition-all duration-300 ease-in-out z-30
                hover:scale-110 active:scale-95`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : "stroke-gray-600"
                } transition-all duration-300`}
              />
            </motion.button>
          </Tooltip>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-xl leading-tight line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Rating (if available) */}
            {product.rating && (
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.reviewCount || 0})
                </span>
              </div>
            )}

            {/* Price Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  ₺{product.discountedPrice || product.price}
                </span>
                {product.discountedPrice && (
                  <span className="text-sm line-through text-gray-400">
                    ₺{product.price}
                  </span>
                )}
              </div>
              <div className={`text-xs font-medium ${stockInfo.color}`}>
                {stockInfo.text}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white">Beden:</label>
              <Select
                placeholder="Beden seçiniz"
                value={selectedSize}
                onChange={handleSizeSelect}
                onClick={(e) => e.stopPropagation()}
                style={{ width: "100%" }}
                className="h-12"
                popupMatchSelectWidth={false}
                optionLabelProp="label"
                showSearch={false}
                virtual={false}
                getPopupContainer={(trigger) => trigger.parentNode}
              >
                {product.sizes?.map((size) => (
                  <Select.Option
                    key={size.size}
                    value={size.size}
                    disabled={size.stock === 0}
                    label={size.size}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{size.size}</span>
                      {size.stock <= 3 && size.stock > 0 && (
                        <span className="text-xs text-orange-500 ml-2">
                          (Son {size.stock})
                        </span>
                      )}
                      {size.stock === 0 && (
                        <span className="text-xs text-gray-400 ml-2">
                          (Stokta Yok)
                        </span>
                      )}
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          {/* Action Buttons - Her zaman en altta */}
          <div className="flex gap-2 pt-4 mt-auto">
            <Button
              type="primary"
              onClick={handleAddToCart}
              disabled={!selectedSize || stockInfo.status === "out"}
              className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 border-0 rounded-lg font-medium  text-sm"
              icon={<ShoppingCart className="w-4 h-4" />}
            >
              <span className="hidden sm:inline">Sepete Ekle</span>
              <span className="sm:hidden">Sepet</span>
            </Button>

            <Button
              onClick={handleBuyNow}
              disabled={!selectedSize || stockInfo.status === "out"}
              className="flex-1 h-10 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-medium text-sm"
            >
              <span className="hidden sm:inline">Hemen Al</span>
              <span className="sm:hidden">Al</span>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
