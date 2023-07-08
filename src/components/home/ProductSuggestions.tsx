import clsx from 'clsx'
import Image from 'next/image'
import { suggestedProducts } from "@/utils/Suggestedproducts";

const ProductSuggestions = () => {
    return (
        <div className='w-full mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {suggestedProducts.map((product, index) => (
                <div className={clsx('h-80 rounded-lg overflow-hidden', product.background !== 'bg-black' ? `bg-white` : 'bg-black')} key={index}>
                    <div className='relative w-full h-full flex flex-col justify-end'>
                        <div className={clsx(
                            'w-full h-full flex items-end',
                            index === 0 && "translate-y-20 sm:translate-y-14",
                            index === 1 && "translate-y-20 sm:translate-y-16",
                            index === 2 && "translate-y-24 sm:translate-y-20",
                            index === 3 && "translate-y-10 sm:translate-y-5",
                        )}>
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className='object-contain'
                            />
                        </div>
                        <div className='absolute top-0 left-0 right-0 pt-5 px-5'>
                            <small
                                className={clsx('text-xs uppercase font-semibold',
                                    product.background === 'bg-black' ? "text-zinc-400" : "text-gray-600"
                                )}
                            >{product.productType}</small>
                            <h3 className={clsx('text-xl font-semibold ',
                                product.background === 'bg-black' ? "text-white" : "text-gray-900")}
                            >
                                {product.title}
                            </h3>
                            <span
                                className={clsx('text-sm leading-4 ',
                                    product.background === 'bg-black' ? "text-gray-400" : "text-gray-600")}
                            >
                                {product.subtitle}
                            </span>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductSuggestions