"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";
import { useAuthApi } from "@/hooks/useAuthApi";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    Calendar,
    User,
    Paperclip,
} from "lucide-react";

import Conversation from "./conversation";
import ReplyBox from "./replyBox";
import TicketHistory from "./ticketHistory";

import { SupportTicket } from "@/types/support";
import { CustomDialog } from "@/components/utils/customDialog";

interface Props {
    ticketId: string | null;
    open: boolean;
    onClose: () => void;
    salesmanOwn?: boolean
}

export default function ticketDetailsModal({
    ticketId,
    open,
    onClose,
    salesmanOwn = false
}: Props) {
    const api = useAuthApi();

    const { user } = useAuth();

    const [loading, setLoading] =
        useState(false);

    const [ticket, setTicket] =
        useState<SupportTicket | null>(
            null
        );

    const fetchTicket = async () => {
        if (!ticketId) return;

        try {
            setLoading(true);
            let url = "";
            if(user?.role == "CUSTOMER") url = "/api/customer/support";
            if(user?.role == "RETAILER") url = "/api/retailer/support";
            if(user?.role == "SALESMAN") {
                if(salesmanOwn)url = "/api/salesman/support/my";
                else url = "/api/salesman/support";
            }
            if(user?.role == "ADMIN") url = "/api/admin/support";
            if(user?.role == "SUPER_ADMIN") url = "/api/superAdmin/support";
            if(url == "") return;
            const res = await api.get(
                url+`/${ticketId}`
            );

            setTicket(res.data.ticket);
        } catch {
            toast.error(
                "Unable to load ticket."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            fetchTicket();
        }
    }, [ticketId, open]);

    const closeTicket = async () => {
        if (!ticket) return;

        try {
            let url = "";
            if(user?.role == "CUSTOMER") url = "/api/customer/support";
            if(user?.role == "RETAILER") url = "/api/retailer/support";
            if(user?.role == "SALESMAN") {
                if(salesmanOwn)url = "/api/salesman/support/my";
                else url = "/api/salesman/support";
            }
            if(user?.role == "ADMIN") url = "/api/admin/support";
            if(user?.role == "SUPER_ADMIN") url = "/api/superAdmin/support";
            if(url == "") return;

            await api.patch(
                url + `/${ticket._id}/close`
            );

            toast.success(
                "Ticket closed."
            );

            fetchTicket();
        } catch {
            toast.error(
                "Unable to close ticket."
            );
        }
    };
    
    const resolveTicket = async () => {
        if (!ticket) return;

        try {
            let url = "";
            if(user?.role == "SALESMAN") {
                if(!salesmanOwn) url = "/api/salesman/support";
            }
            if(user?.role == "ADMIN") url = "/api/admin/support";
            if(user?.role == "SUPER_ADMIN") url = "/api/superAdmin/support";
            if(url == "") return;

            await api.patch(
                url + `/${ticket._id}/resolve`
            );

            toast.success(
                "Ticket closed."
            );

            fetchTicket();
        } catch {
            toast.error(
                "Unable to close ticket."
            );
        }
    };

    return (
        <CustomDialog
            open={open}
            onOpenChange={onClose}
        >
            <div className="w-full overflow-y-auto">

                {loading || !ticket ? (
                    <div className="py-10 text-center">

                        Loading...

                    </div>
                ) : (
                    <div className="space-y-8">

                        <div>

                            <p>

                                {ticket.ticketNumber}

                            </p>

                        </div>

                        {/* Header */}

                        <div className="space-y-3">

                            <div className="flex flex-wrap gap-2">

                                <Badge>

                                    {ticket.status}

                                </Badge>

                                <Badge variant="secondary">

                                    {ticket.priority}

                                </Badge>

                                <Badge variant="outline">

                                    {ticket.currentHandler}

                                </Badge>

                            </div>

                            <h2 className="text-2xl font-bold">

                                {ticket.subject}

                            </h2>

                            <p className="text-muted-foreground leading-7">

                                {ticket.description}

                            </p>

                        </div>

                        {/* Meta */}

                        <div className="grid md:grid-cols-2 gap-4 rounded-xl border p-5">

                            <div className="flex items-center gap-3">

                                <Calendar size={18}/>

                                <span>

                                    {new Date(
                                        ticket.createdAt
                                    ).toLocaleString()}

                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                <User size={18}/>

                                <span>

                                    {ticket.currentHandler}

                                </span>

                            </div>

                        </div>

                        {/* Attachments */}

                        {ticket.attachments.length > 0 && (

                            <div className="space-y-3">

                                <h3 className="font-semibold">

                                    Attachments

                                </h3>

                                <div className="grid gap-2">

                                    {ticket.attachments.map(
                                        (
                                            file,
                                            index
                                        ) => (

                                            <a
                                                key={index}
                                                href={file}
                                                target="_blank"
                                                className="flex items-center gap-2 hover:underline text-primary"
                                            >

                                                <Paperclip size={16}/>

                                                Attachment {index + 1}

                                            </a>

                                        )
                                    )}

                                </div>

                            </div>

                        )}

                        {/* Conversation */}

                        <div className="space-y-4">

                            <h3 className="text-lg font-semibold">

                                Conversation

                            </h3>

                            <Conversation
                                messages={
                                    ticket.messages
                                }
                                myId={
                                    user?._id ?? ""
                                }
                            />

                        </div>

                        {/* Reply */}

                        {ticket.status !== "CLOSED" && (

                            <ReplyBox
                                ticketId={ticket._id}
                                onSuccess={
                                    fetchTicket
                                }
                                salesmanOwn={salesmanOwn}
                            />

                        )}

                        {/* Timeline */}

                        <TicketHistory
                            history={ticket.history}
                        />

                        {/* Footer */}

                        {(ticket.status !== "CLOSED" && ticket.status !== "RESOLVED" && user?.role !=="SALESMAN") ||(ticket.status !== "CLOSED" && ticket.status !== "RESOLVED" && user?.role =="SALESMAN" && salesmanOwn == true) ? (

                            <div className="flex justify-end border-t pt-6">

                                <Button
                                    variant="destructive"
                                    onClick={closeTicket}
                                >

                                    Close Ticket

                                </Button>

                            </div>

                        ):null}

                        {(ticket.status !== "CLOSED" && ticket.status !== "RESOLVED" && (user?.role == "ADMIN" || user?.role == "SUPER_ADMIN" || (user?.role == "SALESMAN" && salesmanOwn == false)))?
                            <div className="flex justify-end border-t pt-6">

                                <Button
                                    onClick={resolveTicket}
                                >

                                    Resolve Ticket

                                </Button>

                            </div>
                            
                    :null}

                    </div>
                )}

            </div>
        </CustomDialog>
    );
}