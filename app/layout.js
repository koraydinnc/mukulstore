import { Poppins, Playfair_Display } from "next/font/google"
import { Providers } from "./Providers"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

export const metadata = {
  title: 'Anasayfa | Mukul Store',
  description: 'Mukul Store - En iyi giyim ve aksesuar mağazası',
  keywords: 'Mukul Store, Giyim, Erkek, Kadın, Çocuk, Aksesuar', 
  openGraph: {
    title: 'Anasayfa | Mukul Store',
    description: 'Mukul Store - En iyi giyim ve aksesuar mağazası',
    url: 'https://www.mukulstore.com',
    siteName: 'www.mukulstore.com',
    locale: 'tr_TR',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
        <Toaster/>
      </body>
    </html>
  )
}