import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryAdmin } from "../../../services/axiosBaseQueryAdmin";
import { changeCommentStatus } from "../../../types/comment";

export const commentAdminApi = createApi({
  baseQuery: axiosBaseQueryAdmin({ baseUrl: "/comment" }),
  reducerPath: "commentAdminApi",
  endpoints: (builder) => ({
    getCommentsAdmin: builder.query({
      query: () => ({ url: ``, method: "get" }),
    }),

    changeCommentStatus: builder.mutation({
      query: ({
        id,
        commentInfo,
      }: {
        id: string;
        commentInfo: changeCommentStatus;
      }) => ({
        url: `/changeStatus/${id}`,
        method: "POST",
        data: commentInfo,
      }),
    }),
  }),
});

export const { useGetCommentsAdminQuery, useChangeCommentStatusMutation } =
  commentAdminApi;
