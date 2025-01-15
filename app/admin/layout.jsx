import { Poppins } from "next/font/google";
import { Providers } from "./Providers";
import { Toaster } from "@/components/ui/toaster";
import './global.css';

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});



export default function AdminLayout({ children }) {
  return (
<html lang="tr">
     
     <body className={poppins.className}>
       <Providers>
         {children}
       </Providers>
       <Toaster />
     </body>
   </html>
  );
}
