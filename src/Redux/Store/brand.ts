import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminAxios } from "../../services/adminInterceptor";
import toast from "react-hot-toast";
import { userAxios } from "../../services/userInterceptor";
import {
  brandSelectListType,
  brandStateType,
  brandType,
  getBrandType,
} from "../../types/Brand.type";

export const getBrands = createAsyncThunk(
  "brand/get",
  async (isAdmin: boolean, { dispatch }) => {
    try {
      dispatch(brandSlice.actions.setLoading(true));
      const axiosInstance = isAdmin ? adminAxios : userAxios;
      const response = await axiosInstance.get("/brand");
      if (response.status === 200) {
        isAdmin
          ? dispatch(brandSlice.actions.setBrands(response.data.data))
          : dispatch(brandSlice.actions.setBrandsUser(response.data.data));
        dispatch(brandSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(brandSlice.actions.setLoading(false));
    }
  }
);

export const getBrandWithId = createAsyncThunk(
  "brand/getWithId",
  async (id: string, { dispatch }) => {
    try {
      dispatch(brandSlice.actions.setLoading(true));
      const response = await adminAxios.get(`/brand/${id}`);
      if (response.status === 200) {
        dispatch(brandSlice.actions.setBrand(response.data));
        dispatch(brandSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(brandSlice.actions.setLoading(false));
    }
  }
);

export const getBrandsSelectList = createAsyncThunk(
  "brand/getSelectList",
  async (_, { dispatch }) => {
    try {
      dispatch(brandSlice.actions.setLoading(true));
      const response = await userAxios.get("/brand/selectList");
      if (response.status === 200) {
        dispatch(brandSlice.actions.setBrandsSelectList(response.data.data));
        dispatch(brandSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(brandSlice.actions.setLoading(false));
    }
  }
);

export const addBrand = createAsyncThunk(
  "brand/add",
  async (brandInfo: brandType, { dispatch }) => {
    try {
      dispatch(brandSlice.actions.setLoading(true));
      const response = await adminAxios.post("/brand", brandInfo);
      if (response.status === 200) {
        toast.success("add brand is success");
        dispatch(brandSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(brandSlice.actions.setLoading(false));
    }
  }
);

export const editBrand = createAsyncThunk(
  "brand/edit",
  async (
    { brandInfo, brandId }: { brandInfo: brandType; brandId: string },
    { dispatch }
  ) => {
    try {
      dispatch(brandSlice.actions.setLoading(true));
      const response = await adminAxios.post(
        `/brand/edit/${brandId}`,
        brandInfo
      );
      if (response.status === 200) {
        toast.success("edit brand is success");
        dispatch(brandSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(brandSlice.actions.setLoading(false));
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "brand/delete",
  async (brandId: string, { dispatch }) => {
    try {
      dispatch(brandSlice.actions.setLoading(true));
      const response = await adminAxios.post(`/brand/delete/${brandId}`);
      if (response.status === 200) {
        toast.success("delete brand is success");
        dispatch(brandSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(brandSlice.actions.setLoading(false));
    }
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brandLoading: false,
    brand: {} as getBrandType,
    brands: [] as brandType[],
    brandsUser: [] as getBrandType[],
    brandsSelectList: [] as brandSelectListType[],
  } as brandStateType,
  reducers: {
    setLoading: (state, action) => {
      state.brandLoading = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setBrandsUser: (state, action) => {
      state.brandsUser = action.payload;
    },
    setBrandsSelectList: (state, action) => {
      state.brandsSelectList = action.payload;
    },
  },
});

export default brandSlice.reducer;
