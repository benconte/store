import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    isOpen: boolean;
}

const initialState: InitialState = {
    isOpen: false
}

const authModal = createSlice({
    name: "auth-modal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        }
    }
});

export const { openModal, closeModal } = authModal.actions;
export default authModal.reducer;

