// "use client"

import ProductForm from "@/components/dashboard/superAdmin/product/productForm";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

interface EditProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProductPage({
    params,
}: EditProductPageProps) {

    const { id } = await params;

    // const { user } = useAuth();
    // const [loading, setLoading] = useState(true);
    // const router = useRouter();

    // useEffect(() => {
    //     if (user?.role == "SUPER_ADMIN") {
    //         setLoading(true);
    //     }
    //     else {
    //         router.push("/dashboard/products")
    //     }
    // }, [])

    // if (loading) {
    //     return <p>Loading Please wait</p>
    // }

    return (
        <div className="space-y-6">

            <div>

                <h1
                    className="
                        text-3xl
                        font-bold
                    "
                >
                    Products
                </h1>

                <p
                    className="
                        text-muted-foreground
                    "
                >
                    Add New
                </p>

            </div>

            <ProductForm mode="edit" productId={id} />

        </div>
    );
}