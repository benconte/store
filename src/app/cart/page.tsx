'use client'

import CartTotal from "@/components/cart/CartTotal"
import Product from "@/components/cart/Product"
import { useAppSelector } from "@/redux/store"
import { calculateFinalPrice } from "@/utils/discountCalculator"

function Cart() {
    const cart = useAppSelector((state) => (
        state.authReducer.isAuthenticated ? state.userCartReducer.value.cart : state.guestCartReducer.value
    ))

    const totalCartPrice = useAppSelector((state) => {
        if (state.authReducer.isAuthenticated) {
            let total = 0;
            state.userCartReducer.value.cart.map((item) => {
                if (item.product.discount) {
                    total = total + (calculateFinalPrice(item.product.price, item.product.discount) * item.productOrdered)
                } else {
                    total = total + (item.product.price * item.productOrdered)
                }
            });

            return total;
        } else {
            let total = 0;
            state.guestCartReducer.value.map((item) => {
                if (item.product.discount) {
                    total = total + (calculateFinalPrice(item.product.price, item.product.discount) * item.productOrdered)
                } else {
                    total = total + (item.product.price * item.productOrdered)
                }
            })
            return total;
        }
    });

    return (
        <main className="h-full px-2 md:px-7 lg:px-12 py-5 md:py-8 flex flex-col md:flex-row gap-3 items-start">
            {cart.map((product) => (
                <Product product={product} key={product.product?.id} />
            ))}
            <CartTotal length={cart.length} total={totalCartPrice} />
        </main>
    )
}

export default Cart