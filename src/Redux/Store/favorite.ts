import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { userAxios } from "../../services/userInterceptor";

export type addFavoriteType = {
  productItemId: string;
};

export const addfavorite = createAsyncThunk(
  "favorite/add",
  async (productItemId: addFavoriteType, { dispatch }) => {
    try {
      dispatch(favoriteReducer.actions.setLoading(true));
      const response = await userAxios.post(
        "/favoriteProductItem",
        productItemId
      );
      if (response.status === 200) {
        toast.success("add favorite is success");
        dispatch(favoriteReducer.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(favoriteReducer.actions.setLoading(false));
    }
  }
);

export const isFavoriteHandler = createAsyncThunk(
  "favorite/isFavorite",
  async (productItemId: string, { dispatch }) => {
    try {
      dispatch(favoriteReducer.actions.setLoading(true));
      const response = await userAxios.get(
        `/favoriteProductItem/isFavorite/${productItemId}`
      );
      if (response.status === 200) {
        dispatch(favoriteReducer.actions.setIsFavorite(response.data.data));

        dispatch(favoriteReducer.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(favoriteReducer.actions.setLoading(false));
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "favorite/delete",
  async (itemId: string, { dispatch }) => {
    try {
      dispatch(favoriteReducer.actions.setLoading(true));
      const response = await userAxios.post(
        `/favoriteProductItem/delete/${itemId}`
      );
      if (response.status === 200) {
        toast.success("delete favorite is success");
        dispatch(favoriteReducer.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(favoriteReducer.actions.setLoading(false));
    }
  }
);

const favoriteReducer = createSlice({
  name: "favorite",
  initialState: {
    favoriteLoading: false,
    isFavorite: null,
  },

  reducers: {
    setLoading: (state, action) => {
      state.favoriteLoading = action.payload;
    },
    setIsFavorite: (state, action) => {
      state.isFavorite = action.payload;
    },
  },
});

export default favoriteReducer.reducer;
