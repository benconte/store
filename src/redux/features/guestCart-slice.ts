import { CartProduct } from "@/@types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InitialState = {
    value: CartProduct[];
}

const initialState = {
    value: [] as CartProduct[]
} as InitialState;

export const guestCart = createSlice({
    name: "guestCart",
    initialState,
    reducers: {
        addCart: (state, action: PayloadAction<CartProduct>) => {
            if (state.value.find((item) => item.product?.id === action.payload.product?.id)) {
                return state; // Product already exists in the cart, return the current state
            }

            state.value.push(action.payload); // Product doesn't exist in the cart, add it to the state
        },
        updateCart: (state, action: PayloadAction<CartProduct>) => {
            const updateCart = state.value.map((item) => {
                if (item.product?.id === action.payload.product?.id) {
                    return {
                        ...item,
                        productOrdered: action.payload.productOrdered,
                    }
                }
                return item;
            });

            state.value = updateCart;
        },
        removeCart: (state, action: PayloadAction<string>) => {
            state.value = state.value.filter((item) => item.product?.id !== action.payload)
        },
    }
});

export const { addCart, removeCart, updateCart } = guestCart.actions;
export default guestCart.reducer;