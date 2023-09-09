import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";
import loadingReducer from './slices/loadingSlice'


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