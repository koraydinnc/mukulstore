import { Metadata } from 'next'
import Header from './components/header'
import BannerCampaign from './components/bannerCampaign'
import CarouselWelcome from './components/carouselWelcome';


export const metadata = {
  title: 'Ana Sayfa |  Mukul Store',
  description: 'Mukul Store',
  keywords: 'Mukul Store, Giyim, Erkek, Kadın, Çocuk, Aksesuar', 
  openGraph: {
    title: 'Ana Sayfa |  Mukul Store',
    description: 'Mukul Store',
    url: 'https://www.mukulstore.com',
    siteName: 'www.mukulstore.com',
   
    locale: 'tr_TR',
    type: 'website',
  },
}

export default function Home() {
  return (
    <main className='overflow-x-hidden'>
      <div>
        <Header />
      </div>
      <div>
        <BannerCampaign />
      </div>
      <div>
         <CarouselWelcome/>
        </div>

    </main>
  );
}
