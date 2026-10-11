"use client";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import {
    Pencil,
    Trash2,
} from "lucide-react";

import { Address } from "@/types/address";

interface Props {

    address: Address;

    onEdit: () => void;

    onDelete: () => void;

}

export default function AddressItem({
    address,
    onEdit,
    onDelete,
}: Props) {

    return (
        <Card>

            <CardContent className="p-5">

                <div className="flex justify-between">

                    <div>

                        <div className="flex items-center gap-2">

                            <h3 className="font-semibold text-lg">
                                {address.fullName}
                            </h3>

                            {address.isDefault && (
                                <Badge>
                                    Default
                                </Badge>
                            )}

                        </div>

                        <p className="mt-2">
                            {address.addressLine1},{" "}
                            {address.addressLine2},{" "}
                            {address.city},{" "}
                            {address.state},{" "}
                            {address.pincode}
                        </p>
{/* 
                        <p>
                            {address.addressLine2}
                        </p> */}

                        {/* <p>
                            {address.city},{" "}
                            {address.state}
                        </p>

                        <p>
                            {address.pincode}
                        </p> */}

                        <p className="mt-1">
                            <b>Mobile:</b> {address.mobile}
                        </p>

                    </div>

                    <div className="space-x-2">

                        <Button
                            size="icon"
                            variant="outline"
                            onClick={onEdit}
                        >
                            <Pencil size={16}/>
                        </Button>

                        <Button
                            size="icon"
                            variant="destructive"
                            onClick={onDelete}
                        >
                            <Trash2 size={16}/>
                        </Button>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}