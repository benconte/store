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
        <main className="h-full px-2 md:px-7 lg:px-12 py-5 md:py-8 flex flex-col lg:flex-row gap-3 items-start">
            <div className="w-full bg-white px-3 sm:px-6 py-2 rounded-lg">
                <header className="w-full py-4 border-b border-gray-400 mb-3 text-gray-900 font-semibold text-2xl">
                    Shopping Cart
                </header>
                {cart.map((product) => (
                    <Product product={product} key={product.product?.id} />
                ))}

                {/* subtotal section */}
                <div className="w-full flex items-center justify-end pb-3">
                    <p className="text-base text-gray-900">
                        Subtotal ({cart.length} items):
                        <b className="pl-2">${totalCartPrice}</b>
                    </p>
                </div>
            </div>
            <CartTotal length={cart.length} total={totalCartPrice} />
        </main>
    )
}

export default Cart