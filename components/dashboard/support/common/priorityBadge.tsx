"use client";

import { Badge } from "@/components/ui/badge";

interface Props {

    priority:
        | "LOW"
        | "MEDIUM"
        | "HIGH";

}

export default function PriorityBadge({
    priority,
}: Props) {

    switch (priority) {

        case "LOW":

            return (
                <Badge
                    variant="outline"
                >
                    Low
                </Badge>
            );

        case "MEDIUM":

            return (
                <Badge>
                    Medium
                </Badge>
            );

        default:

            return (
                <Badge
                    variant="destructive"
                >
                    High
                </Badge>
            );

    }

}