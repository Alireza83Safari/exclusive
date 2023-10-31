import { createApi } from "@reduxjs/toolkit/query/react";
import { colorType } from "../../../types/Color.type";
import { axiosBaseQueryAdmin } from "../../../services/axiosBaseQueryAdmin";

export const colorAdminApi = createApi({
  baseQuery: axiosBaseQueryAdmin({ baseUrl: "/color" }),
  reducerPath: "colorAdminApi",
  endpoints: (builder) => ({
    getColors: builder.query({
      query: () => ({ url: ``, method: "get" }),
    }),
    getColor: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    createColor: builder.mutation({
      query: (colorInfo: colorType) => ({
        url: "",
        method: "POST",
        data: colorInfo,
      }),
    }),
    editColor: builder.mutation({
      query: ({ id, colorInfo }: { id: string; colorInfo: colorType }) => ({
        url: `/edit/${id}`,
        method: "POST",
        data: colorInfo,
      }),
    }),
    deleteColor: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetColorsQuery,
  useGetColorMutation,
  useCreateColorMutation,
  useEditColorMutation,
  useDeleteColorMutation,
} = colorAdminApi;
