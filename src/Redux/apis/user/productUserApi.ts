import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryUser } from "../../../services/axiosBaseQueryUser";

export const productUserApi = createApi({
  baseQuery: axiosBaseQueryUser({ baseUrl: "/product" }),
  reducerPath: "productUserApi",
  endpoints: (builder) => ({
    getProductsUser: builder.query({
      query: (url?: string) => ({ url: `${url ? url : ""}`, method: "get" }),
    }),

    getProductUser: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "get",
      }),
    }),

    getProductsSuggestions: builder.query({
      query: () => ({ url: `user/product/suggestions`, method: "get" }),
    }),
  }),
});

export const {
  useGetProductsUserQuery,
  useGetProductUserMutation,
  useGetProductsSuggestionsQuery,
} = productUserApi;
