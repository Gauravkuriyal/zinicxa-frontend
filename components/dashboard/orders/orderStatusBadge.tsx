import { Badge } from "@/components/ui/badge";

export default function OrderStatusBadge({
    status,
}: {
    status: string;
}) {
    const styles = {
        PLACED: "bg-black-800 text-white",
        UNDER_SALESMAN_REVIEW: "bg-orange-100 text-orange-700",
        UNDER_ADMIN_REVIEW: "bg-yellow-100 text-yellow-700",
        APPROVED: "bg-green-100 text-green-700",

        PROCESSING: "bg-blue-100 text-blue-700",

        DISPATCHED: "bg-purple-100 text-purple-700",

        DELIVERED: "bg-green-800 text-white",

        REJECTED: "bg-red-100 text-red-700",
    };

    return (
        <Badge
            className={
                styles[
                status as keyof typeof styles
                ]
            }
        >
            {status.replaceAll("_"," ")}
        </Badge>
    );
}