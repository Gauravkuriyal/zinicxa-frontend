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
import { useAuth } from "@/context/AuthContext";

interface Props {
    open: boolean;

    setOpen: (
        open: boolean
    ) => void;

    address?: Address | null;

    onSuccess: () => void;
}

export default function AddressFormDialog({
    open,
    setOpen,
    address,
    onSuccess,
}: Props) {
    const api = useAuthApi();
    const {user} = useAuth();

    const [loading, setLoading] =
        useState(false);

    const [fullName, setFullName] =
        useState("");

    const [mobile, setMobile] =
        useState("");

    const [
        addressLine1,
        setAddressLine1,
    ] = useState("");

    const [
        addressLine2,
        setAddressLine2,
    ] = useState("");

    const [city, setCity] =
        useState("");

    const [state, setState] =
        useState("");

    const [pincode, setPincode] =
        useState("");

    const [country, setCountry] =
        useState("India");

    const [
        isDefault,
        setIsDefault,
    ] = useState(false);

    useEffect(() => {
        if (address) {
            setFullName(
                address.fullName
            );
            setMobile(
                address.mobile
            );
            setAddressLine1(
                address.addressLine1
            );
            setAddressLine2(
                address.addressLine2 ||
                ""
            );
            setCity(address.city);
            setState(address.state);
            setPincode(
                address.pincode
            );
            setCountry(
                address.country
            );
            setIsDefault(
                address.isDefault
            );
        } else {
            resetForm();
        }
    }, [address, open]);

    const resetForm = () => {
        setFullName("");
        setMobile("");
        setAddressLine1("");
        setAddressLine2("");
        setCity("");
        setState("");
        setPincode("");
        setCountry("India");
        setIsDefault(false);
    };

    const handleSubmit =
        async () => {
            if (
                !fullName ||
                !mobile ||
                !addressLine1 ||
                !city ||
                !state ||
                !pincode
            ) {
                toast.error(
                    "Please fill all required fields."
                );
                return;
            }

            try {
                setLoading(true);

                const payload = {
                    fullName,
                    mobile,
                    addressLine1,
                    addressLine2,
                    city,
                    state,
                    pincode,
                    country,
                    isDefault,
                };

                let url = "";
                if (user?.role == "CUSTOMER") url = "/api/customer/address/";
                if (user?.role == "RETAILER") url = "/api/retailer/profile/address/";
                if (url == "") return;

                if (address) {
                    await api.patch(url+`/${address._id}`,payload);

                    toast.success(
                        "Address updated successfully."
                    );
                } else {
                    await api.post(url,payload);

                    toast.success(
                        "Address added successfully."
                    );
                }

                setOpen(false);

                resetForm();

                onSuccess();
            } catch (error) {
                console.error(error);

                toast.error(
                    "Failed to save address."
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
            <DialogContent className="max-w-2xl">

                <DialogHeader>

                    <DialogTitle>

                        {address
                            ? "Edit Address"
                            : "Add Address"}

                    </DialogTitle>

                </DialogHeader>

                <div className="grid gap-5">

                    <div className="grid md:grid-cols-2 gap-4">

                        <div>

                            <Label className="mb-2">
                                Full Name
                            </Label>

                            <Input
                                value={
                                    fullName
                                }
                                onChange={(
                                    e
                                ) =>
                                    setFullName(
                                        e
                                            .target
                                            .value
                                    )
                                }
                            />

                        </div>

                        <div>

                            <Label className="mb-2">
                                Mobile Number
                            </Label>

                            <Input
                                value={
                                    mobile
                                }
                                onChange={(
                                    e
                                ) =>
                                    setMobile(
                                        e
                                            .target
                                            .value
                                    )
                                }
                            />

                        </div>

                    </div>

                    <div>

                        <Label className="mb-2">
                            Address Line
                            1
                        </Label>

                        <Input
                            value={
                                addressLine1
                            }
                            onChange={(
                                e
                            ) =>
                                setAddressLine1(
                                    e.target
                                        .value
                                )
                            }
                        />

                    </div>

                    <div>

                        <Label className="mb-2">
                            Address Line
                            2
                        </Label>

                        <Input
                            value={
                                addressLine2
                            }
                            onChange={(
                                e
                            ) =>
                                setAddressLine2(
                                    e.target
                                        .value
                                )
                            }
                        />

                    </div>

                    <div className="grid md:grid-cols-3 gap-4">

                        <div>

                            <Label className="mb-2">
                                City
                            </Label>

                            <Input
                                value={
                                    city
                                }
                                onChange={(
                                    e
                                ) =>
                                    setCity(
                                        e
                                            .target
                                            .value
                                    )
                                }
                            />

                        </div>

                        <div>

                            <Label className="mb-2">
                                State
                            </Label>

                            <Input
                                value={
                                    state
                                }
                                onChange={(
                                    e
                                ) =>
                                    setState(
                                        e
                                            .target
                                            .value
                                    )
                                }
                            />

                        </div>

                        <div>

                            <Label className="mb-2">
                                Pincode
                            </Label>

                            <Input
                                value={
                                    pincode
                                }
                                onChange={(
                                    e
                                ) =>
                                    setPincode(
                                        e
                                            .target
                                            .value
                                    )
                                }
                            />

                        </div>

                    </div>

                    <div>

                        <Label className="mb-2">
                            Country
                        </Label>

                        <Input
                            value={
                                country
                            }
                            onChange={(
                                e
                            ) =>
                                setCountry(
                                    e.target
                                        .value
                                )
                            }
                        />

                    </div>

                    <div className="flex items-center gap-3">

                        <Checkbox
                            checked={
                                isDefault
                            }
                            onCheckedChange={(
                                checked
                            ) =>
                                setIsDefault(
                                    checked ===
                                    true
                                )
                            }
                        />

                        <Label className="">
                            Set as
                            Default
                            Address
                        </Label>

                    </div>

                </div>

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

                    <Button
                        onClick={
                            handleSubmit
                        }
                        disabled={
                            loading
                        }
                    >
                        {loading
                            ? "Saving..."
                            : address
                                ? "Update Address"
                                : "Add Address"}
                    </Button>

                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}