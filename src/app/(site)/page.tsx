import { getProducts } from "@/actions";
import { getSpecialProducts } from "@/actions/getSpecialProducts";
import { 
  BannerSection, 
  Categories, 
  FeaturedProducts, 
  ProductSuggestions, 
  Specialproducts 
} from "@/components/home";

export default async function Home() {
  const products = await getProducts();
  const specialProducts = await getSpecialProducts()

  return (
    <main className="h-full px-2 md:px-12 py-5 md:py-8">
      <BannerSection />
      <Categories />
      <FeaturedProducts products={products} />
      <ProductSuggestions />
      <Specialproducts products={specialProducts} />
    </main>
  )
}
