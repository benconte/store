'use client'

import { Product } from '@/@types'
import { FC, useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';
import { handleStars } from '@/utils/handleStars';
import Link from 'next/link';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/features/authModal';
import axios from 'axios';
import { updateUserWishlist } from '@/redux/features/user-slice';
import { useRouter } from 'next/navigation';

interface ProductProps {
    product: Product
}

const WishlistProduct: FC<ProductProps> = ({ product }) => {
    const [wishlistLoading, setWishlistLoading] = useState(false)
    const [isProductInWishlist, setIsProductInWishlist] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    // getting the initial states
    const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated);
    const user = useAppSelector((state) => state.user.value);

    useEffect(() => {
        if (isAuth) {
            setIsProductInWishlist(user.wishlist.some((prod) => prod.id === product.id))
        } else {
            setIsProductInWishlist(false)
        }
    }, [isAuth, user, product])

    const handleWishlist = async () => {
        if (isAuth) {
            setWishlistLoading(true);
            const response = await axios.post("/api/user/wishlist", { userId: user.id, prodId: product.id })
            if (response.status !== 200) {
                throw new Error("Unexpected response status")
            }

            dispatch(updateUserWishlist(response.data));
            router.refresh()
            setWishlistLoading(false)
        } else {
            dispatch(openModal())
        }
    }
    return (
        <div className='relative grid grid-cols-1 h-full p-4 shadow-md rounded-lg bg-white group cursor-pointer'>
            {wishlistLoading &&
                <div className="absolute top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,.7)] flex items-center justify-center z-50 rounded-lg">
                    <div className="w-7 h-7 rounded-full border-2 border-white border-r-0 animate-spin" />
                </div>
            }
            <div className='absolute top-1 right-1 z-20 bg-white' onClick={handleWishlist}>
                {isProductInWishlist ?
                    <FavoriteIcon className="w-6 h-6 cursor-pointer text-rose-500 hover:text-rose-600" />
                    :
                    <FavoriteBorderIcon className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-900" />
                }
            </div>
            <Link className='no-underline p-0 w-full h-full' href={`/product/${product?.id}`}>
                <div className='relative w-full h-40 z-10 flex items-center justify-center mt-8 mb-5'>
                    <Image
                        src={product.image_sm ? product.image_sm : ""}
                        alt={product.name}
                        fill
                        className='w-full bg-white object-contain group-hover:scale-110 transition z-10'
                    />
                </div>
                <div className='flex-1 flex flex-col gap-3'>
                    <p className='text-sm text-[#F9B96E] font-semibold'>Brand: {product?.brand.name}</p>
                    <h3 className="text-sm text-gray-900 line-clamp-2">{product?.name}</h3>
                    <div>
                        {handleStars(product?.rating as number)}
                    </div>
                    <p className="text-sm text-gray-900">${product?.price}</p>
                </div>
            </Link>
        </div>
    )
}

export default WishlistProduct