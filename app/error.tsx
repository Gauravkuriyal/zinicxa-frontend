"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import Header from "@/components/utils/header";
import Footer from "@/components/utils/footer";

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        // Log the error for debugging or monitoring.
        console.error("Application error:", error);
    }, [error]);

    return (
        <>
            <Header />
            <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16">
                {/* Background decoration */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-destructive/10 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                </div>

                <div className="relative mx-auto w-full max-w-2xl text-center">
                    {/* Error illustration */}
                    <div className="relative mx-auto mb-8 flex h-48 w-48 items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-destructive/20 bg-destructive/5" />

                        <div className="absolute inset-5 rounded-full border border-dashed border-destructive/30" />

                        <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-destructive text-destructive-foreground shadow-xl shadow-destructive/20">
                            <AlertTriangle className="h-14 w-14" strokeWidth={1.5} />
                        </div>

                        <span className="absolute -right-2 top-5 rounded-full border bg-background px-3 py-1 text-sm font-semibold shadow-sm">
                            ERROR
                        </span>

                        <span className="absolute -bottom-1 left-2 rounded-full border bg-background p-3 shadow-sm">
                            <RefreshCw className="h-5 w-5 text-destructive" />
                        </span>
                    </div>

                    {/* Error message */}
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-destructive">
                        Something went wrong
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                        We hit a small snag.
                    </h1>

                    <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                        An unexpected error occurred while loading this page. Your data may
                        still be safe. Please try again or return to the homepage.
                    </p>

                    {/* Actions */}
                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button size="lg" onClick={reset}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>

                        <Button variant="outline" size="lg" asChild>
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Go to Homepage
                            </Link>
                        </Button>

                        <Button
                            variant="ghost"
                            size="lg"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                    </div>

                    {/* Optional error reference */}
                    {error.digest && (
                        <p className="mt-8 text-xs text-muted-foreground">
                            Error reference: {error.digest}
                        </p>
                    )}

                    <p className="mt-6 text-sm text-muted-foreground">
                        If the problem continues, please try again later or contact support.
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
}
