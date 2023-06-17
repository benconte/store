'use client'

import CachedIcon from '@mui/icons-material/Cached';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAppSelector } from '@/redux/store';

const Options = () => {
    const cartLength = useAppSelector((state) => state.guestCartReducer.value.length)
    return (
        <div className="flex items-center gap-6">
            <div className='flex items-center gap-2 group'>
                <CachedIcon className="w-7 h-7 text-gray-300 cursor-pointer" />
                <p className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>Compare Products</p>
            </div>
            <div className='flex items-center gap-2 group'>
                <FavoriteBorderIcon className="w-7 h-7 text-gray-300 cursor-pointer" />
                <span className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>Favorites Wishlist</span>
            </div>
            <div className='flex items-center gap-2 group'>
                <PersonOutlineIcon className="w-7 h-7 text-gray-300 cursor-pointer" />
                <span className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>Login Account</span>
            </div>
            <div className='flex items-center gap-2 group'>
                <div className='relative'>
                    <AddShoppingCartIcon className="w-7 h-7 text-[#F9B96E] cursor-pointer" />
                    <sup className="absolute -top-3 -right-1 text-gray-300 z-10 font-semibold text-sm cursor-pointer">{cartLength}</sup>
                </div>
                <span className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>Cart</span>
            </div>
        </div>
    )
}

export default Options