import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderSummary({openPlaceOrderCard,setOpenPlaceOrderCard}:{openPlaceOrderCard:boolean,setOpenPlaceOrderCard:(open:boolean)=>void}) {
    const { cart } = useCart()
    const [subTotal, setSubTotal] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [tax, setTax] = useState(0);

    useEffect(() => {
        let tempTotal = cart?.items.reduce((sum, item) => sum + ((item.product.discountPrice ? item.product.discountPrice : item.product.price) * item.quantity), 0);
        if (tempTotal) {
            setSubTotal(tempTotal);
        }
    }, [cart])

    return (
        <Card
            className="
                sticky
                top-4
                p-6
            "
        >
            <h2
                className="
                    text-xl
                    font-semibold
                "
            >
                Order Summary
            </h2>

            <div className="mt-6 space-y-4">

                <div className="flex justify-between">
                    <span>Subtotal</span>

                    <span>
                        ₹{subTotal}
                    </span>
                </div>

                {/* <div className="flex justify-between">
                    <span>GST (18%)</span>

                    <span>
                        ₹{gst.toFixed(0)}
                    </span>
                </div> */}

                <div className="border-t pt-4">

                    <div className="flex justify-between">

                        <span className="font-semibold">
                            Total
                        </span>

                        <span className="font-bold">
                            ₹{(subTotal + deliveryCharge + tax).toFixed(0)}
                        </span>

                    </div>

                </div>

            </div>

            <Button
                className="
                    mt-6
                    w-full
                    h-11
                    cursor-pointer
                "
                onClick={()=>setOpenPlaceOrderCard(true)}
            >
                Place Order
            </Button>

            <Link href={"/shop"}>
                <Button
                    variant="outline"
                    className="
                        mt-3
                        w-full
                        cursor-pointer
                    "
                >
                    Continue Shopping
                </Button>
            </Link>

        </Card>
    );
}