"use client";

import { LifeBuoy } from "lucide-react";

export default function EmptyTickets() {

    return (

        <div className="rounded-xl border py-16 text-center">

            <LifeBuoy className="mx-auto h-12 w-12 text-muted-foreground"/>

            <h3 className="mt-4 text-lg font-semibold">

                No support tickets

            </h3>

            <p className="mt-2 text-muted-foreground">

                Create your first support ticket if you need assistance.

            </p>

        </div>

    );

}