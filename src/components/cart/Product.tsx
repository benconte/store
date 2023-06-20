import { CartState } from '@/@types'
import { FC } from 'react'

interface ProductProps {
  product: CartState
}

const Product: FC<ProductProps> = ({product}) => {
  return <div>Product</div>
}

export default Product