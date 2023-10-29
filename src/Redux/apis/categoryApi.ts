import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { categoryType } from "../../types/Category.type";

export const categoryApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "categoryApi",
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (url: string) => `admin/category${url}`,
    }),
    getCategorySelectList: builder.query({
      query: (url: string) => `user/category/selectList${url}`,
    }),

    getCategory: builder.mutation({
      query: (id: string) => ({
        url: `admin/category/${id}`,
        method: "Get",
      }),
    }),
    createCategory: builder.mutation({
      query: (categoryInfo: categoryType) => ({
        url: "/admin/category",
        method: "POST",
        body: categoryInfo,
      }),
    }),
    editCategory: builder.mutation({
      query: ({
        id,
        categoryInfo,
      }: {
        id: string;
        categoryInfo: categoryType;
      }) => ({
        url: `/admin/category/edit/${id}`,
        method: "POST",
        body: categoryInfo,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/admin/category/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategorySelectListQuery,
  useGetCategoryMutation,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
