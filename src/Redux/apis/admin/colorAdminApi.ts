import { createApi } from "@reduxjs/toolkit/query/react";
import { color } from "../../../types/color";
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
      query: (colorInfo: color) => ({
        url: "",
        method: "POST",
        data: colorInfo,
      }),
    }),
    editColor: builder.mutation({
      query: ({ id, colorInfo }: { id: string; colorInfo: color }) => ({
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
