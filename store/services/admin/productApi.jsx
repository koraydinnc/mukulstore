import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const productApi = createApi({
  reducerPath: 'productApi',
  tagTypes: ['Photos'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/admin/product/product-list',
    }),
    uploadImages: builder.mutation({
      query: (data) => ({
        url: '/admin/product/photos-upload',
        method: 'POST',
        body: data // { images: [base64String, base64String, ...] }
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: '/admin/product/product-add',
        method: 'POST',
        body: data
      }),
    }),
  
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: '/admin/product/product-delete',
        method: 'DELETE',
        params: { id },
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, values }) => ({
        url: `/admin/product/product-edit`,  // Keep the path as /product-edit
        method: 'PUT',  // Use PUT for update requests
        params: { id },  // Pass the ID as a query parameter
        body: values,   // Send the updated values as the body
      })
    }),
    deletePhoto: builder.mutation({
      query: (url) => ({
        url: '/admin/product/photos-delete',
        method: 'DELETE',
        body: { url },
      }),
      invalidatesTags: ['Photos'], // Silme işlemi sonrası cache'yi güncelle
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUploadImagesMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useDeletePhotoMutation,
} = productApi;