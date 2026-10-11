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
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function AdminOrderActions({
    order,
    fetchOrders
}: { order: RetailOrder, fetchOrders: () => void }) {
    const { user } = useAuth();
    const api = useAuthApi();

    const [loading, setLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [openStatusDialog, setOpenStatusDialog] = useState(false);
    const [invoice, setInvoice] = useState<File>();
    const [openInvoiceDialog, setOpenInvoiceDialog] = useState(false);

    const changeStatus = async () => {
        if (user?.role != "ADMIN") return;
        if (!selectedStatus) return;
        setLoading(true);
        try {
            let url = `/api/admin/order/${order._id}/status`;
            const res = await api.patch(url, { status: selectedStatus });
            toast.success("Order Status changed.");
            setOpenStatusDialog(false);
            fetchOrders();
        } catch (err) {
            console.log(err);
            toast.error("Failed to change status.");
        } finally {
            setLoading(false);
        }
    }

    const uploadInvoice = async () => {
        if (user?.role != "ADMIN") return;
        if (!invoice) {
            toast.error("Please provide a invoice")
            return
        };
        if (loading) return;
        setLoading(true);
        try {
            const formData = new FormData();
            if (invoice) {
                formData.append("invoice", invoice);
            }
            let url = `/api/admin/order/${order._id}/invoice`;
            const res = await api.patch(url, formData);
            toast.success("Invoice Uploaded.");
            setOpenInvoiceDialog(false);
            fetchOrders();
        } catch (err) {
            console.log(err);
            toast.error("Failed to upload invoice.");
        } finally {
            setLoading(false);
        }
    }

    const handleInvoice = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setInvoice(file);
    };

    if (!user) return null;

    if (user.role !== "ADMIN") return null;

    return (
        <>
            <div className="grid grid-cols-1 gap-2">
                <Button onClick={() => setOpenStatusDialog(true)}>Change Status</Button>
                <Button onClick={() => setOpenInvoiceDialog(true)}>Upload Invoice</Button>
            </div>

            <Dialog open={openStatusDialog} onOpenChange={setOpenStatusDialog}>
                <DialogContent>
                    <DialogTitle>Change Status</DialogTitle>
                    <Label>Select a status</Label>
                    <div className="grid grid-cols-2">
                        {["DISPATCHED", "DELIVERED"].map((statusOption, index) => (
                            <div className="flex items-center justify-start gap-4 my-2" key={index}>
                                <Input
                                    value={statusOption}
                                    id={statusOption}
                                    type="radio"
                                    name="role"
                                    className="w-fit h-fit mt-0 pt-0"
                                    checked={selectedStatus == statusOption}
                                    onChange={(e) =>
                                        setSelectedStatus(e.target.value)
                                    }
                                />
                                <Label htmlFor={statusOption} className="">{statusOption}</Label>
                            </div>
                        ))}
                    </div>
                    <Button onClick={changeStatus}>Submit</Button>
                </DialogContent>
            </Dialog>

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
        </>
    );
}