'use client'
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CarouselWelcome = () => {
  const carouselRef = useRef();
  const router = useRouter();
  // Client-side rendering için loading state
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const slides = [
    {
      id: 1,
      image: "/banner/1.gif",
      title: "Yeni Koleksiyon",
      description: "En yeni ürünlerimizi keşfedin",
      buttonText: "Koleksiyonu Keşfet"
    },
    {
      id: 2,
      image: "/banner/2.gif",
      title: "Yaz İndirimi",
      description: "Seçili ürünlerde %50'ye varan indirimler",
      buttonText: "İndirimleri Gör"
    },
    {
      id: 3,
      image: "/banner/3.gif",
      title: "Özel Fırsatlar",
      description: "Sınırlı süre kampanyalarını kaçırmayın",
      buttonText: "Fırsatları Yakala"
    }
  ];

  const carouselSettings = {
    autoplay: true,
    effect: "fade",
    dots: true,
    autoplaySpeed: 4000,
    dotPosition: "bottom",
    pauseOnHover: false,
    waitForAnimate: false,
    lazyLoad: true,
    beforeChange: (current, next) => {
      // Gelecek slaytı önceden yükle
      const nextSlide = document.querySelector(`[data-slide="${next}"]`);
      if (nextSlide) {
        nextSlide.style.opacity = "1";
      }
    }
  };

  // Server-side rendering sırasında boş div döndür
  if (!isClient) {
    return <div className="w-full aspect-[16/9] bg-gray-100" />;
  }

  return (
    <div className="relative group">
      <Carousel 
        ref={carouselRef} 
        {...carouselSettings} 
        className="w-full max-w-[1920px] mx-auto"
      >
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className="relative aspect-[16/9] w-full" 
            data-slide={index}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover brightness-[0.85]"
                loading="lazy"
              />
            </div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white space-y-3 sm:space-y-4 animate-fadeIn px-4 max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider leading-tight">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light max-w-2xl mx-auto">
                  {slide.description}
                </p>
                <button 
                  onClick={() => router.push('/Kategori/IndirimliUrunler')} 
                  className="group relative inline-flex items-center justify-center px-6 py-2 sm:px-8 sm:py-3 md:px-10 md:py-4 
                    overflow-hidden font-medium transition duration-300 ease-out border-2 border-white rounded-full 
                    text-sm sm:text-base md:text-lg text-white hover:text-black shadow-md hover:shadow-xl"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full 
                    bg-white group-hover:translate-x-0 ease">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 
                    transform group-hover:translate-x-full ease">
                    {slide.buttonText}
                  </span>
                  <span className="relative invisible">{slide.buttonText}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Navigation Buttons */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          carouselRef.current?.prev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Önceki"
      >
        <LeftOutlined className="text-xl" />
      </button>
      
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          carouselRef.current?.next();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Sonraki"
      >
        <RightOutlined className="text-xl" />
      </button>
    </div>
  );
};

export default CarouselWelcome;
