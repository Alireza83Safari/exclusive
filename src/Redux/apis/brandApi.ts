import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { brandType } from "../../types/Brand.type";

export const brandApi = createApi({
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

    getBrand: builder.mutation({
      query: (id: string) => ({
        url: `admin/brand/${id}`,
        method: "POST",
      }),
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
    addBrandImage: builder.mutation({
      query: ({ itemId, image }: { itemId: string; image: any }) => ({
        url: `/user/file/uploadImage/${itemId}/2`,
        method: "POST",
        body: image,
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
  useGetBrandMutation,
  useCreateBrandMutation,
  useEditBrandMutation,
  useDeleteBrandMutation,
  useAddBrandImageMutation,
} = brandApi;
