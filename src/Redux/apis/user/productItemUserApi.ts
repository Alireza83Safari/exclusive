import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryUser } from "../../../services/axiosBaseQueryUser";

export const productItemUserApi = createApi({
  baseQuery: axiosBaseQueryUser({ baseUrl: "/productItem" }),
  reducerPath: "productItemUserApi",
  endpoints: (builder) => ({
    getProductItemUser: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductItemUserMutation } = productItemUserApi;
