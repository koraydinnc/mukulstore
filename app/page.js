"use client"
import { useEffect, useState } from 'react';
import Header from './components/header';
import BannerCampaign from './components/bannerCampaign';
import CarouselWelcome from './components/carouselWelcome';
import TrendProducts from './components/trendProducts';
import { useGetPopularProductsQuery, useGetProductsListQuery } from '@/store/services/user/productUserApi';
import ProductsList from './components/ProductsList';
import ProductsFilter from './components/ProductsFilter';
import { useGetCategoriesQuery } from '@/store/services/admin/categoryApi';
import Loading from './loading';

export default function Home() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const pageSize = 12;

  const { data: trendData, isLoading: trendLoading } = useGetPopularProductsQuery({
    featured: true,
    page: 1,
    limit: 4,
  });

  const { data: productsData, isLoading: productsLoading } = useGetProductsListQuery({
    page,
    limit: pageSize,
  });

  const { data: categoriesData } = useGetCategoriesQuery();
 

  useEffect(() => {
    if (productsData) {
      setProducts(productsData.data);
    }
  }, [productsData]);

  if (trendLoading || productsLoading || !categoriesData) {
    return <Loading />;
  }

  const handleFilterChange = (filters) => {
    console.log(filters, 'filters')
      const filtredProducts = productsData.data.filter((products) => {
         if(filters.category){
            return products.category === filters.category
         }
          if(filters.priceRange){
              return products.price >= filters.priceRange[0] && products.price <= filters.priceRange[1]
          }
          if (filters?.sizes) {
             console.log(filters.sizes, 'filters.sizes')
              const sizesProduct = products.sizes.includes(filters.sizes.map(size => size))
              console.log(sizesProduct, 'sizesProduct')
           
          }
          if(filters.inStock){
              return products.inStock === filters.inStock
          }
          if(filters.onSale){
              return products.onSale === filters.onSale 
          }
          
      })
      setProducts(filtredProducts)
  }
   console.log(products, 'products')

  return (
    <main className="overflow-x-hidden bg-white min-h-screen">

      <section>
        <BannerCampaign />
      </section>

      <section>
        <CarouselWelcome />
      </section>

      <section>
        <TrendProducts data={trendData} />
      </section>

      <section className="container mx-auto px-4 py-8">
        <ProductsFilter
          onFilterChange={handleFilterChange}
          categories={categoriesData.categories}
        />
      </section>

      <section>
        <ProductsList
          data={products}
          isLoading={productsLoading}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
        />
      </section>
    </main>
  );
}
