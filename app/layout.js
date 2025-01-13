import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./Providers";
import Header from "./components/header";

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata = {
  title: {
    default: 'Mukul Store',
    template: '%s | Mukul Store'
  },
  description: 'Mukul Store | En kaliteli ayakkabı ve giyim ürünleri',
  keywords: ['ayakkabı', 'giyim', 'moda', 'mukul store', 'spor ayakkabı'],
  metadataBase: new URL('https://www.mukulstore.com'),
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Mukul Store',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={poppins.className}>
        <Providers>
          <Header/>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
