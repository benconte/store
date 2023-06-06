import Image from 'next/image'
import CachedIcon from '@mui/icons-material/Cached';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Options = () => {
    return (
        <div className="flex items-center gap-6">
            <div className='flex items-center gap-2 group'>
                <CachedIcon className="w-7 h-7 text-gray-300" />
                <p className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>Compare Products</p>
            </div>
            <div className='flex items-center gap-2 group'>
                <FavoriteBorderIcon className="w-7 h-7 text-gray-300" />
                <span className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>Favorites Wishlist</span>
            </div>
            <div className='flex items-center gap-2 group'>
                <PersonOutlineIcon className="w-7 h-7 text-gray-300" />
                <span className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>Login Account</span>
            </div>
            <div className='flex items-center gap-2 group'>
                <AddShoppingCartIcon className="w-7 h-7 text-[#F9B96E]" />
                <span className='text-xs font-light text-gray-300 group-hover:underline cursor-pointer'>Compare Products</span>
            </div>
        </div>
    )
}

export default Options