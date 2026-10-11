"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { useAuthApi } from "@/hooks/useAuthApi";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";
import { Address } from "@/types/address";
import { useCart } from "@/context/CartContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronsUpDown, Plus } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import AddressFormDialog from "../account/addressFormDialog";
import { useAuth } from "@/context/AuthContext";

interface Props {
    open: boolean;

    setOpen: (
        open: boolean
    ) => void;
}

export default function PlaceOrderCard({
    open,
    setOpen
}: Props) {
    const api = useAuthApi();
    const { placeOrder } = useCart();

    const [newAddressDialogOpen, setNewAddressDialogOpen] = useState(false)

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<string>();
    const [selected, setSelected] = useState<Address>();
    const [openAddress, setOpenAddress] = useState(false);

    const [loading, setLoading] =
        useState(false);

    const fetchAddresses = async () => {
        try {
            const res = await api.get("/api/customer/address");
            setAddresses(res.data.addresses);
        } catch {
            toast.error("Failed to load addresses.");
        } finally {
            setLoading(false);
        }

    };


    useEffect(() => {
        fetchAddresses();
    }, []);



    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent className="w-[90vw] max-w-2xl">

                <DialogHeader>

                    <DialogTitle>

                        Place Order

                    </DialogTitle>

                </DialogHeader>



                <div className="w-full">

                    <div className="flex justify-between mb-3 items-center">
                        <Label className="mb-3">
                            Delivery Address
                        </Label> 
                        <Button
                            onClick={() => {
                                setNewAddressDialogOpen(true);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" />

                            Add Address

                        </Button>
                    </div>

                    <Popover open={openAddress} onOpenChange={setOpenAddress}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-full h-16 justify-between overflow-hidden px-3"
                            >
                                {selected ? (
                                    // <div className="flex flex-col items-start overflow-hidden text-left flex-1">
                                    <div className="flex flex-col flex-1 min-w-0 text-left">
                                        <span className="font-medium truncate">
                                            {selected.fullName} • {selected.mobile}
                                        </span>

                                        <span className="text-sm text-muted-foreground w-[300px] truncate">
                                            {selected.addressLine1}, {selected.addressLine2}, {selected.city},{" "}
                                            {selected.state} - {selected.pincode}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-muted-foreground">
                                        Select delivery address
                                    </span>
                                )}

                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[420px] p-0">
                            <Command>
                                <CommandList>
                                    <CommandEmpty>No addresses found.</CommandEmpty>

                                    <CommandGroup>
                                        {addresses.map((address) => (
                                            <CommandItem
                                                key={address._id}
                                                value={address._id}
                                                onSelect={() => {
                                                    setSelectedAddress(address._id);
                                                    setSelected(address);
                                                    setOpenAddress(false);
                                                }}
                                            >
                                                <div className="flex flex-col py-2">
                                                    <span className="font-medium">
                                                        {address.fullName} • {address.mobile}
                                                    </span>

                                                    <span className="text-sm text-muted-foreground">
                                                        {address.addressLine1}, {address.addressLine2}
                                                    </span>

                                                    <span className="text-sm text-muted-foreground">
                                                        {address.city}, {address.state} - {address.pincode}
                                                    </span>
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                </div>

                <AddressFormDialog
                    open={newAddressDialogOpen}
                    setOpen={setNewAddressDialogOpen}
                    address={null}
                    onSuccess={
                        fetchAddresses
                    }
                />

                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() =>
                            setOpen(
                                false
                            )
                        }
                    >
                        Cancel
                    </Button>

                    {selectedAddress ?
                        <Button
                            onClick={() => {
                                placeOrder(selectedAddress);
                            }}
                            disabled={
                                loading
                            }
                        >
                            {loading
                                ? "Placing Order..."
                                : "Place Order"}
                        </Button>
                        :
                        <Button
                            disabled
                        >
                            {loading
                                ? "Placing Order..."
                                : "Place Order"}
                        </Button>}

                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}