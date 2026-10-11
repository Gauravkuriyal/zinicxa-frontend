"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { useAuthApi } from "@/hooks/useAuthApi";
import toast from "react-hot-toast";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
import { User } from "@/types/user";
import { Role } from "@/lib/roles";
import { Order } from "@/types/order";
import { CustomDialog } from "@/components/utils/customDialog";
import Link from "next/link";
import { Download } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Props {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    order: Order | null;

    refreshOrders: () => void;
}

export default function OrderFormDialog({
    open,
    onOpenChange,
    order,
    refreshOrders,
}: Props) {
    const api = useAuthApi();
    const { user } = useAuth();

    const isEdit = !!order;
    // const isEdit = true;

    const [loading, setLoading] = useState(false);

    const [orderData, setOrderData] = useState<Order>();

    const [orderStatus, setOrderStatus] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");

    const getOrder = async () => {
        try {
            if (loading) return;
            setLoading(true);
            if (user?.role !== "SUPER_ADMIN" && user?.role !== "ADMIN") return;
            let url = "";
            if (user?.role === "ADMIN") url = "/api/admin/order";
            else if (user?.role === "SUPER_ADMIN") url = "/api/superAdmin/order";
            if (url == "") return;

            const res = await api.get(url + `/${order?._id}`);

            setOrderData(res.data.order);
            setOrderStatus(res.data.order.orderStatus);
            setPaymentStatus(res.data.order.paymentStatus);

        } catch (err) {
            console.log(err);
            toast.error("Order details not found");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(() => {

        if (!open) return;

        if (!order) {

            setOrderStatus("");
            setPaymentStatus("");

            return;
        }

        getOrder();

        setOrderStatus(order.orderStatus);
        setPaymentStatus(order.paymentStatus);

    }, [order, open, user]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (user?.role !== "SUPER_ADMIN" && user?.role !== "ADMIN") return;
            if (loading) return;

            if (!orderStatus.trim() && !paymentStatus.trim()) {
                toast.error("Nothing to change");
                return;
            }

            const formData = new FormData();

            formData.append("orderStatus", orderStatus);
            formData.append("paymentStatus", paymentStatus);


            if (isEdit) {
                let url = "";
                if (user?.role === "ADMIN") url = "/api/admin/order";
                else if (user?.role === "SUPER_ADMIN") url = "/api/superAdmin/order";
                if (url == "") return;

                await api.patch(
                    url+`/${order!._id}/status`,
                    formData, {
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                }
                );

                toast.success(
                    "User updated successfully."
                );
            }
            // else {
            //     await api.post(
            //         "/api/superAdmin/order",
            //         formData,
            //         {
            //             headers: {
            //                 "Content-Type":
            //                     "multipart/form-data",
            //             },
            //         }
            //     );

            //     toast.success(
            //         "User created successfully."
            //     );
            // }

            refreshOrders();

            onOpenChange(false);

        } catch (err: any) {

            toast.error(
                err?.response?.data?.message ??
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <CustomDialog
            open={open}
            onOpenChange={(open) => {
                onOpenChange(open);

                if (!open) {
                    setOrderStatus("");
                    setPaymentStatus("");
                }
            }}
        >

            <div>

                <div>

                    <h4 className="text-xl">

                        {isEdit
                            ? "Order"
                            : "Add Order"}

                    </h4>

                </div>

                {orderData ? <OrderDetails order={orderData} /> : null}
                <div className="space-y-5 px-10 my-5 grid grid-cols-2">

                    <div>
                        <Label className="mb-2">Order Status</Label>

                        <div className="grid grid-cols-2">
                            {["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((orderStatusChoice, index) => (
                                <div className="flex items-center justify-start gap-4 my-2" key={index}>
                                    <Input
                                        value={orderStatusChoice}
                                        id={orderStatusChoice}
                                        type="radio"
                                        name="orderStatus"
                                        className="w-fit h-fit mt-0 pt-0"
                                        checked={orderStatus == orderStatusChoice}
                                        onChange={(e) =>
                                            setOrderStatus(e.target.value)
                                        }
                                    />
                                    <Label htmlFor={orderStatusChoice} className="">{orderStatusChoice}</Label>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div>
                        <Label className="mb-2">Payment Status</Label>

                        <div className="grid grid-cols-2">
                            {["PENDING", "PAID", "FAILED", "REFUNDED",].map((paymentStatusChoice, index) => (
                                <div className="flex items-center justify-start gap-4 my-2" key={index}>
                                    <Input
                                        value={paymentStatusChoice}
                                        id={paymentStatusChoice}
                                        type="radio"
                                        name="paymentStatus"
                                        className="w-fit h-fit mt-0 pt-0"
                                        checked={paymentStatus == paymentStatusChoice}
                                        onChange={(e) =>
                                            setPaymentStatus(e.target.value)
                                        }
                                    />
                                    <Label htmlFor={paymentStatusChoice} className="">{paymentStatusChoice}</Label>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="flex justify-end gap-3 col-span-2">

                        <Button

                            variant="outline"

                            onClick={() =>
                                onOpenChange(false)
                            }

                        >

                            Cancel

                        </Button>

                        <Button
                            disabled={loading}
                            onClick={handleSubmit}
                        >

                            {
                                loading
                                    ? "Updating..."
                                    : isEdit
                                        ? "Update"
                                        : "Create"
                            }

                        </Button>

                    </div>

                </div>

            </div>

        </CustomDialog>
    )

}


const OrderDetails = ({ order }: { order: Order }) => {

    // Helper to format date nicely
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className=" mx-auto p-6 bg-gray-50">
            {/* Top Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                    <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
                </div>
                <div className="mt-2 md:mt-0 flex gap-2">
                    {order.invoice ? <Link target="_blank" href={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/${order.invoice}`}>
                        <Button
                            variant="outline"
                        >
                            <Download />
                            Invoice
                        </Button>
                    </Link> : null}
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${order.orderStatus === 'PROCESSING' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        Status: {order.orderStatus}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${order.paymentStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                        Payment: {order.paymentStatus}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Info Area: Items and Pricing */}
                <div className="md:col-span-2 space-y-6">
                    {/* Ordered Items Card */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Items Ordered</h2>
                        <div className="divide-y divide-gray-100">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                                    <div className="w-16 h-16 rounded-md flex items-center justify-center text-xs text-gray-400 overflow-hidden">
                                        {/* Fallback to text icon if absolute path is broken */}
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${item.productImage}`}
                                            alt=""
                                            width={150}
                                            height={150}
                                            className="rounded-lg object-contain"
                                        />

                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{item.productName}</h3>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-semibold text-gray-900">₹{item.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing Summary Card */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-3">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Price Details</h2>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{order.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Shipping Charges</span>
                            <span className={order.shippingCharge === 0 ? "text-green-600 font-medium" : ""}>
                                {order.shippingCharge === 0 ? "FREE" : `₹${order.shippingCharge}`}
                            </span>
                        </div>
                        <div className="border-t pt-3 flex justify-between font-bold text-gray-900 text-lg">
                            <span>Total Amount</span>
                            <span>₹{order.totalAmount}</span>
                        </div>

                    </div>
                </div>

                {/* Sidebar Info: Customer and Shipping */}
                <div className="space-y-6">
                    {/* Metadata Card */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Order Info</h2>
                        <div className="text-sm space-y-2">
                            <p><span className="text-gray-500">Order #</span> <span className="font-mono font-medium text-gray-900">{order.orderNumber}</span></p>
                        </div>
                    </div>

                    {/* Customer Profile Card */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Customer Account</h2>
                        <div className="text-sm space-y-1">
                            <p className="font-medium text-gray-900">{order.user.name}</p>
                            <p className="text-gray-600 break-all">{order.user.email}</p>
                            <p className="text-gray-600">Ph: {order.user.mobile}</p>
                        </div>
                    </div>

                    {/* Shipping Address Card */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Delivery Address</h2>
                        <div className="text-sm space-y-1 text-gray-800">
                            <p className="font-semibold text-gray-900">{order.shippingAddress.fullName}</p>
                            <p>{order.shippingAddress.addressLine1}</p>
                            <p>{order.shippingAddress.addressLine2}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} - <span className="font-medium">{order.shippingAddress.pincode}</span></p>
                            <p className="text-gray-500 text-xs tracking-wide uppercase mt-1">{order.shippingAddress.country}</p>
                            <p className="text-gray-600 pt-2 border-t mt-2">📞 {order.shippingAddress.mobile}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};