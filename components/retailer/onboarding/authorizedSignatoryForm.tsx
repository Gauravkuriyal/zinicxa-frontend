"use client";

import { useRetailerOnboarding } from "@/context/RetailerOnboardingContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Plus,
    Trash2,
    Upload,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export default function AuthorizedSignatoryForm() {
    const {
        formData,
        updateFormData,
    } = useRetailerOnboarding();

    const signatories =
        formData.authorizedSignatories ?? [];

    const addSignatory = () => {
        updateFormData({
            authorizedSignatories: [
                ...signatories,
                {
                    name: "",
                    status: "DIRECTOR",
                    signature: null,
                },
            ],
        });
    };

    const removeSignatory = (index: number) => {
        updateFormData({
            authorizedSignatories:
                signatories.filter(
                    (_, i) => i !== index
                ),
        });
    };

    const updateSignatory = (
        index: number,
        field: string,
        value: any
    ) => {
        const updated = [...signatories];

        updated[index] = {
            ...updated[index],
            [field]: value,
        };

        updateFormData({
            authorizedSignatories: updated,
        });
    };

    const handleFileChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            // Option 1: Save the raw File object directly
            updateSignatory(index, "signature", file);

            // Option 2 (Alternative): Convert to Data URL if you need instant preview/persistence
            /*
            const reader = new FileReader();
            reader.onloadend = () => {
                updateSignatory(index, "signature", reader.result);
            };
            reader.readAsDataURL(file);
            */
        }
    };

    return (
        <div className="space-y-5">
            {signatories.map((signatory, index) => (
                <div
                    key={index}
                    className="border rounded-xl p-5 space-y-5"
                >
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">
                            Authorized Signatory {index + 1}
                        </h3>

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSignatory(index)}
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input
                                value={signatory.name ?? ""}
                                onChange={(e) =>
                                    updateSignatory(
                                        index,
                                        "name",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                                value={
                                    signatory.status
                                }
                                onValueChange={(value) =>
                                    updateSignatory(
                                        index,
                                        "status",
                                        value
                                    )
                                }
                            >

                                <SelectTrigger>
                                    <SelectValue placeholder="Select business type" />
                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="PROPRIETOR">
                                        PROPRIETOR
                                    </SelectItem>
                                    <SelectItem value="PARTNER">
                                        PARTNER
                                    </SelectItem>
                                    <SelectItem value="DIRECTOR">
                                        DIRECTOR
                                    </SelectItem>
                                    <SelectItem value="AUTHORIZED_PERSON">
                                        AUTHORIZED_PERSON
                                    </SelectItem>
                                    <SelectItem value="OTHER">
                                        OTHER
                                    </SelectItem>

                                </SelectContent>

                            </Select>
                        </div>

                        {/* Signature File Upload */}
                        <div className="space-y-2 md:col-span-2">
                            <Label>Signature File</Label>
                            <div className="flex items-center gap-3">
                                <Input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={(e) =>
                                        handleFileChange(index, e)
                                    }
                                    className="cursor-pointer"
                                />
                            </div>
                            {signatory.signature && typeof signatory.signature !== "string" && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    Selected:{" "}
                                    {typeof signatory.signature === "string"
                                        ? signatory.signature
                                        : signatory.signature.name}
                                </p>
                            )}

                            {signatory.signature && typeof signatory.signature === "string" && <div>
                                <Link target="_blank" href={process.env.NEXT_PUBLIC_BACKEND_DOMAIN! + "/" + signatory.signature} className="underline text-blue-500" >view file</Link>
                            </div>}
                        </div>
                    </div>
                </div>
            ))}

            <Button
                type="button"
                variant="outline"
                onClick={addSignatory}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Authorized Signatory
            </Button>
        </div>
    );
}