"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartItem({
    item,
}: any) {
    const { removeFromCart, updateCartQuantity } = useCart();
    return (
        <Card className="p-4">

            <div className="flex gap-4">

                <div className="h-24 w-24 relative block aspect-square overflow-hidden">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${item.product.cover}`}
                        alt={item.product.name}
                        fill
                        className="h-full w-full rounded-lg object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <div className="flex-1">

                    <div className="flex justify-between">

                        <div>

                            <Link target="_blank" href={`/product/${item.product.slug}`} className="font-semibold">
                                {item.product.name}
                            </Link>

                            <p
                                className="
                                    text-sm
                                    text-muted-foreground
                                "
                            >
                                {item.product.category?.name} - {" "}
                                {item.product.subCategory?.name}
                            </p>

                        </div>

                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={()=>removeFromCart(item.product._id)}
                            className="bg-rose-100 cursor-pointer"
                        >
                            <Trash2
                                className="h-4 w-4 text-rose-600"
                            />
                        </Button>

                    </div>

                    <div
                        className="
                            mt-4
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-lg
                                    font-bold
                                "
                            >
                                ₹{item.product.discountPrice}

                                {item.product.discountPrice ?
                                    <span className="ml-2 text-xs font-bold line-through text-muted-foreground text-rose-600">
                                        ₹{item.product.price}
                                    </span> : null}
                            </p>

                        </div>

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <Button
                                size="icon"
                                onClick={() => updateCartQuantity(item.product._id, item.quantity - 1)}
                                variant="outline"
                            >
                                <Minus />
                            </Button>

                            <span>
                                {item.quantity}
                            </span>

                            <Button
                                size="icon"
                                onClick={() => updateCartQuantity(item.product._id, item.quantity + 1)}
                                variant="outline"
                            >
                                <Plus />
                            </Button>

                        </div>

                    </div>

                    <p
                        className="
                            mt-3
                            text-right
                            text-sm
                            font-medium
                        "
                    >
                        Subtotal:
                        ₹
                        {item.product.discountPrice *
                            item.quantity}
                    </p>

                </div>

            </div>

        </Card>
    );
}