import { authApi } from "@/features/api/authApi";
import authReducer from "../features/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { courseApi } from "@/features/api/courseApi";
import { paymentApi } from "@/features/api/paymentApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [courseProgressApi.reducerPath]: courseProgressApi.reducer,
  auth: authReducer,
});




export default rootReducer;
