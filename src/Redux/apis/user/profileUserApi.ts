import { createApi } from "@reduxjs/toolkit/query/react";
import { profileUserInfo } from "../../../types/profile";
import { axiosBaseQueryUser } from "../../../services/axiosBaseQueryUser";

export const profileUserApi = createApi({
  baseQuery: axiosBaseQueryUser({ baseUrl: "/profile" }),
  reducerPath: "profileUserApi",
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({ url: "", method: "get" }),
    }),

    getProfileOrdersUser: builder.query({
      query: () => ({ url: `/orders`, method: "get" }),
    }),

    getProfileFavoritesUser: builder.query({
      query: () => ({ url: `/favoriteProducts`, method: "get" }),
    }),
    editProfile: builder.mutation({
      query: (userInfo: profileUserInfo) => ({
        url: "/edit",
        method: "POST",
        data: JSON.stringify(userInfo),
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetProfileOrdersUserQuery,
  useGetProfileFavoritesUserQuery,
  useEditProfileMutation,
} = profileUserApi;
