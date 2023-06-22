import { CartState, UserState } from "@/@types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
    value: UserState;
}

const initialState = {
    value: {} as UserState
} as InitialState;


export const userCart = createSlice({
    name: "userCart",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserState>) => {
            return { ...state.value, value: { ...action.payload } }
        },
        addUserCart: (state, action: PayloadAction<CartState>) => {
            if (state.value.cart.some((item) => item.product?.id === action.payload.product?.id)) {
                return state; // Product already exists in the cart, return the current state
            }

            state.value.cart.push(action.payload); // Product doesn't exist in the cart, add it to the state
        },
        updateUserCart: (state, action: PayloadAction<CartState>) => {
            const updatedCart = state.value.cart.map((item) => {
                if (item.product?.id === action.payload.product?.id) {
                    return {
                        ...item,
                        productOrdered: action.payload.productOrdered,
                    }
                }

                return item;
            })

            return {
                ...state,
                value: {
                    ...state.value,
                    cart: updatedCart,
                }
            }
        },
        removeUserCart: (state, action: PayloadAction<string>) => {
            if (!state.value.cart) {
                return state
            }

            state.value.cart = state.value.cart.filter((item) => item.product?.id !== action.payload)
        },
        updateUserWishlist: (state, action: PayloadAction<string[]>) => {
            state.value.wishlist = action.payload
        },
    }
});

export const { addUser, addUserCart, removeUserCart, updateUserCart, updateUserWishlist } = userCart.actions;
export default userCart.reducer;


// INFO
// addUser -> adds the user to the state
// addUserCart: adds a product to the cart
// updateUserCart: updates a product in the cart
// removeUserCart: removes a product from the cart