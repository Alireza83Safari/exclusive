import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userType } from "../../types/user.type";

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "userApi",
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: () => `admin/user`,
    }),
    getUser: builder.mutation({
      query: (id: string) => ({
        url: `admin/user/${id}`,
        method: "GET",
      }),
    }),
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: `/admin/user`,
        method: "POST",
        body: userInfo,
      }),
    }),
    editUser: builder.mutation({
      query: ({ id, userInfo }: { id: string; userInfo: userType }) => ({
        url: `/admin/user/edit/${id}`,
        method: "POST",
        body: userInfo,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/admin/user/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetUserListQuery,
  useGetUserMutation,
  useCreateUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApi;
