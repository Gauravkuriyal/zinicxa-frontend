"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Button,
} from "@/components/ui/button";

import {
    Pencil,
    Trash2,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";
import Image from "next/image";
import { SubscriberForm } from "@/types/subscribeForm";

export default function SubscriberFormTable({
    subscribeForms,
    loading,
}: {
    subscribeForms:SubscriberForm[],
    loading:boolean,
}) {
    if (loading) {
        return (
            <Card>
                <CardContent className="py-16 text-center text-muted-foreground">
                    Loading forms...
                </CardContent>
            </Card>
        );
    }

    if (subscribeForms.length === 0) {
        return (
            <Card>
                <CardContent className="py-16 text-center">
                    <h3 className="text-lg font-semibold">
                        No data Found
                    </h3>

                    <p className="text-muted-foreground mt-2">
                        Try changing your search.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>

            <CardContent className="p-0">

                <Table>

                    <TableHeader>

                        <TableRow>

                            <TableHead className="w-[80px]">
                                Id
                            </TableHead>

                            <TableHead>
                                Email
                            </TableHead>

                            <TableHead>
                                Subscribed At
                            </TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {subscribeForms.map((subscribeForm:SubscriberForm) => (
                            <TableRow key={subscribeForm._id}>

                                <TableCell>
                                    {subscribeForm._id}

                                </TableCell>

                                <TableCell>
                                    {subscribeForm.email}
                                </TableCell>

                                <TableCell>
                                    {new Date(subscribeForm.createdAt).toLocaleDateString()}
                                </TableCell>

                            </TableRow>
                        ))}

                    </TableBody>

                </Table>

            </CardContent>

        </Card>
    );
}