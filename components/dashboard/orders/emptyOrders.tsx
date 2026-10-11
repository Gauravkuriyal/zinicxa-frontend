import { PackageSearch } from "lucide-react";

export default function EmptyOrders() {
    return (
        <div
            className="
                flex
                flex-col
                items-center
                py-20
            "
        >
            <PackageSearch
                className="
                    h-16
                    w-16
                    text-muted-foreground
                "
            />

            <h2
                className="
                    mt-4
                    text-xl
                    font-semibold
                "
            >
                No Orders Found
            </h2>

            <p
                className="
                    text-muted-foreground
                "
            >
                Start ordering products.
            </p>
        </div>
    );
}