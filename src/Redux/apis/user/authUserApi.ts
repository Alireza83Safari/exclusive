import { createApi } from "@reduxjs/toolkit/query/react";
import {
  recoveryPasswordType,
  setNewPasswordType,
  userLoginType,
  userRegisterType,
} from "../../../types/Auth.type";
import { axiosBaseQueryUser } from "../../../services/axiosBaseQueryUser";

export const authUserApi = createApi({
  baseQuery: axiosBaseQueryUser({
    baseUrl: "",
  }),
  reducerPath: "authUserApi",
  endpoints: (builder) => ({
    userIsAuthenticated: builder.query({
      query: () => ({
        url: "/is_authenticated",
        method: "get",
      }),
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "get",
      }),
    }),
    userLogin: builder.mutation({
      query: (infos: userLoginType) => ({
        url: "/login",
        method: "post",
        data: infos,
      }),
    }),
    userRegister: builder.mutation({
      query: (infos: userRegisterType) => ({
        url: "/register",
        method: "post",
        data: infos,
      }),
    }),
    recoveryPassword: builder.mutation({
      query: (infos: recoveryPasswordType) => ({
        url: "/recoveryPasword",
        method: "post",
        data: infos,
      }),
    }),
    setNewPassword: builder.mutation({
      query: ({
        paswordInfo,
        key,
      }: {
        paswordInfo: setNewPasswordType;
        key: string;
      }) => ({
        url: `/recoveryPasword/${key}`,
        method: "post",
        data: paswordInfo,
      }),
    }),
  }),
});

export const {
  useUserIsAuthenticatedQuery,
  useUserLogoutMutation,
  useUserLoginMutation,
  useUserRegisterMutation,
  useRecoveryPasswordMutation,
} = authUserApi;
