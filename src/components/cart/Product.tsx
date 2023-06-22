'use client'

import { CartState } from '@/@types'
import { calculateFinalPrice } from '@/utils/discountCalculator'
import Image from 'next/image'
import { FC, useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { removeUserCart, updateUserCart, updateUserWishlist } from '@/redux/features/user-slice'
import axios from 'axios'
import clsx from 'clsx'
import { openModal } from '@/redux/features/authModal'

interface ProductProps {
  product: CartState
}

type Action = 'INCR' | 'DECR';

const Product: FC<ProductProps> = ({ product: item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [isProductDelete, setIsProductDelete] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false)

  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated);
  const userId = useAppSelector((state) => state.user.value.id);
  const isProductInWishlist = useAppSelector((state) => state.user.value.wishlist.includes(item.product.id))

  const changeQuantity = async (action: Action) => {
    if (item.productOrdered === 1 && action !== "INCR") return;

    if (action === "INCR") {
      if (isAuth) {
        setIsLoading(true);

        const payload: CartState = {
          product: { ...item.product },
          productOrdered: item.productOrdered + 1,
        }

        const response = await axios.post("/api/cart/update",
          { payload, userId }
        )
        if (response.status !== 200) {
          setIsLoading(false);
          throw new Error('Unexpected response status');
        }

        dispatch(updateUserCart(payload));
        setIsLoading(false);
      }
    } else {
      if (isAuth) {
        setIsLoading(true);

        const payload: CartState = {
          product: { ...item.product },
          productOrdered: item.productOrdered - 1,
        }

        const response = await axios.post("/api/cart/update",
          { payload, userId }
        )
        if (response.status !== 200) {
          setIsLoading(false);
          throw new Error('Unexpected response status');
        }

        dispatch(updateUserCart(payload));
        setIsLoading(false);
      }
    }
  };

  const removeFromCart = async () => {
    if (isAuth) {
      setIsProductDelete(true);

      const payload = {
        prodId: item.product.id,
        userId,
      }

      const response = await axios.post("/api/cart/delete", { ...payload })
      if (response.status !== 200) {
        setIsProductDelete(false);
        throw new Error('Unexpected response status');
      }

      dispatch(removeUserCart(payload.prodId));
      setIsProductDelete(false);
    }
    else {

    }
  }

  const handleWishlist = async () => {
    if (isAuth) {
      setWishlistLoading(true);
      const response = await axios.post("/api/user/wishlist", { userId, prodId: item.product.id })
      if (response.status !== 200) {
        throw new Error("Unexpected response status")
      }

      dispatch(updateUserWishlist(response.data));
      setWishlistLoading(false)
    } else {
      dispatch(openModal())
    }
  }
  return (
    <div className='w-full flex flex-col relative sm:flex-row gap-4 items-start mb-5 border-b border-gray-300 py-5'>
      {isProductDelete && (
        <div className="w-full h-full absolute top-0 right-0 left-0 bottom-0 bg-gray-700 flex items-center justify-center z-40 rounded-lg opacity-70">
          <div className="w-5 h-5 rounded-full border-2 border-white border-r-0 animate-spin" />
        </div>
      )}
      <div className='w-full sm:max-w-[190px] h-[180px] rounded-lg relative'>
        <Image
          src={item.product.image_1}
          alt="product Image"
          fill
          className="w-full h-full object-contain"
        />
      </div>
      <div className='w-full flex items-start gap-8'>
        <div className='flex-1 flex flex-col'>
          <h1 className='text-sm md:text-base font-semibold text-gray-900 line-clamp-2 leading-4'>{item.product.name}</h1>
          <small className='text-sm text-gray-600'>By {item.product.brand.name}</small>
          <small className='text-sm text-gray-900'>{item.product.category.name}</small>
          <small className='text-green-500'>In Stock: {item.product.stock}</small>

          <div className="flex items-center flex-wrap gap-5 mt-2">
            <div className='relative border border-gray-200 rounded-lg bg-gray-200'>
              <div className="flex place-items-center gap-9 cursor-pointer p-2" onClick={() => setIsDropdown(!isDropdown)}>
                <span className="text-gray-900">Qty: {item.productOrdered}</span>
                {isLoading ?
                  <div className="w-5 h-5 rounded-full border-2 border-gray-900 border-r-0 animate-spin" />
                  :
                  <KeyboardArrowDownIcon className="w-5 h-5 text-gray-900" />
                }
              </div>
              {isDropdown &&
                <div className="absolute w-full left-0 -bottom-20 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
                  <span
                    className={clsx(
                      'text-gray-900 hover:text-white flex items-center hover:bg-darkBlue p-2',
                      isLoading ? "cursor-not-allowed" : "cursor-pointer"
                    )}
                    onClick={() => !isLoading ? changeQuantity("INCR") : null}
                  >
                    <AddIcon className="w-5 h-5" />
                    Increase
                  </span>
                  <span
                    className={clsx(
                      'text-gray-900 hover:text-white flex items-center hover:bg-darkBlue p-2',
                      isLoading ? "cursor-not-allowed" : "cursor-pointer"
                    )}
                    onClick={() => !isLoading ? changeQuantity("DECR") : null}
                  >
                    <RemoveIcon className="w-5 h-5" />
                    Decrease
                  </span>
                </div>
              }
            </div>

            <span className="text-sm text-[#0066C0] hover:underline cursor-pointer" onClick={removeFromCart}>Delete</span>
            <span className="text-sm text-rose-600 hover:underline cursor-pointer flex items-center"
              onClick={() => !wishlistLoading && handleWishlist()}
            >
              {isProductInWishlist ? "Remove from wishlist" : "Add to my wishlist"}

              {wishlistLoading &&
                <div className="ml-3 w-5 h-5 rounded-full border-2 border-rose-600 border-r-0 animate-spin" />
              }
            </span>
          </div>
        </div>


        <h3 className='text-sm md:text-base font-semibold text-gray-900'>
          ${item.product.discount ?
            calculateFinalPrice(item.product.price as number, item.product.discount as number)
            :
            item.product.price
          }
        </h3>
      </div>
    </div>
  )
}

export default Product