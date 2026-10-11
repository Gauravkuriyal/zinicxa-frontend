"use client";

import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { useAuthApi } from "@/hooks/useAuthApi";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

interface Props {
    search: string;
    setSearch: (v: string) => void;
    // setSelectedOrder: (v: any) => void;
    // setDialogOpen: (v: boolean) => void;
    filters: {
        pending: string;
    };
    setFilters: (filters: any) => void;
}

export default function RetailOrderToolbar({
    search,
    setSearch,
    // setSelectedOrder,
    // setDialogOpen,
    filters,
    setFilters,
}: Props) {
    const api = useAuthApi();
    const { user } = useAuth();
    const [retailers, setRetailers] = useState<User[]>([]);

    const getRetailers = async () => {
        if (user?.role !== "SUPER_ADMIN" && user?.role !== "ADMIN" && user?.role !== "SALESMAN") return;
        try {
            let url = "";
            if (user?.role == "SALESMAN") url = "/api/salesman/retailers/assigned";
            else if (user?.role == "ADMIN") url = "/api/admin/user/?role=RETAILER";
            else if (user?.role == "SUPER_ADMIN") url = "/api/superAdmin/user/?role=RETAILER";
            if (url == "") return;

            const res = await api.get(url, {
                params: {
                    limit: -1,
                },
            });

            let responseRetailers: User[] = [];
            if (user.role === "SUPER_ADMIN") responseRetailers = res.data.users;
            else if (user.role === "ADMIN") responseRetailers = res.data.users;
            else if (user.role === "SALESMAN") {
                responseRetailers = res.data.retailers.map((retailerData: any) => retailerData.retailer)
            }
            setRetailers(responseRetailers);

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
        if (!user) return;
        if (user?.role !== "SUPER_ADMIN" && user?.role !== "ADMIN" && user.role !== "SALESMAN") return;
        getRetailers();
    }, [user])


    return (
        <div className="flex items-center gap-4 mb-2">
            <div className="relative w-full">
                <Search className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />

                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                    placeholder="Search order..."
                />
            </div>

            <div>
                <Select
                    onValueChange={(value) => {
                        value === "ALL"
                            ? setFilters({ ...filters, retailer: "" })
                            : setFilters({ ...filters, retailer: value });
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Retailer" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"ALL"}>
                            ALL
                        </SelectItem>
                        {retailers.map((retailer, index) => (
                            <SelectItem key={index} value={retailer._id}>
                                {retailer.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Select
                    onValueChange={(value) => {
                        value === "ALL"
                            ? setFilters({ ...filters, currentStage: "" })
                            : setFilters({ ...filters, currentStage: value });
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Stage" />
                    </SelectTrigger>
                    <SelectContent>
                        {[
                            { key: "ALL", value: "ALL" },
                            { key: "PLACED", value: "PLACED" },
                            { key: "UNDER_SALESMAN_REVIEW", value: "UNDER_SALESMAN_REVIEW" },
                            { key: "UNDER_ADMIN_REVIEW", value: "UNDER_ADMIN_REVIEW" },
                            { key: "APPROVED", value: "APPROVED" },
                            { key: "PROCESSING", value: "PROCESSING" },
                            { key: "DISPATCHED", value: "DISPATCHED" },
                            { key: "DELIVERED", value: "DELIVERED" },
                            { key: "REJECTED", value: "REJECTED" },
                        ].map(({ key, value }, index) => (
                            <SelectItem key={index} value={value}>
                                {key}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Select
                    onValueChange={(value) => {
                        value === "ALL"
                            ? setFilters({ ...filters, paymentStatus: "" })
                            : setFilters({ ...filters, paymentStatus: value });
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Payment Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {[
                            { key: "ALL", value: "ALL" },
                            { key: "PENDING", value: "PENDING" },
                            { key: "PAID", value: "PAID" },
                            { key: "FAILED", value: "FAILED" },
                            { key: "REFUNDED", value: "REFUNDED" },
                        ].map(({ key, value }, index) => (
                            <SelectItem key={index} value={value}>
                                {key}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Select
                    onValueChange={(value) => {
                        value === "ALL"
                            ? setFilters({ ...filters, pending: "" })
                            : setFilters({ ...filters, pending: value });
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pending Orders" />
                    </SelectTrigger>

                    <SelectContent>
                        {[
                            { key: "ALL", value: "ALL" },
                            { key: "YES", value: "true" },
                            { key: "NO", value: "false" },
                        ].map(({ key, value }, index) => (
                            <SelectItem key={index} value={value}>
                                {key}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
