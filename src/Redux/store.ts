import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { brandUserApi } from "./apis/user/brandUserApi";
import { brandAdminApi } from "./apis/admin/brandAdminApi";
import { categoryAdminApi } from "./apis/admin/categoryAdminApi";
import { categoryUserApi } from "./apis/user/categoryUserApi";
import { productAdminApi } from "./apis/admin/productAdminApi";
import { productUserApi } from "./apis/user/productApiUser";
import { colorAdminApi } from "./apis/admin/colorAdminApi";
import { colorUserApi } from "./apis/user/colorUserApi";
import { userAdminApi } from "./apis/admin/userAdminApi";
import { productItemAdminApi } from "./apis/admin/productItemAdminApi";
import { productItemUserApi } from "./apis/user/productItemUserApi";
import { addressAdminApi } from "./apis/admin/addressAdminApi";
import { addressUserApi } from "./apis/user/addressUserApi";
import { appPicAdminApi } from "./apis/admin/appPicAdminApi";
import { commentAdminApi } from "./apis/admin/commentAdminApi";
import { commentUserApi } from "./apis/user/commentUserApi";
import { favoriteUserApi } from "./apis/user/favoriteUserApi";
import { roleAdminApi } from "./apis/admin/roleAdminApi";
import { orderAdminApi } from "./apis/admin/orderAdminApi";
import { orderUserApi } from "./apis/user/orderUserApi";
import { profileAdminApi } from "./apis/admin/profileAdminApi";
import { profileUserApi } from "./apis/user/prodileUserApi";
import { appPicUserApi } from "./apis/user/appPicUserApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      brandUserApi.middleware,
      brandAdminApi.middleware,
      categoryAdminApi.middleware,
      categoryUserApi.middleware,
      productAdminApi.middleware,
      productUserApi.middleware,
      colorAdminApi.middleware,
      colorUserApi.middleware,
      userAdminApi.middleware,
      productItemAdminApi.middleware,
      productItemUserApi.middleware,
      addressAdminApi.middleware,
      addressUserApi.middleware,
      appPicAdminApi.middleware,
      appPicUserApi.middleware,
      commentAdminApi.middleware,
      commentUserApi.middleware,
      favoriteUserApi.middleware,
      roleAdminApi.middleware,
      orderAdminApi.middleware,
      orderUserApi.middleware,
      profileAdminApi.middleware,
      profileUserApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
