"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRetailerOnboarding } from "@/context/RetailerOnboardingContext";

export interface InsuranceData {
    companyName: string;
    companyAddress: string;
    phone: string;
    contactPerson: string;
    riskCovered: string;
    riskCoveredValue: number;
}

export default function InsuranceStep() {
    const {
        formData,
        updateFormData,
    } = useRetailerOnboarding();

    const insurance: InsuranceData =
        formData.insurance ?? {
            companyName: "",
            companyAddress: "",
            phone: "",
            contactPerson: "",
            riskCovered: "",
            riskCoveredValue: 0,
        };

    const updateInsurance = (
        field: keyof InsuranceData,
        value: string | number
    ) => {
        updateFormData({
            insurance: {
                ...insurance,
                [field]: value,
            },
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Insurance Information
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    Provide details about your business
                    insurance coverage, if applicable.
                </p>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Company Name */}

                <div className="space-y-2">
                    <Label htmlFor="insurance-company-name">
                        Insurance Company Name
                    </Label>

                    <Input
                        id="insurance-company-name"
                        value={insurance.companyName}
                        onChange={(e) =>
                            updateInsurance(
                                "companyName",
                                e.target.value
                            )
                        }
                        placeholder="Enter insurance company name"
                    />
                </div>

                {/* Company Address */}

                <div className="space-y-2">
                    <Label htmlFor="insurance-company-address">
                        Insurance Company Address
                    </Label>

                    <Input
                        id="insurance-company-address"
                        value={insurance.companyAddress}
                        onChange={(e) =>
                            updateInsurance(
                                "companyAddress",
                                e.target.value
                            )
                        }
                        placeholder="Enter insurance company address"
                    />
                </div>

                {/* Phone + Contact Person */}

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="insurance-phone">
                            Phone
                        </Label>

                        <Input
                            id="insurance-phone"
                            type="tel"
                            value={insurance.phone}
                            onChange={(e) =>
                                updateInsurance(
                                    "phone",
                                    e.target.value
                                )
                            }
                            placeholder="Enter contact number"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="insurance-contact-person">
                            Contact Person
                        </Label>

                        <Input
                            id="insurance-contact-person"
                            value={insurance.contactPerson}
                            onChange={(e) =>
                                updateInsurance(
                                    "contactPerson",
                                    e.target.value
                                )
                            }
                            placeholder="Enter contact person name"
                        />
                    </div>
                </div>

                {/* Risk Covered */}

                <div className="space-y-2">
                    <Label htmlFor="insurance-risk-covered">
                        Risk Covered
                    </Label>

                    <Input
                        id="insurance-risk-covered"
                        value={insurance.riskCovered}
                        onChange={(e) =>
                            updateInsurance(
                                "riskCovered",
                                e.target.value
                            )
                        }
                        placeholder="e.g. Fire, Theft, Natural Calamity"
                    />
                </div>

                {/* Risk Covered Value */}

                <div className="space-y-2">
                    <Label htmlFor="insurance-risk-value">
                        Risk Covered Value
                    </Label>

                    <Input
                        id="insurance-risk-value"
                        type="number"
                        min="0"
                        value={insurance.riskCoveredValue}
                        onChange={(e) =>
                            updateInsurance(
                                "riskCoveredValue",
                                Number(e.target.value)
                            )
                        }
                        placeholder="Enter covered value"
                    />

                    <p className="text-xs text-muted-foreground">
                        Enter the monetary value covered by
                        the insurance policy.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}