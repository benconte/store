'use client'

import { FC, useState } from 'react'
import DiscountIcon from '@mui/icons-material/Discount';
import { calculateFinalPrice } from '@/utils/discountCalculator';
import Image from "next/image"
import small_0 from "../../../public/images/icons/small_0.png"
import small_1 from "../../../public/images/icons/small_1.png"
import small_1_half from "../../../public/images/icons/small_1_half.png"
import small_2 from "../../../public/images/icons/small_2.png"
import small_2_half from "../../../public/images/icons/small_2_half.png"
import small_3 from "../../../public/images/icons/small_3.png"
import small_3_half from "../../../public/images/icons/small_3_half.png"
import small_4 from "../../../public/images/icons/small_4.png"
import small_4_half from "../../../public/images/icons/small_4_half.png"
import small_5 from "../../../public/images/icons/small_5.png"
import { Product } from '@/@types';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import axios from 'axios';
import { updateUserWishlist } from '@/redux/features/user-slice';
import { openModal } from '@/redux/features/authModal';

interface DetailsProps {
  product: Product
}

const Details: FC<DetailsProps> = ({ product }) => {
  const handleStars = (rating: any) => {
    if (rating === 0) {
      return <Image src={small_0} alt="Stars 0" />
    } else if (rating === 1) {
      return <Image src={small_1} alt="Stars 1" />
    } else if (rating > 1 && rating < 2) {
      return <Image src={small_1_half} alt="Stars 1.5" />
    } else if (rating === 2) {
      return <Image src={small_2} alt="Stars 2" />
    } else if (rating > 2 && rating < 3) {
      return <Image src={small_2_half} alt="Stars 2.5" />
    } else if (rating === 3) {
      return <Image src={small_3} alt="Stars 3" />
    } else if (rating > 3 && rating < 4) {
      return <Image src={small_3_half} alt="Stars 3.5 " />
    } else if (rating === 4) {
      return <Image src={small_4} alt="Stars 4" />
    } else if (rating > 4 && rating < 5) {
      return <Image src={small_4_half} alt="Stars 4.5" />
    } else {
      return <Image src={small_5} alt="Stars 5" />
    }
  }

  const [wishlistLoading, setWishlistLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const userId = useAppSelector((state) => state.user.value.id);
  const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated);
  const isProductInWishlist = useAppSelector((state) => isAuth? 
    state.user.value.wishlist.includes(product.id) :
    false
  )

  const handleWishlist = async () => {
    if (isAuth) {
      setWishlistLoading(true);
      const response = await axios.post("/api/user/wishlist", { userId, prodId: product.id })
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
    <div className='flex-1 basis-0'>
      <h1 className="text-xl font-semibold text-gray-900">{product?.name}</h1>
      <div className="flex items-center gap-2 mt-3">
        <span className="text-gray-600 text-sm">Brand: </span>
        <b className='text=sm'>{product?.brand.name}</b>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-5">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm">Condition: </span>
          <b className='text-sm text-gray-900'>New</b>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm">Stock: </span>
          <b className='text-sm text-gray-900'>{product?.stock}</b>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm">Category: </span>
          <b className='text-sm text-gray-900'>{product?.category.name}</b>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm">Weight: </span>
          <b className='text-sm text-gray-900'>1 kg</b>
        </div>
      </div>

      <div className='flex items-center gap-3 mt-5'>
        {product?.discount && product?.discount > 0 &&
          <span className="text-sm text-rose-600">
            <DiscountIcon className="w-4 h-4 text-rose-600 mr-1" />
            -{product?.discount}%
          </span>
        }
        <b className="text-2xl font-semibold text-gray-900">
          ${product?.discount ? calculateFinalPrice(product?.price as number, product?.discount as number)
            :
            product?.price
          }
        </b>
      </div>
      {product?.discount && product?.discount > 0 ? (
        <span className='text-base text-gray-500 mt-3 mb-5'>
          Before: {product?.price}
        </span>
      ) : <small className='text-sm text-gray-500 my-3'>Discount unavalaible</small>}

      <div className="flex items-center gap-2 my-5">
        <span className="text-sm text-gray-600">Available color:</span>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-red-500 cursor-pointer" />
          <div className="w-5 h-5 rounded-full bg-blue-500 cursor-pointer" />
          <div className="w-5 h-5 rounded-full bg-gray-900 cursor-pointer" />
          <div className="w-5 h-5 rounded-full bg-gray-400 cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 flex items-center gap-3 text-sm text-gray-600">
          <p>{handleStars(4.6)}</p>
          <p>{product?.rating} product ratings</p>
        </div>
        <span className="text-sm text-rose-600 hover:underline cursor-pointer flex items-center"
          onClick={() => !wishlistLoading && handleWishlist()}
        >
          {isProductInWishlist ? "Remove from wishlist" : "Add to my wishlist"}

          {wishlistLoading &&
            <div className="ml-3 w-5 h-5 rounded-full border-2 border-rose-600 border-r-0 animate-spin" />
          }
        </span>
      </div>

      <div className="w-full py-5">
        <h3 className="text-base font-semibold text-gray-900 mb-2">Description</h3>
        <p className='text-sm text-gray-500'>{product?.description}</p>
      </div>
    </div>
  )
}

export default Details