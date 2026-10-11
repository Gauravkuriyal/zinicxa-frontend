import Link from "next/link";

import {
    ShoppingBag,
    ShoppingCart,
    Headphones,
    FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const actions = [
    {
        title: "Browse Products",
        href: "/dashboard/products",
        icon: ShoppingBag,
    },
    {
        title: "View Cart",
        href: "/dashboard/cart",
        icon: ShoppingCart,
    },
    {
        title: "Support",
        href: "/dashboard/support",
        icon: Headphones,
    },
    {
        title: "Invoices",
        href: "/dashboard/invoices",
        icon: FileText,
    },
];

export default function QuickActions() {
    return (
        <Card className="p-6">
            <h3 className="mb-4 font-semibold">
                Quick Actions
            </h3>

            <div className="grid gap-3">
                {actions.map((action) => (
                    <Button
                        key={action.title}
                        asChild
                        variant="outline"
                    >
                        <Link href={action.href}>
                            <action.icon />
                            {action.title}
                        </Link>
                    </Button>
                ))}
            </div>
        </Card>
    );
}