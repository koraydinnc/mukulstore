"use client"
import Header from './components/header'
import BannerCampaign from './components/bannerCampaign'
import CarouselWelcome from './components/carouselWelcome'
import TrendProducts from './components/trendProducts'
import { useGetPopularProductsQuery } from '@/store/services/user/productUserApi'



export default function Home() {


   const {data, error, isLoading, refetch} = useGetPopularProductsQuery()
  
   data && console.log(data,'data')
 
  return (
    <main className='overflow-x-hidden bg-white min-h-screen'>
      <section>
        <Header />
      </section>
      
      <section>
        <BannerCampaign />
      </section>
      
      <section >
        <CarouselWelcome />
      </section>
      
      <section >
        <TrendProducts  data={data} refetch={refetch}/>
      </section>
    </main>
  )
}