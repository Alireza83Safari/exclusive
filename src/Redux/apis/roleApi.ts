import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { roleType } from "../../types/Role.type";

export const roleApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "roleApi",
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: (url: string) => `admin/role${url && `/${url}`}`,
    }),
    getRolePermissions: builder.query({
      query: () => `admin/role/permissions`,
    }),
    getRole: builder.mutation({
      query: (id: string) => ({
        url: `admin/role/${id}`,
        method: "GET",
      }),
    }),
    createRole: builder.mutation({
      query: (roleInfo) => ({
        url: `/admin/role`,
        method: "POST",
        body: roleInfo,
      }),
    }),

    editRole: builder.mutation({
      query: ({ id, roleInfo }: { id: string; roleInfo: roleType }) => ({
        url: `/admin/role/edit/${id}`,
        method: "POST",
        body: roleInfo,
      }),
    }),

    deleteRole: builder.mutation({
      query: (id: string) => ({
        url: `/admin/role/delete/${id}`,
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
} = roleApi;
