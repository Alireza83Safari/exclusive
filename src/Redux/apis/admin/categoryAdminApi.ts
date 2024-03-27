import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryAdmin } from "../../../services/axiosBaseQueryAdmin";
import { category } from "../../../types/category";

export const categoryAdminApi = createApi({
  baseQuery: axiosBaseQueryAdmin({ baseUrl: "category" }),
  reducerPath: "categoryAdminApi",
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (url: string) => ({ url: `${url}`, method: "get" }),
    }),

    getCategory: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "get",
      }),
    }),
    createCategory: builder.mutation({
      query: (categoryInfo: category) => ({
        url: ``,
        method: "post",
        data: categoryInfo,
      }),
    }),
    editCategory: builder.mutation({
      query: ({
        id,
        categoryInfo,
      }: {
        id: string;
        categoryInfo: category;
      }) => ({
        url: `/edit/${id}`,
        method: "post",
        data: categoryInfo,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "post",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryMutation,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoryAdminApi;
