import { configureStore } from "@reduxjs/toolkit";
import guestCartReducer from "./features/guestCart-slice";
import userCartReducer from "./features/user-slice";
import authModalReducer from "./features/authModal";
import authReducer from "./features/authSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        guestCartReducer,
        userCartReducer,
        authModalReducer,
        authReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;