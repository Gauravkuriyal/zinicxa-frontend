"use client";

import HistoryItem from "../historyItem";

import { SupportHistory } from "@/types/support";

interface Props {

    history: SupportHistory[];

}

export default function TicketHistory({
    history,
}: Props) {

    return (

        <div className="space-y-4">

            <h3 className="font-semibold">

                Activity

            </h3>

            {history.map(
                (
                    item,
                    index
                ) => (

                    <HistoryItem
                        key={index}
                        item={item}
                    />

                )
            )}

        </div>

    );

}