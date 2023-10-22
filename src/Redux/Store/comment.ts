import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { commentType } from "../../types/Comment.type";

export const commentApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "commentApi",
  endpoints: (builder) => ({
    getCommentsAdmin: builder.query({
      query: (url: string) => `admin/comment${url}`,
    }),
    getCommentsUser: builder.query({
      query: (url: string) => `user/comment${url}`,
    }),
    getCommentsProudct: builder.query({
      query: (productId: string) => `user/comment/product/${productId}`,
    }),
    getComment: builder.query({
      query: (id: string) => `user/comment/${id}`,
    }),
    createComment: builder.mutation({
      query: (commentInfo: commentType) => ({
        url: "/user/comment",
        method: "POST",
        body: commentInfo,
      }),
    }),
    editComment: builder.mutation({
      query: ({
        id,
        commentInfo,
      }: {
        id: string;
        commentInfo: commentType;
      }) => ({
        url: `/user/comment/edit/${id}`,
        method: "POST",
        body: commentInfo,
      }),
    }),
    deleteComment: builder.mutation({
      query: (id: string) => ({
        url: `/user/comment/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCommentsAdminQuery,
  useGetCommentsUserQuery,
  useGetCommentQuery,
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = commentApiSlice;
