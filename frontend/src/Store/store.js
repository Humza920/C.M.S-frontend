import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/authslice"
import modalReducer from "../Features/modalSlice"
import dashboardReducer from "../Features/dashboardslice"



export const store = configureStore({
    reducer:{
        auth : authReducer,
        modal : modalReducer,
        dashboard : dashboardReducer
    }
})