import { fetchData } from "@/lib/fetchFunction";
import PromoCarousel from "./homePageComponents/Carousel";
import { BannerType, Product, ServiceType } from "@/Types/Types";
import HomepageProducts from "./homePageComponents/HomepageProducts";
import HomepageServices from "./homePageComponents/HomepageServices";


export const dynamic = 'force-dynamic';

export default async function Home() {

  const data = await fetchData("/home");

  const { banners, latestProducts, featuredProducts,featuredServices }: { banners: BannerType[], latestProducts: Product[], featuredProducts: Product[], featuredServices: ServiceType[] } = data.data;

  console.log(data);

  return (
    <div className="container mx-auto mt-4">

      <PromoCarousel banners={banners} />
      <HomepageProducts products={featuredProducts} title="Featured Products" />
      <HomepageServices services={featuredServices} title="Services" />
      <HomepageProducts products={latestProducts} title="New Arrival" />

    </div>
  );
}
