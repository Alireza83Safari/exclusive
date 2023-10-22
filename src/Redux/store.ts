import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { productItemApiSlice } from "./store/productItem";
import { ProductApiSlice } from "./store/product";
import { colorApiSlice } from "./store/color";
import { brandApiSlice } from "./store/brand";
import { addressApiSlice } from "./store/address";
import { categoryApiSlice } from "./store/category";
import { commentApiSlice } from "./store/comment";
import { favoriteApiSlice } from "./store/favotrie";
import { orderApiSlice } from "./store/order";
import { profileApiSlice } from "./store/profile";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productItemApiSlice.middleware,
      ProductApiSlice.middleware,
      colorApiSlice.middleware,
      brandApiSlice.middleware,
      addressApiSlice.middleware,
      categoryApiSlice.middleware,
      commentApiSlice.middleware,
      favoriteApiSlice.middleware,
      orderApiSlice.middleware,
      profileApiSlice.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
