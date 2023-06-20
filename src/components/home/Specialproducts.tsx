'use client'

import { handleStars } from '@/actions/handleStars'
import Image from 'next/image'
import Link from 'next/link'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product } from '@/@types';

const Specialproducts = ({ products }: { products: Product[] }) => {
    return (
        <div className="w-full py-10">
            <h2 className='text-sm md:text-lg text-gray-900 font-semibold'>Special Products</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {products && products.length > 0 && products.map((product: Product) => (
                    <div className='w-full rounded-lg grid grid-cols-1 md:grid-cols-2 gap-3 bg-white' key={product.id}>
                        <div className="relative w-full flex items-center justify-center pt-5">

                            <small className='absolute top-2 left-2 z-20 bg-darkYellow text-gray-900 text-xs font-semibold leading-3 m-0 py-1 px-2 rounded-xl flex items-center text-center'>
                                -{product.discount}%
                            </small>
                            <div className='bg-white absolute top-1 z-20 right-2'>
                                <FavoriteBorderIcon className="2-8 h-8 cursor-pointer text-gray-600 hover:text-gray-900" />
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
                            <button type="button" className='text-sm text-gray-300 px-3 py-2 mt-4 rounded-full bg-gray-800 cursor-pointer hover:text-white'>Add to cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Specialproducts