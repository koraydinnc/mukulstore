"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

const notFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto p-8 text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-8"
        >
          <Timer size={48} className="text-blue-500" />
        </motion.div>

        <h1 className="text-4xl font-bold mb-4">
          Çalışmalarımız Devam Ediyor
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          Sizlere daha iyi hizmet verebilmek için çalışıyoruz. Çok yakında yeni koleksiyonumuzla sizlerle olacağız.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Sosyal medyada bizi takip edin:
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link 
              href="https://instagram.com/mukulstore" 
              className="p-2 hover:text-pink-500 transition-colors"
              target="_blank"
            >
              <Instagram size={24} />
            </Link>
            <Link 
              href="https://facebook.com/mukulstore" 
              className="p-2 hover:text-blue-500 transition-colors"
              target="_blank"
            >
              <Facebook size={24} />
            </Link>
          </div>
        </div>

        <motion.div 
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            href="/"
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default notFound;