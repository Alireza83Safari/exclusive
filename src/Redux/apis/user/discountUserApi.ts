import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryUser } from "../../../services/axiosBaseQueryUser";

export const discountUserApi = createApi({
  baseQuery: axiosBaseQueryUser({ baseUrl: "/discount" }),
  reducerPath: "discountUserApi",
  endpoints: (builder) => ({
    getDiscounts: builder.query({
      query: () => ({ url: ``, method: "get" }),
    }),

    validateCopun: builder.mutation({
      query: (copun: string) => ({
        url: `/validate/code/${copun}`,
        method: "get",
      }),
    }),
  }),
});

export const { useGetDiscountsQuery, useValidateCopunMutation } =
  discountUserApi;
