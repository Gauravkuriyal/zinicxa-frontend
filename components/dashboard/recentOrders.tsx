import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const orders = [
    {
        id: "ORD-1001",
        amount: "₹12,500",
        status: "Approved",
    },
    {
        id: "ORD-1002",
        amount: "₹6,400",
        status: "Pending",
    },
    {
        id: "ORD-1003",
        amount: "₹8,100",
        status: "Rejected",
    },
];

export default function RecentOrders() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Recent Orders
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="flex items-center justify-between border-b pb-3"
                        >
                            <div>
                                <p className="font-medium">
                                    {order.id}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {order.amount}
                                </p>
                            </div>

                            <Badge>
                                {order.status}
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}