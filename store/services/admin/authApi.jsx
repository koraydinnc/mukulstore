import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
console.log(baseUrl,'baseUrl')
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/admin/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/admin/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi