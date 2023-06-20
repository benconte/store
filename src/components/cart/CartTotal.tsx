import { FC } from 'react'

interface CartTotalProps {
  length: number;
  total: number;
}

const CartTotal: FC<CartTotalProps> = ({length, total}) => {
  return (
    <div>
      Total: {total}
      length: {length}
    </div>
  )
}

export default CartTotal