import { createApi } from "@reduxjs/toolkit/query/react";
import { productType } from "../../../types/Product.type";
import { axiosBaseQueryAdmin } from "../../../services/axiosBaseQueryAdmin";

export const productAdminApi = createApi({
  baseQuery: axiosBaseQueryAdmin({ baseUrl: "/product" }),
  reducerPath: "productAdminApi",
  endpoints: (builder) => ({
    getProductsAdmin: builder.query({
      query: (url?: string) => ({
        url: `${url ? url : ""}`,
        method: "get",
      }),
    }),

    getProductsSelectList: builder.query({
      query: () => ({ url: `/selectList`, method: "get" }),
    }),

    getProductAdmin: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "get",
      }),
    }),

    createProduct: builder.mutation({
      query: (productInfo: productType) => ({
        url: "",
        method: "POST",
        data: productInfo,
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
        url: `/edit/${id}`,
        method: "POST",
        data: productInfo,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetProductsAdminQuery,
  useGetProductsSelectListQuery,
  useGetProductAdminMutation,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productAdminApi;
