'use client'

import Product from "@/components/cart/Product"
import { useAppSelector } from "@/redux/store"

function Cart() {
    const cart = useAppSelector((state) => (
        state.authReducer.isAuthenticated ? 
            state.userCartReducer.value.cart.cartProduct : state.guestCartReducer.value
    ))

    return (
        <main className="h-full px-2 md:px-7 lg:px-12 py-5 md:py-8 flex flex-col md:flex-row gap-3 items-start">
            {cart.map((product) => (
                <Product product={product} key={product.product?.id} />
            ))}
        </main>
    )
}

export default Cart