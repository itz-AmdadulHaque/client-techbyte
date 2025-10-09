import { fetchData } from "@/lib/fetchFunction";
import PromoCarousel from "./homePageComponents/Carousel";
import { BannerType, Product } from "@/Types/Types";
import NewArrival from "./homePageComponents/NewArrival";
import MostSelling from "./homePageComponents/MostSelling";
import BrandsSection from "./homePageComponents/BrandsSection";


export default async function Home() {

  const data = await fetchData("/home");

  const { banners, latestProducts, trendingProducts }: { banners: BannerType[], latestProducts: Product[], trendingProducts: Product[] } = data.data;

  console.log(data);

  return (
    <div className="container mx-auto mt-4">

      <PromoCarousel banners={banners} />
      <NewArrival latestProducts={latestProducts} />
      <MostSelling trendingProducts={trendingProducts} />
      <BrandsSection />

      

    </div>
  );
}
