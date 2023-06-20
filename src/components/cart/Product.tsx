import { CartProduct } from '@/@types'
import { FC } from 'react'

interface ProductProps {
  product: CartProduct
}

const Product: FC<ProductProps> = ({product}) => {
  return <div>Product</div>
}

export default Product