"use client"

import React, { memo, useState, useEffect, useCallback } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const CarouselWelcome = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Video önbelleğe alma
  const videos = [
    { src: '/banner/1.mp4', href: '/Kategori/IndirimliUrunler', preload: 'auto' },
    { src: '/banner/2.mp4', href: '/Kategori/AltGiyim', preload: 'metadata' },
    { src: '/banner/3.mp4', href: '/Kategori/UstGiyim', preload: 'metadata' }
  ];

  const VideoSlide = memo(({ src, href, isVisible, onLoad }) => (
    <CarouselItem 
      className="relative justify-center items-center flex cursor-pointer min-h-[200px] sm:max-h-[300px] md:max-h-[400px] xl:max-h-[1240px]" // Height değerleri düşürüldü
      onClick={() => router.push(href)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      )}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        preload={isVisible ? 'auto' : 'none'}
        className="w-full min-h-full object-cover rounded-lg"
        onLoadedData={() => {
          setIsLoading(false);
          onLoad?.();
        }}
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </CarouselItem>
  ));

  VideoSlide.displayName = 'VideoSlide';

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    inViewThreshold: 0.7,
    lazyLoad: true,
  }, [
    Autoplay({
      delay: 4500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  ]);

  // Slide değişimini izle
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  // Performans optimizasyonu için intersection observer
  const [ref, setRef] = useState(null);
  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.querySelector('video')?.play();
        } else {
          ref.querySelector('video')?.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return (
    <div className="w-full max-w-screen-4xl mx-auto my-4" ref={setRef}> {/* margin-top değeri düşürüldü */}
      <Carousel 
        ref={emblaRef} 
        className="relative w-full overflow-hidden rounded-lg" // rounded eklendi
        options={{ containScroll: 'trimSnaps' }}
      >
        <CarouselContent>
          {videos.map((video, index) => (
            <VideoSlide 
              key={index} 
              src={video.src} 
              href={video.href}
              isVisible={currentSlide === index}
              onLoad={() => console.log(`Video ${index + 1} loaded`)}
            />
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {videos.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? 'bg-white w-4' : 'bg-white/50'
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
        <CarouselPrevious className="hidden lg:flex absolute left-4 xxl:left-96 lg:left-40" />
        <CarouselNext className="absolute right-4 lg:flex hidden xxl:right-96 lg:right-40" />
      </Carousel>
    </div>
  );
};

export default memo(CarouselWelcome);
