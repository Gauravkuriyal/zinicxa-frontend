import { Input } from "@/components/ui/input";

export default function OrderFilters() {
    return (
        <div
            className="
                flex
                flex-col
                gap-3
                md:flex-row
            "
        >
            <Input
                placeholder="Search orders..."
            />

            <Input
                type="date"
            />
        </div>
    );
}