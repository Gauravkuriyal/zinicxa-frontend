"use client";
import RetailerRegister from "@/components/retailer/retailerRegister";
import Footer from "@/components/utils/footer";
import Header from "@/components/utils/header";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function RetailerRegisterPage() {

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (user) {
                console.log("user ",user)
                router.push("/dashboard");
                return;
            }
        }
    }, [user, loading])

    return (<>
        <Header/>
        <RetailerRegister />
        <Footer />
    </>)
}