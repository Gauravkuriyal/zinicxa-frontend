"use client";
import AuthSection from "@/components/auth/authSection";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function LoginPage() {

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (user) {
                router.push("/dashboard");
                return;
            }
        }
    }, [user, loading])

    return (<>
        <AuthSection />
    </>)
}