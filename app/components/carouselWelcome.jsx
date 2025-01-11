"use client"
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

const CarouselWelcome = () => {
  const autoplayOptions = {
    delay: 5000,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
  };

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
    },
    [Autoplay(autoplayOptions)]
  );

  return (
    <div className="w-full max-w-screen-4xl max-h-screen-4xl mx-auto mt-2">
      <Carousel 
       plugins={[
        Autoplay({
          delay: 4500,
        }),
      ]}
      ref={emblaRef} className="relative w-full">
        <CarouselContent>
          <CarouselItem className="relative">
            <Image
              className="w-full object-contain rounded-lg lg:h-[800px]"
              src="/banner/1.gif"
              alt="Gif 1"
              width={1920}
              height={600}
              priority
            />
          </CarouselItem>
          <CarouselItem className="relative">
            <Image
              className="w-full object-contain rounded-lg lg:h-[800px]"
              src="/banner/2.gif"
              alt="Gif 2"
              width={1920}
              height={600}
            />
          </CarouselItem>
          <CarouselItem className="relative">
            <Image
              className="w-full object-contain rounded-lg lg:h-[800px]"
              src="/banner/3.gif"
              alt="Gif 3"
              width={1920}
              height={600}
            />
          </CarouselItem>
          <CarouselItem className="relative">
            <Image
              className="w-full object-contain rounded-lg lg:h-[800px]"
              src="/banner/4.gif"
              alt="Gif 4"
              width={1920}
              height={600}
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className=" hidden lg:flex absolute left-4 xxl:left-96 lg:left-40" />
        <CarouselNext className="absolute right-4 lg:flex hidden xxl:right-96 lg:right-40" />
      </Carousel>
    </div>
  );
};

export default CarouselWelcome;
