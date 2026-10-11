"use client";

import MessageBubble from "./messageBubble";

import { SupportMessage } from "@/types/support";

interface Props {

    messages: SupportMessage[];

    myId: string;

}

export default function Conversation({
    messages,
    myId,
}: Props) {
    console.log(messages)
    return (

        <div className="space-y-4">
            {/* sender: {messages[0].sender}
            myId: {myId} */}
            {messages.map(
                (message, index) => (

                    <MessageBubble
                        key={index}
                        message={message}
                        own={
                            message.sender._id ===
                            myId
                        }
                    />

                )
            )}

        </div>

    );

}