import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";

export type rootState = ReturnType<typeof rootReducer>;
const store = configureStore({
  reducer: rootReducer,
});

export default store;
