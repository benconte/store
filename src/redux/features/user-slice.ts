import { CartProduct, UserState } from "@/@types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
            return {...state, ...action.payload}
        },
        addCart: (state, action: PayloadAction<CartProduct>) => {
            if (state.value.cart.cartProduct.map((item) => item.product?.id === action.payload.product?.id)) {
                return state; // Product already exists in the cart, return the current state
            }

            state.value.cart.cartProduct.push(action.payload); // Product doesn't exist in the cart, add it to the state
        },
        updateCart: (state, action: PayloadAction<CartProduct>) => {
            const updatedCart = state.value.cart.cartProduct.map((item) => {
                if(item.product?.id === action.payload.product?.id) {
                    return {
                        ...item,
                        productOrdered: action.payload.productOrdered
                    }
                }

                return item;
            })

            state.value.cart.cartProduct = updatedCart;
        },
        removeCart: (state, action: PayloadAction<string>) => {
            state.value.cart.cartProduct = state.value.cart.cartProduct.filter((item) => item.product?.id !== action.payload)
        },
    }
});

export const { addUser, addCart, removeCart, updateCart } = userCart.actions;
export default userCart.reducer;