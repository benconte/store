'use client'

import CachedIcon from '@mui/icons-material/Cached';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/features/authModal';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const Options = () => {
    const [isDropdown, setIsDropwdown] = useState(false)

    const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated)
    const cartLength = useAppSelector((state) => isAuth ?
        state.user.value.cart.length : state.guest.value.length
    )
    const dispatch = useDispatch<AppDispatch>()

    const openAuthModal = () => {
        dispatch(openModal())
    }

    const logout = () => {
        signOut()
    }
    return (
        <div className="flex items-center gap-6">
            <div className='flex items-center gap-2 group'>
                <CachedIcon className="w-7 h-7 text-gray-300 cursor-pointer" />
                <p className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>Compare Products</p>
            </div>
            <Link href="/wishlist" className="no-underline p-0 cursor-pointer">
                <div className='flex items-center gap-2 group'>
                    <FavoriteBorderIcon className="w-7 h-7 text-gray-300 cursor-pointer" />
                    <span className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>Favorite Whishlist</span>
                </div>
            </Link>
            {isAuth ?
                <div className='relative flex items-center gap-2 group'>
                    <div className="cursor-pointer flex items-center gap-2" onClick={() => setIsDropwdown(!isDropdown)}>
                        <PersonOutlineIcon className="w-7 h-7 text-gray-300 cursor-pointer" />
                        <span className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>Account</span>
                    </div>
                    {isDropdown &&
                        <div className="z-50 absolute h-auto top-10 right-0 w-40 bg-white rounded-lg overflow-hidden border border-gray-300 shadow-md flex flex-col justify-start gap-3">
                            <Link href="/profile" className="no-underline p-0 cursor-pointer">
                                <div className="w-full h-9 flex items-center gap-3 px-3 py-4 hover:bg-orange-500 cursor-pointer text-gray-500 hover:text-white">
                                    <PersonOutlineIcon className="w-5 h-5 cursor-pointer" />
                                    <span className="text-sm">Profile</span>
                                </div>
                            </Link>

                            <div className="w-full h-9 flex items-center gap-3 px-3 py-4 hover:bg-orange-500 cursor-pointer text-gray-500 hover:text-white">
                                <FavoriteBorderIcon className="w-5 h-5 cursor-pointer" />
                                <span className="text-sm">Favorites</span>
                            </div>

                            <div className="w-full h-9 flex items-center gap-3 px-3 py-4 hover:bg-orange-500 cursor-pointer text-gray-500 hover:text-white">
                                <SettingsIcon className="w-5 h-5 cursor-pointer" />
                                <span className="text-sm">Settings</span>
                            </div>

                            <div className="w-full h-9 flex items-center gap-3 px-3 py-4 hover:bg-orange-500 cursor-pointer text-gray-500 hover:text-white">
                                <HelpIcon className="w-5 h-5 cursor-pointer" />
                                <span className="text-sm">Help</span>
                            </div>

                            <div
                                className="w-full h-9 flex items-center gap-3 px-3 py-4 hover:bg-orange-500 cursor-pointer text-gray-500 hover:text-white"
                                onClick={logout}
                            >
                                <LogoutIcon className="w-5 h-5 cursor-pointer" />
                                <span className="text-sm">Logout</span>
                            </div>
                        </div>
                    }
                </div>
                :
                <div className='flex items-center gap-2 group' onClick={openAuthModal}>
                    <PersonOutlineIcon className="w-7 h-7 text-gray-300 cursor-pointer" />
                    <span className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>Login Account</span>
                </div>
            }

            <Link href="/cart" className="no-underline p-0 cursor-pointer">
                <div className='flex items-center gap-2 group'>
                    <div className='relative'>
                        <AddShoppingCartIcon className="w-7 h-7 text-[#F9B96E] cursor-pointer" />
                        <sup className="absolute -top-3 -right-1 text-gray-300 z-10 font-semibold text-sm cursor-pointer">{cartLength}</sup>
                    </div>
                    <span className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>Cart</span>
                </div>
            </Link>
        </div>
    )
}

export default Options