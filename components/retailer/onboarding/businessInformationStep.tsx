"use client";

import {
    Building2,
    Mail,
    Phone,
    User,
    FileText,
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useRetailerOnboarding } from "@/context/RetailerOnboardingContext";

export default function BusinessInformationStep() {
    const {
        businessInformation,
        setBusinessInformation,
    } = useRetailerOnboarding();

    const updateField = (
        field: string,
        value: boolean|string
    ) => {
        setBusinessInformation({
            ...businessInformation,
            [field]: value,
        });
    };

    return (
        <div className="space-y-8">

            {/* Heading */}

            <div>
                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Building2 className="h-5 w-5" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            Business Information
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Tell us about your business
                            and its primary contact.
                        </p>
                    </div>

                </div>
            </div>

            {/* Business Information */}

            <Card>

                <CardHeader>
                    <CardTitle>
                        Business Details
                    </CardTitle>

                    <CardDescription>
                        Enter the legal information
                        of your business.
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-6 md:grid-cols-2">

                    {/* Business Type */}

                    <div className="space-y-2">

                        <Label>
                            Business Type
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <Select
                            value={
                                businessInformation.businessType
                            }
                            onValueChange={(value) =>
                                updateField(
                                    "businessType",
                                    value
                                )
                            }
                        >

                            <SelectTrigger>
                                <SelectValue placeholder="Select business type" />
                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="PROPRIETORSHIP">
                                    Proprietorship
                                </SelectItem>

                                <SelectItem value="PARTNERSHIP">
                                    Partnership
                                </SelectItem>

                                <SelectItem value="PVT_LTD">
                                    Private Limited
                                </SelectItem>

                            </SelectContent>

                        </Select>

                    </div>

                    {/* Firm Name */}

                    <div className="space-y-2">

                        <Label>
                            Legal Firm Name
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <div className="relative">

                            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                className="pl-10"
                                placeholder="Enter legal firm name"
                                value={
                                    businessInformation.firmName
                                }
                                onChange={(e) =>
                                    updateField(
                                        "firmName",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    {/* Owner Name */}

                    <div className="space-y-2">

                        <Label>
                            Owner Name
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <div className="relative">

                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                className="pl-10"
                                placeholder="Enter owner's name"
                                value={
                                    businessInformation.ownerName
                                }
                                onChange={(e) =>
                                    updateField(
                                        "ownerName",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    {/* Mobile */}

                    <div className="space-y-2">

                        <Label>
                            Mobile Number
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <div className="relative">

                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                className="pl-10"
                                placeholder="Enter mobile number"
                                inputMode="tel"
                                value={
                                    businessInformation.mobile
                                }
                                onChange={(e) =>
                                    updateField(
                                        "mobile",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    {/* Email */}

                    <div className="space-y-2">

                        <Label>
                            Email Address
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <div className="relative">

                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                className="pl-10"
                                type="email"
                                placeholder="Enter business email"
                                value={
                                    businessInformation.email
                                }
                                onChange={(e) =>
                                    updateField(
                                        "email",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    {/* GSTIN */}

                    <div className="space-y-2">

                        <Label>
                            GSTIN
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <div className="relative">

                            <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                className="pl-10 uppercase"
                                placeholder="Enter GSTIN"
                                value={
                                    businessInformation.gstin
                                }
                                onChange={(e) =>
                                    updateField(
                                        "gstin",
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />

                        </div>

                    </div>

                    {/* PAN */}

                    <div className="space-y-2">

                        <Label>
                            PAN
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <div className="relative">

                            <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                className="pl-10 uppercase"
                                placeholder="Enter PAN"
                                value={
                                    businessInformation.pan
                                }
                                onChange={(e) =>
                                    updateField(
                                        "pan",
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />

                        </div>

                    </div>
                    
                    {/* Proposed Investment */}

                    <div className="space-y-2">

                        <Label>
                            Proposed Investment
                            {/* <span className="text-destructive"> */}
                                {/* {" "}* */}
                            {/* </span> */}
                        </Label>

                        <div className="relative">

                            <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                className="pl-10"
                                placeholder="Enter Proposed Investment"
                                value={
                                    businessInformation.proposedInvestment
                                }
                                onChange={(e) =>
                                    updateField(
                                        "proposedInvestment",
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />

                        </div>

                    </div>

                </CardContent>

            </Card>

            {/* GST */}

            {/* <Card>

                <CardHeader>
                    <CardTitle>
                        GST Information
                    </CardTitle>

                    <CardDescription>
                        Tell us whether GST is applicable
                        to your business.
                    </CardDescription>
                </CardHeader>

                <CardContent>

                    <div className="space-y-3">

                        <Label>
                            Is GST Applicable?
                            <span className="text-destructive">
                                {" "}*
                            </span>
                        </Label>

                        <div className="grid gap-3 sm:grid-cols-2">

                            <button
                                type="button"
                                onClick={() =>
                                    updateField(
                                        "gstApplicable",
                                        true
                                    )
                                }
                                className={`
                                    rounded-xl
                                    border
                                    p-4
                                    text-left
                                    transition
                                    ${
                                        businessInformation.gstApplicable === true
                                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                                            : "hover:bg-muted"
                                    }
                                `}
                            >

                                <p className="font-medium">
                                    Yes
                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    GST is applicable to
                                    my business.
                                </p>

                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    updateField(
                                        "gstApplicable",
                                        false
                                    )
                                }
                                className={`
                                    rounded-xl
                                    border
                                    p-4
                                    text-left
                                    transition
                                    ${
                                        businessInformation.gstApplicable === false
                                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                                            : "hover:bg-muted"
                                    }
                                `}
                            >

                                <p className="font-medium">
                                    No
                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    GST is not applicable
                                    to my business.
                                </p>

                            </button>

                        </div>

                    </div>

                </CardContent>

            </Card> */}

        </div>
    );
}