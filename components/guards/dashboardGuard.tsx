"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    //   useEffect(() => {
    //     const authToken = localStorage.getItem("auth_token");
    //     const userString = localStorage.getItem("user");

    //     // Not logged in
    //     if (!authToken || !userString) {
    //       router.replace("/login");
    //       return;
    //     }

    //     try {
    //       const user = JSON.parse(userString);

    //       // Logged in but onboarding is not complete
    //       if (!user.onboardingComplete) {
    //         router.replace("/retailer/onboarding");
    //         return;
    //       }

    //       // Everything is fine
    //       setChecking(false);
    //     } catch {
    //       // Invalid user data
    //       localStorage.removeItem("user");
    //       router.replace("/login");
    //     }
    //   }, [router]);

    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/login");
                return;
            }
            else{
                if(user.role=="RETAILER"){
                    if(!user.isApproved){
                        router.push("/retailer/onboarding");
                    }
                }
            }

            setChecking(false);
        }
    }, [user, loading])



    // Don't render dashboard while checking
    if (checking) {
        return null;
    }

    return <>{children}</>;
}