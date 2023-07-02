'use client'

import { CartState } from '@/@types';
import { openModal } from '@/redux/features/authModal';
import { userClearCart } from '@/redux/features/user-slice';
import { AppDispatch } from '@/redux/store';
import axios from 'axios';
import clsx from 'clsx';
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux';

interface CartTotalProps {
  length: number;
  total: number;
  cart: CartState[];
  isAuth: boolean;
  openOrderSuccessModal: () => void;
}

const CartTotal: FC<CartTotalProps> = ({ length, total, cart, isAuth, openOrderSuccessModal }) => {
  const [isPlaceOrderLoading, setPlaceOrderLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const placeOrder = async () => {
    if (!isAuth) {
      dispatch(openModal());
      return;
    }

    setPlaceOrderLoading(true)
    const response = await axios.post("/api/user/order", { cart });
    if (response.status !== 200) {
      throw new Error("Something went wrong.")
    }

    const clearCartResponse = await axios.post("/api/cart/clearCart");
    if (clearCartResponse.status !== 200) {
      return new Error("Something went wrong.")
    }

    dispatch(userClearCart())
    setPlaceOrderLoading(false)
    openOrderSuccessModal()
  }
  return (
    <div className='bg-white p-4 max-w-full md:max-w-xs w-full rounded-lg'>
      <div className="w-full flex items-center">
        <p className="text-base text-gray-900">
          Subtotal ({length} items):
          <b className="pl-2">${total}</b>
        </p>
      </div>
      <p className="text-sm text-gray-900">Order all at once</p>
      <div className="w-full h-10 mt-4">
        <button
          className={clsx(
            "w-full h-full text-sm text-white bg-orange-500 hover:bg-orange-600 flex items-center justify-center rounded-lg outline-none border-none",
            total <= 0 ? "bg-orange-400 hover:bg-orange-400 cursor-not-allowed" : "cursor-pointer"
          )}
          disabled={total <= 0 && true}
          onClick={placeOrder}
        >
          {isPlaceOrderLoading ? (
            <div className="ml-3 w-5 h-5 rounded-full border-2 border-white border-r-0 animate-spin" />
          ) : "Proceed to checkout"}
        </button>
      </div>
    </div>
  )
}

export default CartTotal