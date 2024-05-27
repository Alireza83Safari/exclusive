import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryAdmin } from "../../../services/axiosBaseQueryAdmin";

export const orderAdminApi = createApi({
  baseQuery: axiosBaseQueryAdmin({ baseUrl: "" }),
  reducerPath: "orderAdminApi",
  endpoints: (builder) => ({
    getOrderAdmin: builder.query({
      query: (url: string) => ({
        url: url ? `/order${url}` : "/order",
        method: "get",
      }),
    }),

    getOrder: builder.query({
      query: (id: string) => ({ url: `/order/${id}`, method: "get" }),
    }),
    createOrder: builder.mutation({
      query: (addressId: string) => ({
        url: `/order/checkout/${addressId}`,
        method: "POST",
      }),
    }),

    deleteOrderItem: builder.mutation({
      query: (itemId: string) => ({
        url: `/orderItem/delete/${itemId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetOrderAdminQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useDeleteOrderItemMutation,
} = orderAdminApi;
