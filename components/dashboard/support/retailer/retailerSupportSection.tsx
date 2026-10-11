"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useAuthApi } from "@/hooks/useAuthApi";

import { Plus } from "lucide-react";

import SupportStats from "../common/supportStats";
import TicketList from "../common/ticketList";
import CreateTicketDialog from "../common/createTicketDialog";

import { SupportTicket } from "@/types/support";

interface ApiResponse {
    currentPage: number;
    totalPages: number;
    tickets: SupportTicket[];
}

export default function RetailerSupportSection() {

    const api = useAuthApi();

    const [tickets, setTickets] =
        useState<SupportTicket[]>([]);

    const [page, setPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const [loading, setLoading] =
        useState(false);

    const [openCreate, setOpenCreate] =
        useState(false);

    const fetchTickets = async (
        currentPage = 1
    ) => {

        try {

            setLoading(true);

            const res =
                await api.get<ApiResponse>(
                    `/api/retailer/support?page=${currentPage}`
                );

            setTickets(
                res.data.tickets
            );

            setPage(
                res.data.currentPage
            );

            setTotalPages(
                res.data.totalPages
            );

        } catch (err) {

            toast.error(
                "Failed to load tickets."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTickets();

    }, []);

    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-2xl font-bold">
                        Support
                    </h1>

                    <p className="text-muted-foreground">

                        Raise and manage your support tickets.

                    </p>

                </div>

                <Button
                    onClick={() =>
                        setOpenCreate(true)
                    }
                >
                    <Plus className="mr-2 h-4 w-4" />

                    New Ticket

                </Button>

            </div>

            <SupportStats
                tickets={tickets}
            />

            <TicketList
                tickets={tickets}
                loading={loading}
            />

            <div className="flex justify-center gap-3">

                <Button
                    variant="outline"
                    disabled={
                        page === 1
                    }
                    onClick={() =>
                        fetchTickets(
                            page - 1
                        )
                    }
                >
                    Previous
                </Button>

                <span className="flex items-center text-sm">

                    Page {page} of {totalPages}

                </span>

                <Button
                    variant="outline"
                    disabled={
                        page === totalPages
                    }
                    onClick={() =>
                        fetchTickets(
                            page + 1
                        )
                    }
                >
                    Next
                </Button>

            </div>

            <CreateTicketDialog
                open={openCreate}
                setOpen={
                    setOpenCreate
                }
                onSuccess={() =>
                    fetchTickets(page)
                }
                supportLevels={[
                    "SALESMAN",
                    "ADMIN",
                ]}
            />

        </div>

    );

}