import { createApi } from "@reduxjs/toolkit/query/react";
import { address } from "../../../types/address";
import { axiosBaseQueryUser } from "../../../services/axiosBaseQueryUser";

export const addressUserApi = createApi({
  baseQuery: axiosBaseQueryUser({ baseUrl: "/address" }),
  reducerPath: "addressUserApi",
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => ({ url: "", method: "get" }),
    }),
    getAddressWithId: builder.query({
      query: (id: string) => ({ url: `/${id}`, method: "get" }),
    }),

    createAddress: builder.mutation({
      query: (addressInfo: address) => ({
        url: "",
        method: "POST",
        data: addressInfo,
      }),
    }),

    editAddress: builder.mutation({
      query: ({ id, addressInfo }: { id: string; addressInfo: address }) => ({
        url: `/edit/${id}`,
        method: "POST",
        data: addressInfo,
      }),
    }),
    deleteAddress: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useGetAddressWithIdQuery,
  useCreateAddressMutation,
  useEditAddressMutation,
  useDeleteAddressMutation,
} = addressUserApi;
