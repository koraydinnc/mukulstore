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

                    {/* Ultra Modern Carousel-Style Skeleton */}
                    <div className="relative">
                        {/* Carousel Navigation Skeletons */}
                        <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full shadow-lg animate-pulse z-10"></div>
                        <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full shadow-lg animate-pulse z-10"></div>
                        
                        {/* Carousel Track Skeleton */}
                        <div className="overflow-hidden">
                            <div className="flex space-x-6 animate-pulse">
                                {[...Array(4)].map((_, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 40, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ 
                                            duration: 0.8, 
                                            delay: index * 0.2,
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                        className="flex-shrink-0 w-72 relative group"
                                    >
                                        {/* Premium Card Container */}
                                        <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100/50 hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2">
                                            
                                            {/* Animated Background Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80 animate-pulse"></div>
                                            
                                            {/* Floating Elements */}
                                            <div className="absolute top-4 left-4 z-20">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-6 h-6 bg-red-400 rounded-full animate-pulse opacity-70"></div>
                                                    <div className="bg-red-400 h-7 w-14 rounded-full animate-pulse opacity-60"></div>
                                                </div>
                                            </div>
                                            
                                            <div className="absolute top-4 right-4 z-20">
                                                <div className="w-11 h-11 bg-white/90 rounded-full shadow-lg animate-pulse"></div>
                                            </div>

                                            {/* Hero Image Area */}
                                            <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 overflow-hidden">
                                                {/* Multi-layer shimmer effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-shimmer delay-500"></div>
                                                
                                                {/* Dynamic geometric shapes */}
                                                <div className="absolute top-8 left-8 w-12 h-12 bg-white/30 rounded-2xl animate-pulse rotate-12"></div>
                                                <div className="absolute top-16 right-12 w-8 h-8 bg-blue-200/40 rounded-full animate-pulse delay-300"></div>
                                                <div className="absolute bottom-20 left-12 w-6 h-6 bg-purple-200/40 rounded-full animate-pulse delay-700"></div>
                                                <div className="absolute bottom-12 right-8 w-10 h-10 bg-white/25 rounded-xl animate-pulse delay-1000 -rotate-12"></div>
                                                
                                                {/* Product placeholder icon */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-24 h-24 bg-white/40 rounded-3xl animate-pulse flex items-center justify-center">
                                                        <div className="w-12 h-12 bg-gray-300 rounded-2xl animate-pulse delay-200"></div>
                                                    </div>
                                                </div>

                                                {/* Action overlay */}
                                                <div className="absolute bottom-6 left-6 right-6 flex space-x-3 opacity-80">
                                                    <div className="w-12 h-12 bg-white/95 rounded-full shadow-lg animate-pulse"></div>
                                                    <div className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl animate-pulse delay-300"></div>
                                                </div>
                                            </div>
                                            
                                            {/* Content Section */}
                                            <div className="p-8 space-y-5">
                                                {/* Brand & Title */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg animate-pulse"></div>
                                                        <div className="bg-gray-200 h-4 w-20 rounded-full animate-pulse delay-100"></div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 h-7 rounded-2xl w-5/6 animate-pulse"></div>
                                                        <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-6 rounded-xl w-4/6 animate-pulse delay-200"></div>
                                                    </div>
                                                </div>
                                                
                                                {/* Description Lines */}
                                                <div className="space-y-3">
                                                    <div className="bg-gray-200 h-4 rounded-lg w-full animate-pulse delay-300"></div>
                                                    <div className="bg-gray-200 h-4 rounded-lg w-4/5 animate-pulse delay-400"></div>
                                                    <div className="bg-gray-200 h-4 rounded-lg w-3/5 animate-pulse delay-500"></div>
                                                </div>
                                                
                                                {/* Reviews & Rating */}
                                                <div className="flex items-center justify-between pt-2">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="flex space-x-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <div key={i} className="w-5 h-5 bg-yellow-200 rounded-md animate-pulse" style={{animationDelay: `${i * 100}ms`}}></div>
                                                            ))}
                                                        </div>
                                                        <div className="bg-gray-200 h-5 w-16 rounded-full animate-pulse delay-600"></div>
                                                    </div>
                                                    <div className="bg-green-200 h-6 w-24 rounded-full animate-pulse delay-700"></div>
                                                </div>
                                                
                                                {/* Price Section */}
                                                <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                                                    <div className="space-y-2">
                                                        <div className="bg-gradient-to-r from-blue-300 to-purple-300 h-8 rounded-2xl w-28 animate-pulse"></div>
                                                        <div className="bg-gray-200 h-5 rounded-lg w-20 animate-pulse delay-200"></div>
                                                    </div>
                                                    <div className="text-right space-y-2">
                                                        <div className="bg-gray-200 h-4 w-16 rounded animate-pulse"></div>
                                                        <div className="bg-orange-200 h-5 w-20 rounded-full animate-pulse delay-300"></div>
                                                    </div>
                                                </div>
                                                
                                                {/* Size Selection */}
                                                <div className="space-y-3 pt-2">
                                                    <div className="flex items-center justify-between">
                                                        <div className="bg-gray-200 h-5 w-16 rounded animate-pulse"></div>
                                                        <div className="bg-gray-200 h-4 w-20 rounded animate-pulse delay-200"></div>
                                                    </div>
                                                    <div className="bg-gray-100 h-14 rounded-2xl w-full animate-pulse border-2 border-gray-200/50 shadow-inner"></div>
                                                </div>
                                                
                                                {/* Action Buttons */}
                                                <div className="flex space-x-4 pt-4">
                                                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-14 rounded-2xl flex-1 animate-pulse shadow-lg"></div>
                                                    <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-14 rounded-2xl flex-1 animate-pulse delay-300 shadow-lg"></div>
                                                </div>
                                            </div>

                                            {/* Animated border glow */}
                                            <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 animate-pulse opacity-60"></div>
                                            
                                            {/* Corner decorations */}
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-100 to-transparent rounded-3xl animate-pulse"></div>
                                            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-100 to-transparent rounded-3xl animate-pulse delay-500"></div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Carousel Indicators */}
                        <div className="flex justify-center mt-8 space-x-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className={`w-3 h-3 rounded-full animate-pulse ${i === 0 ? 'bg-blue-400' : 'bg-gray-300'}`} style={{animationDelay: `${i * 200}ms`}}></div>
                            ))}
                        </div>
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
