import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const productUserApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getPopularProducts: builder.query({
        query: () => 'user/product/popular-list',
        providesTags: ['Product'],
        }),
    }), 
})

export const { useGetPopularProductsQuery } = productUserApi