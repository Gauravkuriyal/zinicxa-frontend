"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { SupportMessage } from "@/types/support";

interface Props {

    message: SupportMessage;

    own: boolean;

}

export default function MessageBubble({
    message,
    own,
}: Props) {

    return (

        <div
            className={`flex gap-3 ${
                own
                    ? "justify-end"
                    : ""
            }`}
        >

            {!own && (
                <Avatar>
                    <AvatarFallback>{message.sender.role !== "SUPER_ADMIN"?message.sender.role[0]:"SA"}</AvatarFallback>
                </Avatar>
            )}

            <div
                className={`max-w-[70%] rounded-xl px-4 py-3 ${
                    message.sender.role=="SUPER_ADMIN"? "bg-red-800 text-white":own
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                }`}
            >

                <p className={message.sender.role=="SUPER_ADMIN"?"font-bold":""}>

                    {message.message}

                </p>

                <p className="mt-2 text-xs opacity-70">

                    {new Date(
                        message.createdAt
                    ).toLocaleString()}

                </p>

            </div>

        </div>

    );

}