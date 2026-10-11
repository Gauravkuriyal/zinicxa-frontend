
"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";

interface ObjectDetailsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: Record<string, any> | null;
    title?: string;
}

const formatLabel = (key: string) =>
    key
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

const isDateKey = (key: string) =>
    /date|createdAt|updatedAt|At$|timestamp/i.test(key);

const formatDate = (value: string | number | Date) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return String(value);

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
    }).format(date);
};

const isDateString = (value: string) => {
    // Avoid interpreting ordinary strings such as "2026" as dates.
    if (!/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value)) return false;

    const date = new Date(value);

    return !Number.isNaN(date.getTime());
};

const formatValue = (key: string, value: any): React.ReactNode => {
    if (value === null || value === undefined || value === "") {
        return <span className="text-muted-foreground">—</span>;
    }

    if (value instanceof Date) {
        return formatDate(value);
    }

    if (
        typeof value === "number" &&
        isDateKey(key) &&
        Number.isFinite(value)
    ) {
        // Supports Unix timestamps in seconds or milliseconds.
        return formatDate(
            value < 1e12 ? value * 1000 : value
        );
    }

    if (typeof value === "string") {
        if (isDateKey(key) || isDateString(value)) {
            const date = new Date(value);

            if (!Number.isNaN(date.getTime())) {
                return formatDate(date);
            }
        }

        return value;
    }

    if (typeof value === "boolean") {
        return (
            <span
                className={
                    value
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                }
            >
                {value ? "Yes" : "No"}
            </span>
        );
    }

    if (Array.isArray(value)) {
        if (value.length === 0) return "—";

        return (
            <div className="space-y-1">
                {value.map((item, index) => (
                    <div key={index} className="break-all">
                        {typeof item === "object" && item !== null
                            ? JSON.stringify(item, null, 2)
                            : String(item)}
                    </div>
                ))}
            </div>
        );
    }

    if (typeof value === "object") {
        return (
            <pre className="whitespace-pre-wrap break-words text-xs">
                {JSON.stringify(value, null, 2)}
            </pre>
        );
    }

    return String(value);
};

export default function FormDetailsDialog({
    open,
    onOpenChange,
    data,
    title = "Details",
}: ObjectDetailsDialogProps) {
    const entries = data ? Object.entries(data) : [];

    data? delete data.__v:null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[85vh] overflow-hidden flex flex-col sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        View the complete record details below.
                    </DialogDescription>
                </DialogHeader>

                <div className="overflow-y-auto border rounded-md">
                    {entries.length > 0 ? (
                        <Table>
                            <TableBody>
                                {entries.map(([key, value]) => (
                                    <TableRow key={key}>
                                        <TableCell className="w-[35%] min-w-32 align-top font-medium">
                                            {formatLabel(key)}
                                        </TableCell>

                                        <TableCell className="align-top break-words whitespace-normal">
                                            {formatValue(key, value)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="p-6 text-center text-sm text-muted-foreground">
                            No data available.
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
