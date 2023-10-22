import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { categoryAdminType, editCategoryType } from "../../types/Category.type";

export const categoryApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "categoryApi",
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (url: string) => `admin/category${url}`,
    }),
    getCategorySelectList: builder.query({
      query: (url: string) => `user/category${url}`,
    }),
    getCategory: builder.query({
      query: (id: string) => `admin/category/${id}`,
    }),
    createCategory: builder.mutation({
      query: (categoryInfo: categoryAdminType) => ({
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
        categoryInfo: editCategoryType;
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
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
