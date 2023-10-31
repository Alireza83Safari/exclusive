import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryAdmin } from "../../../services/axiosBaseQueryAdmin";

export const profileAdminApi = createApi({
  baseQuery: axiosBaseQueryAdmin({ baseUrl: "/profile" }),
  reducerPath: "profileApi",
  endpoints: (builder) => ({
    getProfileOrdersAdmin: builder.query({
      query: (userId: string) => ({
        url: `/orders/${userId}`,
        method: "get",
      }),
    }),

    getProfileFavoritesAdmin: builder.query({
      query: (userId: string) => ({
        url: `/favoriteProducts/${userId}`,
        method: "get",
      }),
    }),
  }),
});

export const {
  useGetProfileOrdersAdminQuery,
  useGetProfileFavoritesAdminQuery,
} = profileAdminApi;
