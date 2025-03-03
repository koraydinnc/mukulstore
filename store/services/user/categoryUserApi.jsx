import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const categoryUserApi = createApi({
    reducerPath: 'categoryUserApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
          getCategories: builder.query({
        query: () => 'user/category/category-list',
        
          })
    }), 
})

export const { useGetCategoriesQuery } = categoryUserApi