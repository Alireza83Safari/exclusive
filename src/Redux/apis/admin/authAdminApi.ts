import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryAdmin } from "../../../services/axiosBaseQueryAdmin";
import { userLogin } from "../../../types/auth";

export const authAdminApi = createApi({
  baseQuery: axiosBaseQueryAdmin({
    baseUrl: "",
  }),
  reducerPath: "authAdminApi",
  endpoints: (builder) => ({
    adminIsAuthenticated: builder.query({
      query: () => ({
        url: "/is_authenticated",
        method: "get",
      }),
    }),
    adminLogout: builder.query({
      query: () => ({
        url: "/logout",
        method: "get",
      }),
    }),
    adminLogin: builder.mutation({
      query: (infos: userLogin) => ({
        url: "/login",
        method: "post",
        data: infos,
      }),
    }),
  }),
});

export const {
  useAdminIsAuthenticatedQuery,
  useAdminLogoutQuery,
  useAdminLoginMutation,
} = authAdminApi;
