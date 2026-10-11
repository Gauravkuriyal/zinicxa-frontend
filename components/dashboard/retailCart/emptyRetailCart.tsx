import { ShoppingCart } from "lucide-react";

export default function EmptyRetailCart() {
    return (
        <div
            className="
                flex
                flex-col
                items-center
                justify-center
                py-20
            "
        >
            <ShoppingCart
                className="
                    h-20
                    w-20
                    text-muted-foreground
                "
            />

            <h2
                className="
                    mt-4
                    text-2xl
                    font-semibold
                "
            >
                Your Cart Is Empty
            </h2>

            <p
                className="
                    mt-2
                    text-muted-foreground
                "
            >
                Add products to start ordering.
            </p>
        </div>
    );
}