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
import { Banner } from "@/types/banner";


interface Props {
    banners: Banner[];
    loading: boolean;
    onEdit: (banner: Banner) => void;
    onDelete: (banner: Banner) => void;
    onAdd: (banner: Banner) => void;
}

export default function BannerTable({
    banners,
    loading,
    onEdit,
    onDelete,
    onAdd,
}: Props) {
    if (loading) {
        return (
            <Card>
                <CardContent className="py-16 text-center text-muted-foreground">
                    Loading banners...
                </CardContent>
            </Card>
        );
    }

    if (banners.length === 0) {
        return (
            <Card>
                <CardContent className="py-16 text-center">
                    <h3 className="text-lg font-semibold">
                        No Banner Found
                    </h3>

                    <p className="text-muted-foreground mt-2">
                     Create a new banner.
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
                                Cover
                            </TableHead>

                            <TableHead>
                                Heading
                            </TableHead>

                            <TableHead>
                                Sub Heading
                            </TableHead>

                            <TableHead>
                                Status
                            </TableHead>

                            <TableHead className="text-right">
                                Actions
                            </TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {banners.map((banner) => (
                            <TableRow key={banner._id}>

                                <TableCell>

                                    <div className="relative h-24 w-24">
                                        <Image
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/${banner.bannerCover}`}
                                        alt={banner.heading}
                                        fill
                                        className="rounded-lg border object-cover"
                                    />
                                    </div>

                                </TableCell>

                                <TableCell className="font-medium">
                                    {banner.heading}
                                </TableCell>

                                <TableCell>
                                    <span>
                                        {banner.subHeading}
                                    </span>
                                </TableCell>

                                <TableCell>

                                    <Badge
                                        variant={
                                            banner.isActive
                                                ? "default"
                                                : "secondary"
                                        }
                                    >
                                        {banner.isActive
                                            ? "Active"
                                            : "Inactive"}
                                    </Badge>

                                </TableCell>

                                <TableCell>

                                    <div className="flex justify-end gap-2">

                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() =>
                                                onEdit(banner)
                                            }
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>

                                        {banner.isActive?
                                        <Button
                                            // size="icon"
                                            variant="destructive"
                                            onClick={() =>
                                                onDelete(banner)
                                            }
                                        >
                                            Deactivate
                                        </Button>:
                                        <Button
                                            // size="icon"
                                            onClick={() =>
                                                onDelete(banner)
                                            }
                                        >
                                            Activate
                                        </Button>}

                                    </div>

                                </TableCell>

                            </TableRow>
                        ))}

                    </TableBody>

                </Table>

            </CardContent>

        </Card>
    );
}