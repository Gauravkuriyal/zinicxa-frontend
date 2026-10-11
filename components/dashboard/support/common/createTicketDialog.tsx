"use client";

import { useState } from "react";

import { toast } from "sonner";

import { useAuthApi } from "@/hooks/useAuthApi";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface Props {

    open: boolean;

    setOpen: (
        open: boolean
    ) => void;

    onSuccess: () => void;

    supportLevels: (
        | "SALESMAN"
        | "ADMIN"
        | "SUPER_ADMIN"
    )[];

}

export default function CreateTicketDialog({
    open,
    setOpen,
    onSuccess,
    supportLevels
}: Props) {

    const api = useAuthApi();
    const { user } = useAuth();

    const [loading, setLoading] =
        useState(false);

    const [subject, setSubject] =
        useState("");

    const [
        description,
        setDescription,
    ] = useState("");

    const [priority, setPriority] =
        useState("MEDIUM");

    const [
        supportLevel,
        setSupportLevel,
    ] = useState<"SALESMAN" | "ADMIN" | "SUPER_ADMIN">(supportLevels[0]);

    const submit = async () => {

        if (!subject.trim()) {
            toast.error("Subject is required.");
            return;
        }

        if (!description.trim()) {
            toast.error("Description is required.");
            return;
        }

        try {

            setLoading(true);


            if (user?.role == "RETAILER") {
                await api.post(
                    "/api/retailer/support",
                    {
                        subject,
                        description,
                        priority,
                        supportLevel,
                    }
                );
            }
            
            if (user?.role == "SALESMAN") {
                await api.post(
                    "/api/salesman/support",
                    {
                        subject,
                        description,
                        priority,
                        supportLevel,
                    }
                );
            }
            
            if (user?.role == "CUSTOMER") {
                await api.post(
                    "/api/customer/support",
                    {
                        subject,
                        description,
                        priority,
                        supportLevel,
                    }
                );
            }

            toast.success(
                "Ticket created successfully."
            );

            setSubject("");
            setDescription("");
            setPriority("MEDIUM");
            setSupportLevel(
                supportLevels[0]
            );

            setOpen(false);

            onSuccess();

        } catch {

            toast.error(
                "Unable to create ticket."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <Dialog
            open={open}
            onOpenChange={setOpen}
        >

            <DialogContent className="max-w-xl">

                <DialogHeader>

                    <DialogTitle>

                        Create Support Ticket

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div>

                        <Label className="mb-2">

                            Subject

                        </Label>

                        <Input
                            value={subject}
                            onChange={(e) =>
                                setSubject(
                                    e.target
                                        .value
                                )
                            }
                        />

                    </div>

                    <div>

                        <Label className="mb-2">

                            Description

                        </Label>

                        <Textarea
                            rows={6}
                            value={
                                description
                            }
                            onChange={(e) =>
                                setDescription(
                                    e.target
                                        .value
                                )
                            }
                        />

                    </div>

                    <div className="grid md:grid-cols-2 gap-4">

                        <div>

                            <Label className="mb-2">

                                Priority

                            </Label>

                            <Select
                                value={
                                    priority
                                }
                                onValueChange={
                                    setPriority
                                }
                            >

                                <SelectTrigger>

                                    <SelectValue />

                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="LOW">

                                        Low

                                    </SelectItem>

                                    <SelectItem value="MEDIUM">

                                        Medium

                                    </SelectItem>

                                    <SelectItem value="HIGH">

                                        High

                                    </SelectItem>

                                </SelectContent>

                            </Select>

                        </div>

                        <div>

                            <Label className="mb-2">

                                Send To

                            </Label>

                            <Select
                                value={
                                    supportLevel
                                }
                                onValueChange={(value) => setSupportLevel(value as "SALESMAN" | "ADMIN" | "SUPER_ADMIN")}
                            >

                                <SelectTrigger>

                                    <SelectValue />

                                </SelectTrigger>

                                <SelectContent>

                                    {supportLevels.map((level) => (

                                        <SelectItem
                                            key={level}
                                            value={level}
                                        >
                                            {level.replace("_", " ")}
                                        </SelectItem>

                                    ))}

                                </SelectContent>

                            </Select>

                        </div>

                    </div>

                </div>

                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() =>
                            setOpen(false)
                        }
                    >

                        Cancel

                    </Button>

                    <Button
                        disabled={loading}
                        onClick={submit}
                    >

                        Create Ticket

                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}