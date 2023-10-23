import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { productType } from "../../types/Product.type";

export const ProductApi= createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "productApi",
  endpoints: (builder) => ({
    getProductsAdmin: builder.query({
      query: (url?: string) => `admin/product${url ? url : ""}`,
    }),
    getProductsSelectList: builder.query({
      query: () => `admin/product/selectList`,
    }),
    getProductAdmin: builder.query({
      query: (id: string) => `admin/product/${id}`,
    }),
    getProductsUser: builder.query({
      query: (url?: string) => `user/product${url ? url : ""}`,
    }),
    getProductUser: builder.query({
      query: (id: string) => `user/product/${id}`,
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
  useGetProductAdminQuery,
  useGetProductsUserQuery,
  useGetProductUserQuery,
  useGetProductsSuggestionsQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = ProductApi;
