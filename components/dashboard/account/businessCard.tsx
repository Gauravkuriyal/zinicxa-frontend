import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BusinessCard() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Business Information
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                <div>

                    <Label>
                        Shop Name
                    </Label>

                    <Input
                        className="mt-1"
                        defaultValue="Rahul Electronics"
                    />

                </div>

                <div>

                    <Label>
                        GST Number
                    </Label>

                    <Input
                        className="mt-1"
                        defaultValue="22AAAAA0000A1Z5"
                    />

                </div>

                <div>

                    <Label>
                        Business Type
                    </Label>

                    <Input
                        className="mt-1"
                        defaultValue="Retail Electronics"
                    />

                </div>

            </CardContent>

        </Card>
    );
}