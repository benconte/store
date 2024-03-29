'use client'

import { useEffect, useState } from 'react'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import clsx from 'clsx';
import { calculateFinalPrice } from '@/utils/discountCalculator';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { CartState } from '@/@types';
import { addGuestCart, removeGuestCart } from '@/redux/features/guestCart-slice';
import { addUserCart, removeUserCart } from '@/redux/features/user-slice';
import axios from 'axios';
import { toast } from 'react-toastify';

type Action = 'INCR' | 'DECR';

const Form = ({ product }: CartState) => {
  const [addToCardLoading, setAddToCartLoading] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(1);
  const dispatch = useDispatch<AppDispatch>()

  const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated);
  const user = useAppSelector((state) => state.user.value);
  const guest = useAppSelector((state) => state.guest.value)
  const [isProductInCart, setIsProductInCart] = useState(false)

  useEffect(() => {
    if (isAuth) {
      setIsProductInCart(user.cart.some((prod) => prod.product.id === product.id))
    } else {
      setIsProductInCart(guest.some((prod) => prod.product.id === product.id))
    }
  }, [isAuth, user, guest, product])

  const changeAmount = (action: Action) => {
    if (currentAmount === 0 && action !== "INCR") return;

    if (action === "INCR") {
      setCurrentAmount(currentAmount + 1);
    } else {
      setCurrentAmount(currentAmount - 1);
    }
  }

  const addToCart = () => {
    const payload: CartState = {
      product: { ...product },
      productOrdered: currentAmount,
    };

    if (isAuth) {
      setAddToCartLoading(true)
      axios.post("/api/cart/add", { userId: user.id, payload })
        .then((response) => {
          dispatch(addUserCart(payload))
          console.log(response.data)
        })
        .catch((err) => console.log(err))
        .finally(() => setAddToCartLoading(false))

    } else {
      setAddToCartLoading(true)

      dispatch(addGuestCart(payload))
      setAddToCartLoading(false)
    }
  }

  const removeFromCart = () => {
    if (isAuth) {
      setAddToCartLoading(true)
      axios.post("/api/cart/delete", { userId: user.id, prodId: product?.id })
        .then(() => {
          dispatch(removeUserCart(product?.id as string))
        })
        .catch((err) => console.log(err))
        .finally(() => setAddToCartLoading(false))
    } else {
      setAddToCartLoading(true)

      dispatch(removeGuestCart(product?.id as string))
      setAddToCartLoading(false)
    }
  }

  const handleProductBuy = () => {
    toast.success('🦄 Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <div className='w-full md:max-w-xs border-2 border-gray-100 shadow p-3 rounded-lg'>
      <h3 className="text-lg font-semibold text-gray-900">Deliver</h3>
      <div className='flex items-center mt-3 gap-2 border border-gray-300 rounded p-2'>
        <AddLocationIcon className="w-5 h-5 text-gray-500" />
        <input type="text" placeholder='Your Address' className="outline-none text-gray-500 text-sm border-none bg-transparent" />
      </div>
      <div className="mt-3 w-full py-4">
        <h3 className="text-lg font-semibold text-gray-900">Total Stock: {product?.stock}</h3>
        <div className='flex items-center border border-gray-200 rounded'>
          <div
            className={clsx(
              'w-12 h-10 bg-zinc-300 flex items-center justify-center',
              currentAmount === 0 ? "cursor-not-allowed" : "cursor-pointer"
            )}
            onClick={() => changeAmount('DECR')}>
            <RemoveIcon className="w-5 h-5 text-gray-500" />
          </div>
          <p className='w-full text-center'>{currentAmount}</p>
          <div className='w-12 h-10 bg-darkYellow cursor-pointer flex items-center justify-center' onClick={() => changeAmount('INCR')}>
            <AddIcon className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-2">
        <p className='text-sm text-gray-500'>Price</p>
        <b className="text-base font-semibold text-gray-900">
          ${product?.discount ? calculateFinalPrice(product?.price as number, product?.discount as number)
            :
            product?.price
          }</b>
      </div>
      <div className="flex items-center justify-between py-2">
        <p className='text-sm text-gray-500'>Shipping</p>
        <b className="text-base font-semibold text-gray-900">$10</b>
      </div>

      <div className="w-full flex flex-col gap-3 my-5">
        <button
          type="button"
          className="w-full py-2 rounded-lg text-center cursor-pointer bg-orange-600 hover:bg-orange-700 text-white border-none outline-none text-sm flex items-center justify-center"
          onClick={!isProductInCart ? addToCart : removeFromCart}
        >
          {addToCardLoading ?
            <div className="w-5 h-5 rounded-full border-2 border-white border-r-0 animate-spin" /> :
            isProductInCart ? "Remove From Cart" : "Add to Cart"}
        </button>
        <button
          type="button"
          className="w-full py-2 rounded-lg text-center cursor-pointer bg-white border border-orange-600 text-orange-600 outline-none text-sm"
          onClick={handleProductBuy}
        >Buy Now</button>
      </div>
    </div>
  )
}

export default Form