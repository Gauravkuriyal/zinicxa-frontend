"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useAuthApi } from "@/hooks/useAuthApi";

import AddressItem from "./addressItem";
import AddressFormDialog from "./addressFormDialog";

import { Address } from "@/types/address";
import { useAuth } from "@/context/AuthContext";

export default function Addresses() {

    const api = useAuthApi();
    const {user} = useAuth();

    const [addresses, setAddresses] =
        useState<Address[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [open, setOpen] =
        useState(false);

    const [editing, setEditing] =
        useState<Address | null>(null);

    const fetchAddresses = async () => {

        try {
            let url = "";
            if(user?.role=="CUSTOMER") url = "/api/customer/address";
            if(user?.role=="RETAILER") url = "/api/retailer/profile/address";
            if(url == "") return;
            const res = await api.get(url);

            setAddresses(
                res.data.addresses
            );

        } catch {

            toast.error(
                "Failed to load addresses."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        if(!user) return;
        fetchAddresses();
    }, [user]);

    const deleteAddress = async (
        id: string
    ) => {

        try {
            let url = "";
            if(user?.role=="CUSTOMER") url = "/api/customer/address/";
            if(user?.role=="RETAILER") url = "/api/retailer/profile/address/";
            if(url == "") return;
            await api.delete(url+`${id}`);

            toast.success(
                "Address deleted."
            );

            fetchAddresses();

        } catch {

            toast.error(
                "Unable to delete address."
            );

        }

    };

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <h2 className="text-xl font-semibold">
                    Saved Addresses
                </h2>

                <Button
                    onClick={() => {

                        setEditing(null);

                        setOpen(true);

                    }}
                >
                    <Plus className="mr-2 h-4 w-4"/>

                    Add Address

                </Button>

            </div>

            <div className="grid gap-5">

                {addresses.length<=0?
                <div className="italic p-5 border rounded-xl shadow text-center text-muted-foreground">
                    <p>No saved address. Please add one</p>
                </div>
                :
                addresses.map((address) => (

                    <AddressItem
                        key={address._id}
                        address={address}
                        onEdit={() => {

                            setEditing(address);

                            setOpen(true);

                        }}
                        onDelete={() =>
                            deleteAddress(
                                address._id
                            )
                        }
                    />

                ))}


            </div>

            <AddressFormDialog
                open={open}
                setOpen={setOpen}
                address={editing}
                onSuccess={
                    fetchAddresses
                }
            />

        </div>
    );
}