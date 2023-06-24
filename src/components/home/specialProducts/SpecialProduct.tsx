'use client'

import { CartState, Product } from '@/@types'
import { addGuestCart, removeGuestCart } from '@/redux/features/guestCart-slice';
import { addUserCart, removeUserCart, updateUserWishlist } from '@/redux/features/user-slice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import axios from 'axios';
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux';
import { handleStars } from '@/actions/handleStars'
import Image from 'next/image'
import Link from 'next/link'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { openModal } from '@/redux/features/authModal';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface SpecialProductProps {
    product: Product;
}

const SpecialProduct: FC<SpecialProductProps> = ({ product }) => {
    const [addToCardLoading, setAddToCartLoading] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated);
    const user = useAppSelector((state) => state.user.value);
    const isProductInCart = useAppSelector((state) => isAuth ?
        state.user.value.cart.some((prod) => prod.product?.id === product.id) :
        state.guest.value.some((prod) => prod.product?.id === product.id)
    );
    const isProductInWishlist = useAppSelector((state) =>
        isAuth ? state.user.value.wishlist.some((prod) => prod.id === product.id) : false
    )
    const userId = useAppSelector((state) => state.user.value.id);

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

    const addToCart = () => {
        const payload: CartState = {
            product: { ...product },
            productOrdered: 1,
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
            axios.post("/api/cart/delete", { userId: user.id, prodId: product.id })
                .then((response) => {
                    dispatch(removeUserCart(product.id))
                    console.log(response.data)
                })
                .catch((err) => console.log(err))
                .finally(() => setAddToCartLoading(false))

        } else {
            setAddToCartLoading(true)

            dispatch(removeGuestCart(product.id))
            setAddToCartLoading(false)
        }
    }
    return (
        <div className='relative w-full rounded-lg grid grid-cols-1 md:grid-cols-2 gap-3 bg-white'>
            {wishlistLoading &&
                <div className="absolute top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,.7)] flex items-center justify-center z-50 rounded-lg">
                    <div className="w-7 h-7 rounded-full border-2 border-white border-r-0 animate-spin" />
                </div>
            }
            <div className="relative w-full flex items-center justify-center pt-5">

                <small className='absolute top-2 left-2 z-20 bg-darkYellow text-gray-900 text-xs font-semibold leading-3 m-0 py-1 px-2 rounded-xl flex items-center text-center'>
                    -{product.discount}%
                </small>
                <div className='bg-white absolute top-1 z-20 right-2' onClick={handleWishlist}>
                    {isProductInWishlist ?
                        <FavoriteIcon className="w-6 h-6 cursor-pointer text-rose-500 hover:text-rose-600" />
                        :
                        <FavoriteBorderIcon className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-900" />
                    }
                </div>

                <Link href={`/product/${product.id}`} className="relative w-5/6 h-40 z-10 pt-8 pb-5 no-underline">
                    <Image
                        src={product.image_sm as string}
                        alt={product.name}
                        fill
                        className='w-auto h-auto object-contain'
                    />
                </Link>
            </div>
            <div className='w-full p-3'>
                <Link href={`/product/${product.id}`} className='no-underline'>
                    <div className='w-full flex flex-col gap-3'>
                        {/* products details */}
                        <p className='text-sm text-rose-600 font-semibold'>{product.brand.name}</p>
                        <h3 className="text-sm text-gray-900 line-clamp-2 font-semibold">{product.name}</h3>
                        <div>
                            {handleStars(product.rating)}
                        </div>
                        <p className="text-sm text-rose-600">price: ${product.price}</p>
                        <p className="text-xs text-gray-900">only {product.stock} left in stock. Order now</p>
                    </div>
                </Link>
                <button
                    type="button"
                    className='text-sm text-gray-300 w-full flex items-center justify-center px-3 py-2 mt-4 rounded-full bg-gray-800 cursor-pointer hover:text-white'
                    onClick={!isProductInCart ? addToCart : removeFromCart}
                >
                    {addToCardLoading ?
                        <div className="w-5 h-5 rounded-full border-2 border-white border-r-0 animate-spin" /> :
                        isProductInCart ? "Remove From Cart" : "Add to Cart"}
                </button>
            </div>
        </div>
    )
}

export default SpecialProduct