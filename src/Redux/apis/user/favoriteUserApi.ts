import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryUser } from "../../../services/axiosBaseQueryUser";

export const favoriteUserApi = createApi({
  baseQuery: axiosBaseQueryUser({ baseUrl: "/favoriteProductItem" }),
  reducerPath: "favoriteUserApi",
  endpoints: (builder) => ({
    getFavoriteProductItem: builder.mutation({
      query: (id: string) => ({
        url: `/isFavorite/${id}`,
        method: "GET",
      }),
    }),

    createFavorite: builder.mutation({
      query: (itemId: string) => ({
        url: "",
        method: "POST",
        data: itemId,
      }),
    }),

    deleteFavorite: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetFavoriteProductItemMutation,
  useDeleteFavoriteMutation,
  useCreateFavoriteMutation,
} = favoriteUserApi;
