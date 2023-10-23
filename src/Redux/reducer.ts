import { combineReducers } from "redux";

import authReducer from "./slices/auth";
import featureReducer from "./slices/feature";
import { productItemApi } from "./apis/productItemApi";
import { ProductApi } from "./apis/productApi";
import { colorApi } from "./apis/colorApi";
import { brandApi } from "./apis/brandApi";
import { addressApi } from "./apis/addressApi";
import { appPicApi } from "./apis/appPicApi";
import { categoryApi } from "./apis/categoryApi";
import { commentApi } from "./apis/commentApi";
// import discountReducer from './Store/discount';
import { favoriteApi } from "./apis/favoriteApi";
import { orderApi } from "./apis/orderApi";
import { profileApi } from "./apis/profileApi";

export const rootReducer = combineReducers({
  auth: authReducer,
  feature: featureReducer,
  [productItemApi.reducerPath]: productItemApi.reducer,
  [ProductApi.reducerPath]: ProductApi.reducer,
  [colorApi.reducerPath]: colorApi.reducer,
  [brandApi.reducerPath]: brandApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [appPicApi.reducerPath]: appPicApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [favoriteApi.reducerPath]: favoriteApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  // discount: discountReducer,
});
