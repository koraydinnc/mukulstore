import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./Providers";
import Header from "../components/header";

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
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
