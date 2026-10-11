"use client";

import { useRetailerOnboarding } from "@/context/RetailerOnboardingContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Plus,
    Trash2,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PropertyForm() {
    const {
        formData,
        updateFormData,
    } = useRetailerOnboarding();

    const properties =
        formData.properties ?? [];

    const addProperty = () => {
        updateFormData({
            properties: [
                ...properties,
                {
                    ownedBy: "INDIVIDUAL",
                    address: "",
                    ownerName: "",
                    relationshipWithOwner: "",
                },
            ],
        });
    };

    const removeProperty = (
        index: number
    ) => {
        updateFormData({
            properties: properties.filter(
                (_, i) => i !== index
            ),
        });
    };

    const updateProperty = (
        index: number,
        field: string,
        value: string
    ) => {
        const updated =
            [...properties];

        updated[index] = {
            ...updated[index],
            [field]: value,
        };

        updateFormData({
            properties: updated,
        });
    };

    return (
        <div className="space-y-5">

            {properties.map(
                (property, index) => (

                    <div
                        key={index}
                        className="rounded-xl border p-5 space-y-5"
                    >

                        <div className="flex items-center justify-between">

                            <h3 className="font-semibold">
                                Property {index + 1}
                            </h3>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                    removeProperty(index)
                                }
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>

                        </div>

                        <div className="grid md:grid-cols-2 gap-4">

                            <div className="space-y-2">
                                <Label>
                                    Owned By
                                </Label>

                                {/* <Input
                                    placeholder="Shop / Office / Warehouse"
                                    value={
                                        property.ownedBy ?? ""
                                    }
                                    onChange={(e) =>
                                        updateProperty(
                                            index,
                                            "ownedBy",
                                            e.target.value
                                        )
                                    }
                                /> */}

                                <Select
                                    value={
                                        property.ownedBy
                                    }
                                    onValueChange={(value) =>
                                        updateProperty(
                                            index,
                                            "ownedBy",
                                            value
                                        )
                                    }
                                >

                                    <SelectTrigger>
                                        <SelectValue placeholder="Select business type" />
                                    </SelectTrigger>

                                    <SelectContent>

                                        <SelectItem value="FIRM">
                                            FIRM
                                        </SelectItem>
                                        <SelectItem value="PROPRIETOR">
                                            PROPRIETOR
                                        </SelectItem>
                                        <SelectItem value="PARTNER">
                                            PARTNER
                                        </SelectItem>
                                        <SelectItem value="DIRECTOR">
                                            DIRECTOR
                                        </SelectItem>
                                        <SelectItem value="INDIVIDUAL">
                                            INDIVIDUAL
                                        </SelectItem>
                                        <SelectItem value="OTHER">
                                            OTHER
                                        </SelectItem>

                                    </SelectContent>

                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>
                                    Address
                                </Label>

                                <Input
                                    placeholder="Property address"
                                    value={
                                        property.address ?? ""
                                    }
                                    onChange={(e) =>
                                        updateProperty(
                                            index,
                                            "address",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>
                                    Owner Name
                                </Label>

                                <Input
                                    value={
                                        property.ownerName ?? ""
                                    }
                                    onChange={(e) =>
                                        updateProperty(
                                            index,
                                            "ownerName",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>
                                    Relationship with owner
                                </Label>

                                <Input
                                    value={
                                        property.relationshipWithOwner ?? ""
                                    }
                                    onChange={(e) =>
                                        updateProperty(
                                            index,
                                            "relationshipWithOwner",
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
                onClick={addProperty}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Property
            </Button>

        </div>
    );
}