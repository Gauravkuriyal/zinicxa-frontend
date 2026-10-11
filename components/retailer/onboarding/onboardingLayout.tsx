"use client";

import {
    ReactNode,
    useMemo,
} from "react";

import {
    ArrowLeft,
    ArrowRight,
    LogOutIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import OnboardingProgress from "./onboardingProgress";

import { useRetailerOnboarding } from "@/context/RetailerOnboardingContext";

import BusinessInformationStep from "./businessInformationStep";
import BusinessAddressStep from "./businessAddressStep";
import BankDetailsStep from "./bankDetailsStep";
import BusinessDetailsStep from "./businessDetailsStep";
import TerritoryStep from "./territoryStep";
import DeclarationStep from "./declarationStep";
import DocumentsStep from "./documentsStep";
import ReviewStep from "./reviewStep";
import InsuranceStep from "./insuranceStep";
import OnboardingSuccess from "./onboardingSuccess";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const TOTAL_STEPS = 9;

export default function OnboardingLayout() {
    const {setUser} = useAuth();
    const router = useRouter();
    const {
        currentStep,
        setCurrentStep,
        nextStep,
        previousStep
    } = useRetailerOnboarding();

    const {submitOnboarding} = useRetailerOnboarding();

    const isFirstStep = currentStep === 1;

    const isLastStep = currentStep === TOTAL_STEPS;

    const stepComponents: Record<
        number,
        ReactNode
    > = useMemo(
        () => ({
            1: <BusinessInformationStep />,
            2: <BusinessAddressStep />,
            3: <BankDetailsStep />,
            4: <BusinessDetailsStep />,
            5: <TerritoryStep />,
            6: <InsuranceStep />,
            7: <DocumentsStep />,
            8: <DeclarationStep />,
            9: <ReviewStep />,
            10: <OnboardingSuccess />,
        }),
        []
    );

    // const nextStep = () => {

    //     if (isLastStep) {
    //         return;
    //     }

    //     setCurrentStep(
    //         currentStep + 1
    //     );

    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth",
    //     });
    // };

    // const previousStep = () => {

    //     if (isFirstStep) {
    //         return;
    //     }

    //     setCurrentStep(
    //         currentStep - 1
    //     );

    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth",
    //     });
    // };

    const goToStep = (step: number) => {

        if (
            step < 1 ||
            step > TOTAL_STEPS
        ) {
            return;
        }

        /*
         * For now we allow going back to
         * already visited steps.
         *
         * Later we can add validation so
         * the user cannot skip incomplete
         * steps.
         */

        if (step <= currentStep) {

            setCurrentStep(step);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const logout = async () => {
        console.log("Logged out")
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        setUser(null);
        router.push("/retailer/register");
    }

    return (
        <div className="min-h-screen bg-muted/30">

            {/* Header */}

            <div className="border-b bg-background">

                <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                    <div className="">

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Retailer Onboarding
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Complete your business
                            information to become
                            a retailer.
                        </p>

                    </div>

                    <div>
                        <Button className="bg-rose-800 cursor-pointer hover:bg-rose-900" onClick={logout}>
                            Log Out <LogOutIcon />
                        </Button>
                    </div>

                </div>

            </div>

            {/* Main */}

            <main className="mx-auto flex gap-2 w-full px-4 py-8 sm:px-6 lg:px-8">

                <OnboardingProgress
                    currentStep={
                        currentStep
                    }
                    onStepClick={
                        goToStep
                    }
                />
                <div className="w-full rounded-2xl border bg-background shadow-sm">

                    <div>
                        {/* Step content */}

                        <div className="p-5 sm:p-8 lg:p-10">

                            {stepComponents[
                                currentStep
                            ]}

                        </div>
                    </div>

                    {/* Navigation */}

                    <div className="flex flex-col-reverse gap-3 border-t bg-muted/20 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                        <Button
                            type="button"
                            variant="outline"
                            onClick={
                                previousStep
                            }
                            disabled={
                                isFirstStep
                            }
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />

                            Back
                        </Button>

                        {!isLastStep ? (
                            <Button
                                type="button"
                                onClick={
                                    nextStep
                                }
                            >
                                Continue

                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={() => {
                                    submitOnboarding()
                                }}
                            >
                                Complete Onboarding
                            </Button>
                        )}

                    </div>

                </div>


            </main>
                {/* Footer information */}

                <p className="mt-6 pb-6 text-center text-xs text-muted-foreground">

                    Your information is saved
                    during the onboarding process.
                    You can go back and update
                    previous steps before submitting.

                </p>

        </div>
    );
}