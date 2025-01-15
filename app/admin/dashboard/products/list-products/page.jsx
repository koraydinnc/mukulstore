"use client";

import AdminProductsList from '@/app/components/AdminProductsList';
import { useGetProductsQuery } from '@/store/services/admin/productApi';
import React from 'react';
import { Spin } from 'antd';

const Page = () => {
  const { data: products, error, refetch, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <div>
      <AdminProductsList data={products} refetch={refetch} />
    </div>
  );
};

export default Page;