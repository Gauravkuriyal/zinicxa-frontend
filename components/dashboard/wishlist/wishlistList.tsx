"use client";

import { useAuthApi } from "@/hooks/useAuthApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import ProductCard from "@/components/shop/productCard";
import { Product } from "@/types/product";

export default function WishlistList() {

    const api = useAuthApi();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [products, setProducts] = useState<Product[]>();

    const getWishlistedProducts = async () => {
        if (!user) return;
        if (user.role !== "CUSTOMER") return;
        if (loading) return;
        try {
            setLoading(true);

            const res = await api.get("/api/customer/wishlist", {
                params: {
                    page
                },
            });

            setProducts(res.data.products);

            setTotalPages(res.data.totalPages);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getWishlistedProducts();
    }, [user, page]);

    return (
        <div className="space-y-6">

            <div>

                <h1
                    className="
                        text-3xl
                        font-bold
                    "
                >
                    Wishlist
                </h1>

                <p
                    className="
                        text-muted-foreground
                    "
                >
                    Browse your favourites.
                </p>

            </div>

            <section className="min-h-screen bg-background">
                <div className="mx-auto px-4 py-10 md:px-8 lg:px-12">


                    {/* Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {products?.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
}