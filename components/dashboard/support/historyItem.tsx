"use client";

import { Badge } from "@/components/ui/badge";

import { SupportHistory } from "@/types/support";

interface Props {

    item: SupportHistory;

}

export default function HistoryItem({
    item,
}: Props) {

    return (

        <div className="border-l-2 pl-4 pb-5">

            <Badge>

                {item.action}

            </Badge>

            <p className="mt-2 text-sm">

                {item.remarks ||
                    "No remarks"}

            </p>

            <p className="text-xs text-muted-foreground mt-1">

                {new Date(
                    item.createdAt
                ).toLocaleString()}

            </p>

        </div>

    );

}