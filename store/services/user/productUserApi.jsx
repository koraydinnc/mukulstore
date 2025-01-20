import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const productUserApi = createApi({
    reducerPath: 'productUserApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getPopularProducts: builder.query({
            query: () => 'user/product/popular-list',
            providesTags: ['Product'],
        }),
        getProductsList: builder.query({
            query: (params) => ({
                url: 'user/product/product-list',
                params: {
                    page: params?.page || 1,
                    pageSize: params?.pageSize || 20
                }
            }),
            providesTags: ['Product'],
        }),
        getProductSale: builder.query({
            query: () => 'user/product/product-indirimler',
            providesTags: ['Product'],
        }),
        getProductUstGiyim: builder.query({
            query: () => 'user/product/product-ustgiyim',
            providesTags: ['Product'],
        }),
        getProductAltGiyim: builder.query({
            query: () => 'user/product/product-altgiyim',
            providesTags: ['Product'],
        }),
    }), 
});

export const { useGetPopularProductsQuery, useGetProductsListQuery, useGetProductAltGiyimQuery, useGetProductSaleQuery, useGetProductUstGiyimQuery } = productUserApi;