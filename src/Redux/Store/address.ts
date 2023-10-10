import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminAxios } from "../../services/adminInterceptor";
import toast from "react-hot-toast";
import { userAxios } from "../../services/userInterceptor";
import {
  addressStateType,
  addressType,
  getAddressType,
} from "../../types/Address.type";

export const getAddress = createAsyncThunk(
  "addres/getWithId",
  async (id: string, { dispatch }) => {
    try {
      dispatch(addressSlice.actions.setLoading(true));
      const response = await userAxios.get(`/address/${id}`);
      if (response.status === 200) {
        dispatch(addressSlice.actions.setAddress(response.data));
        dispatch(addressSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(addressSlice.actions.setLoading(false));
    }
  }
);

export const getAddressWithUserId = createAsyncThunk(
        "addres/getWithuserId",
        async (userId: string, { dispatch }) => {
          try {
            dispatch(addressSlice.actions.setLoading(true));
            const response = await adminAxios.get(`/address/${userId}`);
            if (response.status === 200) {
              dispatch(addressSlice.actions.setAddressUserId(response.data));
              dispatch(addressSlice.actions.setLoading(false));
            }
          } catch (error) {
            dispatch(addressSlice.actions.setLoading(false));
          }
        }
      );

export const getAddresses = createAsyncThunk(
  "address/get",
  async (_, { dispatch }) => {
    try {
      dispatch(addressSlice.actions.setLoading(true));
      const response = await userAxios.get("/address");
      if (response.status === 200) {
        dispatch(addressSlice.actions.setAddresses(response.data));
        dispatch(addressSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(addressSlice.actions.setLoading(false));
    }
  }
);

export const addAddress = createAsyncThunk(
  "color/add",
  async (addressInfo: addressType, { dispatch }) => {
    try {
      dispatch(addressSlice.actions.setLoading(true));
      const response = await userAxios.post("/address", addressInfo);
      if (response.status === 200) {
        toast.success("add address is success");
        dispatch(addressSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(addressSlice.actions.setLoading(false));
    }
  }
);

export const editAddress = createAsyncThunk(
  "address/edit",
  async ({addressInfo , addressId}:{addressInfo: addressType , addressId:string} { dispatch }) => {
    try {
      dispatch(addressSlice.actions.setLoading(true));
      const response = await userAxios.post(`/address/edit/${addressId}`, addressInfo);
      if (response.status === 200) {
        toast.success("edit address is success");
        dispatch(addressSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(addressSlice.actions.setLoading(false));
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (addresId: string, { dispatch }) => {
    try {
      dispatch(addressSlice.actions.setLoading(true));
      const response = await adminAxios.post(`/address/delete/${addresId}`);
      if (response.status === 200) {
        toast.success("delete address is success");
        dispatch(addressSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(addressSlice.actions.setLoading(false));
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressLoading: false,
    address: {} as getAddressType, 
    addressUserId:  [] as getAddressType[],
    addresses: [] as getAddressType[],
  } as addressStateType,
  reducers: {
    setLoading: (state, action) => {
      state.addressLoading = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    setAddressUserId: (state, action) => {
        state.addressUserId = action.payload;
      },
  },
});

export default addressSlice.reducer;
