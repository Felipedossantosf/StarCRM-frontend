import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import loginReducer from "./loginSlice"
import registroReducer from "./RegistroSlice";

export const store = configureStore({
    reducer: { 
        user: userReducer,
        login: loginReducer,
        registro: registroReducer, 
    },
});