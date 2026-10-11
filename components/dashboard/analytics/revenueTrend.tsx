"use client";

import { useEffect, useMemo, useState } from "react";

import { format, subMonths } from "date-fns";

import { useAuthApi } from "@/hooks/useAuthApi";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

import { CalendarIcon, TrendingUp } from "lucide-react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import { useAuth } from "@/context/AuthContext";

type GroupBy = "day" | "week" | "month" | "year";

interface RevenuePoint {
    _id: any;

    revenue: number;

    orders: number;
}

export default function RevenueTrend() {
    const api = useAuthApi();
    const {user} = useAuth();
    const today = new Date();

    const [groupBy, setGroupBy] = useState<GroupBy>("month");

    const [startDate, setStartDate] = useState(subMonths(today, 1));

    const [endDate, setEndDate] = useState(today);

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState<RevenuePoint[]>([]);

    const fetchRevenue = async () => {
        if (!user) return;
        if (user.role !== "SUPER_ADMIN") return;
        if(loading) return
        try {
            setLoading(true);

            const res = await api.get("/api/analytics/sales/revenue-trend", {
                params: {
                    startDate: format(startDate, "yyyy-MM-dd"),

                    endDate: format(endDate, "yyyy-MM-dd"),

                    groupBy,
                },
            });

            setData(res.data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) return;
        if (user.role !== "SUPER_ADMIN") return;
        fetchRevenue();
    }, [user,groupBy, startDate, endDate]);

    const chartData = useMemo(() => {
        return data.map((item) => {
            let label = "";

            switch (groupBy) {
                case "day":
                    label = `${item._id.day}/${item._id.month}`;

                    break;

                case "week":
                    label = `W${item._id.week}`;

                    break;

                case "month":
                    label = item._id.monthName;

                    break;

                case "year":
                    label = String(item._id.year);

                    break;
            }

            return {
                label,

                revenue: item.revenue,

                orders: item.orders,
            };
        });
    }, [data, groupBy]);

    const totalRevenue = chartData.reduce(
        (sum, item) => sum + item.revenue,

        0
    );

    const totalOrders = chartData.reduce(
        (sum, item) => sum + item.orders,

        0
    );

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Revenue Trend</CardTitle>

                    <p className="text-sm text-muted-foreground mt-1">
                        Revenue over time
                    </p>
                </div>

                <div className="flex gap-3">
                    <Select
                        value={groupBy}
                        onValueChange={(v) => setGroupBy(v as GroupBy)}
                    >
                        <SelectTrigger className="w-36">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="day">Daily</SelectItem>

                            <SelectItem value="week">Weekly</SelectItem>

                            <SelectItem value="month">Monthly</SelectItem>

                            <SelectItem value="year">Yearly</SelectItem>
                        </SelectContent>
                    </Select>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <CalendarIcon className="mr-2 h-4 w-4" />

                                {format(startDate, "dd MMM")}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent>
                            <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={(d) => d && setStartDate(d)}
                            />
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <CalendarIcon className="mr-2 h-4 w-4" />

                                {format(endDate, "dd MMM")}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent>
                            <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={(d) => d && setEndDate(d)}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </CardHeader>

            <CardContent>
                <div className="h-[380px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="label" />

                            <YAxis />

                            <Tooltip />

                            <Line dataKey="revenue" strokeWidth={3} dot />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">
                    <Card>
                        <CardContent>
                            <div className="flex gap-2 items-center">
                                <p className="text-sm text-muted-foreground">Total Revenue</p>

                                <TrendingUp className="mb-3" />
                            </div>
                            <h2 className="text-2xl font-bold">
                                ₹{totalRevenue.toLocaleString()}
                            </h2>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Orders</p>

                            <h2 className="text-2xl font-bold">{totalOrders}</h2>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Avg Revenue / Order
                            </p>

                            <h2 className="text-2xl font-bold">
                                ₹{totalOrders ? (totalRevenue / totalOrders).toFixed(2) : 0}
                            </h2>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}
