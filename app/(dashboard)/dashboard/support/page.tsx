"use client";
import AdminSupportSection from "@/components/dashboard/support/admin/adminSupportSection";
import CustomerSupportSection from "@/components/dashboard/support/customer/customerSupportSection";
import RetailerSupportSection from "@/components/dashboard/support/retailer/retailerSupportSection";
import SalesmanSupportSection from "@/components/dashboard/support/salesman/salesmanSupportSection";
import SuperAdminSupportSection from "@/components/dashboard/support/superAdmin/superAdminSupportSection";
import { useAuth } from "@/context/AuthContext";

export default function SupportPage() {
    const {user} = useAuth();
    return (
        <div className="space-y-6">
            {user?.role=="RETAILER"?<RetailerSupportSection />:null}
            {user?.role=="SALESMAN"?<SalesmanSupportSection />:null}
            {user?.role=="ADMIN"?<AdminSupportSection />:null}
            {user?.role=="SUPER_ADMIN"?<SuperAdminSupportSection />:null}
            {user?.role=="CUSTOMER"?<CustomerSupportSection />:null}

        </div>
    );
}