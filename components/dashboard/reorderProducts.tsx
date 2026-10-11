import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const products = [
    {
        id: 1,
        name: "AI Buds Pro",
        price: "₹2,999",
    },
    {
        id: 2,
        name: "Soundbar X200",
        price: "₹8,999",
    },
    {
        id: 3,
        name: "Speaker Max",
        price: "₹5,499",
    },
];

export default function ReorderProducts() {
    return (
        <Card className="p-6">
            <h3 className="mb-5 font-semibold">
                Frequently Ordered
            </h3>

            <div className="grid gap-4 md:grid-cols-3">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="rounded-lg border p-4"
                    >
                        <h4 className="font-medium">
                            {product.name}
                        </h4>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {product.price}
                        </p>

                        <Button
                            size="sm"
                            className="mt-4 w-full"
                        >
                            Reorder
                        </Button>
                    </div>
                ))}
            </div>
        </Card>
    );
}