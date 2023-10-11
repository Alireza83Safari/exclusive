import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  productItemSelectList,
  productItemStateType,
  productItemType,
  productItemProductType,
  productItemItemIdType,
} from "../../types/ProductItem.type";
import { userAxios } from "../../services/userInterceptor";
import { adminAxios } from "../../services/adminInterceptor";
import toast from "react-hot-toast";

export const getProductItemWithItemId = createAsyncThunk(
  "productItem/ItemID",
  async (id: string, { dispatch }) => {
    try {
      dispatch(productItemSlice.actions.setProductItemLoading(true));
      const response = await userAxios.get(`productItem/${id}`);
      if (response.status === 200) {
        dispatch(productItemSlice.actions.setProductItem(response.data));
        dispatch(productItemSlice.actions.setProductItemLoading(false));
      }
    } catch (error) {
      dispatch(productItemSlice.actions.setProductItemLoading(false));
    }
  }
);

export const getProductItemWithProductId = createAsyncThunk(
  "productItem/productId",
  async (id: string, { dispatch }) => {
    try {
      dispatch(productItemSlice.actions.setProductItemLoading(true));
      const response = await adminAxios.get(`productItem/product/${id}`);
      if (response.status === 200) {
        dispatch(productItemSlice.actions.setProductItemProduct(response.data));
        dispatch(productItemSlice.actions.setProductItemLoading(false));
      }
    } catch (error) {
      dispatch(productItemSlice.actions.setProductItemLoading(false));
    }
  }
);

export const getProductItemSelectList = createAsyncThunk(
  "productItem/selectList",
  async (productId: string, { dispatch }) => {
    try {
      dispatch(productItemSlice.actions.setProductItemLoading(true));
      const response = await adminAxios.get(
        `productItem/selectList/${productId}`
      );
      if (response.status === 200) {
        dispatch(
          productItemSlice.actions.setAdminProductSelectList(response.data.data)
        );
        dispatch(productItemSlice.actions.setProductItemLoading(false));
      }
    } catch (error) {
      dispatch(productItemSlice.actions.setProductItemLoading(false));
    }
  }
);

export const addProductItem = createAsyncThunk(
  "productItem/add",
  async (itemInfo: productItemType, { dispatch }) => {
    try {
      dispatch(productItemSlice.actions.setProductItemLoading(true));
      const response = await adminAxios.post("productItem", itemInfo);
      if (response.status === 200) {
        toast.success("add productItem is success");
        dispatch(productItemSlice.actions.setProductItemLoading(false));
      }
    } catch (error) {
      dispatch(productItemSlice.actions.setProductItemLoading(false));
    }
  }
);

export const editProductItem = createAsyncThunk(
  "productItem/edit",
  async (
    { itemInfo, productId }: { itemInfo: productItemType; productId: string },
    { dispatch }
  ) => {
    try {
      dispatch(productItemSlice.actions.setProductItemLoading(true));
      const response = await adminAxios.post(
        `productItem/edit/${productId}`,
        itemInfo
      );
      if (response.status === 200) {
        toast.success("edit productItem is success");
        dispatch(productItemSlice.actions.setProductItemLoading(false));
      }
    } catch (error) {
      dispatch(productItemSlice.actions.setProductItemLoading(false));
    }
  }
);

export const deleteProductItem = createAsyncThunk(
  "productItem/delete",
  async (productId: string, { dispatch }) => {
    try {
      dispatch(productItemSlice.actions.setProductItemLoading(true));
      const response = await adminAxios.post(`productItem/delete/${productId}`);
      if (response.status === 200) {
        toast.success("delete productItem is success");
        dispatch(productItemSlice.actions.setProductItemLoading(false));
      }
    } catch (error) {
      dispatch(productItemSlice.actions.setProductItemLoading(false));
    }
  }
);

const productItemSlice = createSlice({
  name: "productItem",
  initialState: {
    productItem: {} as productItemItemIdType,
    productItemProduct: [] as productItemProductType[],
    productItemSelectList: [] as productItemSelectList[],
    addProductItem: {} as productItemType,
    productItemLoading: false,
  } as productItemStateType,
  reducers: {
    setProductItemLoading: (state, action) => {
      state.productItemLoading = action.payload;
    },
    setProductItemProduct: (state, action) => {
      state.productItemProduct = action.payload;
    },
    setProductItem: (state, action) => {
      state.productItem = action.payload;
    },

    setAdminProductSelectList: (state, action) => {
      state.productItemSelectList = action.payload;
    },
  },
});

export default productItemSlice.reducer;
