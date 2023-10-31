import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryAdmin } from "../../../services/axiosBaseQueryAdmin";

export const addressAdminApi = createApi({
  baseQuery: axiosBaseQueryAdmin({ baseUrl: "/address" }),
  reducerPath: "addressAdminApi",
  endpoints: (builder) => ({
    getAddressWithUserID: builder.query({
      query: (userId: string) => ({
        url: `admin/${userId}`,
        method: "get",
      }),
    }),
  }),
});

export const { useGetAddressWithUserIDQuery } = addressAdminApi;
