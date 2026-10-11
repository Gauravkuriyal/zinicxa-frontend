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

interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
    parentCategory: Category;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface Props {
    categories: Category[];
    loading: boolean;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
    onAdd: (category: Category) => void;
}

export default function CategoryTable({
    categories,
    loading,
    onEdit,
    onDelete,
    onAdd,
}: Props) {
    if (loading) {
        return (
            <Card>
                <CardContent className="py-16 text-center text-muted-foreground">
                    Loading categories...
                </CardContent>
            </Card>
        );
    }

    if (categories.length === 0) {
        return (
            <Card>
                <CardContent className="py-16 text-center">
                    <h3 className="text-lg font-semibold">
                        No Categories Found
                    </h3>

                    <p className="text-muted-foreground mt-2">
                        Try changing your search or create a new category.
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
                                Image
                            </TableHead>

                            <TableHead>
                                Name
                            </TableHead>

                            <TableHead>
                                Slug
                            </TableHead>

                            <TableHead>
                                Parent Category
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

                        {categories.map((category) => (
                            <TableRow key={category._id}>

                                <TableCell>

                                    <div className="relative h-12 w-12">
                                        <Image
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${category.image}`}
                                        alt={category.name}
                                        fill
                                        className="rounded-lg border object-cover"
                                    />
                                    </div>

                                </TableCell>

                                <TableCell className="font-medium">
                                    {category.name}
                                </TableCell>

                                <TableCell>
                                    {category.slug}
                                </TableCell>

                                <TableCell>
                                    {category.parentCategory?.name ??
                                        "- No Parent -"}
                                </TableCell>

                                <TableCell>

                                    <Badge
                                        variant={
                                            category.isActive
                                                ? "default"
                                                : "secondary"
                                        }
                                    >
                                        {category.isActive
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
                                                onEdit(category)
                                            }
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>

                                        {category.isActive?
                                        <Button
                                            // size="icon"
                                            variant="destructive"
                                            onClick={() =>
                                                onDelete(category)
                                            }
                                        >
                                            Deactivate
                                        </Button>:
                                        <Button
                                            // size="icon"
                                            onClick={() =>
                                                onDelete(category)
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