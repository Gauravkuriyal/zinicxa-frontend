"use client";

import DashboardSidebar from "@/components/dashboard/sidebar";
import DashboardGuard from "@/components/guards/dashboardGuard";

import {
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardGuard>
            <SidebarProvider>

                <DashboardSidebar />

                <main className="w-full h-screen p-6 overflow-x-scroll scrollbar-hide">
                    {children}

                </main>

            </SidebarProvider>
        </DashboardGuard>
    );
}