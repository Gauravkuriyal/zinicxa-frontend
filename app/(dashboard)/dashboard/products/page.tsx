"use client";

import ProductSearch from "@/components/dashboard/products/productSearch";

import ProductFilters from "@/components/dashboard/products/productFilters";

import ProductGrid from "@/components/dashboard/products/productGrid";

import { useAuthApi } from "@/hooks/useAuthApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function ProductsPage() {

    const api = useAuthApi();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        if(!user) return;
        const urls = {
            "RETAILER": "/api/retailer/product",
            "SUPER_ADMIN": "/api/superAdmin/product",
            "SALESMAN": "/api/salesman/product",
            "ADMIN": "/api/admin/product",
            "CUSTOMER": "/api/customer/product",
        }
        try {

            setLoading(true);

            const res = await api.get(urls[user.role], {
                params: {
                    page,
                    search,
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

    const deleteProduct = async (productId:string) => {
        try {

            setLoading(true);
            const res = await api.delete(`/api/superAdmin/product/${productId}`);
            toast.success("Deleted Successfully");
            getProducts();

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    
    const restoreProduct = async (productId:string) => {
        try {

            setLoading(true);
            const res = await api.put(`/api/superAdmin/product/${productId}/restore`);
            toast.success("Restored Successfully");
            getProducts();

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, [user,page, search]);
    
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
                    Browse and order products.
                </p>

            </div>

            <ProductSearch search={search} setSearch={setSearch} />

            <ProductFilters />

            <ProductGrid products={products} deleteProduct={deleteProduct} restoreProduct={restoreProduct} />

        </div>
    );
}