import Link from "next/link";

import {
    Eye,
    RotateCcw,
    Download,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import OrderStatusBadge from "./orderStatusBadge";
import OrderTimeline from "./orderTimeline";
import { Order } from "@/types/order";

export default function CustomerOrderCard({
    order,
}: {order:Order}) {
    return (
        <Card className="p-0">

            <CardContent className="p-6">

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    <div>

                        <h3
                            className="
                                font-semibold
                                text-lg
                            "
                        >
                            {order.orderNumber}
                        </h3>

                        <p
                            className="
                                text-sm
                                text-muted-foreground
                            "
                        >
                            {new Date(order.createdAt).toLocaleString()}
                        </p>

                    </div>

                    <div>

                        <p
                            className="
                                text-sm
                                text-muted-foreground
                            "
                        >
                            Amount
                        </p>

                        <p
                            className="
                                font-semibold
                            "
                        >
                            ₹{order.totalAmount}
                        </p>

                    </div>

                    <div>

                        <p
                            className="
                                text-sm
                                text-muted-foreground
                            "
                        >
                            Items
                        </p>

                        <div>
                            <ul className="">
                                {order.items.map((item:any,index:number)=>(
                                    <li className="mb-1" key={index}>{item.productName}</li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <OrderStatusBadge
                        status={order.orderStatus}
                    />

                </div>

                <div
                    className="
                        mt-6
                        flex
                        flex-wrap
                        gap-3
                    "
                >
                    {order.invoice ? <Link target="_blank" href={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/${order.invoice}`}>
                        <Button
                            variant="outline"
                        >
                            <Download />
                            Invoice
                        </Button>
                    </Link> : null}

                    <Button
                        asChild
                        variant="outline"
                    >
                        <Link
                            href={`/dashboard/orders/${order._id}`}
                        >
                            <Eye />
                            View Details
                        </Link>
                    </Button>

                </div>

            </CardContent>

        </Card>
    );
}