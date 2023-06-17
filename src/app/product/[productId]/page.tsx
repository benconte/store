import { getProductById } from "@/actions"
import ProductDetails from "@/components/product/ProductDetails"
import ProductImageViewer from "@/components/product/ProductImageViewer"
import { Brand, Categories, Products } from "@prisma/client"

interface IParams {
  productId: string
}

const page = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params.productId)

  return (
    <main className="h-full px-2 md:px-7 lg:px-12 py-5 md:py-8 flex flex-col md:flex-row gap-3 items-start">
      <ProductImageViewer product={product} />
      <ProductDetails product={product} />
    </main>
  )
}

export default page