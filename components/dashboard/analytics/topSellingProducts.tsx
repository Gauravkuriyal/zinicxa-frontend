"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

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

import { Calendar } from "@/components/ui/calendar";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

import { CalendarIcon, ExternalLink, Package, Trophy } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Product {
    productId: string;

    productName: string;

    productImage: string | null;

    quantity: number;

    revenue: number;
}

export default function TopSellingProducts() {
    const api = useAuthApi();
    const {user} = useAuth();

    const today = new Date();

    const [products, setProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(true);

    const [limit, setLimit] = useState("10");

    const [startDate, setStartDate] = useState(subMonths(today, 1));

    const [endDate, setEndDate] = useState(today);

    const fetchProducts = async () => {
        if (!user) return;
        if (user.role !== "SUPER_ADMIN") return;
        if(loading) return;
        try {
            setLoading(true);

            const res = await api.get(
                "/api/analytics/sales/top-products",

                {
                    params: {
                        startDate: format(startDate, "yyyy-MM-dd"),

                        endDate: format(endDate, "yyyy-MM-dd"),

                        limit,
                    },
                }
            );

            setProducts(res.data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) return;
        if (user.role !== "SUPER_ADMIN") return;
        fetchProducts();
    }, [user,startDate, endDate, limit]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Top Selling Products</CardTitle>

                    <p className="text-sm text-muted-foreground mt-1">
                        Best performing products during the selected period.
                    </p>
                </div>

                <div className="flex gap-3">
                    <Select value={limit} onValueChange={setLimit}>
                        <SelectTrigger className="w-28">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="5">Top 5</SelectItem>

                            <SelectItem value="10">Top 10</SelectItem>

                            <SelectItem value="20">Top 20</SelectItem>
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
                {loading ? (
                    <div className="py-16 text-center">Loading...</div>
                ) : (
                    <div className="space-y-4">
                        {products.map((product, index) => (
                            <div
                                key={product.productId}
                                className="flex items-center justify-between rounded-xl border p-4 hover:bg-muted/30 transition"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-bold">
                                        {index === 0 ? (
                                            <Trophy className="h-5 w-5 text-yellow-500" />
                                        ) : (
                                            index + 1
                                        )}
                                    </div>

                                    <div className="relative h-16 w-16 overflow-hidden rounded-lg border">
                                        {product.productImage ? (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${product.productImage}`}
                                                alt={product.productName}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <Package />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">{product.productName}</h3>

                                        <p className="text-sm text-muted-foreground">
                                            Product ID: {product.productId}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Sold</p>

                                        <h3 className="font-bold text-xl">{product.quantity}</h3>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Revenue</p>

                                        <h3 className="font-bold text-xl">
                                            ₹{product.revenue.toLocaleString("en-IN")}
                                        </h3>
                                    </div>

                                    <Button asChild variant="outline">
                                        <Link
                                            target="_blank"
                                            href={`/dashboard/products/${product.productId}/edit`}
                                        >
                                            View
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
