'use client'

import SearchIcon from '@mui/icons-material/Search';
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
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Products } from '@prisma/client';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import MobileInput from './MobileInput';

const MobileNav = () => {
    const [isDropdown, setIsDropwdown] = useState(false)
    const [search, setSearch] = useState<Products[]>([])
    const [isSearch, setIsSearch] = useState(false)
    const [isSearchResults, setIsSearchResult] = useState(false)

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

    const handleDropdownClickAway = () => {
        setIsDropwdown(false)
    }
    const {
        register,
        handleSubmit,
    } = useForm<FieldValues>({
        defaultValues: {
            search: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsSearch(true)
        axios.post("/api/search", { search: data.search })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Something went wrong. Try again later")
                }
                setIsSearchResult(true);
                setSearch(response.data)
            })
            .catch(err => console.log(err))
            .finally(() => setIsSearch(false))
    }

    const handleInputClickAway = () => {
        setIsSearchResult(false)
    }
    return (
        <div className='w-full flex flex-col lg:hidden border-t border-solid border-gray-700 py-2'>
            <div className="flex items-center justify-between">
                <div className='flex items-center gap-3'>
                    <Link href="/" className='no-underline p-0'>
                        <h1 className='font-medium text-white text-xl cursor-pointer'>Store.</h1>
                    </Link>

                </div>
                <div className="flex items-center gap-3">
                    <ClickAwayListener onClickAway={handleDropdownClickAway}>
                        {isAuth ?
                            <div className='relative flex items-center gap-2 group'>
                                <PersonOutlineIcon className="w-7 h-7 text-gray-300 cursor-pointer" onClick={() => setIsDropwdown(!isDropdown)} />

                                {isDropdown &&
                                    <div className="z-50 absolute h-auto top-10 right-0 w-40 bg-white rounded-lg overflow-hidden border border-gray-300 shadow-md flex flex-col justify-start gap-3">
                                        <Link href="/profile" className="no-underline p-0 cursor-pointer">
                                            <div className="w-full h-9 flex items-center gap-3 px-3 py-4 hover:bg-orange-500 cursor-pointer text-gray-500 hover:text-white">
                                                <PersonOutlineIcon className="w-5 h-5 cursor-pointer" />
                                                <span className="text-sm">Profile</span>
                                            </div>
                                        </Link>

                                        <Link href="/wishlist" className="no-underline p-0 cursor-pointer">
                                            <div className="w-full h-9 flex items-center gap-3 px-3 py-4 hover:bg-orange-500 cursor-pointer text-gray-500 hover:text-white">
                                                <PersonOutlineIcon className="w-5 h-5 cursor-pointer" />
                                                <span className="text-sm">Wishlist</span>
                                            </div>
                                        </Link>

                                        <Link href="/orders" className="no-underline p-0 cursor-pointer">
                                            <div className="w-full h-9 flex items-center gap-3 px-3 py-4 hover:bg-orange-500 cursor-pointer text-gray-500 hover:text-white">
                                                <PersonOutlineIcon className="w-5 h-5 cursor-pointer" />
                                                <span className="text-sm">Orders</span>
                                            </div>
                                        </Link>

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
                            <PersonOutlineIcon className="w-7 h-7 text-gray-300 cursor-pointer" onClick={openAuthModal} />
                        }
                    </ClickAwayListener>
                    <Link href="/cart" className="no-underline p-0 cursor-pointer">
                        <div className="relative">
                            <AddShoppingCartIcon className="w-7 h-7 text-[#F9B96E] z-0 cursor-pointer" />
                            <sup className="absolute -top-3 -right-1 text-gray-300 z-10 font-bold text-lg cursor-pointer">
                                {cartLength}
                            </sup>
                        </div>
                    </Link>
                </div>

            </div>
            <MobileInput />
        </div>
    )
}

export default MobileNav