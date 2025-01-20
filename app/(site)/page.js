"use client"
import { useEffect, useState, useCallback } from 'react';
import { useGetPopularProductsQuery, useGetProductsListQuery } from '@/store/services/user/productUserApi';
import { useGetCategoriesQuery } from '@/store/services/admin/categoryApi';
import Loading from './loading';
import BannerCampaign from '../components/bannerCampaign';
import CarouselWelcome from '../components/carouselWelcome';
import TrendProducts from '../components/trendProducts';
import ProductsFilter from '../components/ProductsFilter';
import ProductsList from '../components/ProductsList';
import notFound from './not-found';
import { PackageSearch, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from 'antd';

export default function Home({params}) {
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [clearFiltersCallback, setClearFiltersCallback] = useState(null);
  const pageSize = 20;

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
      setFilteredProducts(productsData.data);
      setPagination(productsData.pagination);
      
    }
  }, [productsData]);



  const handleFilterChange = useCallback((filters) => {
    if (!productsData?.data) return;

    let filtered = [...productsData.data];

    // Kategori filtresi
    if (filters.category.length > 0) {
      filtered = filtered.filter(product => {
        return filters.category.some(cat => {
          const [mainCat] = cat.split('-');
          return product.categoryId === parseInt(mainCat);
        });
      });
    }

    // Beden filtresi
    if (filters.size.length > 0) {
      filtered = filtered.filter(product => 
        filters.size.some(size => 
          product.sizes.some(s => s.size === size)
        )
      );
    }

    // Fiyat aralığı filtresi
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        const price = product.discountedPrice || product.price;
        if (filters.priceRange === '5000-plus') {
          return price >= 5000;
        }
        return price >= min && price <= max;
      });
    }

    // Sıralama
    if (filters.sort) {
      filtered.sort((a, b) => {
        const priceA = a.discountedPrice || a.price;
        const priceB = b.discountedPrice || b.price;
        
        switch (filters.sort) {
          case 'price-low':
            return priceA - priceB;
          case 'price-high':
            return priceB - priceA;
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
  }, [productsData?.data]);

  const handleClearFilters = useCallback(() => {
    if (clearFiltersCallback) {
      clearFiltersCallback();
    }
  }, [clearFiltersCallback]);

  if (!params.slug) {
    notFound()
  }
 
  if (trendLoading || productsLoading || !categoriesData) {
    return <Loading />;
  }

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
          categories={categoriesData?.categories || []}
          onClearFiltersRef={setClearFiltersCallback}
          totalResults={filteredProducts.length}
        />
      </section>
  
      <section className="container mx-auto px-4">
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 "
          >
            <div className="bg-gray-50 p-6 rounded-full mb-6">
              <PackageSearch className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aradığınız Kriterlere Uygun Ürün Bulunamadı
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-8">
              Filtreleme kriterlerinizi değiştirerek daha fazla ürün görüntüleyebilirsiniz.
            </p>
          </motion.div>
        ) : (
          <ProductsList
            pagination={pagination}
            data={filteredProducts}
            isLoading={productsLoading}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
          />
        )}
      </section>
    </main>
  );
}
