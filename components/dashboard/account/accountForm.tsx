"use client";

import ProfileCard from "./profileCard";
import BusinessCard from "./businessCard";
import { useAuth } from "@/context/AuthContext";
import Addresses from "./addresses";

export default function AccountForm() {
    const { user } = useAuth();

    if (!user) {
        return (<div className="space-y-6">

            <p>Something went wrong</p>

        </div>)
    }
    return (
        <div className="space-y-6">

            <ProfileCard user={user} />
            {/* {user?.role == "SALESMAN" ?
                <BusinessCard /> : null} */}

            {user?.role =="CUSTOMER" || user?.role =="RETAILER"?<Addresses />:null}

        </div>
    );
}