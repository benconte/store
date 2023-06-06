'use client'

import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';

const MobileNav = () => {
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            search: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

    } 
    return (
        <div className='w-full flex flex-col lg:hidden border-t border-solid border-gray-700 py-2'>
            <div className="flex items-center justify-between">
                <div className='flex items-center gap-3'>
                    <MenuIcon className="w-7 h-7 text-gray-300 cursor-pointer" />
                    <h1 className='font-medium text-white text-xl cursor-pointer'>Store</h1>
                </div>
                <div className="flex items-center gap-3">
                    <PersonOutlineIcon className="w-7 h-7 text-gray-300 cursor-pointer" />
                    <div className="relative">
                        <AddShoppingCartIcon className="w-7 h-7 text-[#F9B96E] z-0 cursor-pointer" />
                        <sup className="absolute -right-0.5 text-gray-300 z-10 font-bold text-lg cursor-pointer">0</sup>
                    </div>
                </div>

            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex h-9 w-full items-center mt-3'>
                <input
                    id="Search"
                    type="search"
                    required
                    {...register("Search", { required: true })}
                    placeholder="Enter a search..."
                    className='w-full h-full border-none outline-none px-4 rounded-l-sm'
                />
                <button className='h-full outline-none border-none rounded-r-sm bg-[#F9B96E] flex items-center justify-center px-4'>
                    <SearchIcon className="w-8 h-8 text-gray-900" />
                </button>
            </form>
        </div>
    )
}

export default MobileNav