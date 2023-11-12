import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryUser } from "../../../services/axiosBaseQueryUser";

export const brandUserApi = createApi({
  baseQuery: axiosBaseQueryUser({
    baseUrl: "",
  }),
  reducerPath: "brandUserApi",
  endpoints: (builder) => ({
    getBrandsUser: builder.query({
      query: (url: string) => ({
        url: `/brand${url ? url : ""}`,
        method: "get",
      }),
    }),
    getBrandsSelectList: builder.query({
      query: (url: string) => ({
        url: `/brand/selectList${url ? url : ""}`,
        method: "get",
      }),
    }),

    addBrandImage: builder.mutation({
      query: ({ itemId, image }: { itemId: string; image: any }) => ({
        url: `/file/uploadImage/${itemId}/2`,
        method: "POST",
        data: image,
        "Content-Type": "multipart/form-data",
      }),
    }),
  }),
});

export const {
  useGetBrandsUserQuery,
  useGetBrandsSelectListQuery,
  useAddBrandImageMutation,
} = brandUserApi;
