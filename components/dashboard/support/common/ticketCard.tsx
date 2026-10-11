"use client";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
    ArrowRight,
} from "lucide-react";

import TicketStatusBadge from "./ticketStatusBadge";
import PriorityBadge from "./priorityBadge";

import { SupportTicket } from "@/types/support";

interface Props {

    ticket: SupportTicket;

    onOpen: () => void;

}

export default function TicketCard({
    ticket,
    onOpen,
}: Props) {

    return (

        <Card>

            <CardContent className="p-5">

                <div className="flex justify-between">

                    <div className="space-y-2">

                        <div className="flex gap-2 items-center">

                            <h3 className="font-semibold">

                                {ticket.ticketNumber}

                            </h3>

                            <TicketStatusBadge
                                status={
                                    ticket.status
                                }
                            />

                            <PriorityBadge
                                priority={
                                    ticket.priority
                                }
                            />

                        </div>

                        <h2 className="font-medium">

                            {ticket.subject}

                        </h2>

                        <p className="text-sm text-muted-foreground line-clamp-2">

                            {ticket.description}

                        </p>

                        <p className="text-xs text-muted-foreground">

                            Handler :

                            {" "}

                            {ticket.currentHandler}

                        </p>

                    </div>

                    <Button
                        variant="outline"
                        onClick={onOpen}
                    >

                        View

                        <ArrowRight className="ml-2 h-4 w-4"/>

                    </Button>

                </div>

            </CardContent>

        </Card>

    );

}