import { FC } from 'react'
import { Details, Form } from "@/components/product"
import { CartProduct } from '@/@types'

const ProductDetails: FC<CartProduct> = ({product, productOrdered: quantity}) => {
  return (
    <div className='w-full flex flex-col xl:flex-row items-start gap-4 bg-white py-5 px-3'>
        <Details product={product} />
        <Form product={product} productOrdered={0} />
    </div>
  )
}

export default ProductDetails