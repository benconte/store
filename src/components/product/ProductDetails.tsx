import { FC } from 'react'
import { Brand, Categories, Products } from '@prisma/client'
import { Details, Form } from "@/components/product"

interface ProductDetailsProps {
    product: Products & {
        category: Categories,
        brand: Brand
    } | null
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