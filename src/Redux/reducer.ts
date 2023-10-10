import { combineReducers } from "redux";
import authReducer from "./Store/auth";
import categoryReducer from "./Store/category";
import productReducer from "./Store/product";

export const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
});
