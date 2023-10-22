import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addressType } from "../../types/Address.type";

export const addressApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  reducerPath: "addressApi",
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => `user/address`,
    }),
    getAddressWithId: builder.query({
      query: (id: string) => `user/address/${id}`,
    }),
    getAddressWithUserID: builder.query({
      query: (userId: string) => `admin/address/${userId}`,
    }),
    createAddress: builder.mutation({
      query: (addressInfo: addressType) => ({
        url: "/user/address",
        method: "POST",
        body: addressInfo,
      }),
    }),
    editAddress: builder.mutation({
      query: ({ id, addressInfo }: { id: string; addressInfo: addressType }) => ({
        url: `/user/address/edit/${id}`,
        method: "POST",
        body: addressInfo,
      }),
    }),
    deleteAddress: builder.mutation({
      query: (id: string) => ({
        url: `/user/address/delete/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useGetAddressWithIdQuery,
  useGetAddressWithUserIDQuery,
  useCreateAddressMutation,
  useEditAddressMutation,
  useDeleteAddressMutation,
} = addressApiSlice;
