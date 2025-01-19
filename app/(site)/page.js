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
import notFound from './not-found';

export default function Home({params}) {
  const [page, setPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
    if (productsData?.data) {
      setFilteredProducts(productsData.data);
    }
  }, [productsData]);

  if (trendLoading || productsLoading || !categoriesData) {
    return <Loading />;
  }

  const handleFilterChange = (filters) => {
    if (!productsData?.data) return;

    let filtered = [...productsData.data];

    // Kategori filtresi
    if (filters.category.length > 0) {
      filtered = filtered.filter(product => {
        return filters.category.some(cat => {
          const [mainCat, subCat] = cat.split('-');
          if (subCat) {
            return product.category === mainCat && product.subCategory === subCat;
          }
          return product.category === mainCat;
        });
      });
    }

    // Beden filtresi
    if (filters.size.length > 0) {
      filtered = filtered.filter(product => 
        filters.size.some(size => product.sizes.includes(size))
      );
    }

    // Fiyat aralığı filtresi
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (filters.priceRange === '5000-plus') {
          return product.price >= 5000;
        }
        return product.price >= min && product.price <= max;
      });
    }

    // Sıralama
    if (filters.sort) {
      filtered.sort((a, b) => {
        switch (filters.sort) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'name-asc':
            return a.title.localeCompare(b.title);
          case 'name-desc':
            return b.title.localeCompare(a.title);
          case 'newest':
            return new Date(b.createdAt) - new Date(a.createdAt);
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(filtered);
  };

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
          data={filteredProducts}
          isLoading={productsLoading}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
        />
      </section>
    </main>
  );
}
