"use client";

import { useEffect, useMemo, useState } from "react";
import { format, subMonths } from "date-fns";
import { useAuthApi } from "@/hooks/useAuthApi";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";
import { useAuth } from "@/context/AuthContext";

interface StatusItem {
    _id: string;
    count: number;
    revenue: number;
}

const COLORS = {
    DELIVERED: "#22c55e",
    CANCELLED: "#f59e0b",
    REJECTED: "#ef4444",
    REFUNDED: "#6366f1",
};

export default function OrderStatusAnalytics() {
    const api = useAuthApi();
    const today = new Date();
    const {user} = useAuth();

    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(subMonths(today, 1));
    const [endDate, setEndDate] = useState(today);
    const [data, setData] = useState<StatusItem[]>([]);

    const fetchAnalytics = async () => {
        if (!user) return;
        if (user.role !== "SUPER_ADMIN") return;
        if(loading) return;
        try {
            setLoading(true);
            const res = await api.get(
                "/api/analytics/sales/order-status",
                {
                    params: {
                        startDate: format(startDate, "yyyy-MM-dd"),
                        endDate: format(endDate, "yyyy-MM-dd"),
                    },
                }
            );
            setData(res.data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) return;
        if (user.role !== "SUPER_ADMIN") return;
        fetchAnalytics();
    }, [user,startDate, endDate]);

    const totalOrders = useMemo(
        () => data.reduce((sum, item) => sum + item.count, 0),
        [data]
    );

    const totalRevenue = useMemo(
        () => data.reduce((sum, item) => sum + item.revenue, 0),
        [data]
    );

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Order Status Analytics</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        Distribution of orders and revenue.
                    </p>
                </div>

                <div className="flex gap-3">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {format(startDate, "dd MMM yyyy")}
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
                                {format(endDate, "dd MMM yyyy")}
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
                {loading ? (
                    <div className="h-96 flex items-center justify-center">
                        Loading...
                    </div>
                ) : (
                    <>
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="h-[350px]">
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            dataKey="count"
                                            nameKey="_id"
                                            outerRadius={120}
                                            label
                                        >
                                            {data.map((item) => (
                                                <Cell
                                                    key={item._id}
                                                    fill={COLORS[item._id as keyof typeof COLORS]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="h-[350px]">
                                <ResponsiveContainer>
                                    <BarChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="_id" />
                                        <YAxis />
                                        <Tooltip
                                            formatter={(value) => [
                                                `₹${(Number(value) || 0).toLocaleString("en-IN")}`,
                                                "Revenue",
                                            ]}
                                        />
                                        <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                                            {data.map((item) => (
                                                <Cell
                                                    key={item._id}
                                                    fill={COLORS[item._id as keyof typeof COLORS]}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
                            {data.map((item) => (
                                <Card key={item._id}>
                                    <CardContent >
                                        <p className="text-sm text-muted-foreground">{item._id}</p>
                                        <h2 className="text-3xl font-bold mt-2">{item.count}</h2>
                                        <p className="text-sm mt-2">
                                            ₹{item.revenue.toLocaleString("en-IN")}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-5 mt-6">
                            <Card>
                                <CardContent>
                                    <p className="text-muted-foreground">Total Orders</p>
                                    <h2 className="text-3xl font-bold mt-2">{totalOrders}</h2>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <p className="text-muted-foreground">Total Revenue</p>
                                    <h2 className="text-3xl font-bold mt-2">
                                        ₹{totalRevenue.toLocaleString("en-IN")}
                                    </h2>
                                </CardContent>
                            </Card>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}