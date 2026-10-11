"use client";

import { Heart, LogOut, Search, ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/types/product";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Header() {
    const [search, setSearch] = useState("");
    const { user, logout } = useAuth(); // Extracted logout from useAuth
    const { cart } = useCart();
    const [searchResults, setSearchResults] = useState<Product[]>();
    const [loading, setLoading] = useState(false);

    const getSearchResults = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/public/products?search=${search}`);
            if (response.data.success) {
                setSearchResults(response.data.products.slice(0, 10));
            }
        } catch (err) {
            console.log(err);
            let errorMessage = "Something went wrong. Please try again.";
            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.message || errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!search.trim()) {
            setSearchResults([]);
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            getSearchResults();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search])

    return (<>
        <header className="sticky top-0 z-50 w-full bg-[var(--hump-black)] px-4 py-3 text-[var(--hump-off-white)] border-b border-white/10 lg:px-12">
            <div className="mx-auto flex items-center justify-between gap-6">

                {/* 1. Logo */}
                <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-90">
                    <Image
                        src="/images/logo.jpeg"
                        height={32}
                        width={120}
                        priority
                        className="h-8 w-auto object-contain"
                        alt="Logo"
                    />
                </Link>

                {/* 2. Navigation */}
                <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
                    <Link href="/" className="transition-colors hover:text-white/70">
                        Home
                    </Link>
                    <Link href="/shop" className="transition-colors hover:text-white/70">
                        Shop
                    </Link>
                    <Link href="/about" className="transition-colors hover:text-white/70">
                        About
                    </Link>
                    <Link href="/contact" className="transition-colors hover:text-white/70">
                        Contact
                    </Link>
                </nav>

                {/* 3. Search Bar Container */}
                <div className="relative w-full flex-1">
                    <div className="relative flex items-center overflow-hidden rounded-full border border-white/20 bg-white/5 transition-all focus-within:border-white/50 focus-within:bg-white/10">
                        <Input
                            type="text"
                            placeholder="Search products..."
                            className="h-10 border-none bg-transparent px-4 text-sm text-[var(--hump-off-white)] placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="h-10 w-10 shrink-0 rounded-none bg-transparent text-[var(--hump-off-white)] hover:bg-white/10 hover:text-white"
                        >
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Search Results Dropdown Overlay */}
                    {search && searchResults && searchResults.length > 0 && (
                        <div className="absolute left-0 right-0 top-full mt-2 max-h-80 overflow-y-auto rounded-xl border border-white/10 bg-[var(--hump-black)] p-1 text-[var(--hump-off-white)] shadow-2xl z-50">
                            {searchResults.map((product) => (
                                <Link
                                    key={product._id}
                                    href={`/shop/${product.slug}`}
                                    onClick={() => setSearch("")}
                                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/10"
                                >
                                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white p-1">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${product.cover}`}
                                            alt={product.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>

                                    <div className="flex flex-col min-w-0 text-left">
                                        <span className="truncate text-sm font-medium text-[var(--hump-off-white)]">
                                            {product.name}
                                        </span>
                                        <span className="truncate text-xs text-white/50">
                                            {product.category?.name}
                                            {product.subCategory?.name && ` › ${product.subCategory.name}`}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Empty State Overlay */}
                    {search && !loading && searchResults?.length === 0 && (
                        <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-white/10 bg-[var(--hump-black)] p-4 text-center text-xs text-white/50 shadow-2xl z-50">
                            No products found for "{search}"
                        </div>
                    )}
                </div>

                {/* 4. User Actions / Account */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-3 text-[var(--hump-off-white)]">
                            {/* Hover Dropdown Wrapper */}
                            <div className="relative group">
                                <Link
                                    href="/dashboard"
                                    className="block rounded-full p-2 transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
                                    title="Profile"
                                >
                                    <User className="h-5 w-5" />
                                </Link>

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[180px]">
                                    <div className="rounded-xl border border-white/10 bg-[var(--hump-black)] p-2 shadow-2xl flex flex-col gap-1">
                                        <div className="px-3 py-2 border-b border-white/10 text-xs">
                                            <p className="font-semibold truncate">{user?.name || "Account"}</p>
                                            <p className="text-white/50 truncate">{user?.email}</p>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--hump-off-white)] transition-colors hover:bg-white/10"
                                        >
                                            <User className="h-4 w-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-400 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/dashboard/cart"
                                className="rounded-full p-2 relative transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
                                title="Cart"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                {cart?.items.length ? (
                                    <span className="absolute top-0 right-0 flex min-w-[18px] h-[18px] items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white shadow-sm animate-in zoom-in-50 duration-200">
                                        {cart?.items.length > 99 ? '99+' : cart?.items.length}
                                    </span>
                                ) : null}
                            </Link>

                            <Link
                                href="/dashboard/wishlist"
                                className="rounded-full p-2 transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
                                title="Wishlist"
                            >
                                <Heart className="h-5 w-5" />
                            </Link>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-1 pl-4 pr-1.5 text-sm font-medium text-[var(--hump-off-white)] transition-all hover:border-white hover:bg-white hover:text-[var(--hump-black)] active:scale-95"
                        >
                            <span>Login</span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-[var(--hump-off-white)] transition-colors group-hover:bg-[var(--hump-black)] group-hover:text-white">
                                <User className="h-4 w-4" />
                            </div>
                        </Link>
                    )}
                </div>

            </div>
        </header>
    </>)
}