import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminAxios } from "../../services/adminInterceptor";
import toast from "react-hot-toast";
import { userAxios } from "../../services/userInterceptor";
import { discountProductType, discountStateType, discountUserType, editDiscountType, getDiscountAdminType, getDiscountUserType } from '../../types/Discount.type';

export const getdiscount = createAsyncThunk(
  "discount/getWithId",
  async (id: string, { dispatch }) => {
    try {
      dispatch(discountSlice.actions.setLoading(true));
      const response = await adminAxios.get(`/discount/${id}`);
      if (response.status === 200) {
        dispatch(discountSlice.actions.setDiscount(response.data));
        dispatch(discountSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(discountSlice.actions.setLoading(false));
    }
  }
);

export const getDiscounts = createAsyncThunk(
  "discount/get",
  async (isAdmin:boolean, { dispatch }) => {
    try {
      dispatch(discountSlice.actions.setLoading(true));
      const axiosInstance = isAdmin ? adminAxios : userAxios
      const response = await axiosInstance.get("/address");
      if (response.status === 200) {
        isAdmin ? 
        dispatch(discountSlice.actions.setAdminDiscounts(response.data)):
        dispatch(discountSlice.actions.setUserDiscounts(response.data.data))
        dispatch(discountSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(discountSlice.actions.setLoading(false));
    }
  }
);

export const addUserDiscount = createAsyncThunk(
  "discount/add/userType",
  async (discountInfo: discountUserType, { dispatch }) => {
    try {
      dispatch(discountSlice.actions.setLoading(true));
      const response = await adminAxios.post("/discount", discountInfo);
      if (response.status === 200) {
        toast.success("add user discount is success");
        dispatch(discountSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(discountSlice.actions.setLoading(false));
    }
  }
);

export const addProductDiscount = createAsyncThunk(
  "discount/add/productType",
  async (discountInfo: discountProductType, { dispatch }) => {
    try {
      dispatch(discountSlice.actions.setLoading(true));
      const response = await adminAxios.post("/discount", discountInfo);
      if (response.status === 200) {
        toast.success("add product discount is success");
        dispatch(discountSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(discountSlice.actions.setLoading(false));
    }
  }
);

export const editDiscount = createAsyncThunk(
  "discount/edit",
  async ({ discountInfo, discountId, type }: editDiscountType, { dispatch }) => {
    try {
      dispatch(discountSlice.actions.setLoading(true))

      let response;

      if (type === "user") {
        response = await userAxios.post(`/discount/edit/${discountId}`, discountInfo as discountUserType);
      } else if (type === "product") {
        response = await adminAxios.post(`/discount/edit/${discountId}`, discountInfo as discountProductType);
      }

      if (response?.status === 200) {
        toast.success("Edit discount is successful");
      }

      dispatch(discountSlice.actions.setLoading(false));
    } catch (error) {
      dispatch(discountSlice.actions.setLoading(false));
    }
  }
);

export const deleteDiscount = createAsyncThunk(
  "discount/delete",
  async (discountId: string, { dispatch }) => {
    try {
      dispatch(discountSlice.actions.setLoading(true));
      const response = await adminAxios.post(`/discount/delete/${discountId}`);
      if (response.status === 200) {
        toast.success("delete discount is success");
        dispatch(discountSlice.actions.setLoading(false));
      }
    } catch (error) {
      dispatch(discountSlice.actions.setLoading(false));
    }
  }
);

export const codeDiscountValidate = createAsyncThunk(
  "discount/code",
  async (code: string | number, { dispatch }) => {
    try {
      dispatch(discountSlice.actions.setLoading(true));
      const response = await adminAxios.post(`/discount/validate/code/${code}`);
      if (response.status === 200) {
        toast.success("add discount is success");
        dispatch(discountSlice.actions.setLoading(false));
      }
    } catch (error) {
      toast.error("Discount is not valid", {
        duration: 5000,
      });
      dispatch(discountSlice.actions.setLoading(false));
    }
  }
);

const discountSlice = createSlice({
  name: "discount",
  initialState: {
    discountLoading: false,
    discount: {} as getDiscountAdminType, 
    adminDiscounts: [] as getDiscountAdminType[],
    userDiscounts: [] as getDiscountUserType[],
    discountCode : null,
    discountCodeError: null
  } as discountStateType,
  reducers: {
    setLoading: (state, action) => {
      state.discountLoading = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setAdminDiscounts: (state, action) => {
      state.adminDiscounts = action.payload;
    },
    setUserDiscounts: (state, action) => {
      state.adminDiscounts = action.payload;
    },
    setDiscountCode: (state, action) => {
      state.discountCode = action.payload;
    },
    setDiscountCodeError: (state, action) => {
      state.discountCodeError = action.payload;
    },
  },
});

export default discountSlice.reducer;
