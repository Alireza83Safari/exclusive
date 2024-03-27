import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryUser } from "../../../services/axiosBaseQueryUser";
import { comment } from "../../../types/comment";

export const commentUserApi = createApi({
  baseQuery: axiosBaseQueryUser({ baseUrl: "/comment" }),
  reducerPath: "commentUserApi",
  endpoints: (builder) => ({
    getCommentsUser: builder.query({
      query: (url: string) => ({ url: `${url}`, method: "get" }),
    }),

    getCommentsProudct: builder.mutation({
      query: (productId: string) => ({
        url: `/product/${productId}`,
        method: "get",
      }),
    }),

    getComment: builder.mutation({
      query: (id: string) => ({ url: `/${id}`, method: "get" }),
    }),
    createComment: builder.mutation({
      query: (commentInfo: comment) => ({
        url: "",
        method: "POST",
        data: commentInfo,
      }),
    }),

    editComment: builder.mutation({
      query: ({ id, commentInfo }: { id: string; commentInfo: comment }) => ({
        url: `/edit/${id}`,
        method: "POST",
        data: commentInfo,
      }),
    }),
    deleteComment: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCommentsUserQuery,
  useGetCommentsProudctMutation,
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = commentUserApi;
