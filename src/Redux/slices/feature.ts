import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { adminAxios } from "../../services/adminInterceptor";
import { getFeatureKeyType } from "../../types/feature.type";

export const getProductFeatureKey = createAsyncThunk(
  "productFeature/getProductFeatureKey",
  async (_, { dispatch }) => {
    try {
      dispatch(productFeatureReducer.actions.setLoading(true));
      const response = await adminAxios.get("/productFeatureKey");

      if (response.status === 200) {
        dispatch(
          productFeatureReducer.actions.setProductFeatureKey(response.data.data)
        );
        dispatch(productFeatureReducer.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(productFeatureReducer.actions.setLoading(false));
    }
  }
);
export const addProductFeatureValue = createAsyncThunk(
  "productFeature/addProductFeatureValue",
  async ({ createProductId, values }: any, { dispatch }) => {
    try {
      dispatch(productFeatureReducer.actions.setLoading(true));
      const response = await adminAxios.post(
        `/productFeatureValue/${createProductId}`,
        values
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(
          productFeatureReducer.actions.setAddProductFeatureKeyResponse(
            response.status
          )
        );
        toast.success("add featute is success");
        dispatch(productFeatureReducer.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(productFeatureReducer.actions.setLoading(false));
      console.log(error);
    }
  }
);

const productFeatureReducer = createSlice({
  name: "productFeature",
  initialState: {
    featureLoading: false,
    productFeatureKey: [] as getFeatureKeyType[],
    addProductFeatureKeyResponse: 0,
  },

  reducers: {
    setLoading: (state, action) => {
      state.featureLoading = action.payload;
    },
    setProductFeatureKey: (state, action) => {
      state.productFeatureKey = action.payload;
    },
    setAddProductFeatureKeyResponse: (state, action) => {
      state.addProductFeatureKeyResponse = action.payload;
    },
    resetAddProductFeatureKeyResponse: (state) => {
      state.addProductFeatureKeyResponse = 0;
    },
  },
});


export const { resetAddProductFeatureKeyResponse } = productFeatureReducer.actions; 
export default productFeatureReducer.reducer;
