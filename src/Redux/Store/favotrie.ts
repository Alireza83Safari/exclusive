import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const favoriteApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "favoriteApi",
  endpoints: (builder) => ({
    getFavoriteProductItem: builder.query({
      query: (id: string) => `user/favoriteProductItem/isFavorite/${id}`,
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
  useGetFavoriteProductItemQuery,
  useDeleteFavoriteMutation,
  useCreateFavoriteMutation,
} = favoriteApiSlice;
