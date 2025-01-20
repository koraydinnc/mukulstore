"use client"
import React, { memo } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { Router } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CarouselWelcome = () => {
  const router = useRouter();

  const VideoSlide = memo(({ src, href }) => (
    <CarouselItem 
      className="relative justify-center items-center flex cursor-pointer"
      onClick={() => router.push(href)}
    >
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        loading="lazy"
        preload="metadata"
        className="w-full lg:w-[1440px] object-cover rounded-lg lg:h-[1440px]"
      >
        <source src={src} type="video/mp4" />
      </video>
    </CarouselItem>
  ));

  VideoSlide.displayName = 'VideoSlide';

  const videos = [
    { src: '/banner/1.mp4', href: '/Kategori/IndirimliUrunler' },
    { src: '/banner/2.mp4', href: '/Kategori/AltGiyim' },
    { src: '/banner/3.mp4', href: '/Kategori/UstGiyim' }
  ];

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    inViewThreshold: 0.7,
  }, [
    Autoplay({
      delay: 4500,
    })
  ]);

  return (
    <div className="w-full max-w-screen-4xl max-h-screen-4xl mx-auto mt-2">
      <Carousel ref={emblaRef} className="relative w-full">
        <CarouselContent>
          {videos.map((video, index) => (
            <VideoSlide 
              key={index} 
              src={video.src} 
              href={video.href} 
            />
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex absolute left-4 xxl:left-96 lg:left-40" />
        <CarouselNext className="absolute right-4 lg:flex hidden xxl:right-96 lg:right-40" />
      </Carousel>
    </div>
  );
};

export default memo(CarouselWelcome);
