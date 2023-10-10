import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminAxios } from "../../services/adminInterceptor";
import { userAxios } from "../../services/userInterceptor";
import {
  adminProductType,
  productStateType,
  productType,
  userProductType,
} from "../../types/Product.type";
import toast from "react-hot-toast";

export const getProducts = createAsyncThunk(
  "product/get",
  async (isAdmin: boolean, { dispatch }) => {
    try {
      dispatch(productSlice.actions.setLoading(true));
      const axiosInstance = isAdmin ? adminAxios : userAxios;
      const response = await axiosInstance.get("/product");

      if (response.status === 200) {
        isAdmin
          ? dispatch(productSlice.actions.setAdminProducts(response.data.data))
          : dispatch(productSlice.actions.setUserProducts(response.data.data));
        dispatch(productSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(productSlice.actions.setLoading(false));
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getOne",
  async ({ isAdmin, id }: { isAdmin: boolean; id: string }, { dispatch }) => {
    try {
      dispatch(productSlice.actions.setLoading(true));
      const axiosInstance = isAdmin ? adminAxios : userAxios;
      const response = await axiosInstance.get(`/product/${id}`);
      if (response.status === 200) {
        isAdmin
          ? dispatch(productSlice.actions.setAdminProduct(response.data))
          : dispatch(productSlice.actions.setUserProduct(response.data));

        dispatch(productSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(productSlice.actions.setLoading(false));
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/add",
  async (productData: productType, { dispatch }) => {
    try {
      dispatch(productSlice.actions.setLoading(true));
      const response = await adminAxios.post("/product", productData);
      if (response.status === 200) {
        toast.success("add product is success");
        dispatch(productSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(productSlice.actions.setLoading(false));
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/edit",
  async (productData: productType, { dispatch }) => {
    try {
      dispatch(productSlice.actions.setLoading(true));
      const response = await adminAxios.post("/product/edit", productData);
      if (response.status === 200) {
        toast.success("edit product is success");
        dispatch(productSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(productSlice.actions.setLoading(false));
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id: string, { dispatch }) => {
    try {
      dispatch(productSlice.actions.setLoading(true));
      const response = await adminAxios.post("/product/delete", id);
      if (response.status === 200) {
        toast.success("delete product is success");
        dispatch(productSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(productSlice.actions.setLoading(false));
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    productLoading: false,
    adminProduct: null,
    adminProducts: [] as adminProductType[],
    userProduct: null,
    userProducts: [] as userProductType[],
    error: null,
    adminProductSelectList: [] as adminProductType[],
  } as productStateType,
  reducers: {
    setUserProducts: (state, action) => {
      state.userProducts = action.payload;
    },
    setAdminProducts: (state, action) => {
      state.adminProducts = action.payload;
    },
    setUserProduct: (state, action) => {
      state.userProduct = action.payload;
    },
    setAdminProduct: (state, action) => {
      state.adminProduct = action.payload;
    },
    setLoading: (state, action) => {
      state.productLoading = action.payload;
    },
  },
});

export default productSlice.reducer;
