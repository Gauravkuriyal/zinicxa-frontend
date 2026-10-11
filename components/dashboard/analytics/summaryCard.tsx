"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    TrendingUp,
    TrendingDown,
    Minus,
} from "lucide-react";

interface Props {
    title: string;
    value: number | string;
    change: number;
    prefix?: string;
    suffix?: string;
}

export default function SummaryCard({
    title,
    value,
    change,
    prefix = "",
    suffix = "",
}: Props) {

    const positive = change > 0;
    const negative = change < 0;

    return (

        <Card className="transition-all hover:shadow-lg">

            <CardHeader className="pb-2">

                <CardTitle className="text-sm text-muted-foreground">

                    {title}

                </CardTitle>

            </CardHeader>

            <CardContent>

                <h2 className="text-3xl font-bold">

                    {prefix}

                    {value}

                    {suffix}

                </h2>

                <div className="mt-3 flex items-center gap-2 text-sm">

                    {positive && (
                        <TrendingUp className="h-4 w-4 text-green-600"/>
                    )}

                    {negative && (
                        <TrendingDown className="h-4 w-4 text-red-600"/>
                    )}

                    {!positive && !negative && (
                        <Minus className="h-4 w-4 text-muted-foreground"/>
                    )}

                    <span
                        className={
                            positive
                                ? "text-green-600"
                                : negative
                                ? "text-red-600"
                                : "text-muted-foreground"
                        }
                    >
                        {change.toFixed(1)}%
                    </span>

                    <span className="text-muted-foreground">

                        vs previous period

                    </span>

                </div>

            </CardContent>

        </Card>

    );

}