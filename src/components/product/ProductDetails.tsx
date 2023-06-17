import { FC } from 'react'
import { Details, Form } from "@/components/product"
import { Product } from '@/@types'

interface ProductDetailsProps {
    product: Product
}

const ProductDetails: FC<ProductDetailsProps> = ({product}) => {
  return (
    <div className='w-full flex flex-col xl:flex-row items-start gap-4 bg-white py-5 px-3'>
        <Details product={product} />
        <Form product={product} />
    </div>
  )
}

export default ProductDetails