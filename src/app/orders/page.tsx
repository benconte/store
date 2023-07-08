import { getUserOrderedProducts } from '@/actions';
import getCurrentUser from '@/actions/getCurrentUser';
import OrderedProduct from '@/components/orders/OrderedProduct';
import ProductsNotFound from '@/components/orders/ProductsNotFound';
import { redirect } from 'next/navigation';

const page = async () => {
  const orders = await getUserOrderedProducts();
  const user = await getCurrentUser()

  if (!user.id) {
    redirect("/auth?callbackUrl=orders")
  }
  return (
    <div className="w-full px-2 md:px-7 lg:px-12 py-5 md:py-8">
      {orders.length > 0 ?
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
          {orders?.map((prod) => (
            <OrderedProduct product={prod.product} key={prod.id} />
          ))}
        </div>
        : (
          <ProductsNotFound message="You haven't placed any orders" />
        )
      }
    </div>
  )
}

export default page