'use client'

import CartTotal from "@/components/cart/CartTotal"
import OrderSuccess from "@/components/cart/OrderSuccessful"
import Product from "@/components/cart/Product"
import { clearCart } from "@/redux/features/guestCart-slice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { calculateFinalPrice } from "@/utils/discountCalculator"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

function Cart() {
    const [clearCartLoading, setClearCartLoading] = useState(false)
    const [isOrderSuccessModal, setIsOrderSuccessModal] = useState(false)

    const cart = useAppSelector((state) => (
        state.authReducer.isAuthenticated ? state.user.value.cart : state.guest.value
    ))

    const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated);

    const totalCartPrice = useAppSelector((state) => {
        if (state.authReducer.isAuthenticated) {
            let total = 0;
            state.user.value.cart.map((item) => {
                if (item.product.discount) {
                    total = total + (calculateFinalPrice(item.product.price, item.product.discount) * item.productOrdered)
                } else {
                    total = total + (item.product.price * item.productOrdered)
                }
            });

            return total;
        } else {
            let total = 0;
            state.guest.value.map((item) => {
                if (item.product.discount) {
                    total = total + (calculateFinalPrice(item.product.price, item.product.discount) * item.productOrdered)
                } else {
                    total = total + (item.product.price * item.productOrdered)
                }
            })
            return total;
        }
    });

    const dispatch = useDispatch<AppDispatch>()

    const clearCartState = async () => {
        if (!isAuth) {
            dispatch(clearCart());
            return;
        }

        setClearCartLoading(true)
        const response = await axios.post("/api/cart/clearCart");
        if (response.status !== 200) {
            throw new Error("Something went wrong.")
        }

        dispatch(clearCart())
        setClearCartLoading(false)
    }

    const closeModal = () => {
        setIsOrderSuccessModal(false);
    }
    return (
        <div>
            <OrderSuccess isOpen={isOrderSuccessModal} closeOrderSuccessModal={closeModal} />
            <main className="h-full px-2 md:px-7 lg:px-12 py-5 md:py-8 flex flex-col lg:flex-row gap-3 items-start">
                <div className="w-full bg-white px-3 sm:px-6 py-2 rounded-lg">
                    <header className="w-full py-4 border-b border-gray-400 mb-3 flex items-center justify-between gap-5">
                        <h3 className="text-gray-900 font-semibold text-base md:text-2xl">
                            Shopping Cart
                        </h3>
                        {cart.length > 0 &&
                            <span className="text-sm text-[#0066C0] hover:underline cursor-pointer flex items-center"
                                onClick={clearCartState}
                            >
                                clear cart
                                {clearCartLoading &&
                                    <div className="ml-2 w-4 h-4 rounded-full border-2 border-[#0066C0] border-r-0 animate-spin" />
                                }
                            </span>
                        }
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
                <CartTotal
                    length={cart.length}
                    total={totalCartPrice}
                    cart={cart}
                    isAuth={isAuth}
                    openOrderSuccessModal={() => setIsOrderSuccessModal(true)}
                />
            </main>
        </div>
    )
}

export default Cart