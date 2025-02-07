"use client";

import React, { useRef, memo } from "react";
import Image from "next/image";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { HeartIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";

const TrendProducts = ({ data, refetch }) => {
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
    const favorites = useSelector((state) => state.favorites.items);
 
    const router = useRouter();    

    if (!data) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    const handleClickRoute = (id) => {
        router.push(`/urun/${id}`);     
    }

    return (
        <div className="min-h-full w-full flex items-center justify-center py-12 bg-gray-50">
            <div className="w-full min-h-full xl:w-3/4">
                <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-10">
                    Popüler Ürünler
                </h2>
                {data.data.length > 0 ? (
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full h-full p-4"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent className="flex gap-2 md:gap-4">
                            {data.data.map((product) => (
                                <CarouselItem
                                    key={product.id}
                                    className="basis-1/2 cursor-pointer md:basis-1/3 lg:basis-1/4 xl:basis-1/5 px-1 md:px-2"
                                >
                                    <ProductCard 
                                        product={product} 
                                        onClick={() => {handleClickRoute(product.id)}} // Buraya tıklama işlevini ekleyebilirsiniz
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-3 text-gray-600 hover:text-black rounded-full shadow-lg">
                            <span className="text-xl">←</span>
                        </CarouselPrevious>
                        <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-3 text-gray-600 hover:text-black rounded-full shadow-lg">
                            <span className="text-xl">→</span>
                        </CarouselNext>
                    </Carousel>
                ) : (
                    <p className="text-gray-500 text-center text-lg">
                        Şu anda ürün bulunmamaktadır.
                    </p>
                )}
            </div>
        </div>
    );
};

export default memo(TrendProducts);
