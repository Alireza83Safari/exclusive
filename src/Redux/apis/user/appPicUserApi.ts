import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryUser } from "../../../services/axiosBaseQueryUser";

export const appPicUserApi = createApi({
  baseQuery: axiosBaseQueryUser({ baseUrl: "/appPic" }),
  reducerPath: "appPicUserApi",
  endpoints: (builder) => ({
    getAppPicsUser: builder.query({
      query: () => ({ url: "", method: "get" }),
    }),
  }),
});

export const { useGetAppPicsUserQuery } = appPicUserApi;
