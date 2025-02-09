import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: '/admin/category/category-list',
      })
    }),
    addCategory: builder.mutation({
      query: (category) => ({
        url: '/admin/category/category-add',
        method: 'POST',
        body: category
      })
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: '/admin/category/category-delete',
        method: 'DELETE',
        params: { id }
      })
    })
  })
});

export const { useDeleteCategoryMutation,useGetCategoriesQuery, useAddCategoryMutation } = categoryApi;