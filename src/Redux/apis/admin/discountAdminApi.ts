import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryAdmin } from "../../../services/axiosBaseQueryAdmin";
import { discountUserType } from "../../../types/Discount.type";

export const discountAdminApi = createApi({
  baseQuery: axiosBaseQueryAdmin({ baseUrl: "/discount" }),
  reducerPath: "discountAdminApi",
  endpoints: (builder) => ({
    getDiscountAdmin: builder.query({
      query: () => ({ url: ``, method: "get" }),
    }),
    getDiscountWithId: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    createDiscount: builder.mutation({
      query: (discountInfo: discountUserType) => ({
        url: "",
        method: "POST",
        data: discountInfo,
      }),
    }),
    editDiscount: builder.mutation({
      query: ({
        id,
        discountInfo,
      }: {
        id: string;
        discountInfo: discountUserType;
      }) => ({
        url: `/edit/${id}`,
        method: "POST",
        data: discountInfo,
      }),
    }),
    deleteDiscount: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetDiscountAdminQuery,
  useGetDiscountWithIdMutation,
  useCreateDiscountMutation,
  useEditDiscountMutation,
  useDeleteDiscountMutation,
} = discountAdminApi;
