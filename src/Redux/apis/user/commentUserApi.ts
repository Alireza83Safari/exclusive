import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryUser } from "../../../services/axiosBaseQueryUser";
import { commentType } from "../../../types/Comment.type";

export const commentUserApi = createApi({
  baseQuery: axiosBaseQueryUser({ baseUrl: "/comment" }),
  reducerPath: "commentUserApi",
  endpoints: (builder) => ({
    getCommentsUser: builder.query({
      query: (url: string) => ({ url: `${url}`, method: "get" }),
    }),
    getCommentsProudct: builder.query({
      query: (productId: string) => ({
        url: `/product/${productId}`,
        method: "get",
      }),
    }),

    getComment: builder.mutation({
      query: (id: string) => ({ url: `/${id}`, method: "get" }),
    }),
    createComment: builder.mutation({
      query: (commentInfo: commentType) => ({
        url: "",
        method: "POST",
        data: commentInfo,
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
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = commentUserApi;
