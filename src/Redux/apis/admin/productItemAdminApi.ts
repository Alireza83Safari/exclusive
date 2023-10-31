import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  productItemProductType,
  productItemType,
} from "../../../types/ProductItem.type";
import { axiosBaseQueryAdmin } from "../../../services/axiosBaseQueryAdmin";

export const productItemAdminApi = createApi({
  baseQuery: axiosBaseQueryAdmin({ baseUrl: "/productItem" }),
  reducerPath: "productItemAdminApi",
  endpoints: (builder) => ({
    getProductItemAdmin: builder.query({
      query: (productId: string) => ({
        url: `/product/${productId}`,
        method: "get",
      }),
    }),

    getProductItemSelectList: builder.query({
      query: (productId: string) => `/selectList/${productId}`,
    }),

    createProductItem: builder.mutation({
      query: (item: productItemProductType) => ({
        url: "",
        method: "POST",
        data: item,
      }),
    }),

    editProductItem: builder.mutation({
      query: ({ id, itemInfo }: { id: string; itemInfo: productItemType }) => ({
        url: `/edit/${id}`,
        method: "POST",
        data: itemInfo,
      }),
    }),

    deleteProductItem: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetProductItemAdminQuery,
  useGetProductItemSelectListQuery,
  useCreateProductItemMutation,
  useEditProductItemMutation,
  useDeleteProductItemMutation,
} = productItemAdminApi;
