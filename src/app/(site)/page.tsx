import { CustomProductProps, SpecialproductsProps } from "@/@types";
import { getProducts } from "@/actions";
import { getSpecialProducts } from "@/actions/getSpecialProducts";
import { 
  BannerSection, 
  Categories, 
  FeaturedProducts, 
  ProductSuggestions, 
  Specialproducts 
} from "@/components/home";
import axios from "axios";
import { useEffect, useState } from "react";

export default async function Home() {
  const products = await getProducts()
  const specialProducts = await getSpecialProducts()
  // generating a random discount number
  // [FACT]: This randomNumber should be done on the server to avoid hydration errors from the client
  const randomNumber = Math.floor(Math.random() * 45) 
  return (
    <main className="h-full px-2 md:px-12 py-5 md:py-8">
      <BannerSection />
      <Categories />
      <FeaturedProducts products={products} />
      <ProductSuggestions />
      <Specialproducts products={specialProducts} randomNumber={randomNumber} />
      
    </main>
  )
}
