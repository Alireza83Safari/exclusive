import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appPicType } from "../../types/AppPic.type";

export const appPicApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "appPicApi",
  endpoints: (builder) => ({
    getAppPicsUser: builder.query({
      query: () => `user/appPic`,
    }),
    getAppPicsAdmin: builder.query({
      query: () => `admin/appPic`,
    }),
    getAppPic: builder.query({
      query: (id: string) => `admin/appPic/${id}`,
    }),

    createAppPic: builder.mutation({
      query: (appPicInfo: appPicType) => ({
        url: "/admin/appPic",
        method: "POST",
        body: appPicInfo,
      }),
    }),
    editAppPic: builder.mutation({
      query: ({ id, appPicInfo }: { id: string; appPicInfo: appPicType }) => ({
        url: `/admin/appPic/edit/${id}`,
        method: "POST",
        body: appPicInfo,
      }),
    }),
    deleteAppPic: builder.mutation({
      query: (id: string) => ({
        url: `/admin/appPic/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAppPicsAdminQuery,
  useGetAppPicsUserQuery,
  useGetAppPicQuery,
  useCreateAppPicMutation,
  useEditAppPicMutation,
  useDeleteAppPicMutation,
} = appPicApi;
