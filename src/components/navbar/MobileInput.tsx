'use client'

import { FC, useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Products } from '@prisma/client';
import Image from 'next/image';
import { handleStars } from '@/utils/handleStars';
import { calculateFinalPrice } from '@/utils/discountCalculator';
import clsx from 'clsx';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Link from 'next/link';

const MobileInput = () => {
    const [search, setSearch] = useState<Products[]>([])
    const [isSearch, setIsSearch] = useState(false)
    const [isSearchResults, setIsSearchResult] = useState(false)
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

    const handleClickAway = () => {
        setIsSearchResult(false)
    }
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-3 flex gap-3 bg-white rounded-md h-9 w-full items-center relative'>
                <input
                    id="search"
                    type="search"
                    required
                    {...register("search", { required: true })}
                    placeholder="Enter a search..."
                    className='w-full h-full border-none outline-none px-4 rounded-l-sm'
                />
                <div className={clsx(
                    "pl-3 w-4 h-4 rounded-full border-2 border-rose-600 border-r-0 animate-spin",
                    isSearch ? "flex" : "hidden"
                )} />
                <button type="submit" className='h-full outline-none border-none rounded-r-sm bg-[#F9B96E] flex items-center justify-center px-4'>
                    <SearchIcon className="w-8 h-8 text-gray-900" />
                </button>

                {/* search */}
                {search.length > 0 && isSearchResults &&
                    <div className="w-full bg-white absolute top-10 rounded-lg z-50 shadow-lg flex flex-col gap-3 overflow-hidden">
                        {search.map((prod) => (
                            <Link href={`/product/${prod.id}`} key={prod.id} className="w-full flex items-center gap-2 p-1 hover:bg-gray-200 cursor-pointer no-underline">
                                <Image
                                    src={prod.image_1 as string}
                                    alt={prod.name}
                                    width={30}
                                    height={30}
                                    className="object-cover"
                                />
                                <div className="w-2/5 flex-1 flex flex-col gap-2">
                                    <p className='w-full truncate text-sm font-semibold text-gray-900'>{prod.name}</p>
                                    <span>{handleStars(prod.rating as number)}</span>
                                </div>
                                <h3 className='text-sm font-semibold text-gray-900 ml-5 md:ml-10'>
                                    ${prod.discount ?
                                        calculateFinalPrice(prod.price as number, prod.discount as number)
                                        :
                                        prod.price
                                    }
                                </h3>
                            </Link>
                        ))}
                    </div>
                }
            </form >
        </ClickAwayListener>
    )
}

export default MobileInput