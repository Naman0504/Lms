import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { paymentApi } from "@/features/api/paymentApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware:(defaultMiddleware)=> defaultMiddleware().concat(authApi.middleware,courseApi.middleware,paymentApi.middleware,courseProgressApi.middleware)
});


const initializedApp =async ()=>{
await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}

initializedApp()