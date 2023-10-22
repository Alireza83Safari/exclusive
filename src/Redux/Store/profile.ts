import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { profileUserInfo } from "../../types/Profile.type";

export const profileApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "profileApi",
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => `user/profile`,
    }),
    getProfileOrdersAdmin: builder.query({
      query: (userId: string) => `admin/profile/orders/${userId}`,
    }),
    getProfileOrdersUser: builder.query({
      query: () => `user/profile/orders`,
    }),
    getProfileFavoritesAdmin: builder.query({
      query: (userId: string) => `admin/profile/favoriteProducts/${userId}`,
    }),
    getProfileFavoritesUser: builder.query({
      query: () => `user/profile/favoriteProducts`,
    }),
    editProfile: builder.mutation({
      query: (userInfo: profileUserInfo) => ({
        url: "/user/profile/edit",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const {
  useGetProfileOrdersAdminQuery,
  useGetProfileQuery,
  useGetProfileOrdersUserQuery,
  useGetProfileFavoritesAdminQuery,
  useGetProfileFavoritesUserQuery,
  useEditProfileMutation,
} = profileApiSlice;
