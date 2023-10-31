import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryUser } from "../../../services/axiosBaseQueryUser";

export const colorUserApi = createApi({
  baseQuery: axiosBaseQueryUser({ baseUrl: "/color" }),
  reducerPath: "colorUserApi",
  endpoints: (builder) => ({
    getColorsSelectList: builder.query({
      query: () => ({ url: `/selectList`, method: "get" }),
    }),
  }),
});

export const { useGetColorsSelectListQuery } = colorUserApi;
