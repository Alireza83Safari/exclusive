import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { productType } from "../../types/Product.type";

export const ProductApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "productApi",
  endpoints: (builder) => ({
    getProductsAdmin: builder.query({
      query: (url?: string) => `admin/product${url ? url : ""}`,
    }),
    getProductsSelectList: builder.query({
      query: () => `admin/product/selectList`,
    }),

    getProductsUser: builder.query({
      query: (url?: string) => `user/product${url ? url : ""}`,
    }),

    getProductUser: builder.mutation({
      query: (id: string) => ({
        url: `user/product/${id}`,
        method: "GET",
      }),
    }),
    getProductAdmin: builder.mutation({
      query: (id: string) => ({
        url: `admin/product/${id}`,
        method: "GET",
      }),
    }),
    getProductsSuggestions: builder.query({
      query: () => `user/product/suggestions`,
    }),
    createProduct: builder.mutation({
      query: (productInfo: productType) => ({
        url: "/admin/product",
        method: "POST",
        body: productInfo,
      }),
    }),
    editProduct: builder.mutation({
      query: ({
        id,
        productInfo,
      }: {
        id: string;
        productInfo: productType;
      }) => ({
        url: `/admin/product/edit/${id}`,
        method: "POST",
        body: productInfo,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/admin/product/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetProductsAdminQuery,
  useGetProductsSelectListQuery,
  useGetProductAdminMutation,
  useGetProductsUserQuery,
  useGetProductUserMutation,
  useGetProductsSuggestionsQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = ProductApi;
