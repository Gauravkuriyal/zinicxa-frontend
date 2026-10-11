"use client";

import { useEffect, useState } from "react";

import { useAuthApi } from "@/hooks/useAuthApi";

import SupportStats from "@/components/dashboard/support/common/supportStats";
import TicketList from "@/components/dashboard/support/common/ticketList";

import { SupportTicket } from "@/types/support";

import { Button } from "@/components/ui/button";

export default function AssignedSupportPage() {

    const api = useAuthApi();

    const [tickets, setTickets] =
        useState<SupportTicket[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [page, setPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const fetchTickets = async () => {

        try {

            setLoading(true);

            const res = await api.get(
                "/api/salesman/support",
                {
                    params: {
                        page,
                    },
                }
            );

            setTickets(res.data.tickets);

            setTotalPages(
                res.data.totalPages
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTickets();

    }, [page]);

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">

                    Assigned Retailer Tickets

                </h1>

                <p className="text-muted-foreground">

                    Resolve retailer support requests assigned to you.

                </p>

            </div>

            <SupportStats
                tickets={tickets}
            />

            <TicketList
                tickets={tickets}
                loading={loading}
            />

            <div className="flex justify-center gap-2">

                <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                >

                    Previous

                </Button>

                <Button
                    variant="outline"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                >

                    Next

                </Button>

            </div>

        </div>

    );

}