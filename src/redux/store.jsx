import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import loginReducer from "./loginSlice"

export const store = configureStore({
    reducer: { 
        user: userReducer,
        login: loginReducer,
    },
});