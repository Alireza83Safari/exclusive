import { combineReducers } from "redux";
import authReducer from "./Store/auth";
import categoryReducer from "./Store/Category/category";

export const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
});
