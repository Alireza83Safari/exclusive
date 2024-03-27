import { createApi } from "@reduxjs/toolkit/query/react";
import { addOrderItem } from "../../../types/order";
import { axiosBaseQueryUser } from "../../../services/axiosBaseQueryUser";

export const orderUserApi = createApi({
  baseQuery: axiosBaseQueryUser({ baseUrl: "" }),
  reducerPath: "orderUserApi",
  endpoints: (builder) => ({
    getOrderUser: builder.query({
      query: () => ({ url: `/order`, method: "get" }),
    }),
    createOrder: builder.mutation({
      query: (addressId: string) => ({
        url: `/order/checkout/${addressId}`,
        method: "POST",
      }),
    }),
    createOrderItem: builder.mutation({
      query: (orderItem: addOrderItem) => ({
        url: `/orderItem`,
        method: "POST",
        data: JSON.stringify(orderItem),
      }),
    }),

    deleteOrderItem: builder.mutation({
      query: (id: string) => ({
        url: `/orderItem/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetOrderUserQuery,
  useCreateOrderMutation,
  useCreateOrderItemMutation,
  useDeleteOrderItemMutation,
} = orderUserApi;
