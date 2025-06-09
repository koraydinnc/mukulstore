"use client"

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const BannerCampaign = () => {
  return (
    <div className="w-full py-6 px-2 sm:py-8 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1400px] mx-auto rounded-2xl overflow-hidden border border-gray-100">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="w-full rounded-2xl"
        >
          <SwiperSlide>
            <div className="relative  sm:aspect-[16/6] w-fulloverflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/banner/1.gif"
                src="/banner/1.gif"
                style={{ maxHeight: '600px', minHeight: '180px', width: '100%' }}
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative aspect-[16/7] sm:aspect-[16/6] w-full rounded-2xl overflow-hidden">
              <img
                src="/banner/2.gif"
                alt="Kampanya"
                className="w-full h-full object-cover max-h-[400px] min-h-[180px]"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-blue-900/70 to-transparent flex items-center justify-end">
                <div className="text-white p-4 sm:p-8 md:p-12 lg:p-16 max-w-2xl text-right">
                  <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">Sınırlı Süre Fırsatı!</h2>
                  <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">⏰ Son 3 gün - Fırsatları Kaçırmayın!</p>
                  <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold hover:bg-blue-700 transition transform hover:scale-105">
                    İndirimleri Keşfet
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative aspect-[16/7] sm:aspect-[16/6] w-full rounded-2xl overflow-hidden">
              <img
                src="/banner/3.gif"
                alt="Yeni Ürünler"
                className="w-full h-full object-cover max-h-[400px] min-h-[180px]"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="text-white p-4 sm:p-8 md:p-12 lg:p-16 max-w-2xl">
                  <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">Yeni Sezon Ürünleri</h2>
                  <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">🛍️ En yeni koleksiyonlarımızı keşfedin</p>
                  <button className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold hover:bg-gray-100 transition transform hover:scale-105">
                    Koleksiyonu Gör
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default BannerCampaign