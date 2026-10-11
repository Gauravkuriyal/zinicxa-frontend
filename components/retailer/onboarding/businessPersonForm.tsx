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

export default function BusinessPersonForm() {
    const {
        formData,
        updateFormData,
    } = useRetailerOnboarding();

    const persons =
        formData.businessPersons ?? [];

    const addPerson = () => {
        updateFormData({
            businessPersons: [
                ...persons,
                {
                    name: "",
                    officeAddress: "",
                    officePhone: "",
                    residenceAddress: "",
                    residencePhone: "",
                    qualification: "",
                    shareInBusiness: 0,
                    designation: "PARTNER",
                },
            ],
        });
    };

    const removePerson = (
        index: number
    ) => {
        updateFormData({
            businessPersons:
                persons.filter(
                    (_, i) => i !== index
                ),
        });
    };

    const updatePerson = (
        index: number,
        field: string,
        value: string
    ) => {
        const updated = [...persons];

        updated[index] = {
            ...updated[index],
            [field]: value,
        };

        updateFormData({
            businessPersons: updated,
        });
    };

    return (
        <div className="space-y-5">

            {persons.map(
                (person, index) => (

                    <div
                        key={index}
                        className="border rounded-xl p-5 space-y-5"
                    >

                        <div className="flex justify-between">

                            <h3 className="font-semibold">
                                Business Person {index + 1}
                            </h3>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                    removePerson(index)
                                }
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>

                        </div>

                        <div className="grid md:grid-cols-2 gap-4">

                            <div className="space-y-2">
                                <Label>Name</Label>

                                <Input
                                    value={
                                        person.name ?? ""
                                    }
                                    onChange={(e) =>
                                        updatePerson(
                                            index,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Designation</Label>

                                {/* <Input
                                    value={
                                        person.designation ??
                                        ""
                                    }
                                    onChange={(e) =>
                                        updatePerson(
                                            index,
                                            "designation",
                                            e.target.value
                                        )
                                    }
                                /> */}

                                <Select
                                    value={
                                        person.designation
                                    }
                                    onValueChange={(value) =>
                                        updatePerson(
                                            index,
                                            "designation",
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
                                        <SelectItem value="OTHER">
                                            OTHER
                                        </SelectItem>

                                    </SelectContent>

                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Office Address</Label>

                                <Input
                                    value={
                                        person.officeAddress ?? ""
                                    }
                                    onChange={(e) =>
                                        updatePerson(
                                            index,
                                            "officeAddress",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Office Phone</Label>

                                <Input
                                    value={
                                        person.officePhone ?? ""
                                    }
                                    onChange={(e) =>
                                        updatePerson(
                                            index,
                                            "officePhone",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Residence Address</Label>

                                <Input
                                    value={
                                        person.residenceAddress ?? ""
                                    }
                                    onChange={(e) =>
                                        updatePerson(
                                            index,
                                            "residenceAddress",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Residence Phone</Label>

                                <Input
                                    value={
                                        person.residencePhone ?? ""
                                    }
                                    onChange={(e) =>
                                        updatePerson(
                                            index,
                                            "residencePhone",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Qualification</Label>

                                <Input
                                    value={
                                        person.qualification ?? ""
                                    }
                                    onChange={(e) =>
                                        updatePerson(
                                            index,
                                            "qualification",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Share In Business (in percentage %)</Label>

                                <Input
                                    value={
                                        person.shareInBusiness ?? ""
                                    }
                                    type="number"
                                    max={100}
                                    min={0}
                                    onChange={(e) =>
                                        updatePerson(
                                            index,
                                            "shareInBusiness",
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
                onClick={addPerson}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Business Person
            </Button>

        </div>
    );
}