'use client'

import { FC } from 'react'
import Product from './Product'
import Lottie from 'react-lottie-player'
import noproduct from "@/assets/no-product.json";

interface FilteredProductsProps {
  products: Product[]
}

const FilteredProducts: FC<FilteredProductsProps> = ({ products }) => {
  return (
    <div className='w-full min-h-max mt-7 rounded-lg'>
      {products.length > 0 ?
        <div className='w-full grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5'>
          {products.map((prod) => (
            <Product product={prod} key={prod.id} />
          ))}
        </div>
        : (
          <div className='w-full h-5/6 py-24 bg-white flex flex-col text-sm text-gray-900 justify-center items-center gap-3'>
            <Lottie
              loop
              animationData={noproduct}
              play
              style={{ width: 200, height: 200 }}
            />
            This Category has no products
          </div>
        )}
    </div>
  )
}

export default FilteredProducts