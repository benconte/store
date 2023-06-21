import { FC } from 'react'

interface CartTotalProps {
  length: number;
  total: number;
}

const CartTotal: FC<CartTotalProps> = ({ length, total }) => {
  return (
    <div className='bg-white p-4 max-w-full md:max-w-xs w-full rounded-lg'>
      <div className="w-full flex items-center">
        <p className="text-base text-gray-900">
          Subtotal ({length} items):
          <b className="pl-2">${total}</b>
        </p>
      </div>
      <p className="text-sm text-gray-900">Order all at once</p>
      <div className="w-full h-10 mt-4">
        <button className="w-full h-full text-sm text-white bg-orange-500 rounded-lg cursor-pointer outline-none border-none">
          Proceed to checkout
        </button>
      </div>
    </div>
  )
}

export default CartTotal