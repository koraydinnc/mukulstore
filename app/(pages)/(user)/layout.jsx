import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/app/components/header';

// Metadata for SEO
export const metadata = {
  title: 'Urun Detay | Mukul Store',
  description: 'Mukul Store - En iyi giyim ve aksesuar mağazası',
  keywords: 'Mukul Store,MukulStore, Giyim, Erkek, Kadın, Çocuk, Aksesuar',
  openGraph: {
    title: 'Urun Detay | Mukul Store',
    description: 'Mukul Store - En iyi giyim ve aksesuar mağazası',
    url: 'https://www.mukulstore.com',
    siteName: 'www.mukulstore.com',
    locale: 'tr_TR',
    type: 'website',
  },
};

// Layout component
const Layout = ({ children }) => {
  return (
    <div>
      <Header/>
      {children}
    </div>
  );
};

export default Layout;
