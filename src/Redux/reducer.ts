import { combineReducers } from "redux";
import authReducer from "./Store/auth/auth";

export const rootReducer = combineReducers({
  auth: authReducer,
});
