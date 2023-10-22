import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  productItemProductType,
  productItemType,
} from "../../types/ProductItem.type";

export const productItemApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "productItemApi",
  endpoints: (builder) => ({
    getProductItemAdmin: builder.query({
      query: (productId: string) => `admin/productItem/product/${productId}`,
    }),

    getProductItemSelectList: builder.query({
      query: (productId: string) => `admin/productItem/selectList/${productId}`,
    }),

    getProductItemUser: builder.query({
      query: (id: string) => `user/productItem/${id}`,
    }),

    createProductItem: builder.mutation({
      query: (item: productItemProductType) => ({
        url: "/admin/productItem",
        method: "POST",
        body: item,
      }),
    }),

    editProductItem: builder.mutation({
      query: ({ id, itemInfo }: { id: string; itemInfo: productItemType }) => ({
        url: `/admin/productItem/edit/${id}`,
        method: "POST",
        body: itemInfo,
      }),
    }),

    deleteProductItem: builder.mutation({
      query: (id: string) => ({
        url: `/admin/productItem/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetProductItemAdminQuery,
  useGetProductItemSelectListQuery,
  useGetProductItemUserQuery,
  useCreateProductItemMutation,
  useEditProductItemMutation,
  useDeleteProductItemMutation,
} = productItemApiSlice;
