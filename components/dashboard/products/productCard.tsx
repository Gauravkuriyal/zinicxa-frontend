"use client";

import Link from "next/link";

import {
    ShoppingCart,
    Star,
    Eye,
    Minus,
    Plus,
    Edit2,
    Trash2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRetailCart } from "@/context/RetailCartContext";
import toast from "react-hot-toast";

export default function ProductCard({
    product,
    deleteProduct,
    restoreProduct,
}: any) {
    const { user } = useAuth();
    const {
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        checkInCart,
        getItemFromCart,
    } = useRetailCart();

    return (
        <Card
            // className="
            //     overflow-hidden
            //     transition-all
            //     hover:shadow-xl
            //     hover:-translate-y-1
            //     p-0
            // "
            className={`
                flex
                flex-row
                items-center
                overflow-hidden
                transition-all
                hover:shadow-xl
                hover:-translate-y-1
                p-0
                px-2
                ${product.isActive ? "" : "bg-gray-300"}
            `}
        >
            <div className="relative aspect-square h-full w-40 overflow-hidden">
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${product.cover}`}
                    alt={product.name}
                    fill
                    className="
                        object-contain
                        transition-transform
                        hover:scale-105
                    "
                />
            </div>

            <CardContent className="w-full p-5 gap-10 flex items-center justify-between">
                {/* <div className="w-full">

                    <div
                        className="
                        mb-2
                        inline-flex
                        rounded-full
                        bg-muted
                        px-3
                        py-1
                        text-xs
                    "
                    >
                        {product.category.name}
                    </div>

                    

                    <h3
                        className="
                        text-lg
                        font-semibold
                    "
                    >
                        {product.name}
                    </h3>

                    <div
                        className="
                        mt-4
                        flex
                        items-center
                        justify-between
                    "
                    >
                        <span
                            className="
                            text-2xl
                            font-bold
                        "
                        >
                            ₹{product.price}
                        </span>

                        <div
                            className="
                            flex
                            items-center
                            gap-1
                        "
                        >
                            <Star
                                className="
                                h-4
                                w-4
                                fill-yellow-400
                                text-yellow-400
                            "
                            />

                            {product.rating}
                        </div>
                    </div>

                </div> */}

                <div className="w-full">
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <div
                            className="
                inline-flex
                rounded-full
                bg-muted
                px-3
                py-1
                text-xs
            "
                        >
                            {product.category.name}
                        </div>

                        {/* Featured Badge */}
                        {product.isFeatured && (
                            <span className="text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full tracking-wide uppercase">
                                Featured
                            </span>
                        )}
                    </div>

                    <h3
                        className="
            text-lg
            font-semibold
        "
                    >
                        {product.name}
                    </h3>

                    {/* Stock & Minimum Order Row */}
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        {product.stock && <span>
                            Stock:{" "}
                            {product.stock > 0 ? (
                                <span className="font-medium text-emerald-600">
                                    {product.stock} available
                                </span>
                            ) : (
                                <span className="font-medium text-rose-600">Out of Stock</span>
                            )}
                        </span>
                        }
                        {product.minimumOrderQuantity > 1 && (
                            <>
                                <span className="text-muted-foreground/40">•</span>
                                <span>
                                    Min. Order:{" "}
                                    <span className="font-medium">
                                        {product.minimumOrderQuantity}
                                    </span>
                                </span>
                            </>
                        )}
                    </div>

                    <div
                        className="
            mt-4
            flex
            items-center
            justify-between
        "
                    >
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-baseline gap-2">
                                {/* Retail Price reference */}
                                {product.retailPrice && (
                                    <span className="text-sm font-bold text-red-800">
                                        Retail Price: ₹{product.retailPrice}
                                    </span>
                                )}

                                {/* Main displayed price (Precedence: Discount -> Price) */}
                                <span className="text-sm font-bold text-green-800">
                                    Selling Price: ₹{product.discountPrice ?? product.price}
                                </span>

                                {/* Strikethrough price if discount exists */}
                                {product.discountPrice && (
                                    <span className="text-sm font-medium line-through text-muted-foreground">
                                        ₹{product.price}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div
                            className="
                flex
                items-center
                gap-1
                text-sm
                font-medium
            "
                        >
                            <Star
                                className="
                    h-4
                    w-4
                    fill-yellow-400
                    text-yellow-400
                "
                            />
                            {product.rating}
                        </div>
                    </div>
                </div>

                <div
                    className="
                        mt-5
                        flex
                        flex-col
                        items-center
                        gap-2
                    "
                >
                    <Button
                        asChild
                        variant="outline"
                        className="w-full flex-1 px-4 py-2 cursor-pointer"
                    >
                        <Link href={`/product/${product.slug}`} target="_blank">
                            <Eye />
                            View
                        </Link>
                    </Button>

                    {user?.role === "SUPER_ADMIN" ? (
                        <>
                            <Link
                                href={`/dashboard/products/${product._id}/edit`}
                                className="w-full"
                                target="_blank"
                            >
                                <Button className="w-full flex-1 px-4 py-2 cursor-pointer">
                                    <Edit2 />
                                    Edit
                                </Button>
                            </Link>
                            {product.isActive ? (
                                <Button
                                    variant={"destructive"}
                                    className="w-full flex-1 px-4 py-2 cursor-pointer"
                                    onClick={() => deleteProduct(product._id)}
                                >
                                    <Trash2 />
                                    Deactivate
                                </Button>
                            ) : (
                                <Button
                                    className="w-full flex-1 px-4 py-2 cursor-pointer"
                                    onClick={() => restoreProduct(product._id)}
                                >
                                    Activate
                                </Button>
                            )}
                        </>
                    ) :
                        (product.isActive && product.stock >= product.minimumOrderQuantity ?
                            (user?.role == "RETAILER" || user?.role == "SALESMAN" ?
                                (!checkInCart(product._id) ?
                                    <Button
                                        className="w-full flex-1 px-4 py-2 cursor-pointer"
                                        onClick={() => {
                                            addToCart(product._id, product.minimumOrderQuantity);
                                            toast.success("Added to cart");
                                        }}
                                    >
                                        <ShoppingCart />
                                        Add
                                    </Button>
                                    :
                                    <div className="flex flex-1 items-center justify-between rounded-md border px-3 w-full py-2" >
                                        <button
                                            onClick={() => {
                                                if (
                                                    product.minimumOrderQuantity ==
                                                    getItemFromCart(product._id)!.quantity
                                                ) {
                                                    removeFromCart(product._id);
                                                    toast.error(
                                                        `Cannot go for less than ${product.minimumOrderQuantity}`
                                                    );
                                                } else
                                                    updateCartQuantity(
                                                        product._id,
                                                        getItemFromCart(product._id)!.quantity - 1
                                                    );
                                            }}
                                        >
                                            <Minus size={16} />
                                        </button>

                                        <span>{getItemFromCart(product._id)!.quantity}</span>

                                        <button
                                            onClick={() =>
                                                updateCartQuantity(
                                                    product._id,
                                                    getItemFromCart(product._id)!.quantity + 1
                                                )
                                            }
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                ) : null)
                            : null
                        )}
                </div>
            </CardContent>
        </Card>
    );
}
