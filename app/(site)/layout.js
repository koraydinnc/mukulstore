import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./Providers";
import Header from "../components/header";
import { SpeedInsights } from '@vercel/speed-insights/next';
import SepetDrawer from "@/app/components/SepetDrawer";

// Font optimizasyonu
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap', // Font yüklenene kadar sistem fontu kullanılır
  preload: true,
});

export const metadata = {
  title: {
    default: 'Mukul Store',
  },
  description: 'Mukul Store | Ayakkabı ve Giyim Mağazası',
  keywords: ['ayakkabı', 'giyim', 'moda', 'mukul store','mukul','store', 'mukulstore','spor ayakkabı'],
  metadataBase: new URL('https://www.mukulstore.com'),
  alternates: {
    canonical: 'https://www.mukulstore.com',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
    siteName: 'Mukul Store',
    url: 'https://www.mukulstore.com',
    images: [
      {
        url: './BlackLogo.jpeg',
        width: '200',
        height: '200',
        alt: 'Mukul Store',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/BlackLogo.jpeg', 
    shortcut: '/BlackLogo.jpeg',
    apple: '/BlackLogo.jpeg', 
    other: {
      rel: 'BlackLogo.jpeg', 
      url: '/BlackLogo.jpeg', 
    },
  },
  
  links: {
    about: 'https://www.mukulstore.com/Hakkimizda',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={poppins.variable}>
      <body className={poppins.className}>
        <Providers>
          <Header />
          <main className="relative">
            {children}
            <SepetDrawer />
          </main>
          <SpeedInsights />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
