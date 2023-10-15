import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminAxios } from "../../services/adminInterceptor";
import toast from "react-hot-toast";
import { userAxios } from "../../services/userInterceptor";
import {
  profileStateType,
  profileOrdersType,
  profileFavoriteType,
  profileUserInfo,
} from "../../types/Profile.type";

export const getProfileUserInfo = createAsyncThunk(
  "profile/userInfo",
  async (_, { dispatch }) => {
    try {
      dispatch(profileSlice.actions.setLoading(true));
      const response = await userAxios.get("/profile");
      if (response.status === 200) {
        dispatch(profileSlice.actions.setProfilesUserInfo(response.data));
        dispatch(profileSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(profileSlice.actions.setLoading(false));
      console.log(error);
      
    }
  }
);

export const getProfileOrders = createAsyncThunk(
  "profile/orders",
  async (_, { dispatch }) => {
    try {
      dispatch(profileSlice.actions.setLoading(true));
      const response = await userAxios.get(`/profile/orders`);
      if (response.status === 200) {
        dispatch(profileSlice.actions.setProfileOrders(response.data));
        dispatch(profileSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(profileSlice.actions.setLoading(false));
    }
  }
);

export const getProfileFavorite = createAsyncThunk(
  "profile/favorite",
  async (_, { dispatch }) => {
    try {
      dispatch(profileSlice.actions.setLoading(true));
      const response = await userAxios.get("/profile/favoriteProducts");
      if (response.status === 200) {
        dispatch(profileSlice.actions.setProfileFavorite(response.data.data));
        dispatch(profileSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(profileSlice.actions.setLoading(false));
    }
  }
);

export const getProfileOrdersAdminType = createAsyncThunk(
  "profile/orders/admin",
  async (userId: string, { dispatch }) => {
    try {
      dispatch(profileSlice.actions.setLoading(true));
      const response = await adminAxios.get(`profile/orders/${userId}`);
      if (response.status === 200) {
        dispatch(
          profileSlice.actions.setProfileOrdersAdmin(response.data.data)
        );
        dispatch(profileSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(profileSlice.actions.setLoading(false));
    }
  }
);

export const getProfileFavoriteAdminType = createAsyncThunk(
  "profile/favorite/admin",
  async (userId: string, { dispatch }) => {
    try {
      dispatch(profileSlice.actions.setLoading(true));
      const response = await adminAxios.get(
        `profile/favoriteProducts/${userId}`
      );
      if (response.status === 200) {
        dispatch(
          profileSlice.actions.setProfileFavoriteAdmin(response.data.data)
        );
        dispatch(profileSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(profileSlice.actions.setLoading(false));
    }
  }
);

export const editProfileUserInfo = createAsyncThunk(
  "profile/edit/userInfo",
  async (profileInfo: profileUserInfo, { dispatch }) => {
    try {
      dispatch(profileSlice.actions.setLoading(true));
      const response = await userAxios.post(`/profile/edit`, profileInfo);
      if (response.status === 200) {
        toast.success("edit profile is success");
        dispatch(profileSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(profileSlice.actions.setLoading(false));
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileLoading: false,
    profileOrders: [] as profileOrdersType[],
    profileFavorite: [] as profileFavoriteType[],
    profileOrdersAdmin: [] as profileOrdersType[],
    profileFavoriteAdmin: [] as profileFavoriteType[],
    profilesUserInfo: {} as profileUserInfo
  } as profileStateType,

  reducers: {
    setLoading: (state, action) => {
      state.profileLoading = action.payload;
    },
    setProfileOrders: (state, action) => {
      state.profileOrders = action.payload;
    },
    setProfileFavorite: (state, action) => {
      state.profileFavorite = action.payload;
    },
    setProfileOrdersAdmin: (state, action) => {
      state.profileOrders = action.payload;
    },
    setProfileFavoriteAdmin: (state, action) => {
      state.profileFavorite = action.payload;
    },
    setProfilesUserInfo: (state, action) => {
      state.profilesUserInfo = action.payload;
    },
  },
});

export default profileSlice.reducer;
