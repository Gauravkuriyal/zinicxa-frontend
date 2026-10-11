"use client";

import { useEffect, useState } from "react";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronsUpDown, Plus } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { useRetailCart } from "@/context/RetailCartContext";
import { useAuth } from "@/context/AuthContext";
import AddressFormDialog from "../account/addressFormDialog";
import { User } from "@/types/user";
import toast from "react-hot-toast";

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
    const { user } = useAuth();
    const { placeOrder,placeOrderSalesman,loading:isRetailCartLoading  } = useRetailCart();

    const [newAddressDialogOpen, setNewAddressDialogOpen] = useState(false)
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<string>();
    const [selected, setSelected] = useState<Address>();
    const [openAddress, setOpenAddress] = useState(false);

    const [retailers, setRetailers] = useState<any>([]);
    const [selectedRetailer, setSelectedRetailer] = useState<string>();
    const [selectedRetailerData, setSelectedRetailerData] = useState<User>();
    const [openRetailers, setOpenRetailers] = useState(false);

    const [salesmanAddress, setSalesmanAddress] = useState<{
        fullName: string,
        mobile: string,
        addressLine1: string,
        addressLine2: string,
        city: string,
        state: string,
        pincode: string,
        country: string
    }>({
        fullName: "",
        mobile: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India"
    })

    const [loading, setLoading] =
        useState(false);

    const fetchAddresses = async () => {
        try {
            let url = "";
            if (user?.role == "CUSTOMER") url = "/api/customer/address";
            // if (user?.role=="SALESMAN") url = "/api/salesman/address";
            if (user?.role == "RETAILER") url = "/api/retailer/profile/address";

            if (url == "") return;
            const res = await api.get(url);
            setAddresses(res.data.addresses);
        } catch {
            toast.error("Failed to load addresses.");
        } finally {
            setLoading(false);
        }

    };

    const fetchRetailers = async () => {
        try {
            let url = "";
            if (user?.role == "SALESMAN") url = "/api/salesman/retailers/assigned?limit=-1";
            if (url == "") return;
            const res = await api.get(url);
            setRetailers(res.data.retailers);
        } catch {
            toast.error("Failed to load addresses.");
        } finally {
            setLoading(false);
        }

    };

    const handleSalesmanAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSalesmanAddress({ ...salesmanAddress, [name]: value })
    }


    useEffect(() => {
        if (!user) {
            return
        }
        if (user.role == "RETAILER") fetchAddresses();
        else if (user.role == "SALESMAN") fetchRetailers();
    }, [user]);

    const handlePlaceOrderSalesman = ()=>{
        if(isRetailCartLoading) {
            toast.error("Loading ")
            return;
        }
        else if(!selectedRetailer) {
            toast.error("Please select a retailer first");
            return;
        }
        else if(salesmanAddress.fullName.trim() == "") {
            toast.error(`Please enter full name first`);
            return;
        }
        else if(salesmanAddress.mobile.trim() == "") {
            toast.error(`Please enter mobile first`);
            return;
        }
        else if(salesmanAddress.addressLine1.trim() == "") {
            toast.error(`Please enter address line 1 first`);
            return;
        }
        else if(salesmanAddress.addressLine2.trim() == "") {
            toast.error(`Please enter address line 2 first`);
            return;
        }
        else if(salesmanAddress.city.trim() == "") {
            toast.error(`Please enter city first`);
            return;
        }
        else if(salesmanAddress.state.trim() == "") {
            toast.error(`Please enter state first`);
            return;
        }
        else if(salesmanAddress.pincode.trim() == "") {
            toast.error(`Please enter pincode first`);
            return;
        }
        else if(salesmanAddress.country.trim() == "") {
            toast.error(`Please enter country first`);
            return;
        }
        console.log("djjsd");
        placeOrderSalesman(salesmanAddress,selectedRetailer);
    }


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
                        <Label >
                            Delivery Address
                        </Label>
                        {user?.role == "RETAILER" ? <Button
                            onClick={() => {
                                setNewAddressDialogOpen(true);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" />

                            Add Address

                        </Button> : null}
                    </div>

                    {user?.role == "RETAILER" ? <Popover open={openAddress} onOpenChange={setOpenAddress}>
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
                    </Popover> :
                        user?.role == "SALESMAN" ? <div className="space-y-4">
                            <div className="space-y-2">
                                {/* <Label htmlFor="fullName">Full Name</Label> */}
                                <Input id="fullName" name="fullName" value={salesmanAddress.fullName} onChange={handleSalesmanAddressChange} placeholder="Reciever's name" />
                            </div>

                            <div className="space-y-2">
                                {/* <Label htmlFor="mobile">Mobile</Label> */}
                                <Input id="mobile" name="mobile" value={salesmanAddress.mobile} onChange={handleSalesmanAddressChange} type="tel" placeholder="Mobile number" />
                            </div>

                            <div className="space-y-2">
                                {/* <Label htmlFor="addressLine1">Address Line 1</Label> */}
                                <Input id="addressLine1" name="addressLine1" value={salesmanAddress.addressLine1} onChange={handleSalesmanAddressChange} placeholder="Address line 1" />
                            </div>

                            <div className="space-y-2">
                                {/* <Label htmlFor="addressLine2">Address Line 2</Label> */}
                                <Input id="addressLine2" name="addressLine2" value={salesmanAddress.addressLine2} onChange={handleSalesmanAddressChange} placeholder="Address line 2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    {/* <Label htmlFor="city">City</Label> */}
                                    <Input id="city" name="city" value={salesmanAddress.city} onChange={handleSalesmanAddressChange} placeholder="City" />
                                </div>
                                <div className="space-y-2">
                                    {/* <Label htmlFor="state">State</Label> */}
                                    <Input id="state" name="state" value={salesmanAddress.state} onChange={handleSalesmanAddressChange} placeholder="State" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    {/* <Label htmlFor="pincode">Pincode / ZIP</Label> */}
                                    <Input id="pincode" name="pincode" value={salesmanAddress.pincode} onChange={handleSalesmanAddressChange} placeholder="Pincode" />
                                </div>
                                <div className="space-y-2">
                                    {/* <Label htmlFor="country">Country</Label> */}
                                    <Input id="country" name="country" value={salesmanAddress.country} onChange={handleSalesmanAddressChange} placeholder="Country" />
                                </div>
                            </div>

                            <Popover open={openRetailers} onOpenChange={setOpenRetailers}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className="w-full h-16 justify-between overflow-hidden px-3"
                                    >
                                        {selectedRetailerData ? (
                                            // <div className="flex flex-col items-start overflow-hidden text-left flex-1">
                                            <div className="flex flex-col py-2">
                                                <span className="font-medium">
                                                    {selectedRetailerData.name} • {selectedRetailerData.email}
                                                </span>

                                                <span className="text-sm text-muted-foreground text-left">
                                                    {selectedRetailerData.mobile}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">
                                                Select Retailer
                                            </span>
                                        )}

                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[420px] p-0">
                                    <Command>
                                        <CommandList>
                                            <CommandEmpty>No retailers found.</CommandEmpty>

                                            <CommandGroup>
                                                {retailers.map(({retailer}:{retailer:User}) => (
                                                    <CommandItem
                                                        key={retailer._id}
                                                        value={retailer._id}
                                                        onSelect={() => {
                                                            setSelectedRetailer(retailer._id);
                                                            setSelectedRetailerData(retailer);
                                                            setOpenRetailers(false);
                                                        }}
                                                    >
                                                        <div className="flex flex-col py-2">
                                                            <span className="font-medium">
                                                                {retailer.name} • {retailer.email}
                                                            </span>

                                                            <span className="text-sm text-muted-foreground">
                                                                {retailer.mobile}
                                                            </span>
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                        </div> : null}

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

                    {user?.role=="RETAILER"?selectedAddress ?
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
                        </Button>:null}
                    
                    {user?.role == "SALESMAN"? 
                        <Button onClick={handlePlaceOrderSalesman}>
                            Place Order
                        </Button>
                    :null}

                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}