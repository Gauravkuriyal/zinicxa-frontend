"use client";

import { useRetailerOnboarding } from "@/context/RetailerOnboardingContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Plus,
    Trash2,
} from "lucide-react";

export default function SisterConcernForm() {
    const {
        formData,
        updateFormData,
    } = useRetailerOnboarding();

    const concerns =
        formData.sisterConcerns ?? [];

    const addConcern = () => {
        updateFormData({
            sisterConcerns: [
                ...concerns,
                {
                    name: "",
                    officeAddress: "",
                    phone: "",
                    natureOfBusiness: "",
                    approximateAnnualTurnover: 0
                },
            ],
        });
    };

    const removeConcern = (
        index: number
    ) => {
        updateFormData({
            sisterConcerns:
                concerns.filter(
                    (_, i) => i !== index
                ),
        });
    };

    const updateConcern = (
        index: number,
        field: string,
        value: string
    ) => {
        const updated = [...concerns];

        updated[index] = {
            ...updated[index],
            [field]: value,
        };

        updateFormData({
            sisterConcerns: updated,
        });
    };

    return (
        <div className="space-y-5">

            {concerns.map(
                (concern, index) => (

                    <div
                        key={index}
                        className="border rounded-xl p-5 space-y-5"
                    >

                        <div className="flex justify-between">

                            <h3 className="font-semibold">
                                Sister Concern {index + 1}
                            </h3>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                    removeConcern(index)
                                }
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>

                        </div>

                        <div className="grid md:grid-cols-3 gap-4">

                            <div className="space-y-2">
                                <Label>
                                    Company / Firm Name
                                </Label>

                                <Input
                                    value={
                                        concern.name ?? ""
                                    }
                                    onChange={(e) =>
                                        updateConcern(
                                            index,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>
                                    Office Address
                                </Label>

                                <Input
                                    placeholder="Address"
                                    value={
                                        concern.officeAddress ??
                                        ""
                                    }
                                    onChange={(e) =>
                                        updateConcern(
                                            index,
                                            "officeAddress",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>
                                    Phone
                                </Label>

                                <Input
                                    value={
                                        concern.phone ??
                                        ""
                                    }
                                    onChange={(e) =>
                                        updateConcern(
                                            index,
                                            "phone",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>
                                    Nature of business
                                </Label>

                                <Input
                                    value={
                                        concern.natureOfBusiness ??
                                        ""
                                    }
                                    onChange={(e) =>
                                        updateConcern(
                                            index,
                                            "natureOfBusiness",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>
                                    Approximate Annual Turnover (in Crore)
                                </Label>

                                <Input
                                    value={
                                        concern.approximateAnnualTurnover ??
                                        ""
                                    }
                                    onChange={(e) =>
                                        updateConcern(
                                            index,
                                            "approximateAnnualTurnover",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                        </div>

                    </div>
                )
            )}

            <Button
                type="button"
                variant="outline"
                onClick={addConcern}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Sister Concern
            </Button>

        </div>
    );
}