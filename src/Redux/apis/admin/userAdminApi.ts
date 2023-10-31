import { createApi } from "@reduxjs/toolkit/query/react";
import { userType } from "../../../types/user.type";
import { axiosBaseQueryAdmin } from "../../../services/axiosBaseQueryAdmin";

export const userAdminApi = createApi({
  baseQuery: axiosBaseQueryAdmin({ baseUrl: "/user" }),
  reducerPath: "userAdminApi",
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: () => ({ url: "", method: "get" }),
    }),
    getUser: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "get",
      }),
    }),
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: ``,
        method: "POST",
        data: userInfo,
      }),
    }),
    editUser: builder.mutation({
      query: ({ id, userInfo }: { id: string; userInfo: userType }) => ({
        url: `/edit/${id}`,
        method: "POST",
        data: userInfo,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
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
} = userAdminApi;
