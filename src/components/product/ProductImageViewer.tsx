'use client'

import { Product } from '@/@types'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'

interface ProductImageViewerProps {
    product: Product
}

const ProductImageViewer: FC<ProductImageViewerProps> = ({ product }) => {
    const [selected, setSelected] = useState<string>(product?.image_1 as string);

    return (
        <div className='w-full md:max-w-sm flex flex-col items-center gap-3 bg-white rounded-lg py-5'>
            <div className='w-full rounded-lg h-64 relative'>
                <Image
                    src={selected}
                    alt="product Image"
                    fill
                    className="object-contain"
                />
            </div>
            <div className='w-full flex items-center justify-center mt-4 gap-6'>
                {product?.image_1 && (
                    <div
                        className={clsx(
                            'relative w-20 h-20 cursor-pointer shadow border-2 overflow-hidden rounded-lg',
                            selected === product?.image_1 ? "border-darkYellow" : "border-gray-200"
                        )}
                        onClick={() => setSelected(product?.image_1 as string)}
                    >
                        <Image
                            src={product.image_1}
                            alt="Image 2"
                            fill
                            className='bg-white cursor-pointer object-contain p-1'
                        />
                    </div>

                )}
                {product?.image_2 && (
                    <div
                        className={clsx(
                            'relative w-20 h-20 cursor-pointer shadow border-2 overflow-hidden rounded-lg',
                            selected === product?.image_2 ? "border-darkYellow" : "border-gray-200"
                        )}
                        onClick={() => setSelected(product?.image_2 as string)}
                    >
                        <Image
                            src={product.image_2}
                            alt="Image 2"
                            fill
                            className='bg-white cursor-pointer object-contain p-1'
                        />
                    </div>

                )}
                {product?.image_3 && (
                    <div
                        className={clsx(
                            'relative w-20 h-20 cursor-pointer shadow border-2 overflow-hidden rounded-lg',
                            selected === product?.image_3 ? "border-darkYellow" : "border-gray-200"
                        )}
                        onClick={() => setSelected(product?.image_3 as string)}
                    >
                        <Image
                            src={product.image_3}
                            alt="Image 2"
                            fill
                            className='bg-white cursor-pointer object-contain p-1'
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductImageViewer