import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAxios } from "../../../services/userInterceptor";
import { AuthType, UserLoginType } from "./auth.type";

export const getUserInfos = createAsyncThunk(
  "auth/userInfo",
  async (_, { dispatch }) => {
    try {
      dispatch(authSlice.actions.setLoading(true));
      const response = await userAxios.get("/is_authenticated");
      if (response.status === 200) {
        dispatch(authSlice.actions.setIsLogin(true));
        dispatch(authSlice.actions.setLoading(false));

        return response.data;
      }
    } catch (error) {
      dispatch(authSlice.actions.setIsLogin(false));
      dispatch(authSlice.actions.setLoading(false));
    }
  }
);

export const userLoginHandler = createAsyncThunk(
  "auth/login",
  async (userData: UserLoginType, { dispatch }) => {
    try {
      dispatch(authSlice.actions.setLoading(true));
      const response = await userAxios.post("/login", userData);
      dispatch(authSlice.actions.setLoading(false));
      if (response.status === 200) {
        location.href = "/";
        return response.data;
      }
    } catch (error: any) {
      dispatch(authSlice.actions.setLoading(false));
      dispatch(authSlice.actions.setLoginError(error?.response?.data));
      throw error?.response.data;
    }
  }
);

export const logoutHandler = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      const response = await userAxios.get("/logout");
      if (response.status === 200) {
        dispatch(authSlice.actions.setIsLogin(false));
        location.href = "/login";
      }
    } catch (error) {}
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
    loginError: null,
    error: null,
    loading: false,
    userIsLogin: false,
  } as AuthType,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsLogin: (state, action) => {
      state.userIsLogin = action.payload;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfos.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(userLoginHandler.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
