"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
    Building2,
    User,
    MapPin,
    Landmark,
    FileCheck,
    BriefcaseBusiness,
    Globe2,
    ShieldCheck,
} from "lucide-react";

import {
    useRetailerOnboarding,
} from "@/context/RetailerOnboardingContext";

function ReviewRow({
    label,
    value,
}: {
    label: string;
    value?: string | number | null;
}) {
    return (
        <div className="flex flex-col gap-1">

            <span className="text-xs text-muted-foreground">
                {label}
            </span>

            <span className="font-medium break-words">
                {value || "Not provided"}
            </span>

        </div>
    );
}

function SectionHeader({
    icon: Icon,
    title,
}: {
    icon: React.ElementType;
    title: string;
}) {
    return (
        <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
            </div>

            <h3 className="font-semibold">
                {title}
            </h3>

        </div>
    );
}

export default function ReviewStep() {

    const {
        formData,
        businessAddress,
        bankDetails,

        territory,
        properties,
        businessPersons,
        sisterConcerns,
        authorizedSignatories,

        declarationAccepted,
        signedBy,
        declarationDate,
        declarationPlace,
    } = useRetailerOnboarding();

    const {
        businessType,
        firmName,
        ownerName,
        mobile,
        email,
        gstin,
        pan,
        gstApplicable,
        proposedInvestment,
        insurance } = formData

    return (
        <div className="space-y-6">

            {/* Header */}

            <div>

                <h2 className="text-2xl font-bold">
                    Review Your Application
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Please review the information you have provided
                    before submitting your retailer application.
                </p>

            </div>

            {/* Business Information */}

            <Card>

                <CardHeader>

                    <SectionHeader
                        icon={Building2}
                        title="Business Information"
                    />

                </CardHeader>

                <CardContent>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        <ReviewRow
                            label="Business Type"
                            value={businessType}
                        />

                        <ReviewRow
                            label="Firm Name"
                            value={firmName}
                        />

                        <ReviewRow
                            label="Owner Name"
                            value={ownerName}
                        />

                        <ReviewRow
                            label="Mobile"
                            value={mobile}
                        />

                        <ReviewRow
                            label="Email"
                            value={email}
                        />

                        <ReviewRow
                            label="GSTIN"
                            value={gstin}
                        />

                        <ReviewRow
                            label="PAN"
                            value={pan}
                        />

                        <ReviewRow
                            label="GST Applicable"
                            value={
                                gstApplicable === true
                                    ? "Yes"
                                    : "No"
                            }
                        />

                        <ReviewRow
                            label="Proposed Investment"
                            value={
                                proposedInvestment
                                    ? `₹${proposedInvestment}`
                                    : undefined
                            }
                        />

                    </div>

                </CardContent>

            </Card>

            {/* Business Address */}

            <Card>

                <CardHeader>

                    <SectionHeader
                        icon={MapPin}
                        title="Business Address"
                    />

                </CardHeader>

                <CardContent>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        <ReviewRow
                            label="Address Line 1"
                            value={
                                businessAddress?.addressLine1
                            }
                        />

                        <ReviewRow
                            label="Address Line 2"
                            value={
                                businessAddress?.addressLine2
                            }
                        />

                        <ReviewRow
                            label="Town / City"
                            value={
                                businessAddress?.townCity
                            }
                        />

                        <ReviewRow
                            label="District"
                            value={
                                businessAddress?.district
                            }
                        />

                        <ReviewRow
                            label="State"
                            value={
                                businessAddress?.state
                            }
                        />

                        <ReviewRow
                            label="Pincode"
                            value={
                                businessAddress?.pincode
                            }
                        />

                    </div>

                </CardContent>

            </Card>

            {/* Bank Details */}

            <Card>

                <CardHeader>

                    <SectionHeader
                        icon={Landmark}
                        title="Bank Details"
                    />

                </CardHeader>

                <CardContent>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        <ReviewRow
                            label="Bank Name"
                            value={
                                bankDetails?.bankName
                            }
                        />

                        <ReviewRow
                            label="Account Number"
                            value={
                                bankDetails?.accountNumber
                            }
                        />

                        <ReviewRow
                            label="IFSC"
                            value={
                                bankDetails?.ifsc
                            }
                        />

                        <ReviewRow
                            label="Branch"
                            value={
                                bankDetails?.branchName
                            }
                        />

                    </div>

                </CardContent>

            </Card>

            {/* Territory */}

            <Card>

                <CardHeader>

                    <SectionHeader
                        icon={Globe2}
                        title="Territory"
                    />

                </CardHeader>

                <CardContent>

                    {territory &&
                        Object.keys(territory).length > 0 ? (

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {Object.entries(
                                territory
                            ).map(([key, value]) => (

                                <ReviewRow
                                    key={key}
                                    label={formatLabel(key)}
                                    value={
                                        typeof value ===
                                            "object"
                                            ? JSON.stringify(
                                                value
                                            )
                                            : String(value)
                                    }
                                />

                            ))}

                        </div>

                    ) : (

                        <p className="text-sm text-muted-foreground">
                            No territory information provided.
                        </p>

                    )}

                </CardContent>

            </Card>

            {/* Insurance */}

            <Card>

                <CardHeader>

                    <SectionHeader
                        icon={ShieldCheck}
                        title="Insurance Details"
                    />

                </CardHeader>

                <CardContent>

                    {insurance ? (

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        <ReviewRow
                            label="Insurance Company Name"
                            value={
                                insurance?.companyName
                            }
                        />

                        <ReviewRow
                            label="Insurance Company Address"
                            value={
                                insurance?.companyAddress
                            }
                        />

                        <ReviewRow
                            label="Phone"
                            value={
                                insurance?.phone
                            }
                        />

                        <ReviewRow
                            label="Contact Persion Name"
                            value={
                                insurance?.contactPerson
                            }
                        />
                        <ReviewRow
                            label="Risk Covered"
                            value={
                                insurance?.riskCovered
                            }
                        />
                        <ReviewRow
                            label="Risk Covered Value"
                            value={
                                insurance?.riskCoveredValue
                            }
                        />

                    </div>

                    ) : (

                        <p className="text-sm text-muted-foreground">
                            Insurance details not added.
                        </p>

                    )}

                </CardContent>

            </Card>

            {/* Properties */}

            <Card>

                <CardHeader>

                    <SectionHeader
                        icon={BriefcaseBusiness}
                        title="Properties"
                    />

                </CardHeader>

                <CardContent>

                    {properties?.length ? (

                        <div className="space-y-4">

                            {properties.map(
                                (
                                    property,
                                    index
                                ) => (

                                    <div
                                        key={index}
                                        className="rounded-lg border p-4"
                                    >

                                        <div className="mb-4 flex items-center justify-between">

                                            <h4 className="font-medium">
                                                Property{" "}
                                                {index + 1}
                                            </h4>

                                        </div>

                                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                                            {Object.entries(
                                                property
                                            ).map(
                                                (
                                                    [
                                                        key,
                                                        value,
                                                    ]
                                                ) => (

                                                    <ReviewRow
                                                        key={key}
                                                        label={formatLabel(
                                                            key
                                                        )}
                                                        value={
                                                            typeof value ===
                                                                "object"
                                                                ? JSON.stringify(
                                                                    value
                                                                )
                                                                : String(
                                                                    value
                                                                )
                                                        }
                                                    />

                                                )
                                            )}

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    ) : (

                        <p className="text-sm text-muted-foreground">
                            No properties added.
                        </p>

                    )}

                </CardContent>

            </Card>

            {/* Business Persons */}

            <Card>

                <CardHeader>

                    <SectionHeader
                        icon={User}
                        title="Business Persons"
                    />

                </CardHeader>

                <CardContent>

                    {businessPersons?.length ? (

                        <div className="space-y-4">

                            {businessPersons.map(
                                (
                                    person,
                                    index
                                ) => (

                                    <div
                                        key={index}
                                        className="rounded-lg border p-4"
                                    >

                                        <h4 className="mb-4 font-medium">
                                            Business Person{" "}
                                            {index + 1}
                                        </h4>

                                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                                            {Object.entries(
                                                person
                                            ).map(
                                                (
                                                    [
                                                        key,
                                                        value,
                                                    ]
                                                ) => (

                                                    <ReviewRow
                                                        key={key}
                                                        label={formatLabel(
                                                            key
                                                        )}
                                                        value={
                                                            typeof value ===
                                                                "object"
                                                                ? JSON.stringify(
                                                                    value
                                                                )
                                                                : String(
                                                                    value
                                                                )
                                                        }
                                                    />

                                                )
                                            )}

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    ) : (

                        <p className="text-sm text-muted-foreground">
                            No additional business persons added.
                        </p>

                    )}

                </CardContent>

            </Card>

            {/* Sister Concerns */}

            <Card>

                <CardHeader>

                    <SectionHeader
                        icon={Building2}
                        title="Sister Concerns"
                    />

                </CardHeader>

                <CardContent>

                    {sisterConcerns?.length ? (

                        <div className="space-y-4">

                            {sisterConcerns.map(
                                (
                                    concern,
                                    index
                                ) => (

                                    <div
                                        key={index}
                                        className="rounded-lg border p-4"
                                    >

                                        <h4 className="mb-4 font-medium">
                                            Sister Concern{" "}
                                            {index + 1}
                                        </h4>

                                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                                            {Object.entries(
                                                concern
                                            ).map(
                                                (
                                                    [
                                                        key,
                                                        value,
                                                    ]
                                                ) => (

                                                    <ReviewRow
                                                        key={key}
                                                        label={formatLabel(
                                                            key
                                                        )}
                                                        value={
                                                            typeof value ===
                                                                "object"
                                                                ? JSON.stringify(
                                                                    value
                                                                )
                                                                : String(
                                                                    value
                                                                )
                                                        }
                                                    />

                                                )
                                            )}

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    ) : (

                        <p className="text-sm text-muted-foreground">
                            No sister concerns added.
                        </p>

                    )}

                </CardContent>

            </Card>

            {/* Authorized Signatories */}

            <Card>

                <CardHeader>

                    <SectionHeader
                        icon={ShieldCheck}
                        title="Authorized Signatories"
                    />

                </CardHeader>

                <CardContent>

                    {authorizedSignatories?.length ? (

                        <div className="space-y-4">

                            {authorizedSignatories.map(
                                (
                                    signatory,
                                    index
                                ) => (

                                    <div
                                        key={index}
                                        className="rounded-lg border p-4"
                                    >

                                        <h4 className="mb-4 font-medium">
                                            Signatory{" "}
                                            {index + 1}
                                        </h4>

                                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                                            {Object.entries(
                                                signatory
                                            ).map(
                                                (
                                                    [
                                                        key,
                                                        value,
                                                    ]
                                                ) => (

                                                    <ReviewRow
                                                        key={key}
                                                        label={formatLabel(
                                                            key
                                                        )}
                                                        value={
                                                            typeof value ===
                                                                "object"
                                                                ? JSON.stringify(
                                                                    value
                                                                )
                                                                : String(
                                                                    value
                                                                )
                                                        }
                                                    />

                                                )
                                            )}

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    ) : (

                        <p className="text-sm text-muted-foreground">
                            No authorized signatories added.
                        </p>

                    )}

                </CardContent>

            </Card>

            {/* Declaration */}

            <Card>

                <CardHeader>

                    <SectionHeader
                        icon={FileCheck}
                        title="Declaration"
                    />

                </CardHeader>

                <CardContent className="space-y-5">

                    <div className="flex items-center gap-3">

                        <Badge
                            variant={
                                declarationAccepted
                                    ? "default"
                                    : "destructive"
                            }
                        >
                            {declarationAccepted
                                ? "Accepted"
                                : "Not Accepted"}
                        </Badge>

                    </div>

                    <Separator />

                    <div className="grid gap-6 md:grid-cols-3">

                        <ReviewRow
                            label="Signed By"
                            value={signedBy}
                        />

                        <ReviewRow
                            label="Declaration Date"
                            value={declarationDate}
                        />

                        <ReviewRow
                            label="Declaration Place"
                            value={declarationPlace}
                        />

                    </div>

                </CardContent>

            </Card>

            {/* Final warning */}

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30">

                <div className="flex gap-3">

                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                    <div>

                        <p className="font-medium">
                            Before you submit
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground leading-6">
                            Please make sure all the information
                            provided above is correct. Once submitted,
                            your application may be reviewed by the
                            administration team.

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

function formatLabel(
    value: string
) {
    return value
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) =>
            str.toUpperCase()
        );
}