"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAddCategoryMutation } from '@/store/services/admin/categoryApi';

const AddCategoryPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
    const [addCategory, {isLoading}] = useAddCategoryMutation();

  const onSubmit = async (data) => {
    try {
      await addCategory(data).unwrap();
      alert('Kategori başarıyla eklendi.');
    } catch (error) {
      console.log(error);
      alert('Kategori eklenirken bir hata oluştu.');
    }
  };

  return (
    <div className="container mx-auto max-w-fit p-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Kategori Ekle</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Kategori Adı</label>
            <input
              type="text"
              {...register('name', { required: 'Kategori adı gereklidir' })}
              className="mt-1 p-2 block w-full h-8 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          
          <div>
            <button
              type="submit"
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
              disabled={isLoading}
            >
              {isLoading ? 'Ekleniyor...' : 'Kategori Ekle'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCategoryPage;