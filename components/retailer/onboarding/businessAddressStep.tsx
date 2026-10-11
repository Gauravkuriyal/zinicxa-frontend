"use client";

import {
    MapPin,
    Home,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRetailerOnboarding } from "@/context/RetailerOnboardingContext";

export default function BusinessAddressStep() {

    const {
        businessAddress,
        setBusinessAddress,
    } = useRetailerOnboarding();

    const updateField = (
        field: string,
        value: string
    ) => {

        setBusinessAddress({
            ...businessAddress,
            [field]: value,
        });

    };

    return (
        <div className="space-y-8">

            {/* Heading */}

            <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                </div>

                <div>

                    <h2 className="text-2xl font-bold">
                        Business Address
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Provide the address of your
                        business or showroom.
                    </p>

                </div>

            </div>

            <Card>

                <CardHeader>

                    <CardTitle>
                        Business Address
                    </CardTitle>

                    <CardDescription>
                        This information will be used
                        for your retailer profile.
                    </CardDescription>

                </CardHeader>

                <CardContent className="grid gap-6">

                    {/* Address Line 1 */}

                    <div className="space-y-2">

                        <Label>
                            Address Line 1
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <div className="relative">

                            <Home className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                className="pl-10"
                                placeholder="House / shop number, street"
                                value={
                                    businessAddress.addressLine1
                                }
                                onChange={(e) =>
                                    updateField(
                                        "addressLine1",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    {/* Address Line 2 */}

                    <div className="space-y-2">

                        <Label>
                            Address Line 2
                        </Label>

                        <Input
                            placeholder="Area, landmark, locality"
                            value={
                                businessAddress.addressLine2
                            }
                            onChange={(e) =>
                                updateField(
                                    "addressLine2",
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* Town / City */}

                    <div className="space-y-2">

                        <Label>
                            Town / City
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <Input
                            placeholder="Enter town or city"
                            value={
                                businessAddress.townCity
                            }
                            onChange={(e) =>
                                updateField(
                                    "townCity",
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* District */}

                    <div className="space-y-2">

                        <Label>
                            District
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <Input
                            placeholder="Enter district"
                            value={
                                businessAddress.district
                            }
                            onChange={(e) =>
                                updateField(
                                    "district",
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* State + Pincode */}

                    <div className="grid gap-6 md:grid-cols-2">

                        <div className="space-y-2">

                            <Label>
                                State
                                <span className="text-destructive">
                                    {" "}*
                                </span>
                            </Label>

                            <Input
                                placeholder="Enter state"
                                value={
                                    businessAddress.state
                                }
                                onChange={(e) =>
                                    updateField(
                                        "state",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="space-y-2">

                            <Label>
                                Pincode
                                <span className="text-destructive">
                                    {" "}*
                                </span>
                            </Label>

                            <Input
                                placeholder="6-digit pincode"
                                inputMode="numeric"
                                maxLength={6}
                                value={
                                    businessAddress.pincode
                                }
                                onChange={(e) =>
                                    updateField(
                                        "pincode",
                                        e.target.value.replace(
                                            /\D/g,
                                            ""
                                        )
                                    )
                                }
                            />

                        </div>

                    </div>

                </CardContent>

            </Card>

        </div>
    );
}