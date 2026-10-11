import ProductsList from "@/components/shop/productsList";
import axios from "axios";
import { cookies } from "next/headers";


export default async function ShopPage() {
    try {
        const cookieStore = await cookies();

        const access_token = cookieStore.get("access_token")?.value;
        let headers = {};
        if (access_token) {
            headers = {
                'Authorization': 'Bearer ' + access_token
            }
        }
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/public/products`,{headers});

        const products = response.data.products;
        const totalPages = response.data.totalPages;
        const totalProducts = response.data.totalProducts;

        return (<>

            <ProductsList productsData={products}  totalPagesInitial={totalPages} totalProductsParentInitial={totalProducts} />
        </>)
    }

    catch (err) {
        <p>Something went wrong</p>
    }
}