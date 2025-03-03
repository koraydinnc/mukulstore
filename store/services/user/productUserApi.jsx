import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const productUserApi = createApi({
  reducerPath: "productUserApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getPopularProducts: builder.query({
      query: () => "user/product/popular-list",
      providesTags: ["Product"],
    }),
    getProductsList: builder.query({
      query: (params) => ({
        url: "user/product/product-list",
        params: {
          page: params?.page || 1,
          pageSize: params?.pageSize || 20,
        },
      }),
      providesTags: ["Product"],
    }),
    getProductSale: builder.query({
      query: () => "user/product/product-indirimler",
      providesTags: ["Product"],
    }),
    getProductUstGiyim: builder.query({
      query: () => "user/product/product-ustgiyim",
      providesTags: ["Product"],
    }),
    getProductAltGiyim: builder.query({
      query: () => "user/product/product-altgiyim",
      providesTags: ["Product"],
    }),
    getProductDetail: builder.query({
      query: (id) => ({
        url: "user/product/product-detail",
        method: "POST", // Eğer backend'de GET destekliyorsa bunu POST'tan GET'e çevirebilirsiniz.
        body: { id },
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetPopularProductsQuery,
  useGetProductsListQuery,
  useGetProductAltGiyimQuery,
  useGetProductSaleQuery,
  useGetProductUstGiyimQuery,
  useGetProductDetailQuery, // `mutation` yerine `query` olarak kullanıyoruz.
} = productUserApi;
