import { ProductSuggestions } from '@/utils/Suggestedproducts'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'

const ProductSuggestions = ({ suggestedProducts }: { suggestedProducts: ProductSuggestions[] }) => {
    return (
        <div className='w-full mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {suggestedProducts.map((product) => (
                <div className={clsx('flex flex-col justify-center rounded-lg px-4 pt-6', product.background !== 'bg-black' ? `bg-white` : 'bg-black')} key={product.productType}>
                    <small
                        className={
                            clsx('text-xs uppercase font-semibold', 
                                product.background === 'bg-black' ? "text-zinc-400" : "text-gray-600"
                            )}
                    >{product.productType}</small>
                    <h3
                        className={clsx(
                            'text-xl font-semibold ', 
                            product.background === 'bg-black' ? "text-white" : "text-gray-900")}
                    >
                        {product.title}
                    </h3>
                    <span
                        className={clsx(
                            'text-sm leading-6 ', 
                            product.background === 'bg-black' ? "text-gray-400" : "text-gray-600")}
                    >
                        {product.subtitle}
                    </span>

                    <div className='relative w-full h-64 flex flex-col-reverse overflow-hidden'>
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className='w-full h-full md:absolute md:top-1/3 md:left-0 md:right-0 md:-translate-2/4 object-contain md:object-cover object-bottom'
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductSuggestions