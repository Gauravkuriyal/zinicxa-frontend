"use client";

import {
    AlertCircle,
    CheckCircle2,
    Archive,
    Flame,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { SupportTicket } from "@/types/support";


interface Props {
    tickets: SupportTicket[];
}

export default function SupportStats({
    tickets,
}: Props) {

    const open =
        tickets.filter(
            (t) => t.status === "OPEN"
        ).length;

    const resolved =
        tickets.filter(
            (t) =>
                t.status ===
                "RESOLVED"
        ).length;

    const closed =
        tickets.filter(
            (t) =>
                t.status ===
                "CLOSED"
        ).length;

    const high =
        tickets.filter(
            (t) =>
                t.priority ===
                "HIGH"
        ).length;

    const stats = [
        {
            title: "Open",
            value: open,
            icon: AlertCircle,
        },
        {
            title: "Resolved",
            value: resolved,
            icon: CheckCircle2,
        },
        {
            title: "Closed",
            value: closed,
            icon: Archive,
        },
        {
            title: "High Priority",
            value: high,
            icon: Flame,
        },
    ];

    return (
        <div className="grid md:grid-cols-4 gap-5">

            {stats.map((item) => {

                const Icon = item.icon;

                return (
                    <Card key={item.title}>

                        <CardContent className="p-5 flex items-center justify-between">

                            <div>

                                <p className="text-sm text-muted-foreground">

                                    {item.title}

                                </p>

                                <h2 className="text-2xl font-bold mt-1">

                                    {item.value}

                                </h2>

                            </div>

                            <Icon className="h-7 w-7 text-primary"/>

                        </CardContent>

                    </Card>
                );

            })}

        </div>
    );
}