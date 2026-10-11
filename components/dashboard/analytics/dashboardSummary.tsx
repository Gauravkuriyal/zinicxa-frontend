"use client";

import { useEffect, useState } from "react";

import { subMonths, format } from "date-fns";

import { useAuthApi } from "@/hooks/useAuthApi";

import SummaryCard from "./summaryCard";

import { Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useAuth } from "@/context/AuthContext";

interface DashboardSummaryData {
    revenue: any;

    orders: any;

    completedOrders: any;

    cancelledOrders: any;

    refundedOrders: any;

    averageOrderValue: any;

    newCustomers: any;

    repeatCustomers: any;

    productsSold: any;
}

export default function DashboardSummary() {
    const api = useAuthApi();
    const { user } = useAuth();

    const today = new Date();

    const [startDate, setStartDate] = useState<Date>(subMonths(today, 1));

    const [endDate, setEndDate] = useState<Date>(today);

    const [loading, setLoading] = useState(true);

    const [summary, setSummary] = useState<DashboardSummaryData>();

    const fetchSummary = async () => {
        if (!user) return;
        if (user.role !== "SUPER_ADMIN") return;
        try {
            setLoading(true);

            const res = await api.get("/api/analytics/sales/dashboard-summary", {
                params: {
                    startDate: format(startDate, "yyyy-MM-dd"),
                    endDate: format(endDate, "yyyy-MM-dd"),
                },
            });

            setSummary(res.data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) return;
        if (user.role !== "SUPER_ADMIN") return;
        fetchSummary();
    }, [user, startDate, endDate]);

    if (loading || !summary) {
        return <div></div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Dashboard Summary</h2>

                    <p className="text-muted-foreground">
                        Overview of sales performance.
                    </p>
                </div>

                <div className="flex gap-3">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <Calendar className="mr-2 h-4 w-4" />

                                {format(startDate, "dd MMM yyyy")}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent>
                            <CalendarComponent
                                mode="single"
                                selected={startDate}
                                onSelect={(d) => d && setStartDate(d)}
                            />
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <Calendar className="mr-2 h-4 w-4" />

                                {format(endDate, "dd MMM yyyy")}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent>
                            <CalendarComponent
                                mode="single"
                                selected={endDate}
                                onSelect={(d) => d && setEndDate(d)}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <SummaryCard
                    title="Revenue"
                    value={summary.revenue.current}
                    prefix="₹"
                    change={summary.revenue.change}
                />

                <SummaryCard
                    title="Orders"
                    value={summary.orders.current}
                    change={summary.orders.change}
                />

                <SummaryCard
                    title="Completed Orders"
                    value={summary.completedOrders.current}
                    change={summary.completedOrders.change}
                />

                <SummaryCard
                    title="Cancelled Orders"
                    value={summary.cancelledOrders.current}
                    change={summary.cancelledOrders.change}
                />

                <SummaryCard
                    title="Refunded Orders"
                    value={summary.refundedOrders.current}
                    change={summary.refundedOrders.change}
                />

                <SummaryCard
                    title="Average Order Value"
                    value={summary.averageOrderValue.current}
                    prefix="₹"
                    change={summary.averageOrderValue.change}
                />

                <SummaryCard
                    title="New Customers"
                    value={summary.newCustomers.current}
                    change={summary.newCustomers.change}
                />

                <SummaryCard
                    title="Repeat Customers"
                    value={summary.repeatCustomers.current}
                    change={summary.repeatCustomers.change}
                />

                <SummaryCard
                    title="Products Sold"
                    value={summary.productsSold.current}
                    change={summary.productsSold.change}
                />
            </div>
        </div>
    );
}
