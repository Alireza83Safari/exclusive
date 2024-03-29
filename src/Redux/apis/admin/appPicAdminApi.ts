import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryAdmin } from "../../../services/axiosBaseQueryAdmin";
import { appPic } from "../../../types/appPic";

export const appPicAdminApi = createApi({
  baseQuery: axiosBaseQueryAdmin({ baseUrl: "/appPic" }),
  reducerPath: "appPicAdminApi",
  endpoints: (builder) => ({
    getAppPic: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "get",
      }),
    }),
    createAppPic: builder.mutation({
      query: (appPicInfo: appPic) => ({
        url: "",
        method: "POST",
        data: appPicInfo,
      }),
    }),
    editAppPic: builder.mutation({
      query: ({ id, appPicInfo }: { id: string; appPicInfo: appPic }) => ({
        url: `/edit/${id}`,
        method: "POST",
        data: appPicInfo,
      }),
    }),
    deleteAppPic: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAppPicMutation,
  useCreateAppPicMutation,
  useEditAppPicMutation,
  useDeleteAppPicMutation,
} = appPicAdminApi;
