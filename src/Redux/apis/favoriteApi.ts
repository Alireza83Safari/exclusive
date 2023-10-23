import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const favoriteApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "favoriteApi",
  endpoints: (builder) => ({
    getFavoriteProductItem: builder.mutation({
      query: (id: string) => ({
        url: `user/favoriteProductItem/isFavorite/${id}`,
        method: "GET",
      }),
    }),

    createFavorite: builder.mutation({
      query: (itemId: string) => ({
        url: "/user/favoriteProductItem",
        method: "POST",
        body: itemId,
      }),
    }),

    deleteFavorite: builder.mutation({
      query: (id: string) => ({
        url: `/user/favoriteProductItem/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetFavoriteProductItemMutation,
  useDeleteFavoriteMutation,
  useCreateFavoriteMutation,
} = favoriteApi;
