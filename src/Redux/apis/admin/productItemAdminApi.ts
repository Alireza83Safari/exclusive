import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryAdmin } from "../../../services/axiosBaseQueryAdmin";
import { productItemProduct, productItem } from "../../../types/productItem";

export const productItemAdminApi = createApi({
  baseQuery: axiosBaseQueryAdmin({ baseUrl: "/productItem" }),
  reducerPath: "productItemAdminApi",
  endpoints: (builder) => ({
    getProductItemAdmin: builder.mutation({
      query: (productId: string) => ({
        url: `/product/${productId}`,
        method: "get",
      }),
    }),

    getProductItemSelectList: builder.query({
      query: (productId: string) => ({
        url: `/selectList/${productId}`,
        method: "get",
      }),
    }),

    createProductItem: builder.mutation({
      query: (item: productItemProduct) => ({
        url: "",
        method: "POST",
        data: item,
      }),
    }),

    editProductItem: builder.mutation({
      query: ({ id, itemInfo }: { id: string; itemInfo: productItem }) => ({
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
  useGetProductItemAdminMutation,
  useGetProductItemSelectListQuery,
  useCreateProductItemMutation,
  useEditProductItemMutation,
  useDeleteProductItemMutation,
} = productItemAdminApi;
