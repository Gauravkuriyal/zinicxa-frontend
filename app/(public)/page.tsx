import HeroCarousel from "@/components/home/heroCarousel";
import axios from "axios";
import { cookies } from "next/headers";
import FeaturedProducts from "@/components/home/featuredProducts";
import LatestProducts from "@/components/home/latestProducts";

export default async function Home() {
  const cookieStore = await cookies();

  const access_token = cookieStore.get("access_token")?.value;
  let headers = {};
  if (access_token) {
    headers = {
      'Authorization': 'Bearer ' + access_token
    }
  }

  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/public/banners`);
  const featuredProductsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/public/featured-products`,{headers});
  const latestProductsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/public/latest-products`,{headers});

  const banners = response.data.banners;
  const featuredProducts = featuredProductsResponse.data.products;
  const latestProducts = latestProductsResponse.data.products;

  return (
    <>
      <HeroCarousel banners={banners} />
      <FeaturedProducts featuredProducts={featuredProducts} />
      <LatestProducts latestProducts={latestProducts} />
    </>
  );
}
