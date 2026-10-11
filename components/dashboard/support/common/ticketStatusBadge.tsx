"use client";

import { Badge } from "@/components/ui/badge";

interface Props {
    status:
        | "OPEN"
        | "RESOLVED"
        | "CLOSED";
}

export default function TicketStatusBadge({
    status,
}: Props) {

    switch (status) {

        case "OPEN":

            return (
                <Badge>

                    Open

                </Badge>
            );

        case "RESOLVED":

            return (
                <Badge
                    variant="secondary"
                >
                    Resolved
                </Badge>
            );

        default:

            return (
                <Badge
                    variant="destructive"
                >
                    Closed
                </Badge>
            );

    }

}