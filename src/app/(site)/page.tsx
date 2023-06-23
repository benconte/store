import { getNewProducts, getProducts, getSpecialProducts } from "@/actions";
import {
  BannerSection,
  BrandsMarqueu,
  Categories,
  FeaturedProducts,
  ProductSuggestions,
  Specialproducts
} from "@/components/home";

export default async function Home() {
  const products = await getProducts()
  const newProducts = await getNewProducts()
  const specialProducts = await getSpecialProducts()

  return (
    <main className="h-full px-2 md:px-12 py-5 md:py-8">
      <BannerSection />
      <Categories />
      <FeaturedProducts products={newProducts} heading="Best Selling" />
      <FeaturedProducts products={products} heading="Featured Products" />
      <ProductSuggestions />
      <Specialproducts products={specialProducts} />
      <BrandsMarqueu />
    </main>
  )
}
