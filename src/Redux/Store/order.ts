import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addOrderItemType } from "../../types/Order.type";

export const orderApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "orderApi",
  endpoints: (builder) => ({
    getOrderAdmin: builder.query({
      query: (url: string) => `admin/order${url}`,
    }),
    getOrderUser: builder.query({
      query: () => `user/order`,
    }),
    getOrder: builder.query({
      query: (id: string) => `admin/order/${id}`,
    }),
    createOrder: builder.mutation({
      query: (addressId: string) => ({
        url: `/user/order/checkout/${addressId}`,
        method: "POST",
      }),
    }),
    createOrderItem: builder.mutation({
      query: (orderItem: addOrderItemType) => ({
        url: `/user/orderItem`,
        method: "POST",
        body: orderItem,
      }),
    }),
    deleteOrderItem: builder.mutation({
      query: (itemId: string) => ({
        url: `/admin/orderItem/delete/${itemId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetOrderAdminQuery,
  useGetOrderUserQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useCreateOrderItemMutation,
  useDeleteOrderItemMutation,
} = orderApiSlice;
