"use client";

import OrderTimeline from "@/components/dashboard/orderTimeline";
import QuickActions from "@/components/dashboard/quickActions";
import RecentOrders from "@/components/dashboard/recentOrders";
import ReorderProducts from "@/components/dashboard/reorderProducts";
import StatsCards from "@/components/dashboard/statsCards";
import SupportWidget from "@/components/dashboard/supportWidget";
import WelcomeBanner from "@/components/dashboard/welcomeBanner";
import Sidebar from "@/components/dashboard/sidebar";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/lib/roles";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardSummary from "@/components/dashboard/analytics/dashboardSummary";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/login");
                return;
            }

            console.log(user);
        }
    }, [user, loading])



    // switch (user.role) {
    //     case Role.SUPER_ADMIN:
    //         return (
    //             <h1>
    //                 Super Admin Dashboard
    //             </h1>
    //         );

    //     case Role.ADMIN:
    //         return (
    //             <h1>
    //                 Admin Dashboard
    //             </h1>
    //         );

    //     case Role.SALESMAN:
    //         return (
    //             <h1>
    //                 Salesman Dashboard
    //             </h1>
    //         );

    //     case Role.RETAILER:
    //         return (
    //             <h1>
    //                 Retailer Dashboard
    //             </h1>
    //         );

    //     default:
    //         return <div>No Role</div>;
    // }

    if (loading) {
        return <div>Loading ...</div>;
    }

    if (!user) {
        return <div>Login Please</div>; // Prevents flashing dashboard content before redirect
    }

    return (<>
        <div className="space-y-6">

            <WelcomeBanner />

            <DashboardSummary />

            <StatsCards />

            {/* <div className="grid gap-6 lg:grid-cols-3">

                <div className="lg:col-span-2">
                    <RecentOrders />
                </div>

                <QuickActions />

            </div> */}

            {/* <div className="grid gap-6 lg:grid-cols-2">

                <OrderTimeline />

                <SupportWidget />

            </div> */}

            {/* <ReorderProducts /> */}

        </div>
    </>)
}