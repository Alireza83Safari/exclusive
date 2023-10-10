import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  colorSelectListType,
  colorStateType,
  colorType,
  getColorType,
} from "../../types/Color.type";
import { adminAxios } from "../../services/adminInterceptor";
import toast from "react-hot-toast";
import { userAxios } from "../../services/userInterceptor";

export const getColor = createAsyncThunk(
  "color/get",
  async (id: string, { dispatch }) => {
    try {
      dispatch(colorSlice.actions.setLoading(true));
      const response = await adminAxios.get(`/color/${id}`);
      if (response.status === 200) {
        dispatch(colorSlice.actions.setColor(response.data.data));
        dispatch(colorSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(colorSlice.actions.setLoading(false));
    }
  }
);
export const getColors = createAsyncThunk(
  "color/get",
  async (_, { dispatch }) => {
    try {
      dispatch(colorSlice.actions.setLoading(true));
      const response = await adminAxios.get("/color");
      if (response.status === 200) {
        dispatch(colorSlice.actions.setColors(response.data.data));
        dispatch(colorSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(colorSlice.actions.setLoading(false));
    }
  }
);

export const getColorsSelectList = createAsyncThunk(
  "color/selectList",
  async (_, { dispatch }) => {
    try {
      dispatch(colorSlice.actions.setLoading(true));
      const response = await userAxios.get("/color/selectList");
      if (response.status === 200) {
        dispatch(colorSlice.actions.setColorsSelectList(response.data.data));
        dispatch(colorSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(colorSlice.actions.setLoading(false));
    }
  }
);

export const addColor = createAsyncThunk(
  "color/add",
  async (colorInfo: colorType, { dispatch }) => {
    try {
      dispatch(colorSlice.actions.setLoading(true));
      const response = await adminAxios.post("/color", colorInfo);
      if (response.status === 200) {
        toast.success("add color is success");
        dispatch(colorSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(colorSlice.actions.setLoading(false));
    }
  }
);

export const editColor = createAsyncThunk(
  "color/edit",
  async (colorInfo: colorType, { dispatch }) => {
    try {
      dispatch(colorSlice.actions.setLoading(true));
      const response = await adminAxios.post("/color/edit", colorInfo);
      if (response.status === 200) {
        toast.success("edit color is success");
        dispatch(colorSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(colorSlice.actions.setLoading(false));
    }
  }
);

export const deleteColor = createAsyncThunk(
  "color/delete",
  async (colorId: string, { dispatch }) => {
    try {
      dispatch(colorSlice.actions.setLoading(true));
      const response = await adminAxios.post(`/color/delete${colorId}`);
      if (response.status === 200) {
        toast.success("delete color is success");
        dispatch(colorSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(colorSlice.actions.setLoading(false));
    }
  }
);

const colorSlice = createSlice({
  name: "color",
  initialState: {
    colorLoading: false,
    color: {} as getColorType,
    colors: [] as getColorType[],
    colorsSelectList: [] as colorSelectListType[],
  } as colorStateType,
  reducers: {
    setLoading: (state, action) => {
      state.colorLoading = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setColors: (state, action) => {
      state.colors = action.payload;
    },
    setColorsSelectList: (state, action) => {
      state.colorsSelectList = action.payload;
    },
  },
});

export default colorSlice.reducer;
