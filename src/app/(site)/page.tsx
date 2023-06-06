import BannerSection from "@/components/home/banner/BannerSection";
import Categories from "@/components/home/categories/Categories";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <main className="h-full px-3 md:px-12 py-8">
      <BannerSection />
      <Categories />
    </main>
  )
}
