import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

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
        query: () => 'user/product/product-list',
        providesTags: ['Product'],
        })
    }), 
})

export const { useGetPopularProductsQuery, useGetProductsListQuery } = productUserApi