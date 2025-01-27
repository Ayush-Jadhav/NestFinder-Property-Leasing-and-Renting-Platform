import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import authReducer from "./Slices/authSlice";
import propReducer from "./Slices/propSlice";
import propUpdateReducer from "./Slices/propUpdateSlice";


export const Store = configureStore({
    reducer:{
        user: userReducer,
        auth: authReducer,
        prop: propReducer,
        propUpdate: propUpdateReducer, 
    }
})