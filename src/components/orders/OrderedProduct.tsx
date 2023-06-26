'use client'

import { Product } from '@/@types'
import { FC } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import DoneIcon from '@mui/icons-material/Done';

interface ProductProps {
    product: Product
}

const OrderedProduct: FC<ProductProps> = ({ product }) => {
    return (
        <div className='relative grid grid-cols-1 h-full p-4 shadow-md rounded-lg bg-white group cursor-pointer'>
            <div className='absolute top-1 right-1 z-20 bg-green-600 rounded-full'>
                <DoneIcon className="w-6 h-6 cursor-pointer text-white" />
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
                    <h3 className="text-sm text-gray-900 line-clamp-2">{product?.name}</h3>
                    <p className="text-sm text-gray-900">${product?.price}</p>
                </div>
            </Link>
        </div>
    )
}

export default OrderedProduct