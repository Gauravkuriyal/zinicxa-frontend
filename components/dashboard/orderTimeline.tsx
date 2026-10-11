import { Card } from "@/components/ui/card";

export default function OrderTimeline() {
    return (
        <Card className="p-6">
            <h3 className="mb-4 font-semibold">
                Latest Order Status
            </h3>

            <div className="space-y-4">

                <div>✅ Order Placed</div>

                <div>✅ Sent To Salesman</div>

                <div>✅ Verified By Admin</div>

                <div>⏳ Awaiting Approval</div>

            </div>
        </Card>
    );
}