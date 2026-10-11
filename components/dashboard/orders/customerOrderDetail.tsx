"use client";

import { useEffect, useState } from "react";
import { useAuthApi } from "@/hooks/useAuthApi";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/types/order";
import { useAuth } from "@/context/AuthContext";


export default function CustomerOrderDetail({ orderId }: { orderId: string }) {
    const api = useAuthApi();
    const {user} = useAuth();
    const [order, setOrder] = useState<Order>();
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        if(user?.role !== "CUSTOMER") return;
        try {
            const res = await api.get(`/api/customer/order/${orderId}`);
            setOrder(res.data.order);
        } catch {
            toast.error("Failed to load Order.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchOrders();
    }, [user])

    if (loading) return (
        <div className="p-4 ">
            <p>Loading</p> <span className="animate-spin"><Loader /></span>
        </div>
    )
    else if (!order) return (
        <div className="p-4">
            <p>Order not found</p>
        </div>
    )

    return (
        <div className="space-y-6">
            {/* Order Header */}
            <Card>
                <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                </CardHeader>

                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Order Number
                        </p>
                        <p className="font-semibold">{order.orderNumber}</p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Ordered On
                        </p>
                        <p>
                            {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Payment Status
                        </p>

                        <Badge
                            variant={
                                order.paymentStatus === "PAID"
                                    ? "default"
                                    : "destructive"
                            }
                        >
                            {order.paymentStatus}
                        </Badge>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Order Status
                        </p>

                        <Badge variant="secondary">
                            {order.orderStatus}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Items */}
            <Card>
                <CardHeader>
                    <CardTitle>Items</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {order.items.map((item, index) => (
                        <div key={index}>
                            <div className="flex gap-4">
                                <div className="relative h-24 w-24 overflow-hidden rounded-lg border">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${item.productImage}`}
                                        alt={item.productName}
                                        fill
                                        className="object-contain"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-medium">
                                        {item.productName}
                                    </h3>

                                    <p className="text-sm text-muted-foreground">
                                        Quantity: {item.quantity}
                                    </p>

                                    <p className="font-semibold mt-2">
                                        ₹{item.price}
                                    </p>
                                </div>
                            </div>

                            {index !== order.items.length - 1 && (
                                <Separator className="mt-4" />
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
                <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                </CardHeader>

                <CardContent className="space-y-1">
                    <p className="font-medium">
                        {order.shippingAddress.fullName}
                    </p>

                    <p>{order.shippingAddress.mobile}</p>

                    <p>
                        {order.shippingAddress.addressLine1}
                    </p>

                    <p>
                        {order.shippingAddress.addressLine2}
                    </p>

                    <p>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state} -{" "}
                        {order.shippingAddress.pincode}
                    </p>

                    <p>{order.shippingAddress.country}</p>
                </CardContent>
            </Card>

            {/* Price Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Payment Summary</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{order.subtotal}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>
                            {order.shippingCharge === 0
                                ? "FREE"
                                : `₹${order.shippingCharge}`}
                        </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>₹{order.totalAmount}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}