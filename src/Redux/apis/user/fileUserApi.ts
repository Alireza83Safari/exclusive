import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryUser } from "../../../services/axiosBaseQueryUser";

export const fileUserApi = createApi({
  baseQuery: axiosBaseQueryUser({ baseUrl: "/file" }),
  reducerPath: "fileUserApi",
  endpoints: (builder) => ({
    getFileStream: builder.query({
      query: (fileId: string) => ({ url: `/stream/${fileId}`, method: "get" }),
    }),

    getFile: builder.query({
      query: (fileId: string) => ({
        url: `/${fileId}`,
        method: "get",
      }),
    }),

    getFileItemId: builder.mutation({
      query: ({ itemId, fileType }: { itemId: string; fileType: number }) => ({
        url: `/${itemId}/${fileType}`,
        method: "get",
      }),
    }),

    uploadImage: builder.mutation({
      query: ({
        itemId,
        fileType,
        images,
      }: {
        itemId: string;
        fileType: number;
        images: any;
      }) => ({
        url: `/uploadImage/${itemId}/${fileType}`,
        method: "POST",
        data: images,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),

    changeImagePriority: builder.mutation({
      query: ({
        itemId,
        fileId,
        priority,
      }: {
        itemId: string;
        priority: number;
        fileId: string;
      }) => ({
        url: `/changePriority/${fileId}/${itemId}/${priority}`,
        method: "POST",
      }),
    }),

    deleteImage: builder.mutation({
      query: (fileId: string) => ({
        url: `/delete/${fileId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetFileStreamQuery,
  useGetFileQuery,
  useGetFileItemIdMutation,
  useUploadImageMutation,
  useChangeImagePriorityMutation,
  useDeleteImageMutation,
} = fileUserApi;
