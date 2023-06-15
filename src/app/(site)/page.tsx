import { getProducts } from "@/actions";
import { getSpecialProducts } from "@/actions/getSpecialProducts";
import {
  BannerSection,
  BrandsMarqueu,
  Categories,
  FeaturedProducts,
  Footer,
  ProductSuggestions,
  Specialproducts
} from "@/components/home";

export default async function Home() {
  const products = await getProducts()
  const specialProducts = await getSpecialProducts()

  return (
    <main className="h-full w-full">
      <div className="h-full px-2 md:px-12 py-5 md:py-8">
        <BannerSection />
        <Categories />
        <FeaturedProducts products={products} />
        <ProductSuggestions />
        <Specialproducts products={specialProducts} />
        <BrandsMarqueu />
      </div>
      <Footer />
    </main>
  )
}
