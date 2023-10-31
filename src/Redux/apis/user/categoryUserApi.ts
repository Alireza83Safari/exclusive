import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryUser } from "../../../services/axiosBaseQueryUser";

export const categoryUserApi = createApi({
  baseQuery: axiosBaseQueryUser({
    baseUrl: "/category",
  }),
  reducerPath: "categoryUserApi",
  endpoints: (builder) => ({
    getCategorySelectList: builder.query({
      query: (url: string) => ({
        url: `/selectList${url}`,
        method: "get",
      }),
    }),
  }),
});

export const { useGetCategorySelectListQuery } = categoryUserApi;
