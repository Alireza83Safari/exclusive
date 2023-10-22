import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { brandType } from "../../types/Brand.type";

export const brandApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "brandApi",
  endpoints: (builder) => ({
    getBrandsAdmin: builder.query({
      query: (url: string) => `admin/brand${url ? url : ""}`,
    }),
    getBrandsUser: builder.query({
      query: (url: string) => `user/brand${url ? url : ""}`,
    }),
    getBrandsSelectList: builder.query({
      query: (url: string) => `user/brand/selectList${url ? url : ""}`,
    }),
    getBrand: builder.query({
      query: (id: string) => `admin/brand/${id}`,
    }),
    createBrand: builder.mutation({
      query: (brandInfo: brandType) => ({
        url: "/admin/brand",
        method: "POST",
        body: brandInfo,
      }),
    }),
    editBrand: builder.mutation({
      query: ({ id, brandInfo }: { id: string; brandInfo: brandType }) => ({
        url: `/admin/brand/edit/${id}`,
        method: "POST",
        body: brandInfo,
      }),
    }),
    deleteBrand: builder.mutation({
      query: (id: string) => ({
        url: `/admin/brand/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetBrandsAdminQuery,
  useGetBrandsUserQuery,
  useGetBrandsSelectListQuery,
  useGetBrandQuery,
  useCreateBrandMutation,
  useEditBrandMutation,
  useDeleteBrandMutation,
} = brandApiSlice;
