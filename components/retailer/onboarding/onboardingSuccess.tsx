"use client";

import {
    CheckCircle2,
    Clock3,
    ArrowRight,
    Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
    applicationNumber?: string;
    onGoToDashboard?: () => void;
}

export default function OnboardingSuccess({
    applicationNumber,
    onGoToDashboard,
}: Props) {

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4">

            <Card className="w-full max-w-2xl border-none shadow-lg">

                <CardContent className="px-6 py-12 text-center md:px-12">

                    {/* Success Icon */}

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">

                        <CheckCircle2
                            className="h-10 w-10 text-green-600 dark:text-green-400"
                        />

                    </div>

                    {/* Heading */}

                    <h1 className="mt-7 text-3xl font-bold tracking-tight">

                        Application Submitted Successfully

                    </h1>

                    <p className="mx-auto mt-3 max-w-xl text-muted-foreground leading-7">

                        Thank you for completing your retailer onboarding
                        application. Your information has been submitted
                        successfully and will now be reviewed by our team.

                    </p>

                    {/* Application Number */}

                    {applicationNumber && (

                        <div className="mx-auto mt-7 max-w-md rounded-xl border bg-muted/30 p-5">

                            <p className="text-sm text-muted-foreground">
                                Application Number
                            </p>

                            <p className="mt-1 text-lg font-semibold tracking-wide">
                                {applicationNumber}
                            </p>

                        </div>

                    )}

                    {/* Status */}

                    <div className="mx-auto mt-7 flex max-w-md items-center gap-4 rounded-xl border p-5 text-left">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">

                            <Clock3 className="h-5 w-5 text-primary" />

                        </div>

                        <div>

                            <p className="font-medium">
                                Application Under Review
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Our team will review your submitted
                                information and documents.

                            </p>

                        </div>

                    </div>

                    {/* Actions */}

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                        {onGoToDashboard && (

                            <Button
                                onClick={
                                    onGoToDashboard
                                }
                            >

                                Go to Dashboard

                                <ArrowRight className="ml-2 h-4 w-4" />

                            </Button>

                        )}

                        <Button
                            variant="outline"
                            onClick={() =>
                                window.location.href =
                                    "/"
                            }
                        >

                            <Home className="mr-2 h-4 w-4" />

                            Back to Home

                        </Button>

                    </div>

                    {/* Footer note */}

                    <p className="mt-8 text-xs text-muted-foreground">

                        You can contact support if you have any questions
                        regarding your application.

                    </p>

                </CardContent>

            </Card>

        </div>
    );
}