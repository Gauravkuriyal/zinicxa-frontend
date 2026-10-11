"use client";

import { useEffect, useState } from "react";

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
import axios from "axios";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    retailer ?: User | null;
}

export default function UserRetailerSalesmanDialog({
    open,
    onOpenChange,
    retailer,
}: Props) {
    const api = useAuthApi();

    const [loading, setLoading] = useState(false);
    const [assignedSalesman, setAssignedSalesman] = useState<User>();
    const [salesmans, setSalesmans] = useState<User[]>();
    const [selectedSalesman, setSelectedSalesman] = useState<string>();

    const getAssignedSalesman = async () => {
        try {
            const res = await api.get(`/api/superAdmin/retailerSalesman/retailer/${retailer!._id}/salesman`);
            if (res.data.success) {
                setAssignedSalesman(res.data.salesman)
            }
        } catch (err) {
            console.log(err);
            let errorMessage = "Something went wrong. Please try again.";
            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.message || errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            toast.error(errorMessage);
        }
    }

    const getSalesmans = async () => {
        try {
            const res = await api.get(`/api/superAdmin/user?role=SALESMAN`);
            if (res.data.success) {
                setSalesmans(res.data.users)
            }
        } catch (err) {
            console.log(err);
            let errorMessage = "Something went wrong. Please try again.";
            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.message || errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        getSalesmans();
    }, [])

    useEffect(() => {
        if(!retailer) return;
        getAssignedSalesman();
    }, [retailer, open]);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (!selectedSalesman) {
                toast.error("Salesman is required.");
                return;
            }



            await api.post(`/api/superAdmin/retailerSalesman/assign-retailer`,
                {
                    salesmanId: selectedSalesman,
                    retailerId: retailer?._id
                }, {
                headers: {
                    "Content-Type":
                        "application/json",
                },
            }
            );

            toast.success(
                "Salesman assigned successfully."
            );

            onOpenChange(false);

        } catch (err: any) {
            console.log(err);
            toast.error(
                err?.response?.data?.message ??
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <Dialog
            open={open}
            onOpenChange={(open) => {
                onOpenChange(open);

                if (!open) {
                    setSelectedSalesman(undefined);
                }
            }}
        >

            <DialogContent className="max-w-xl">

                <DialogHeader>

                    <DialogTitle>

                        Assign salesman to retailer

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    {assignedSalesman ? <div>

                        <Label className="mb-2">Assigned Salesman</Label>

                        <Input
                            disabled
                            value={assignedSalesman?.name}
                        />

                    </div> : null}

                    <div>

                        <Label className="mb-2">Salesmans</Label>

                        <Select onValueChange={(value) => setSelectedSalesman(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a salesman" />
                            </SelectTrigger>
                            <SelectContent>
                                {salesmans?.map((salesman) => (
                                    <SelectItem key={salesman._id} value={salesman._id}>
                                        {salesman.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>

                        </Select>

                    </div>

                    <div className="flex justify-end gap-3">

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
                                    ? "Assigning..."
                                    : "Assign"
                            }

                        </Button>

                    </div>

                </div>

            </DialogContent>

        </Dialog>
    )

}