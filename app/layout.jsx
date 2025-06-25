import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: 'Mukul Store',
  description: 'Mukul Store | Ayakkabı ve Giyim Mağazası',
};

export default function Layout({ children }) {
  return (
    <html lang="tr" className={poppins.variable} suppressHydrationWarning={true}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}