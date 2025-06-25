"use client";

import React, { useRef, memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { HeartIcon, TrendingUp, Star, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSelector } from "react-redux";
import { Spin, Badge } from "antd";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const TrendProducts = ({ data, refetch, isLoading }) => {
    const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
    const favorites = useSelector((state) => state.favorites.items);
 
    const router = useRouter();

    // Debug için console.log ekleyelim
    console.log('TrendProducts - isLoading:', isLoading);
    console.log('TrendProducts - data:', data);
    console.log('TrendProducts - data?.data:', data?.data);
    console.log('TrendProducts - data?.data?.length:', data?.data?.length);    

    if (isLoading || !data) {
        return (
            <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative py-16 lg:py-24 overflow-hidden"
            >
                {/* Background with gradient and pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
                    <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full blur-xl opacity-60"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full blur-xl opacity-60"></div>
                
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Skeleton */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <TrendingUp className="w-4 h-4" />
                            <span>Trend Ürünler</span>
                        </div>
                        
                        <h2 className="text-3xl p-2 md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                            Popüler Ürünler
                        </h2>
                        
                        <div className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed space-y-2">
                            <div className="animate-pulse bg-gray-200 h-4 rounded-full w-3/4 mx-auto"></div>
                            <div className="animate-pulse bg-gray-200 h-4 rounded-full w-1/2 mx-auto"></div>
                        </div>
                    </div>

                    {/* Modern Products Skeleton Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: index * 0.15,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100"
                            >
                                {/* Floating Discount Badge Skeleton */}
                                <div className="absolute top-4 left-4 z-20">
                                    <div className="bg-gradient-to-r from-red-400 to-red-500 w-16 h-8 rounded-full animate-pulse opacity-60"></div>
                                </div>

                                {/* Floating Heart Button Skeleton */}
                                <div className="absolute top-4 right-4 z-20">
                                    <div className="w-10 h-10 bg-white/80 rounded-full animate-pulse"></div>
                                </div>

                                {/* Enhanced Image Skeleton */}
                                <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
                                    {/* Animated gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                                    
                                    {/* Geometric patterns for visual interest */}
                                    <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                                    <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-white/15 rounded-full animate-pulse delay-300"></div>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-700"></div>

                                    {/* Hover overlay effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent group-hover:from-black/10 transition-all duration-500"></div>

                                    {/* Quick action buttons area */}
                                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-60">
                                        <div className="w-10 h-10 bg-white/90 rounded-full animate-pulse"></div>
                                        <div className="flex-1 h-10 bg-blue-500/80 rounded-full animate-pulse delay-200"></div>
                                    </div>
                                </div>
                                
                                {/* Enhanced Content Skeleton */}
                                <div className="p-6 space-y-4">
                                    {/* Product Title with better spacing */}
                                    <div className="space-y-3">
                                        <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-6 rounded-xl w-5/6 animate-pulse"></div>
                                        <div className="bg-gradient-to-r from-gray-200 via-gray-250 to-gray-200 h-5 rounded-lg w-4/6 animate-pulse delay-100"></div>
                                    </div>
                                    
                                    {/* Description with subtle animation */}
                                    <div className="space-y-2">
                                        <div className="bg-gray-200 h-3.5 rounded-lg w-full animate-pulse delay-200"></div>
                                        <div className="bg-gray-200 h-3.5 rounded-lg w-3/4 animate-pulse delay-300"></div>
                                        <div className="bg-gray-200 h-3.5 rounded-lg w-1/2 animate-pulse delay-400"></div>
                                    </div>
                                    
                                    {/* Rating stars skeleton */}
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-4 h-4 bg-yellow-200 rounded-sm animate-pulse" style={{animationDelay: `${i * 50}ms`}}></div>
                                        ))}
                                        <div className="ml-2 bg-gray-200 h-4 w-12 rounded animate-pulse delay-500"></div>
                                    </div>
                                    
                                    {/* Price section with better styling */}
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="space-y-1">
                                            <div className="bg-gradient-to-r from-blue-200 to-purple-200 h-7 rounded-xl w-24 animate-pulse"></div>
                                            <div className="bg-gray-200 h-4 rounded-lg w-16 animate-pulse delay-200"></div>
                                        </div>
                                        <div className="bg-green-200 h-5 w-20 rounded-full animate-pulse delay-300"></div>
                                    </div>
                                    
                                    {/* Size selector with modern styling */}
                                    <div className="space-y-2">
                                        <div className="bg-gray-200 h-4 w-16 rounded animate-pulse"></div>
                                        <div className="bg-gray-100 h-12 rounded-xl w-full animate-pulse delay-100 border-2 border-gray-200"></div>
                                    </div>
                                    
                                    {/* Action buttons with gradient */}
                                    <div className="flex gap-3 pt-2">
                                        <div className="bg-gradient-to-r from-blue-200 to-blue-300 h-12 rounded-xl flex-1 animate-pulse"></div>
                                        <div className="bg-gradient-to-r from-purple-200 to-purple-300 h-12 rounded-xl flex-1 animate-pulse delay-200"></div>
                                    </div>
                                </div>

                                {/* Subtle border animation */}
                                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 animate-pulse"></div>
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* Enhanced Loading Text with Modern Animation */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="text-center mt-12"
                    >
                        <div className="inline-flex items-center gap-4 bg-white/70 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg border border-white/20">
                            {/* Modern loading spinner */}
                            <div className="relative">
                                <div className="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
                                <div className="absolute top-1 left-1 w-6 h-6 border-3 border-transparent rounded-full animate-spin border-t-purple-500" style={{animationDirection: 'reverse', animationDuration: '0.8s'}}></div>
                            </div>
                            
                            {/* Animated dots */}
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
                                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                            </div>
                            
                            {/* Loading text with typing effect */}
                            <div className="text-gray-700 font-semibold text-lg">
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Popüler ürünler yükleniyor
                                </span>
                                <span className="inline-flex">
                                    <span className="animate-pulse delay-0">.</span>
                                    <span className="animate-pulse delay-300">.</span>
                                    <span className="animate-pulse delay-600">.</span>
                                </span>
                            </div>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="mt-6 max-w-xs mx-auto">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        
                        {/* Subtitle */}
                        <p className="mt-4 text-gray-500 text-sm max-w-md mx-auto">
                            En trend ürünlerimizi sizin için hazırlıyoruz...
                        </p>
                    </motion.div>
                </div>
            </motion.section>
        );
    }

    const handleClickRoute = (id) => {
        router.push(`/Urunler/${id}`);     
    }

    const handleViewAll = () => {
        router.push('/Kategori/IndirimliUrunler');
    }

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    return (
        <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="relative py-16 lg:py-24 overflow-hidden"
        >
            {/* Background with gradient and pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full blur-xl opacity-60"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full blur-xl opacity-60"></div>
            
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div 
                    variants={itemVariants}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <TrendingUp className="w-4 h-4" />
                        <span>Trend Ürünler</span>
                    </div>
                    
                    <h2 className="text-3xl p-2 md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                        Popüler Ürünler
                    </h2>
                    
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        En çok tercih edilen ve trend olan ürünlerimizi keşfedin. 
                        <span className="font-semibold text-blue-600"> Özel indirimler</span> ve 
                        <span className="font-semibold text-purple-600"> hızlı kargo</span> avantajlarıyla.
                    </p>

                </motion.div>

                {data?.data?.length > 0 ? (
                    <motion.div variants={itemVariants}>
                        <Carousel
                            plugins={[plugin.current]}
                            className="w-full"
                            opts={{
                                align: "start",
                                loop: true,
                                skipSnaps: false,
                                dragFree: true,
                            }}
                        >
                            <CarouselContent className="-ml-2 md:-ml-4 items-stretch">
                                {data.data.map((product, index) => (
                                    <CarouselItem
                                        key={product.id}
                                        className="pl-2 md:pl-4 basis-1/2 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ 
                                                duration: 0.4, 
                                                delay: index * 0.05,
                                                ease: "easeOut"
                                            }}
                                            className="w-full h-full"
                                        >
                                            <ProductCard 
                                                product={product} 
                                                onClick={() => handleClickRoute(product.id)}
                                            />
                                        </motion.div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            
                            {/* Custom Navigation Buttons */}
                            <CarouselPrevious className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-blue-300 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                                <span className="text-lg font-bold text-gray-700">‹</span>
                            </CarouselPrevious>
                            
                            <CarouselNext className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-blue-300 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                                <span className="text-lg font-bold text-gray-700">›</span>
                            </CarouselNext>
                        </Carousel>
                        
                        {/* View All Button */}
                        <div className="text-center mt-12">
                            <Button
                                onClick={handleViewAll}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <span>Tüm Ürünleri Görüntüle</span>
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        variants={itemVariants}
                        className="text-center py-16"
                    >
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <HeartIcon className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Henüz Ürün Bulunmamaktadır
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Yakında harika ürünlerle karşınızda olacağız.
                            </p>
                            <Button 
                                onClick={refetch}
                                variant="outline"
                                className="border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                                Yenile
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
};

export default memo(TrendProducts);
