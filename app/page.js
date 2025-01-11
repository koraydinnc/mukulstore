"use client"
import { useState } from 'react'
import Header from './components/header'
import BannerCampaign from './components/bannerCampaign'
import CarouselWelcome from './components/carouselWelcome'
import TrendProducts from './components/trendProducts'
import { useGetPopularProductsQuery, useGetProductsListQuery } from '@/store/services/user/productUserApi'
import ProductsList from './components/ProductsList'
import { Spin } from 'antd'
import ProductsFilter from './components/ProductsFilter'
import { useGetCategoriesQuery } from '@/store/services/admin/categoryApi'



export default function Home() {
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const { data: trendData, isLoading: trendLoading } = useGetPopularProductsQuery({ 
    featured: true, 
    page: 1, 
    limit: 4 
  });

  const { data: productsData, isLoading: productsLoading } = useGetProductsListQuery({ 
    page, 
    limit: pageSize 
  });

  const { data: categoriesData } = useGetCategoriesQuery();

  console.log(categoriesData, 'categoriesData')

  const handleFilterChange = (filters) => {
    console.log('Applied filters:', filters);
    // Here you can update your API query with the filters
  };

  if(trendLoading || productsLoading || !categoriesData) {
    return <Spin fullscreen />
  }

  console.log(productsData, 'productsData')

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
      
      <section>
        <TrendProducts data={trendData} />
      </section>
      <section className="container mx-auto px-4 py-8">
        <ProductsFilter onFilterChange={handleFilterChange} categories={categoriesData.categories} />
      </section>
      <section>
        <ProductsList 
          data={productsData} 
          isLoading={productsLoading}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
        />
      </section>
    </main>
  )
}