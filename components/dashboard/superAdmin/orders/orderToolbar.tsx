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

interface Props {
    search: string;
    setSearch: (v: string) => void;
    // setSelectedOrder: (v: any) => void;
    // setDialogOpen: (v: boolean) => void;
    filters: {
        orderStatus: string;
        paymentStatus: string;
        paymentMethod: string;
    };
    setFilters: (filters: any) => void;
}

export default function OrderToolbar({
    search,
    setSearch,
    // setSelectedOrder,
    // setDialogOpen,
    filters,
    setFilters
}: Props) {
    return (
        <div className="flex items-center gap-4">

            <div className="relative w-full">

                <Search
                    className="absolute left-3 top-2 h-4 w-4 text-muted-foreground"
                />

                <Input
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="pl-10"
                    placeholder="Search order..."
                />

            </div>

            <div>
                <Select onValueChange={(value)=>{
                    value==="ALL"?setFilters({...filters,orderStatus:""}):setFilters({...filters,orderStatus:value})
                }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Order Status" />
                    </SelectTrigger>

                    <SelectContent>
                        {["ALL","PLACED","PROCESSING","SHIPPED","DELIVERED","CANCELLED"].map((value,index) => (
                            <SelectItem key={index} value={value}>
                                {value}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Select onValueChange={(value)=>{
                    value==="ALL"?setFilters({...filters,paymentStatus:""}):setFilters({...filters,paymentStatus:value})
                }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Payment Status" />
                    </SelectTrigger>

                    <SelectContent>
                        {["ALL","PENDING","PAID","FAILED","REFUNDED"].map((value,index) => (
                            <SelectItem key={index} value={value}>
                                {value}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            <div>
                <Select onValueChange={(value)=>{
                    value==="ALL"?setFilters({...filters,paymentMethod:""}):setFilters({...filters,paymentMethod:value})
                }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Payment Method" />
                    </SelectTrigger>

                    <SelectContent>
                        {["ALL","COD","UPI","CARD"].map((value,index) => (
                            <SelectItem key={index} value={value}>
                                {value}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

        </div>
    );
}