import { createApi } from "@reduxjs/toolkit/query/react";
import { brandType } from "../../../types/Brand.type";
import { axiosBaseQueryAdmin } from "../../../services/axiosBaseQueryAdmin";

export const brandAdminApi = createApi({
  baseQuery: axiosBaseQueryAdmin({
    baseUrl: "/brand",
  }),
  reducerPath: "brandAdminApi",
  endpoints: (builder) => ({
    getBrandsAdmin: builder.query({
      query: (url: string) => ({
        url: `${url ? url : ""}`,
        method: "get",
      }),
    }),

    getBrand: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    createBrand: builder.mutation({
      query: (brandInfo: brandType) => ({
        url: ``,
        method: "POST",
        data: brandInfo,
      }),
    }),
    editBrand: builder.mutation({
      query: ({ id, brandInfo }: { id: string; brandInfo: brandType }) => ({
        url: `/edit/${id}`,
        method: "POST",
        data: brandInfo,
      }),
    }),

    deleteBrand: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetBrandsAdminQuery,
  useGetBrandMutation,
  useCreateBrandMutation,
  useEditBrandMutation,
  useDeleteBrandMutation,
} = brandAdminApi;
