import { combineReducers } from "redux";

import featureReducer from "./slices/feature";
import { userAdminApi } from "./apis/admin/userAdminApi";
import { brandAdminApi } from "./apis/admin/brandAdminApi";
import { brandUserApi } from "./apis/user/brandUserApi";
import { categoryAdminApi } from "./apis/admin/categoryAdminApi";
import { categoryUserApi } from "./apis/user/categoryUserApi";
import { productAdminApi } from "./apis/admin/productAdminApi";
import { productUserApi } from "./apis/user/productApiUser";
import { colorUserApi } from "./apis/user/colorUserApi";
import { colorAdminApi } from "./apis/admin/colorAdminApi";
import { productItemAdminApi } from "./apis/admin/productItemAdminApi";
import { productItemUserApi } from "./apis/user/productItemUserApi";
import { addressAdminApi } from "./apis/admin/addressAdminApi";
import { addressUserApi } from "./apis/user/addressUserApi";
import { appPicAdminApi } from "./apis/admin/appPicAdminApi";
import { appPicUserApi } from "./apis/user/appPicUserApi";
import { commentAdminApi } from "./apis/admin/commentAdminApi";
import { commentUserApi } from "./apis/user/commentUserApi";
import { favoriteUserApi } from "./apis/user/favoriteUserApi";
import { roleAdminApi } from "./apis/admin/roleAdminApi";
import { orderAdminApi } from "./apis/admin/orderAdminApi";
import { orderUserApi } from "./apis/user/orderUserApi";
import { profileAdminApi } from "./apis/admin/profileAdminApi";
import { profileUserApi } from "./apis/user/prodileUserApi";
import { fileUserApi } from "./apis/user/fileUserApi";
import { discountAdminApi } from "./apis/admin/discountAdminApi";
import { discountUserApi } from "./apis/user/discountUserApi";
import { authAdminApi } from "./apis/admin/authAdminApi";
import { authUserApi } from "./apis/user/authUserApi";

export const rootReducer = combineReducers({
  feature: featureReducer,
  [brandAdminApi.reducerPath]: brandAdminApi.reducer,
  [brandUserApi.reducerPath]: brandUserApi.reducer,
  [categoryAdminApi.reducerPath]: categoryAdminApi.reducer,
  [categoryUserApi.reducerPath]: categoryUserApi.reducer,
  [productAdminApi.reducerPath]: productAdminApi.reducer,
  [productUserApi.reducerPath]: productUserApi.reducer,
  [colorUserApi.reducerPath]: colorUserApi.reducer,
  [colorAdminApi.reducerPath]: colorAdminApi.reducer,
  [userAdminApi.reducerPath]: userAdminApi.reducer,
  [productItemUserApi.reducerPath]: productItemUserApi.reducer,
  [productItemAdminApi.reducerPath]: productItemAdminApi.reducer,
  [addressAdminApi.reducerPath]: addressAdminApi.reducer,
  [addressUserApi.reducerPath]: addressUserApi.reducer,
  [appPicAdminApi.reducerPath]: appPicAdminApi.reducer,
  [appPicUserApi.reducerPath]: appPicUserApi.reducer,
  [commentAdminApi.reducerPath]: commentAdminApi.reducer,
  [commentUserApi.reducerPath]: commentUserApi.reducer,
  [favoriteUserApi.reducerPath]: favoriteUserApi.reducer,
  [roleAdminApi.reducerPath]: roleAdminApi.reducer,
  [orderAdminApi.reducerPath]: orderAdminApi.reducer,
  [orderUserApi.reducerPath]: orderUserApi.reducer,
  [profileAdminApi.reducerPath]: profileAdminApi.reducer,
  [profileUserApi.reducerPath]: profileUserApi.reducer,
  [fileUserApi.reducerPath]: fileUserApi.reducer,
  [discountAdminApi.reducerPath]: discountAdminApi.reducer,
  [discountUserApi.reducerPath]: discountUserApi.reducer,
  [authAdminApi.reducerPath]: authAdminApi.reducer,
  [authUserApi.reducerPath]: authUserApi.reducer,
});
