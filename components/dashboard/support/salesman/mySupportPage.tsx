"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

import { useAuthApi } from "@/hooks/useAuthApi";

import SupportStats from "@/components/dashboard/support/common/supportStats";
import TicketList from "@/components/dashboard/support/common/ticketList";
import CreateTicketDialog from "@/components/dashboard/support/common/createTicketDialog";

import { SupportTicket } from "@/types/support";

export default function MySupportPage() {

    const api = useAuthApi();

    const [tickets, setTickets] = useState<SupportTicket[]>([]);

    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [openCreate, setOpenCreate] = useState(false);

    const fetchTickets = async () => {

        try {

            setLoading(true);

            const res = await api.get(
                "/api/salesman/support/my",
                {
                    params: {
                        page,
                    },
                }
            );

            setTickets(res.data.tickets);

            setTotalPages(res.data.totalPages);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTickets();

    }, [page]);

    return (

        <div className="space-y-8">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        My Support Tickets

                    </h1>

                    <p className="text-muted-foreground">

                        Raise support requests to Admin or Super Admin.

                    </p>

                </div>

                <Button
                    onClick={() => setOpenCreate(true)}
                >

                    <Plus className="mr-2 h-4 w-4"/>

                    New Ticket

                </Button>

            </div>

            <SupportStats
                tickets={tickets}
            />

            <TicketList
                tickets={tickets}
                loading={loading}
                salesmanOwn={true}
            />

            {/* Pagination */}

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

            <CreateTicketDialog
                open={openCreate}
                setOpen={setOpenCreate}
                onSuccess={fetchTickets}
                supportLevels={[
                    "ADMIN"
                ]}
            />

        </div>

    );

}