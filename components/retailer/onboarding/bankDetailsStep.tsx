"use client";

import {
    Landmark,
    CreditCard,
    Building2,
    User,
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

export default function BankDetailsStep() {

    const {
        bankDetails,
        setBankDetails,
    } = useRetailerOnboarding();

    const updateField = (
        field: string,
        value: string
    ) => {

        setBankDetails({
            ...bankDetails,
            [field]: value,
        });

    };

    return (
        <div className="space-y-8">

            {/* Heading */}

            <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Landmark className="h-5 w-5" />
                </div>

                <div>

                    <h2 className="text-2xl font-bold">
                        Bank Details
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Provide the bank account details
                        associated with your business.
                    </p>

                </div>

            </div>

            {/* Information */}

            <Card>

                <CardHeader>

                    <CardTitle>
                        Business Bank Account
                    </CardTitle>

                    <CardDescription>
                        Please make sure the bank details
                        are accurate.
                    </CardDescription>

                </CardHeader>

                <CardContent className="grid gap-6">

                    {/* Bank Name */}

                    <div className="space-y-2">

                        <Label>
                            Bank Name
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <div className="relative">

                            <Landmark className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                className="pl-10"
                                placeholder="e.g. State Bank of India"
                                value={
                                    bankDetails.bankName
                                }
                                onChange={(e) =>
                                    updateField(
                                        "bankName",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    {/* Account Holder Name */}

                    <div className="space-y-2">

                        <Label>
                            Account Holder Name
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <div className="relative">

                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                className="pl-10"
                                placeholder="Enter account holder name"
                                value={
                                    bankDetails.accountHolderName
                                }
                                onChange={(e) =>
                                    updateField(
                                        "accountHolderName",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    {/* Account Number */}

                    <div className="space-y-2">

                        <Label>
                            Account Number
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <div className="relative">

                            <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                className="pl-10"
                                placeholder="Enter account number"
                                inputMode="numeric"
                                value={
                                    bankDetails.accountNumber
                                }
                                onChange={(e) =>
                                    updateField(
                                        "accountNumber",
                                        e.target.value.replace(
                                            /\D/g,
                                            ""
                                        )
                                    )
                                }
                            />

                        </div>

                    </div>

                    {/* IFSC */}

                    <div className="space-y-2">

                        <Label>
                            IFSC Code
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <Input
                            placeholder="e.g. SBIN0001234"
                            className="uppercase"
                            value={
                                bankDetails.ifsc
                            }
                            onChange={(e) =>
                                updateField(
                                    "ifsc",
                                    e.target.value.toUpperCase()
                                )
                            }
                        />

                    </div>

                    {/* Branch */}

                    <div className="space-y-2">

                        <Label>
                            Branch Name
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <div className="relative">

                            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                className="pl-10"
                                placeholder="Enter branch name"
                                value={
                                    bankDetails.branch
                                }
                                onChange={(e) =>
                                    updateField(
                                        "branch",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                </CardContent>

            </Card>

            {/* Security note */}

            <div className="rounded-xl border bg-muted/40 p-4">

                <p className="text-sm font-medium">
                    Keep your banking information accurate
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                    These details may be used for
                    business verification and
                    payment-related processing.
                </p>

            </div>

        </div>
    );
}