"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    Home,
    Search,
    ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Footer from "@/components/utils/footer";
import Header from "@/components/utils/header";

export default function NotFound() {
    const router = useRouter();

    return (
        <>
            <Header/>
            <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16">
                {/* Background decoration */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                </div>

                <div className="relative mx-auto w-full max-w-2xl text-center">
                    {/* 404 illustration */}
                    <div className="relative mx-auto mb-8 flex h-48 w-48 items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-primary/20 bg-primary/5" />

                        <div className="absolute inset-5 rounded-full border border-dashed border-primary/30" />

                        <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                            <ShoppingBag
                                className="h-14 w-14"
                                strokeWidth={1.5}
                            />
                        </div>

                        <span className="absolute -right-2 top-5 rounded-full border bg-background px-3 py-1 text-sm font-semibold shadow-sm">
                            404
                        </span>

                        <span className="absolute -bottom-1 left-2 rounded-full border bg-background p-3 shadow-sm">
                            <Search className="h-5 w-5 text-primary" />
                        </span>
                    </div>

                    {/* Message */}
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                        Page not found
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                        Oops! Lost in the shop?
                    </h1>

                    <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                        The page you're looking for doesn't exist,
                        may have been moved, or is temporarily
                        unavailable. Let's get you back on track.
                    </p>

                    {/* Actions */}
                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button asChild size="lg">
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Go to Homepage
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>

                        <Button
                            variant="ghost"
                            size="lg"
                            asChild
                        >
                            <Link href="/shop">
                                Browse Products
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    {/* Footer */}
                    <p className="mt-12 text-sm text-muted-foreground">
                        Need help? Try returning to the homepage
                        or browsing our latest products.
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
}