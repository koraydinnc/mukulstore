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
            style={{ zIndex: 1 }}
        >
            {/* Background with gradient and pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full blur-xl opacity-60"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full blur-xl opacity-60"></div>
            
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 2 }}>
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
                    
                    {isLoading ? (
                        <div className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed space-y-2">
                            <div className="animate-pulse bg-gray-200 h-4 rounded-full w-3/4 mx-auto"></div>
                            <div className="animate-pulse bg-gray-200 h-4 rounded-full w-1/2 mx-auto"></div>
                        </div>
                    ) : (
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                            En çok tercih edilen ve trend olan ürünlerimizi keşfedin. 
                            <span className="font-semibold text-blue-600"> Özel indirimler</span> ve 
                            <span className="font-semibold text-purple-600"> hızlı kargo</span> avantajlarıyla.
                        </p>
                    )}
                </motion.div>

                {/* Content Section */}
                {isLoading || !data?.data?.length ? (
                    /* Simple Loading Skeleton */
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                                    {/* Image Skeleton */}
                                    <div className="aspect-[4/5] bg-gray-200"></div>
                                    
                                    {/* Content Skeleton */}
                                    <div className="p-4 space-y-3">
                                        <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                                        <div className="bg-gray-200 h-3 rounded w-full"></div>
                                        <div className="bg-gray-200 h-3 rounded w-2/3"></div>
                                        <div className="bg-gray-200 h-5 rounded w-1/2"></div>
                                        <div className="bg-gray-200 h-9 rounded-lg"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Simple Loading Text */}
                        <div className="text-center mt-8">
                            <div className="inline-flex items-center gap-3 text-gray-600">
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full animate-spin border-t-blue-500"></div>
                                <span>Popüler ürünler yükleniyor...</span>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* Real Content */
                    <motion.div variants={itemVariants} className="relative" style={{ zIndex: 3 }}>
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
                            
                            {/* Navigation Buttons */}
                            <CarouselPrevious className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-blue-300 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40">
                                <span className="text-lg font-bold text-gray-700">‹</span>
                            </CarouselPrevious>
                            
                            <CarouselNext className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-blue-300 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40">
                                <span className="text-lg font-bold text-gray-700">›</span>
                            </CarouselNext>
                        </Carousel>
                        
                        {/* View All Button */}
                        <div className="text-center mt-12">
                            <Button
                                onClick={handleViewAll}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 z-30 relative"
                            >
                                <span>Tüm Ürünleri Görüntüle</span>
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
};

export default memo(TrendProducts);
