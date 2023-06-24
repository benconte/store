import { getUserWishlistProducts } from '@/actions';
import WishlistProduct from '@/components/wishlistProduct/WishlistProduct';
import React from 'react'

type Props = {}

const page = async (props: Props) => {
    const wishlist = await getUserWishlistProducts();
  return (
    <div className='w-full h-full px-2 md:px-7 lg:px-12 py-5 md:py-8  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
      {wishlist?.map((prod) => (
        <WishlistProduct product={prod} key={prod.id} />
      ))}
    </div>
  )
}

export default page