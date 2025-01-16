"use client"
import { useEffect, useState } from 'react';
import { useGetPopularProductsQuery, useGetProductsListQuery } from '@/store/services/user/productUserApi';
import { useGetCategoriesQuery } from '@/store/services/admin/categoryApi';
import Loading from './loading';
import BannerCampaign from '../components/bannerCampaign';
import CarouselWelcome from '../components/carouselWelcome';
import TrendProducts from '../components/trendProducts';
import ProductsFilter from '../components/ProductsFilter';
import ProductsList from '../components/ProductsList';
import notFound from '../not-found';

export default function Home({params}) {
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
 
  if (!params.slug) {
    notFound()
  }
  useEffect(() => {
    if (productsData) {
      setProducts(productsData.data);
    }
  }, [productsData]);

  if (trendLoading || productsLoading || !categoriesData) {
    return <Loading />;
  }

  const handleFilterChange = (filters) => {
    const filteredProducts = productsData.data.filter((product) => {
      const matchesCategory = filters.category ? product.category === filters.category : true;
      const matchesPriceRange = filters.priceRange 
        ? product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1] 
        : true;
      const matchesSizes = filters.sizes 
        ? filters.sizes.every((size) => product.sizes.includes(size)) 
        : true;
      const matchesInStock = filters.inStock !== undefined 
        ? product.inStock === filters.inStock 
        : true;
      const matchesOnSale = filters.onSale !== undefined 
        ? product.onSale === filters.onSale 
        : true;
  
      return matchesCategory && matchesPriceRange && matchesSizes && matchesInStock && matchesOnSale;
    });
    setProducts(filteredProducts);
  };
  
   console.log(products, 'products')

  return (
    <main className="overflow-x-hidden bg-white min-h-screen">

      <section>
        <BannerCampaign />
      </section>

      <section>
        <CarouselWelcome />
      </section>

      <section >
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
