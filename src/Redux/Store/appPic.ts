import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminAxios } from "../../services/adminInterceptor";
import toast from "react-hot-toast";
import { userAxios } from "../../services/userInterceptor";
import { appPicStateType, appPicType, getAppPicType } from "../../types/AppPic.type";

export const getAppPic = createAsyncThunk(
  "appPic/getWithId",
  async (id: string, { dispatch }) => {
    try {
      dispatch(appPicSlice.actions.setLoading(true));
      const response = await adminAxios.get(`/appPic/${id}`);
      if (response.status === 200) {
        dispatch(appPicSlice.actions.setAppPic(response.data));
        dispatch(appPicSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(appPicSlice.actions.setLoading(false));
    }
  }
);

export const getAppPics = createAsyncThunk(
  "appPic/get",
  async (_, { dispatch }) => {
    try {
      dispatch(appPicSlice.actions.setLoading(true));
      const response = await userAxios.get("/address");
      if (response.status === 200) {
        dispatch(appPicSlice.actions.setAppPics(response.data));
        dispatch(appPicSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(appPicSlice.actions.setLoading(false));
    }
  }
);

export const addAppPic = createAsyncThunk(
  "appPic/add",
  async (appPicInfo: appPicType, { dispatch }) => {
    try {
      dispatch(appPicSlice.actions.setLoading(true));
      const response = await adminAxios.post("/appPic", appPicInfo);
      if (response.status === 200) {
        toast.success("add appPic is success");
        dispatch(appPicSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(appPicSlice.actions.setLoading(false));
    }
  }
);

export const editAppPic = createAsyncThunk(
  "appPic/edit",
  async ({appPicInfo , appPicId}:{appPicInfo: appPicType , appPicId:string} { dispatch }) => {
    try {
      dispatch(appPicSlice.actions.setLoading(true));
      const response = await adminAxios.post(`/appPic/edit/${appPicId}`, appPicInfo);
      if (response.status === 200) {
        toast.success("edit appPic is success");
        dispatch(appPicSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(appPicSlice.actions.setLoading(false));
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "appPic/delete",
  async (appPicId: string, { dispatch }) => {
    try {
      dispatch(appPicSlice.actions.setLoading(true));
      const response = await adminAxios.post(`/appPic/delete/${appPicId}`);
      if (response.status === 200) {
        toast.success("delete appPic is success");
        dispatch(appPicSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(appPicSlice.actions.setLoading(false));
    }
  }
);

const appPicSlice = createSlice({
  name: "appPic",
  initialState: {
    appPicLoading: false,
    appPic: {} as getAppPicType, 
    appPics: [] as getAppPicType[],
  } as appPicStateType,
  reducers: {
    setLoading: (state, action) => {
      state.appPicLoading = action.payload;
    },
    setAppPic: (state, action) => {
      state.appPic = action.payload;
    },
    setAppPics: (state, action) => {
      state.appPics = action.payload;
    },
    
  },
});

export default appPicSlice.reducer;
