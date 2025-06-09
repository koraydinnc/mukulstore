import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getPaymentMethods: builder.query({
            query: () => ({
                url: "/admin/payment/payment-methods",
            }),
        }),
        addPaymentMethod: builder.mutation({
            query: (paymentMethod) => ({
                url: "/admin/payment/payment-method-add",
                method: "POST",
                body: paymentMethod,
            }),
        }),
        deletePaymentMethod: builder.mutation({
            query: (id) => ({
                url: "/admin/payment/payment-method-delete",
                method: "DELETE",
                params: { id },
            }),
        }),
        getOrders: builder.query({
            query: () => ({
                url: "/admin/orders-5534/orders",
            }),
        }),
    }),
});
export const {
    useGetPaymentMethodsQuery,
    useAddPaymentMethodMutation,
    useDeletePaymentMethodMutation,
    useGetOrdersQuery,
} = paymentApi;
export default paymentApi;
export { paymentApi };

