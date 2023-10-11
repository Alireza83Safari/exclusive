import { combineReducers } from "redux";
import authReducer from "./Store/auth";
import categoryReducer from "./Store/category";
import productReducer from "./Store/product";
import productItemReducer from "./Store/productItem";
import colorReducer from "./Store/color";
import addressReducer from "./Store/address";
import brandReducer from "./Store/brand";
import commentReducer from "./Store/comment";
import favoriteReduer from "./Store/favorite";
import orderReducer from "./Store/order";
//import discountReducer from "./Store/discount";

export const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  productItem: productItemReducer,
  color: colorReducer,
  address: addressReducer,
  brand: brandReducer,
  comment: commentReducer,
  favorite: favoriteReduer,
  order: orderReducer,
  //discount: discountReducer,
});
