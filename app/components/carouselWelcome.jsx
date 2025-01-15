"use client"
import React, { memo } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

const VideoSlide = memo(({ src }) => (
  <CarouselItem className="relative justify-center items-center flex">
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

const CarouselWelcome = () => {
  const autoplayOptions = {
    delay: 5000,
    stopOnInteraction: false,
    stopOnMouseEnter: true, // Battery ve performans için değiştirildi
  };

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
      inViewThreshold: 0.7,
    },
    [Autoplay(autoplayOptions)]
  );

  const videos = [
    '/banner/1.mp4',
    '/banner/2.mp4',
    '/banner/3.mp4'
  ];

  return (
    <div className="w-full max-w-screen-4xl max-h-screen-4xl mx-auto mt-2">
      <Carousel 
        plugins={[
          Autoplay({
            delay: 4500,
          }),
        ]}
        ref={emblaRef} 
        className="relative w-full"
      >
        <CarouselContent>
          {videos.map((video, index) => (
            <VideoSlide key={video} src={video} />
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex absolute left-4 xxl:left-96 lg:left-40" />
        <CarouselNext className="absolute right-4 lg:flex hidden xxl:right-96 lg:right-40" />
      </Carousel>
    </div>
  );
};

export default memo(CarouselWelcome);
