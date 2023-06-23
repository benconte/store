import { CartState } from "@/@types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InitialState = {
    value: CartState[];
    totalCart: number;
}

const initialState = {
    value: [] as CartState[],
    totalCart: 0,
} as InitialState;

export const guestCart = createSlice({
    name: "guestCart",
    initialState,
    reducers: {
        addGuest: (state, action: PayloadAction<CartState[]>) => {
            const newProducts = action.payload.filter((newProduct) => {
                // Check if the new product already exists in the state
                const existingProduct = state.value.find(
                    (item) => item.product.id === newProduct.product.id
                );

                return !existingProduct; // Only add the new product if it doesn't exist in the state
            });

            state.value = [...state.value, ...newProducts];
        },
        addGuestCart: (state, action: PayloadAction<CartState>) => {
            if (state.value.find((item) => item.product?.id === action.payload.product?.id)) {
                return state; // Product already exists in the cart, return the current state
            }

            state.value.push(action.payload); // Product doesn't exist in the cart, add it to the state
        },
        updateGuestCart: (state, action: PayloadAction<CartState>) => {
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
        removeGuestCart: (state, action: PayloadAction<string>) => {
            state.value = state.value.filter((item) => item.product?.id !== action.payload)
        },
    }
});

export const { addGuestCart, removeGuestCart, updateGuestCart, addGuest } = guestCart.actions;
export default guestCart.reducer;



// INFO
// addGuestCart: adds a product to the cart
// updateGuestCart: updates a product in the cart
// removeGuestCart: removes a product from the cart