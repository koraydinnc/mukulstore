import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/admin/product/product-list',
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/admin/product/product-add',
        method: 'POST',
        body: product,
      }),
    }),
    photosUpload: builder.mutation({
      query: (formData) => ({
        url: '/admin/product/photos-upload',
        method: 'POST',
        body: formData,
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
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  usePhotosUploadMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useDeletePhotoMutation,
} = productApi;