import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAxios } from "../../services/userInterceptor";
import toast from "react-hot-toast";
import {
  addOrderItemType,
  orderAdminType,
  orderStateType,
  orderUserType,
} from "../../types/Order.type";
import { adminAxios } from "../../services/adminInterceptor";

export const getOrderUser = createAsyncThunk(
  "order/user",
  async (_, { dispatch }) => {
    try {
      dispatch(orderSlice.actions.setOrderLoading(true));
      const response = await userAxios.get(`order`);
      if (response.status === 200) {
        dispatch(orderSlice.actions.setUserOrders(response.data.item));
        dispatch(orderSlice.actions.setOrderLoading(false));
      }
    } catch (error) {
      dispatch(orderSlice.actions.setOrderLoading(false));
    }
  }
);

export const getOrderAdmin = createAsyncThunk(
  "order/admin",
  async (_, { dispatch }) => {
    try {
      dispatch(orderSlice.actions.setOrderLoading(true));
      const response = await adminAxios.get(`order`);
      if (response.status === 200) {
        dispatch(orderSlice.actions.setAdminOrders(response.data.data));
        dispatch(orderSlice.actions.setOrderLoading(false));
      }
    } catch (error) {
      dispatch(orderSlice.actions.setOrderLoading(false));
    }
  }
);

export const addOrder = createAsyncThunk(
  "order/add",
  async (addressId: string, { dispatch }) => {
    try {
      dispatch(orderSlice.actions.setOrderLoading(true));
      const response = await userAxios.post(`order/checkout/${addressId}`);
      if (response.status === 200) {
        toast.success("add order is success");
        dispatch(orderSlice.actions.setOrderLoading(false));
      }
    } catch (error) {
      dispatch(orderSlice.actions.setOrderLoading(false));
    }
  }
);

export const addOrderItem = createAsyncThunk(
  "orderItem/add",
  async (orderItemInfo: addOrderItemType, { dispatch }) => {
    try {
      dispatch(orderSlice.actions.setOrderLoading(true));
      const response = await userAxios.post("orderItem", orderItemInfo);
      if (response.status === 200) {
        toast.success("add orderItem is success");
        dispatch(orderSlice.actions.setOrderLoading(false));
      }
    } catch (error) {
      dispatch(orderSlice.actions.setOrderLoading(false));
    }
  }
);

export const deleteOrderItem = createAsyncThunk(
  "orderItem/delete",
  async (productItemId: string, { dispatch }) => {
    try {
      dispatch(orderSlice.actions.setOrderLoading(true));
      const response = await userAxios.post(
        `orderItem/delete/${productItemId}`
      );
      if (response.status === 200) {
        toast.success("delete orderItem is success");
        dispatch(orderSlice.actions.setOrderLoading(false));
      }
    } catch (error) {
      dispatch(orderSlice.actions.setOrderLoading(false));
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    userOrders: [] as orderUserType[],
    adminOrders: [] as orderAdminType[],
    orderLoading: false,
  } as orderStateType,
  reducers: {
    setOrderLoading: (state, action) => {
      state.orderLoading = action.payload;
    },
    setUserOrders: (state, action) => {
      state.userOrders = action.payload;
    },
    setAdminOrders: (state, action) => {
      state.adminOrders = action.payload;
    },
  },
});

export default orderSlice.reducer;
