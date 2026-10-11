"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Button,
} from "@/components/ui/button";

import {
    Download,
    Eye,
    Pencil,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";
import { Order } from "@/types/order";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthApi } from "@/hooks/useAuthApi";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface Props {
    orders: Order[];
    loading: boolean;
    onEdit: (order: Order) => void;
    onAdd: (order: Order) => void;
}

export default function OrderTable({
    orders,
    loading,
    onEdit,
    onAdd,
}: Props) {
    const api = useAuthApi();
    const { user } = useAuth();

    const [invoiceLoading, setInvoiceLoading] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState<Order>();
    const [invoice, setInvoice] = useState<File>();
    const [openInvoiceDialog, setOpenInvoiceDialog] = useState(false);

    const uploadInvoice = async () => {
        if (user?.role !== "SUPER_ADMIN" && user?.role !== "ADMIN") return;
        if (!invoice) {
            toast.error("Please provide a invoice")
            return
        };
        if (invoiceLoading) return;
        setInvoiceLoading(true);
        try {
            if (!selectedOrder) return;
            const formData = new FormData();
            if (invoice) {
                formData.append("invoice", invoice);
            }

            let url = "";
            if (user?.role === "ADMIN") url = `/api/admin/order/${selectedOrder._id}/invoice`;
            else if (user?.role === "SUPER_ADMIN") url = `/api/superAdmin/order/${selectedOrder._id}/invoice`;
            if (url == "") return;

            const res = await api.patch(url, formData);
            toast.success("Invoice Uploaded.");
            setOpenInvoiceDialog(false);
            // fetchOrders();
        } catch (err) {
            console.log(err);
            toast.error("Failed to upload invoice.");
        } finally {
            setInvoiceLoading(false);
        }
    }

    const handleInvoice = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setInvoice(file);
    };

    if (loading) {
        return (
            <Card>
                <CardContent className="py-16 text-center text-muted-foreground">
                    Loading orders...
                </CardContent>
            </Card>
        );
    }

    if (orders.length === 0) {
        return (
            <Card>
                <CardContent className="py-16 text-center">
                    <h3 className="text-lg font-semibold">
                        No Order Found
                    </h3>

                    <p className="text-muted-foreground mt-2">
                        Try changing your search.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>

            <CardContent className="p-0">

                <Table >

                    <TableHeader>

                        <TableRow>

                            <TableHead>
                                Order Number
                            </TableHead>

                            <TableHead>
                                Product
                            </TableHead>

                            <TableHead>
                                Total Amount
                            </TableHead>

                            <TableHead>
                                Order By
                            </TableHead>

                            <TableHead>
                                Order Status
                            </TableHead>

                            <TableHead>
                                Payment Status
                            </TableHead>

                            <TableHead>
                                Invoice
                            </TableHead>

                            <TableHead>
                                Actions
                            </TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {orders.map((order) => (
                            <TableRow key={order._id}>

                                <TableCell>
                                    {order.orderNumber}
                                </TableCell>

                                <TableCell>
                                    <ol className="list-decimal">
                                        {order.items?.map(((item) => (
                                            <li key={item.product} className="my-1">
                                                {item.productName}
                                            </li>
                                        )))}
                                    </ol>
                                </TableCell>

                                <TableCell>
                                    INR {order.totalAmount}
                                </TableCell>

                                <TableCell>
                                    {order.user.name} <br />({order.user.email})
                                </TableCell>

                                <TableCell>
                                    <Badge variant={"secondary"}>
                                        {order.orderStatus}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    <Badge variant={"secondary"}>
                                        {order.paymentStatus}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    {order.invoice ? <Link target="_blank" href={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/${order.invoice}`}>
                                        <Button
                                            variant="outline"
                                        >
                                            <Download />
                                            Invoice
                                        </Button>
                                    </Link> : "-"}
                                </TableCell>

                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() =>
                                                onEdit(order)
                                            }
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button onClick={() => {
                                            setSelectedOrder(order);
                                            setOpenInvoiceDialog(true);
                                        }}>Upload Invoice</Button>
                                    </div>

                                </TableCell>

                            </TableRow>
                        ))}

                    </TableBody>

                </Table>

                <Dialog open={openInvoiceDialog} onOpenChange={setOpenInvoiceDialog}>
                    <DialogContent>
                        <DialogTitle>Upload Invoice</DialogTitle>
                        <div>
                            <Input
                                type="file"
                                accept="application/pdf"
                                onChange={handleInvoice}
                            />

                        </div>
                        <Button onClick={uploadInvoice}>Submit</Button>
                    </DialogContent>
                </Dialog>

            </CardContent>

        </Card>
    );
}