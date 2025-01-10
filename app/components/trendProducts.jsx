"use client";

import React, { useRef } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
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

const TrendProducts = ({ data, refetch }) => {
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
    const favorites = useSelector((state) => state.favorites.items);

    if (!data) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="min-h-2/3 w-full flex items-center justify-center py-12 bg-gray-50">
            <div className="w-full xl:w-3/4">
                <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-10">
                    Popüler Ürünler
                </h2>
                {data.data.length > 0 ? (
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent className="flex gap-4">
                            {data.data.map((product) => (
                                <CarouselItem
                                    key={product.id}
                                    className="basis-full md:basis-1/2 lg:basis-1/4"
                                >
                                    <Card className="shadow-lg hover:shadow-2xl transition-all transform rounded-xl bg-white relative overflow-hidden">
                                        <CardHeader className="p-0 relative">
                                            <img
                                                src={product.images[0] || "/placeholder.jpg"}
                                                alt={product.title}
                                                className="w-full h-56 object-cover rounded-t-lg"
                                            />
                                            <button
                                                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                                            >
                                                {favorites.includes(product.id) ? (
                                                    <HeartIcon className="h-6 w-6 text-red-500" />
                                                ) : (
                                                    <HeartIcon className="h-6 w-6 text-gray-400 hover:text-red-500 transition-colors" />
                                                )}
                                            </button>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-800">
                                                {product.title}
                                            </h3>
                                            <p className="text-gray-500 text-lg mt-2">
                                                {product.price.toLocaleString()} ₺
                                            </p>
                                        </CardContent>
                                        <CardFooter className="p-6 flex flex-col items-center">
                                            <Select className="w-full text-black mb-4">
                                                <SelectTrigger className="text-black">
                                                    <SelectValue
                                                        className="text-black"
                                                        placeholder="Beden Seçiniz"
                                                    />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white text-black">
                                                    {product.sizes?.map((size) => (
                                                        <SelectItem key={size} value={size}>
                                                            {size}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <button className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all">
                                                Satın Al
                                            </button>
                                        </CardFooter>
                                    </Card>
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

export default TrendProducts;
