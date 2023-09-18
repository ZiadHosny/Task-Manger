import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authReducer from "./authSlice";
import loadingReducer from './loadingSlice'


type UserInfo = {
    firstName: string,
    lastName: string,
    email: string,
}

export type StoreState = {
    auth: {
        userInfo: UserInfo | null
    },
    loading: {
        isLoading: boolean
    }
}

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        loading: loadingReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})