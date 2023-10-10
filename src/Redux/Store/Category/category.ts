import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminAxios } from "../../../services/adminInterceptor";
import { userAxios } from "../../../services/userInterceptor";
import {
  categoryStateType,
  categoryUserType,
  editCategoryType,
  categoryAdminType,
} from "./category.type";
import toast from "react-hot-toast";

export const getCategory = createAsyncThunk(
  "category/get",
  async (_, { dispatch }) => {
    try {
      dispatch(categorySlice.actions.setCategoryLoading(true));

      const response = await userAxios.get("/category/selectList");
      if (response.status === 200) {
        dispatch(categorySlice.actions.setCategory(response.data.data));
        dispatch(categorySlice.actions.setCategoryLoading(false));
      }
    } catch (error) {
      dispatch(categorySlice.actions.setCategoryLoading(false));
    }
  }
);

export const getAdminCategory = createAsyncThunk(
  "category/get",
  async (_, { dispatch }) => {
    try {
      dispatch(categorySlice.actions.setCategoryLoading(true));

      const response = await adminAxios.get("/category");
      if (response.status === 200) {
        dispatch(categorySlice.actions.setCategory(response.data.data));
        dispatch(categorySlice.actions.setCategoryLoading(false));
      }
    } catch (error) {
      dispatch(categorySlice.actions.setCategoryLoading(false));
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/add",
  async (categoryData: categoryAdminType, { dispatch }) => {
    try {
      dispatch(categorySlice.actions.setCategoryLoading(true));
      const response = await adminAxios.post("/category", categoryData);
      if (response.status === 200) {
        toast.success("add category is success");
        dispatch(categorySlice.actions.setCategoryLoading(false));
      }
    } catch (error) {
      dispatch(categorySlice.actions.setCategoryLoading(false));
    }
  }
);

export const editCategory = createAsyncThunk(
  "category/edit",
  async ({ categoryData, id }: editCategoryType, { dispatch }) => {
    try {
      dispatch(categorySlice.actions.setCategoryLoading(true));
      const response = await adminAxios.post(
        `/category/edit/${id}`,
        categoryData
      );
      if (response.status === 200) {
        toast.success("edit category is success");
        dispatch(categorySlice.actions.setCategoryLoading(false));
      }
    } catch (error) {
      dispatch(categorySlice.actions.setCategoryLoading(false));
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { dispatch }) => {
    try {
      dispatch(categorySlice.actions.setCategoryLoading(true));
      const response = await adminAxios.post(`/category/delete/${id}`);
      if (response.status === 200) {
        toast.success("delete category is success");
        dispatch(categorySlice.actions.setCategoryLoading(false));
      }
    } catch (error) {
      dispatch(categorySlice.actions.setCategoryLoading(false));
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [] as categoryUserType[],
    adminCategory: [] as categoryAdminType[],
    categoryError: null,
    categoryLoading: false,
  } as categoryStateType,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCategoryLoading: (state, action) => {
      state.categoryLoading = action.payload;
    },
    setCategoryError: (state, action) => {
      state.categoryError = action.payload;
    },
  },
});

export default categorySlice.reducer;
