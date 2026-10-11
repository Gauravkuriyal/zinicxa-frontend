import ProductHeroSection from "@/components/productDetail/productHeroSection";
import ProductDetailsSection from "@/components/productDetail/productDetailsSection";
import RelatedProductsSection from "@/components/productDetail/relatedProductsSection";
import axios from "axios";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

interface ProductPageProps {
    params: Promise<{
        productSlug: string;
    }>;
}

export default async function ProductDetailPage({
    params,
}: ProductPageProps) {

    const { productSlug } = await params;

    try {
        const cookieStore = await cookies();

        const access_token = cookieStore.get("access_token")?.value;
        let headers = {};
        if (access_token) {
            headers = {
                'Authorization': 'Bearer ' + access_token
            }
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/public/products/slug/${productSlug}`,{headers});
        const product = response.data.product;
        const relatedProducts = response.data.similarProducts;
        return (<>

            <ProductHeroSection product={product} />
            <ProductDetailsSection product={product} />
            {relatedProducts?.length > 0 ? <RelatedProductsSection relatedProducts={relatedProducts} /> : null}
        </>)

    } catch (err) {
        console.log(err);
        let errorMessage = "Something went wrong. Please try again.";
        if (axios.isAxiosError(err)) {
            errorMessage = err.response?.data?.message || errorMessage;
        } else if (err instanceof Error) {
            errorMessage = err.message;
        }
        return (
            <p className="p-10">{errorMessage}</p>
        )
    }


}