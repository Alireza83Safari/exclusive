import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { profileApi } from "./apis/profileApi";
import { orderApi } from "./apis/orderApi";
import { favoriteApi } from "./apis/favoriteApi";
import { commentApi } from "./apis/commentApi";
import { categoryApi } from "./apis/categoryApi";
import { addressApi } from "./apis/addressApi";
import { brandApi } from "./apis/brandApi";
import { colorApi } from "./apis/colorApi";
import { ProductApi } from "./apis/productApi";
import { productItemApi } from "./apis/productItemApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productItemApi.middleware,
      ProductApi.middleware,
      colorApi.middleware,
      brandApi.middleware,
      addressApi.middleware,
      categoryApi.middleware,
      commentApi.middleware,
      favoriteApi.middleware,
      orderApi.middleware,
      profileApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
