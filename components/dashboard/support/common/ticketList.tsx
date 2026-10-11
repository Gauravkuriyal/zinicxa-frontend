"use client";

import { useState } from "react";

import EmptyTickets from "./emptyTickets";
import TicketCard from "./ticketCard";
import TicketDetailsModal from "./ticketDetailsModal";

import { SupportTicket } from "@/types/support";

interface Props {

    tickets: SupportTicket[];

    loading: boolean;
    salesmanOwn?: boolean
}

export default function TicketList({
    tickets,
    loading,
    salesmanOwn = false
}: Props) {

    const [selectedTicket,
        setSelectedTicket] =
        useState<SupportTicket | null>(
            null
        );

    if (loading) {

        return (
            <p>

                Loading...

            </p>
        );

    }

    if (!tickets.length) {

        return (
            <EmptyTickets/>
        );

    }

    return (

        <>

            <div className="space-y-4">

                {tickets.map((ticket) => (

                    <TicketCard
                        key={ticket._id}
                        ticket={ticket}
                        onOpen={() =>
                            setSelectedTicket(
                                ticket
                            )
                        }
                    />

                ))}

            </div>

            <TicketDetailsModal
                ticketId={
                    selectedTicket?._id  || ""
                }
                open={
                    !!selectedTicket
                }
                onClose={() =>
                    setSelectedTicket(
                        null
                    )
                }
                salesmanOwn={salesmanOwn}
            />

        </>

    );

}