"use client";

import { useState } from "react";

import { toast } from "sonner";

import { useAuthApi } from "@/hooks/useAuthApi";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

interface Props {

    ticketId: string;

    onSuccess: () => void;

    salesmanOwn?: boolean

}

export default function ReplyBox({
    ticketId,
    onSuccess,
    salesmanOwn = false
}: Props) {

    const api = useAuthApi();
    const { user } = useAuth();

    const [message, setMessage] =
        useState("");

    const [
        attachments,
        setAttachments,
    ] = useState<File[]>([]);

    const [loading, setLoading] =
        useState(false);

    const sendReply = async () => {

        if (!message.trim()) {

            toast.error(
                "Please write a reply."
            );

            return;

        }

        try {

            setLoading(true);

            const form =
                new FormData();

            form.append(
                "message",
                message
            );

            if (attachments) {
                if (attachments.length>0) {
                    attachments.forEach(
                        (file) => {

                            form.append(
                                "attachments",
                                file
                            );

                        }
                    );
                }
            }

            let url = ""
            if(user?.role == "CUSTOMER") url = "/api/customer/support";
            if (user?.role == "RETAILER") url = "/api/retailer/support";
            if(user?.role == "SALESMAN") {
                if(salesmanOwn)url = "/api/salesman/support/my";
                else url = "/api/salesman/support";
            }
            if (user?.role == "ADMIN") url = "/api/admin/support";
            if (user?.role == "SUPER_ADMIN") url = "/api/superAdmin/support";
            if (url == "") return;
            await api.post(
                url + `/${ticketId}/reply`,
                form
            );

            toast.success(
                "Reply sent."
            );

            setMessage("");

            setAttachments([]);

            onSuccess();

        } catch {

            toast.error(
                "Unable to send reply."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="space-y-4 border-t pt-6">

            <Label>

                Reply

            </Label>

            <Textarea
                rows={5}
                value={message}
                onChange={(e) =>
                    setMessage(
                        e.target.value
                    )
                }
            />

            {/* <Input
                type="file"
                multiple
                onChange={(e) =>
                    setAttachments(
                        Array.from(
                            e.target
                                .files ??
                                []
                        )
                    )
                }
            /> */}

            <Button
                disabled={loading}
                onClick={sendReply}
            >

                Send Reply

            </Button>

        </div>

    );

}