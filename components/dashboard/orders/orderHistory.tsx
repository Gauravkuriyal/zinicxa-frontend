import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';

interface HistoryLog {
    status: string;
    remarks?: string;
    createdAt: string;
    updatedBy: {
        _id: string;
        name: string;
        role: string;
    };
}

export function OrderHistoryCard({ history }: { history: HistoryLog[] }) {

    const { user } = useAuth();
    // Dynamic status colors helper
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'PLACED':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'SALESMAN_REJECTED':
                return 'bg-rose-50 text-rose-700 border-rose-200';
            case 'INVOICE_UPLOADED':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            default:
                return 'bg-muted text-muted-foreground border-slate-200';
        }
    };

    // Formatter utility for clear text readability
    const formatStatusText = (status: string) => {
        return status.replace(/_/g, ' ');
    };

    if (!user) return;

    return (
        <Card>
            <CardHeader className="border-b bg-muted/20 py-4">
                <CardTitle className="text-base font-semibold">Order History & Activity Log</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="relative pl-6 after:absolute after:inset-y-1 after:left-2.5 after:w-0.5 after:bg-muted">
                    {history.map((log, index) => (

                        (user.role === "RETAILER" && log.status === "ADMIN_APPROVED") ? (null) : (
                            <div key={index} className="relative mb-6 last:mb-0">
                                {/* Chronological Indicator node */}
                                <span className="absolute -left-[21px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-background border-2 border-primary ring-4 ring-background z-10" />

                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`text-[10px] font-bold tracking-wider uppercase border px-2 py-0.5 rounded-full ${getStatusStyle(log.status)}`}>
                                            {user.role == "RETAILER"? formatStatusText(log.status).replaceAll("ADMIN","SALESMAN"):formatStatusText(log.status)}
                                        </span>
                                        {user.role == "RETAILER" ? (null) : (<>
                                            <span className="text-sm font-medium text-foreground">
                                                by {log.updatedBy.name}
                                            </span>
                                            <span className="text-xs text-muted-foreground/60">
                                                ({log.updatedBy.role})
                                            </span>
                                        </>)}
                                    </div>
                                    <time className="text-xs text-muted-foreground whitespace-nowrap">
                                        {new Date(log.createdAt).toLocaleString(undefined, {
                                            dateStyle: 'medium',
                                            timeStyle: 'short'
                                        })}
                                    </time>
                                </div>

                                {log.remarks && (
                                    <p className="mt-2 text-sm text-muted-foreground bg-muted/40 p-2.5 rounded-md border border-dashed">
                                        <span className="font-semibold text-xs text-foreground block mb-0.5">Remarks:</span>
                                        {user.role == "RETAILER"? log.remarks.replaceAll("Admin","Salesman").replaceAll("admin","salesman") :log.remarks}
                                    </p>
                                )}
                            </div>
                        )
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}