import { getProducts } from "@/actions/getProducts";
import BannerSection from "@/components/home/banner/BannerSection";
import Categories from "@/components/home/categories/Categories";
import FeaturedProducts from "@/components/home/featured/FeaturedProducts";
import ProductSuggestions from "@/components/home/suggestions/ProductSuggestions";
import Navbar from "@/components/navbar/Navbar";
import { suggestedProducts } from "@/utils/Suggestedproducts";

export default async function Home() {
  const products = await getProducts();
  return (
    <main className="h-full px-2 md:px-12 py-5 md:py-8">
      <BannerSection />
      <Categories />
      <FeaturedProducts products= {products} />
      <ProductSuggestions suggestedProducts={suggestedProducts} />
    </main>
  )
}
