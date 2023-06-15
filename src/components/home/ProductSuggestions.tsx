import clsx from 'clsx'
import Image from 'next/image'
import { suggestedProducts } from "@/utils/Suggestedproducts";

const ProductSuggestions = () => {
    return (
        <div className='w-full mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {suggestedProducts.map((product) => (
                <div className={clsx('h-80 flex flex-col justify-center rounded-lg overflow-hidden', product.background !== 'bg-black' ? `bg-white` : 'bg-black')} key={product.productType}>
                    <div className='relative w-full h-full'>
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className='w-full h-full object-contain'
                        />
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