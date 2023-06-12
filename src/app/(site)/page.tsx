import { FeaturedProduct, ProductType } from "@/@types";
import { getFakeStoreProducts, getProducts } from "@/actions";
import BannerSection from "@/components/home/banner/BannerSection";
import Categories from "@/components/home/categories/Categories";
import FeaturedFakeProducts from "@/components/home/featured/FeaturedFakeProducts";
import FeaturedProducts from "@/components/home/featured/FeaturedProducts";
import ProductSuggestions from "@/components/home/suggestions/ProductSuggestions";
import { suggestedProducts } from "@/utils/Suggestedproducts";
import axios from "axios";
import { useEffect, useState } from "react";

export default async function Home() {
  const products = await getProducts();  
  return (
    <main className="h-full px-2 md:px-12 py-5 md:py-8">
      <BannerSection />
      <Categories />
      <FeaturedProducts products= {products} />
      {/* <FeaturedFakeProducts products= {newProducts} /> */}
      <ProductSuggestions suggestedProducts={suggestedProducts} />

    </main>
  )
}
