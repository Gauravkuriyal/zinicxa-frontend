"use client";

import { useCart } from "@/context/CartContext";
import CartList from "./cartList";
import OrderSummary from "./orderSummary";
import EmptyCart from "./emptyCart";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import PlaceOrderCard from "./placeOrderCard";
import { useState } from "react";

export default function Cart() {
    const { cart, clearCart } = useCart();
    const [openPlaceOrderCard,setOpenPlaceOrderCard] = useState(false);

    if (!cart) {
        return <EmptyCart />
    }

    if (cart.items.length <= 0) {
        return <EmptyCart />
    }

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>
                    <h1
                        className="
                        text-3xl
                        font-bold
                    "
                    >
                        Shopping Cart
                    </h1>

                    <p
                        className="
                        text-muted-foreground
                    "
                    >
                        Review products before
                        placing an order.
                    </p>
                </div>

                <Button
                    variant="ghost"
                    onClick={() => clearCart()}
                    className="bg-rose-800 text-white cursor-pointer"
                >
                    Clear cart
                    <Trash2
                        className="h-4 w-4"
                    />
                </Button>

            </div>

            <div
                className="
                    grid
                    gap-6
                    lg:grid-cols-3
                "
            >

                <div className="lg:col-span-2">

                    <CartList
                        items={cart?.items}
                    />

                </div>

                <OrderSummary openPlaceOrderCard={openPlaceOrderCard} setOpenPlaceOrderCard={setOpenPlaceOrderCard} />

                <PlaceOrderCard open={openPlaceOrderCard} setOpen={setOpenPlaceOrderCard} />

            </div>

        </div>
    );
}