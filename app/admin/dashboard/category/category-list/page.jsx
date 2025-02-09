"use client";

import { useDeleteCategoryMutation, useGetCategoriesQuery } from '@/store/services/admin/categoryApi';
import { Spin, Alert } from 'antd';
import React from 'react';

const CategoryListPage = () => {
  const { data, isLoading, error } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Alert message="Error" description="Kategori yüklenirken bir hata oluştu." type="error" showIcon />
      </div>
    );
  }

const deleteCategoryHandler = async (categoryId) => {
  try {
    // Kategori ID'sini doğru şekilde gönder
    await deleteCategory({ categoryId }).unwrap();
    alert('Kategori başarıyla silindi.');
  } catch (error) {
    console.error('Kategori silme hatası:', error);
    alert('Kategori silinirken bir hata oluştu.');
  }
};

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Kategoriler</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <ul className="list-none space-y-4">
          {data.categories.map((category) => (
            <li key={category.id} className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-800">{category.name}</span>
                <button 
                  onClick={() => deleteCategoryHandler(category.id)} 
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryListPage;
