"use client";

import {
    Check,
    Building2,
    MapPin,
    Landmark,
    BriefcaseBusiness,
    Map,
    FileCheck,
    Files,
    ClipboardCheck,
    Shield,
} from "lucide-react";

interface Step {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
}

const steps: Step[] = [
    {
        id: 1,
        title: "Business Information",
        description: "Basic business details",
        icon: Building2,
    },
    {
        id: 2,
        title: "Business Address",
        description: "Registered business address",
        icon: MapPin,
    },
    {
        id: 3,
        title: "Bank Details",
        description: "Business banking information",
        icon: Landmark,
    },
    {
        id: 4,
        title: "Business Details",
        description: "Business structure and people",
        icon: BriefcaseBusiness,
    },
    {
        id: 5,
        title: "Territory",
        description: "Business territory information",
        icon: Map,
    },
    {
        id: 6,
        title: "Insurance",
        description: "Insurance information",
        icon: Shield,
    },
    {
        id: 7,
        title: "Documents",
        description: "Upload required documents",
        icon: Files,
    },
    {
        id: 8,
        title: "Declaration",
        description: "Declaration and confirmation",
        icon: FileCheck,
    },
    {
        id: 9,
        title: "Review",
        description: "Review your information",
        icon: ClipboardCheck,
    },
];

interface Props {
    currentStep: number;
    onStepClick?: (step: number) => void;
}

export default function OnboardingProgress({
    currentStep,
    onStepClick,
}: Props) {
    return (
        <div className="w-full max-w-[250px] rounded-2xl border bg-background shadow-sm p-4">

            {/* Desktop */}

            <div className="hidden lg:block">

                <div className="relative">

                    {/* Connecting line */}

                    <div className="absolute left-5 right-0 top-0 h-full w-px bg-border" />

                    <div className="relative flex flex-col gap-2 justify-between">

                        {steps.map((step) => {

                            const completed =
                                currentStep > step.id;

                            const active =
                                currentStep === step.id;

                            const Icon = step.icon;

                            return (
                                <button
                                    key={step.id}
                                    type="button"
                                    disabled={
                                        step.id > currentStep
                                    }
                                    onClick={() => {
                                        if (
                                            step.id <=
                                            currentStep
                                        ) {
                                            onStepClick?.(
                                                step.id
                                            );
                                        }
                                    }}
                                    className={`
                                        relative z-10
                                        flex
                                        items-center
                                        gap-2
                                        text-center
                                        group
                                        ${
                                            step.id <=
                                            currentStep
                                                ? "cursor-pointer"
                                                : "cursor-default"
                                        }
                                    `}
                                >

                                    <div
                                        className={`
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-full
                                            border-2
                                            bg-background
                                            transition-all
                                            ${
                                                completed
                                                    ? "border-primary bg-primary text-primary-foreground"
                                                    : active
                                                    ? "border-primary text-primary"
                                                    : "border-muted-foreground/30 text-muted-foreground"
                                            }
                                        `}
                                    >

                                        {completed ? (
                                            <Check
                                                className="h-5 w-5"
                                            />
                                        ) : (
                                            <Icon
                                                className="h-5 w-5"
                                            />
                                        )}

                                    </div>

                                    <div className="">

                                        <p
                                            className={`
                                                text-sm
                                                font-medium
                                                ${
                                                    active ||
                                                    completed
                                                        ? "text-foreground"
                                                        : "text-muted-foreground"
                                                }
                                            `}
                                            title={step.description}
                                        >
                                            {step.title}
                                        </p>

                                        {/* <p className="mt-1 hidden xl:block text-xs text-muted-foreground">
                                            {
                                                step.description
                                            }
                                        </p> */}

                                    </div>

                                </button>
                            );
                        })}

                    </div>

                </div>

            </div>

            {/* Mobile / Tablet */}

            <div className="lg:hidden">

                <div className="flex items-center gap-4">

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border-2
                            border-primary
                            bg-primary
                            text-primary-foreground
                        "
                    >
                        {(() => {
                            const Icon =
                                steps[
                                    currentStep - 1
                                ]?.icon;

                            return Icon ? (
                                <Icon className="h-5 w-5" />
                            ) : null;
                        })()}
                    </div>

                    <div className="min-w-0 flex-1">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="font-semibold">
                                    {
                                        steps[
                                            currentStep -
                                                1
                                        ]?.title
                                    }
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {
                                        steps[
                                            currentStep -
                                                1
                                        ]?.description
                                    }
                                </p>

                            </div>

                            <span className="text-sm font-medium text-muted-foreground">
                                {currentStep} /{" "}
                                {steps.length}
                            </span>

                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">

                            <div
                                className="h-full rounded-full bg-primary transition-all duration-300"
                                style={{
                                    width: `${
                                        (currentStep /
                                            steps.length) *
                                        100
                                    }%`,
                                }}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}