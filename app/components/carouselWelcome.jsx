"use client"

import React, { memo, useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const CarouselWelcome = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // GIF banner items
  const banners = [
    { src: '/banner/1.gif', href: '/Kategori/IndirimliUrunler' },
    { src: '/banner/2.gif', href: '/Kategori/AltGiyim' },
    { src: '/banner/3.gif', href: '/Kategori/UstGiyim' }
  ];

  const BannerSlide = memo(({ src, href }) => (
    <CarouselItem 
      className="relative w-full cursor-pointer"
      onClick={() => router.push(href)}
    >
      <div className="aspect-[16/9] sm:aspect-[18/9] md:aspect-[21/9] relative w-full min-h-[200px] sm:min-h-[300px]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        )}
        <Image
          src={src}
          alt="Banner"
          fill
          className="object-cover object-center rounded-lg"
          onLoadingComplete={() => setIsLoading(false)}
          priority
          sizes="100vw"
        />
      </div>
    </CarouselItem>
  ));

  BannerSlide.displayName = 'BannerSlide';

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
    },
    [plugin.current]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      // Force start autoplay
      plugin.current.play();
    }
    return () => {
      if (plugin.current) {
        plugin.current.stop();
      }
    };
  }, [emblaApi]);

  // Slide değişimini izle
  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  return (
    <div className="w-full mx-auto px-2 sm:px-4 md:px-6 my-2 sm:my-4">
      <Carousel 
        ref={emblaRef} 
        className="relative w-full overflow-hidden rounded-lg shadow-lg"
      >
        <CarouselContent className="w-full">
          {banners.map((banner, index) => (
            <BannerSlide 
              key={index} 
              src={banner.src} 
              href={banner.href}
            />
          ))}
        </CarouselContent>
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? 'bg-white w-4' : 'bg-white/50'
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
        <CarouselPrevious className="hidden lg:flex absolute left-2 sm:left-4 z-10" />
        <CarouselNext className="hidden lg:flex absolute right-2 sm:right-4 z-10" />
      </Carousel>
    </div>
  );
};

export default memo(CarouselWelcome);
