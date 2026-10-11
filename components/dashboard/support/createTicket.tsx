"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

export default function CreateTicket() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Create New Ticket
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                <Input
                    placeholder="Ticket Subject"
                />

                <Input
                    placeholder="Order ID (Optional)"
                />

                <Textarea
                    placeholder="Describe your issue..."
                    rows={5}
                />

                <Button>
                    Submit Ticket
                </Button>

            </CardContent>

        </Card>
    );
}