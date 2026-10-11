"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
    Plus,
    Trash2,
} from "lucide-react";

// import { ProductSpecification } from "@/types/product";

interface Props {
    specifications: Record<string, string>;

    setSpecifications: (
        value: Record<string, string>
    ) => void;
}

export default function ProductSpecificationsSection({
    specifications,
    setSpecifications,
}: Props) {

    const addSpecification = () => {

        setSpecifications({
            ...specifications,
            key: "value"
        });

    };

    const remove = (key: any) => {

        // setSpecifications(
        //     specifications.filter(
        //         (_, i) => i !== index
        //     )
        // );

        const copy = { ...specifications };
        delete copy[key];
        setSpecifications(copy);

    };

    // const update = (
    //     index: number,
    //     field: "key" | "value",
    //     value: string
    // ) => {

    //     // const copy = [...specifications];

    //     // copy[index][field] = value;

    //     // setSpecifications(copy);

    //     setSpecifications({...specifications});

    // };

    const updateValue = (
        key: string,
        value: string
    ) => {
        setSpecifications({
            ...specifications,
            [key]: value,
        });
    };

    const updateKey = (
        oldKey: string,
        newKey: string
    ) => {
        const copy = { ...specifications };

        copy[newKey] = copy[oldKey];

        delete copy[oldKey];

        setSpecifications(copy);
    };

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <h2 className="text-lg font-semibold">
                    Specifications
                </h2>

                <Button
                    onClick={
                        addSpecification
                    }
                >
                    <Plus
                        className="mr-2"
                        size={16}
                    />

                    Add

                </Button>

            </div>

            <div className="space-y-3">

                {Object.entries(specifications).map(([key, value],index) => (

                    <div
                        key={index}
                        className="grid grid-cols-[1fr_1fr_auto] gap-3"
                    >

                        <Input
                            placeholder="Key"
                            value={key}
                            // onChange={(e) =>
                            //     update(
                            //         key,
                            //         "key",
                            //         e.target
                            //             .value
                            //     )
                            // }

                            onChange={(e) =>
                                updateKey(key, e.target.value)
                            }
                        />

                        <Input
                            placeholder="Value"
                            value={
                                value
                            }
                            // onChange={(e) =>
                            //     update(
                            //         key,
                            //         "value",
                            //         e.target
                            //             .value
                            //     )
                            // }

                            onChange={(e) =>
                                updateValue(key, e.target.value)
                            }
                        />

                        <Button
                            size="icon"
                            variant="destructive"
                            onClick={() =>
                                remove(
                                    key
                                )
                            }
                        >
                            <Trash2
                                size={16}
                            />
                        </Button>

                    </div>

                )
                )}

            </div>

        </div>
    );
}