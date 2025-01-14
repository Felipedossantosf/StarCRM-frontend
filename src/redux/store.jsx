import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice";
import loginReducer from "./loginSlice";

export const store = configureStore({
  reducer: {
    api: apiReducer,
    login: loginReducer,
  },
});
