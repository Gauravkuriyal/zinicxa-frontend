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
import { RetailOrder } from "@/types/retailOrder";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useAuthApi } from "@/hooks/useAuthApi";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import AdminOrderActions from "./adminOrderActions";

export default function OrderCard({
    order,
    fetchOrders
}: { order: RetailOrder, fetchOrders: () => void }) {
    const { user } = useAuth();
    const api = useAuthApi();

    const [loading, setLoading] = useState(false);
    const [rejectionMessage, setRejectionMessage] = useState<string>("");
    const [openRejectDialog, setOpenRejectDialog] = useState(false);

    const approveOrder = async () => {
        if (user?.role != "SALESMAN" && user?.role != "ADMIN") return;
        setLoading(true);
        try {
            let url = "";
            if (user?.role == "ADMIN") url = `/api/admin/order/${order._id}/approve`
            if (user?.role == "SALESMAN") url = `/api/salesman/order/${order._id}/approve`
            if (url == "") return;
            const res = await api.patch(url);
            toast.success("Order Approved.");
            fetchOrders();
        } catch (err) {
            console.log(err);
            toast.error("Failed to approve Order.");
        } finally {
            setLoading(false);
        }
    }

    const rejectOrder = async () => {
        if (user?.role != "SALESMAN" && user?.role != "ADMIN") return;
        if (!rejectionMessage) {
            toast.error("Please provide a rejection message")
            return
        };
        setLoading(true);
        if (loading) return;
        try {
            let url = "";
            if (user?.role == "ADMIN") url = `/api/admin/order/${order._id}/reject`
            if (user?.role == "SALESMAN") url = `/api/salesman/order/${order._id}/reject`
            if (url == "") return;
            const res = await api.patch(url, { message: rejectionMessage });
            toast.success("Order Rejected.");
            setOpenRejectDialog(false);
            fetchOrders();
        } catch (err) {
            console.log(err);
            toast.error("Failed to reject Order.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <Card className="p-0">

            <CardContent className="p-6">

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        lg:flex-row
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

                        <ul>
                            {order.items.slice(0, 2).map((item, index) => (
                                <li key={index} className="text-sm mb-1">
                                    {item.productName} * {item.quantity}
                                </li>
                            ))}
                        </ul>

                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <OrderStatusBadge
                            status={order.currentStage}
                        />
                        {user?.role == "SALESMAN" && order.salesmanStatus == "PENDING" ?
                            <div className="grid grid-cols-1 gap-2">
                                <Button onClick={approveOrder} className="bg-green-100 text-green-800 border-green-800 hover:bg-green-800 hover:text-white cursor-pointer">Approve</Button>
                                <Button onClick={() => setOpenRejectDialog(true)} className="bg-red-800 text-white border-red-200 hover:bg-red-200 hover:text-white cursor-pointer">Reject</Button>
                            </div>
                            : null}

                        {user?.role == "ADMIN" && order.adminStatus == "PENDING" && order.salesmanStatus == "APPROVED" ?
                            <div className="grid grid-cols-1 gap-2">
                                <Button onClick={approveOrder} className="bg-green-100 text-green-800 border-green-800 hover:bg-green-800 hover:text-white cursor-pointer">Approve</Button>
                                <Button onClick={() => setOpenRejectDialog(true)} className="bg-red-800 text-white border-red-200 hover:bg-red-200 hover:text-white cursor-pointer">Reject</Button>
                            </div>
                            : null}

                        {user?.role == "ADMIN" && order.adminStatus == "APPROVED"?<AdminOrderActions order={order} fetchOrders={fetchOrders} />:null}
                    </div>

                </div>

                <div className="mt-6">

                    <OrderTimeline
                        stageNumber={order.adminStatus == "APPROVED" ? 3 : order.salesmanStatus == "APPROVED" ? 2 : 1}
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

                    <Button
                        asChild
                        variant="outline"
                    >
                        <Link
                            target="_blank"
                            href={`/dashboard/orders/retail-orders/${order._id}`}
                        >
                            <Eye />
                            View Details
                        </Link>
                    </Button>

                    {order.invoice ? <Link target="_blank" href={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/${order.invoice}`}>
                        <Button
                            variant="outline"
                        >
                            <Download />
                            Invoice
                        </Button>
                    </Link> : null}

                </div>

                <Dialog open={openRejectDialog} onOpenChange={setOpenRejectDialog}>
                    <DialogContent>
                        <DialogTitle>Reason?</DialogTitle>
                        <input type="text" placeholder="Please provide a reason" value={rejectionMessage} onChange={(e) => setRejectionMessage(e.target.value)} className="p-2" />
                        <Button onClick={rejectOrder}>Reject</Button>
                    </DialogContent>
                </Dialog>

            </CardContent>

        </Card>
    );
}