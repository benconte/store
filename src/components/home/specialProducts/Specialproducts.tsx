'use client'

import { Product } from '@/@types';
import SpecialProduct from './SpecialProduct';

const Specialproducts = ({ products }: { products: Product[] }) => {
    return (
        <div className="w-full py-10">
            <h2 className='text-sm md:text-lg text-gray-900 font-semibold'>Special Products</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {products && products.length > 0 && products.map((product: Product) => (
                    <SpecialProduct key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Specialproducts