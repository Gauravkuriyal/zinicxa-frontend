import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SupportWidget() {
    return (
        <Card className="p-6">
            <h3 className="font-semibold">
                Support Tickets
            </h3>

            <div className="mt-4 space-y-3">
                <div className="rounded-lg border p-3">
                    <p>#SUP-001</p>
                    <p className="text-sm text-yellow-600">
                        Pending
                    </p>
                </div>

                <div className="rounded-lg border p-3">
                    <p>#SUP-002</p>
                    <p className="text-sm text-green-600">
                        Resolved
                    </p>
                </div>
            </div>

            <Button className="mt-4 w-full">
                Create Ticket
            </Button>
        </Card>
    );
}