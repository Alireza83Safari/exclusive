import { combineReducers } from "redux";
import { productItemApiSlice } from "./store/productItem";
import { ProductApiSlice } from "./store/product";
import { colorApiSlice } from "./store/color";
import { brandApiSlice } from "./store/brand";

import authReducer from "./store/auth";
import { categoryApiSlice } from "./store/category";
import { addressApiSlice } from "./store/address";
import { commentApiSlice } from "./store/comment";
import { favoriteApiSlice } from "./store/favotrie";
import { orderApiSlice } from "./store/order";
import { profileApiSlice } from "./store/profile";
import featureReducer from "./store/feature";
import { appPicApiSlice } from "./store/appPic";
// import discountReducer from './Store/discount';

export const rootReducer = combineReducers({
  auth: authReducer,
  feature: featureReducer,
  [productItemApiSlice.reducerPath]: productItemApiSlice.reducer,
  [ProductApiSlice.reducerPath]: ProductApiSlice.reducer,
  [colorApiSlice.reducerPath]: colorApiSlice.reducer,
  [brandApiSlice.reducerPath]: brandApiSlice.reducer,
  [addressApiSlice.reducerPath]: addressApiSlice.reducer,
  [appPicApiSlice.reducerPath]: appPicApiSlice.reducer,
  [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
  [commentApiSlice.reducerPath]: commentApiSlice.reducer,
  [favoriteApiSlice.reducerPath]: favoriteApiSlice.reducer,
  [orderApiSlice.reducerPath]: orderApiSlice.reducer,
  [profileApiSlice.reducerPath]: profileApiSlice.reducer,
  // discount: discountReducer,
});
