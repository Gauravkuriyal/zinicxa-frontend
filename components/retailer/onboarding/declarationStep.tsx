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
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

export default function DeclarationStep() {
    const {
        formData,
        updateFormData,
    } = useRetailerOnboarding();

    useEffect(() => {
        updateFormData({
            declarationDate:new Date().toLocaleDateString('en-CA')
        })
    }, [])
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Declaration
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    Please review and accept the declaration
                    before submitting your application.
                </p>
            </CardHeader>

            <CardContent className="space-y-6">

                <div className="rounded-lg border bg-muted/30 p-5">

                    <p className="text-sm leading-7">
                        I hereby declare that the information
                        provided by me in this application is
                        true and correct to the best of my
                        knowledge. I understand that any
                        incorrect or misleading information may
                        result in rejection of my application.
                    </p>

                </div>

                <div className="flex items-start gap-3">

                    <Checkbox
                        checked={
                            formData.declarationAccepted === true
                        }
                        onCheckedChange={(checked) =>
                            updateFormData({
                                declarationAccepted:
                                    checked
                                        ? true
                                        : false,
                            })
                        }
                    />

                    <div className="space-y-1">

                        <Label>
                            I accept the declaration
                        </Label>

                        <p className="text-sm text-muted-foreground">
                            You must accept the declaration
                            before continuing.
                        </p>

                    </div>

                </div>

                <div className="grid md:grid-cols-3 gap-5">

                    <div className="space-y-2">
                        <Label>
                            Signed By
                        </Label>

                        <Input
                            placeholder="Full name"
                            value={
                                formData.signedBy ?? ""
                            }
                            onChange={(e) =>
                                updateFormData({
                                    signedBy:
                                        e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>
                            Declaration Date
                        </Label>

                        <Input
                            type="date"
                            value={
                                formData.declarationDate ??
                                ""
                            }
                            disabled
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>
                            Place
                        </Label>

                        <Input
                            placeholder="City"
                            value={
                                formData.declarationPlace ??
                                ""
                            }
                            onChange={(e) =>
                                updateFormData({
                                    declarationPlace:
                                        e.target.value,
                                })
                            }
                        />
                    </div>

                </div>

            </CardContent>

        </Card>
    );
}