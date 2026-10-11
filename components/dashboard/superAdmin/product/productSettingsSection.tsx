"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Props {
    isFeatured: boolean;
    setIsFeatured: (value: boolean) => void;

    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

export default function ProductSettingsSection({
    isFeatured,
    setIsFeatured,
    isActive,
    setIsActive,
}: Props) {
    return (
        <div className="space-y-5">

            <h2 className="text-lg font-semibold">
                Product Settings
            </h2>

            <div className="rounded-xl border p-5 space-y-5">

                <div className="flex items-center justify-between">

                    <div>

                        <Label className="mb-2">
                            Featured Product
                        </Label>

                        <p className="text-sm text-muted-foreground">
                            Display this product in featured sections.
                        </p>

                    </div>

                    <Switch
                        checked={isFeatured}
                        onCheckedChange={setIsFeatured}
                    />

                </div>

                <div className="flex items-center justify-between">

                    <div>

                        <Label className="mb-2">
                            Active Product
                        </Label>

                        <p className="text-sm text-muted-foreground">
                            Customers can purchase this product.
                        </p>

                    </div>

                    <Switch
                        checked={isActive}
                        onCheckedChange={setIsActive}
                    />

                </div>

            </div>

        </div>
    );
}