import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { colorType } from "../../types/Color.type";

export const colorApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "colorApi",
  endpoints: (builder) => ({
    getColors: builder.query({
      query: () => `admin/color`,
    }),
    getColorsSelectList: builder.query({
      query: () => `/user/color/selectList`,
    }),
    getColor: builder.query({
      query: (id: string) => `admin/color/${id}`,
    }),
    createColor: builder.mutation({
      query: (colorInfo: colorType) => ({
        url: "/admin/color",
        method: "POST",
        body: colorInfo,
      }),
    }),
    editColor: builder.mutation({
      query: ({ id, colorInfo }: { id: string; colorInfo: colorType }) => ({
        url: `/admin/color/edit/${id}`,
        method: "POST",
        body: colorInfo,
      }),
    }),
    deleteColor: builder.mutation({
      query: (id: string) => ({
        url: `/admin/color/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetColorsQuery,
  useGetColorsSelectListQuery,
  useGetColorQuery,
  useCreateColorMutation,
  useEditColorMutation,
  useDeleteColorMutation,
} = colorApi;
