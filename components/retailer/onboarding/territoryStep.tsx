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
import { Button } from "@/components/ui/button";

import { Plus, Trash2 } from "lucide-react";

export default function TerritoryStep() {
    const { formData, updateFormData } = useRetailerOnboarding();

    const territory = formData.territory ?? {};
    const districts = territory.districts ?? [""];
    const towns = territory.towns ?? [""];

    // Helper to sync array updates to the main context state
    const updateTerritoryField = (field: "districts" | "towns", newArray: string[]) => {
        updateFormData({
            territory: {
                ...territory,
                [field]: newArray,
            },
        });
    };

    // Handlers for Districts
    const addDistrict = () => {
        updateTerritoryField("districts", [...districts, ""]);
    };

    const updateDistrict = (index: number, value: string) => {
        const updated = [...districts];
        updated[index] = value;
        updateTerritoryField("districts", updated);
    };

    const removeDistrict = (index: number) => {
        updateTerritoryField(
            "districts",
            districts.filter((_, i) => i !== index)
        );
    };

    // Handlers for Towns
    const addTown = () => {
        updateTerritoryField("towns", [...towns, ""]);
    };

    const updateTown = (index: number, value: string) => {
        const updated = [...towns];
        updated[index] = value;
        updateTerritoryField("towns", updated);
    };

    const removeTown = (index: number) => {
        updateTerritoryField(
            "towns",
            towns.filter((_, i) => i !== index)
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Territory Information</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Provide information about the geographical area where your business operates.
                </p>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Districts Section */}
                    <div className="space-y-3">
                        <Label>Districts</Label>
                        <div className="space-y-2">
                            {districts.map((district, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Input
                                        placeholder={`District ${index + 1}`}
                                        value={district}
                                        onChange={(e) =>
                                            updateDistrict(index, e.target.value)
                                        }
                                    />
                                    {districts.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeDistrict(index)}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={addDistrict}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add District
                        </Button>
                    </div>

                    {/* Towns Section */}
                    <div className="space-y-3">
                        <Label>Towns</Label>
                        <div className="space-y-2">
                            {towns.map((town, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Input
                                        placeholder={`Town ${index + 1}`}
                                        value={town}
                                        onChange={(e) =>
                                            updateTown(index, e.target.value)
                                        }
                                    />
                                    {towns.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeTown(index)}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={addTown}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Town
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}