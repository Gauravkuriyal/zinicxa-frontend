"use client";
import OnboardingLayout from "@/components/retailer/onboarding/onboardingLayout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function RetailerOnboardingPage() {

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/retailer/register");
                return;
            }
        }
    }, [user, loading])

    return (<>
        <OnboardingLayout />
    </>)
}