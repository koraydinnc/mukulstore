import { Poppins } from 'next/font/google';
import "./global.css";
import { Providers } from '../(site)/Providers';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export default function Layout({ children }) {
  return (
    <html lang="tr" className={poppins.variable}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Mukul Store</title>
      </head>
      <Providers>
         <body className={poppins.className}>
        {children}
      </body>
      </Providers>
    </html>
  );
}