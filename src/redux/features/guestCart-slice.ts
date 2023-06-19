import { Product } from "@/@types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: CartState[];
}

type CartState = Product & {
    productOrdered: number, // this will keep track of how many product a user wants to buy
}

const initialState = {
    value: [] as CartState[]
} as InitialState;

export const guestCart = createSlice({
    name: "guestCart",
    initialState,
    reducers: {
        addCart: (state, action: PayloadAction<CartState>) => {
            if (state.value.find((item) => item.id === action.payload.id)) {
                return state; // Product already exists in the cart, return the current state
            }

            state.value.push(action.payload); // Product doesn't exist in the cart, add it to the state
        },
        updateCart: (state, action: PayloadAction<CartState>) => {
            const updateCart = state.value.map((item) => {
                if (item.id === action.payload.id) {
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
            state.value = state.value.filter((item) => item.id !== action.payload)
        },
    }
});

export const { addCart, removeCart, updateCart } = guestCart.actions;
export default guestCart.reducer;