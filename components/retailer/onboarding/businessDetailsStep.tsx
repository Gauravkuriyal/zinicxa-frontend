"use client";

import { useRetailerOnboarding } from "@/context/RetailerOnboardingContext";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import PropertyForm from "./propertyForm";
import BusinessPersonForm from "./businessPersonForm";
import SisterConcernForm from "./sisterConcernForm";
import AuthorizedSignatoryForm from "./authorizedSignatoryForm";

export default function BusinessDetailsStep() {
    const {
        formData,
        updateFormData,
    } = useRetailerOnboarding();

    return (
        <div className="space-y-6">

            {/* <Card>
                <CardHeader>
                    <CardTitle>
                        Business Details
                    </CardTitle>
                </CardHeader>

                <CardContent className="grid gap-5">

                    <div className="grid md:grid-cols-2 gap-5">

                        <div className="space-y-2">
                            <Label>
                                Business Constitution
                            </Label>

                            <Input
                                placeholder="Example: Proprietorship"
                                value={
                                    formData.constitution?.type ?? ""
                                }
                                onChange={(e) =>
                                    updateFormData({
                                        constitution: {
                                            ...formData.constitution,
                                            type: e.target.value,
                                        },
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>
                                Year of Establishment
                            </Label>

                            <Input
                                type="number"
                                placeholder="2020"
                                value={
                                    formData.constitution?.yearEstablished ??
                                    ""
                                }
                                onChange={(e) =>
                                    updateFormData({
                                        constitution: {
                                            ...formData.constitution,
                                            yearEstablished:
                                                e.target.value,
                                        },
                                    })
                                }
                            />
                        </div>

                    </div>

                </CardContent>
            </Card> */}

            {/* Properties */}

            <Card>
                <CardHeader>
                    <CardTitle>
                        Properties
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <PropertyForm />
                </CardContent>
            </Card>

            {/* Business Persons */}

            <Card>
                <CardHeader>
                    <CardTitle>
                        Business Persons
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <BusinessPersonForm />
                </CardContent>
            </Card>

            {/* Sister Concerns */}

            <Card>
                <CardHeader>
                    <CardTitle>
                        Sister Concerns
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <SisterConcernForm />
                </CardContent>
            </Card>

            {/* Authorized Signatories */}

            <Card>
                <CardHeader>
                    <CardTitle>
                        Authorized Signatories
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <AuthorizedSignatoryForm />
                </CardContent>
            </Card>

        </div>
    );
}