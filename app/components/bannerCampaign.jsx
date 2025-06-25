"use client"

import React from 'react'
import { motion } from 'framer-motion'

const BannerCampaign = () => {

  return (
    <div className="bg-gradient-to-r from-black to-blue-600 py-3 shadow-lg">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration:  50,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
          repeatDelay: 0,
          delay: 0
        }}
        className="text-white font-bold tracking-wide whitespace-nowrap flex items-center gap-3 px-4"
      >
        <span className="inline-flex items-center">
          ✨ Büyük Açılış Kampanyası!
        </span>
        <span className="inline-flex items-center">
          🎁 Tüm ürünlerde Kargo Bedeli Ücretsiz!
        </span>
        <span className="inline-flex items-center">
          ⏰ Sınırlı Süre - Fırsatları Kaçırmayın!
        </span>
        <span className="inline-flex items-center">
          🛍️ Hemen Alışverişe Başla!
        </span>
      </motion.div>
    </div>
  )
}

export default BannerCampaign