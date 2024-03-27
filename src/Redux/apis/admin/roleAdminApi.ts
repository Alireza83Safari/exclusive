import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryAdmin } from "../../../services/axiosBaseQueryAdmin";
import { role } from "../../../types/role";

export const roleAdminApi = createApi({
  baseQuery: axiosBaseQueryAdmin({ baseUrl: "/role" }),
  reducerPath: "roleAdminApi",
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: (url: string) => ({ url: `${url && `/${url}`}`, method: "get" }),
    }),
    getRolePermissions: builder.query({
      query: () => ({ url: `/permissions`, method: "get" }),
    }),
    getRole: builder.mutation({
      query: (id: string) => ({ url: `/${id}`, method: "get" }),
    }),
    createRole: builder.mutation({
      query: (roleInfo) => ({
        url: ``,
        method: "POST",
        data: roleInfo,
      }),
    }),

    editRole: builder.mutation({
      query: ({ id, roleInfo }: { id: string; roleInfo: role }) => ({
        url: `/edit/${id}`,
        method: "POST",
        data: roleInfo,
      }),
    }),

    deleteRole: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRolePermissionsQuery,
  useGetRoleMutation,
  useCreateRoleMutation,
  useEditRoleMutation,
  useDeleteRoleMutation,
} = roleAdminApi;
