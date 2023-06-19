import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface InitialState {
    isAuthenticated: boolean;
}

export const initialState = {
    isAuthenticated: false
} as InitialState

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userAuthenticated: (state) => {
            state.isAuthenticated = true;
        },
        userNotAuthenticated: (state) => {
            state.isAuthenticated = false;
        }
    }
});

export const { userAuthenticated, userNotAuthenticated } = auth.actions;
export default auth.reducer;