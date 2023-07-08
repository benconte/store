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
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import ClickAwayListener from '@mui/base/ClickAwayListener';

const Options = () => {
    const [isDropdown, setIsDropwdown] = useState(false)

    const isAuth = useAppSelector((state) => state.authReducer.isAuthenticated)
    const user = useAppSelector((state) => state.user.value)
    const guest = useAppSelector((state) => state.guest.value)
    const [cartLength, setCartLength] = useState(0)

    useEffect(() => {
        if(isAuth) {
            setCartLength(user.cart.length)
        } else {
            setCartLength(guest.length)
        }
    }, [isAuth, user, guest])

    const dispatch = useDispatch<AppDispatch>()

    const openAuthModal = () => {
        dispatch(openModal())
    }

    const logout = () => {
        signOut()
    }

    const handleClickAway = () => {
        setIsDropwdown(false)
    }
    return (
        <div className="flex items-center gap-6">
            <Link href="/orders" className="no-underline p-0 cursor-pointer">
                <div className='flex items-center gap-2 group'>
                    <CachedIcon className="w-7 h-7 text-gray-300 cursor-pointer" />
                    <p className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>
                        Returns
                        <span className="flex items-center gap-1">
                            <b>&</b>
                            Orders
                        </span>
                    </p>
                </div>
            </Link>
            <Link href="/wishlist" className="no-underline p-0 cursor-pointer">
                <div className='flex items-center gap-2 group'>
                    <FavoriteBorderIcon className="w-7 h-7 text-gray-300 cursor-pointer" />
                    <span className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>Favorite Whishlist</span>
                </div>
            </Link>
            <ClickAwayListener onClickAway={handleClickAway}>
                {isAuth ?
                    <div className='relative flex items-center gap-2 group'>
                        <div className="cursor-pointer flex items-center gap-2" onClick={() => setIsDropwdown(!isDropdown)}>
                            <PersonOutlineIcon className="w-7 h-7 text-gray-300 cursor-pointer" />
                            <span className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>Account</span>
                        </div>
                        {isDropdown &&
                            <div className="z-50 absolute h-auto top-10 right-0 w-40 bg-white rounded-lg overflow-hidden border border-gray-300 shadow-md flex flex-col justify-start">
                                <Link href="/profile" className="no-underline p-0 cursor-pointer">
                                    <div className="w-full h-9 flex items-center gap-3 px-3 py-4 hover:bg-orange-500 cursor-pointer text-gray-500 hover:text-white">
                                        <PersonOutlineIcon className="w-5 h-5 cursor-pointer" />
                                        <span className="text-sm">Profile</span>
                                    </div>
                                </Link>
                                <div className="w-full h-9 flex items-center gap-3 px-3 py-4 cursor-default text-gray-400">
                                    <SettingsIcon className="w-5 h-5 cursor-default" />
                                    <span className="text-sm">Settings</span>
                                </div>

                                <div className="w-full h-9 flex items-center gap-3 px-3 py-4 cursor-default text-gray-400">
                                    <HelpIcon className="w-5 h-5 cursor-default" />
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
                        <p className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>
                            Login
                            <span className="flex items-center gap-1">
                                <b>&</b>
                                Account
                            </span>
                        </p>
                    </div>
                }
            </ClickAwayListener>

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