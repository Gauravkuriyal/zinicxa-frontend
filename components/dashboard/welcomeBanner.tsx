import { Card, CardContent } from "@/components/ui/card";

export default function WelcomeBanner() {
    return (
        <Card className="border-0 bg-gradient-to-r from-blue-600 to-violet-600 text-white">
            <CardContent className="p-8">
                <h1 className="text-3xl font-bold">
                    Welcome Back 👋
                </h1>

                <p className="mt-2 text-blue-100">
                    Manage your orders, invoices,
                    support tickets and products.
                </p>
            </CardContent>
        </Card>
    );
}