import { getUserWishlistProducts } from '@/actions';
import WishlistProduct from '@/components/wishlistProduct/WishlistProduct';
import ProductsNotFound from '@/components/orders/ProductsNotFound';
import getCurrentUser from '@/actions/getCurrentUser';
import { redirect } from 'next/navigation';

const page = async () => {
  const wishlist = await getUserWishlistProducts();
  const user = await getCurrentUser()

  if(!user.id) {
    redirect("/auth?callbackUrl=wishlist")
  }
  return (
    <div className='w-full px-2 md:px-7 lg:px-12 py-5 md:py-8'>
      {wishlist && wishlist.length > 0 ?
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
          {wishlist.map((prod) => (
            <WishlistProduct product={prod} key={prod.id} />
          ))}
        </div>
        : (
          <ProductsNotFound message="You don't have any products in your wishlist" />
        )}
    </div>
  )
}

export default page