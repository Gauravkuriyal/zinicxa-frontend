"use client";

import { useEffect, useState } from "react";

import { useAuthApi } from "@/hooks/useAuthApi";
import toast from "react-hot-toast";

import { User } from "@/types/user";
import { CustomDialog } from "@/components/utils/customDialog";
import OnboardingProfileView from "./onboardingRetailerProfileView";

interface Props {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    user: User | null;

    refreshUsers: () => void;
}

export default function UserRetailerProfileDialog({
    open,
    onOpenChange,
    user,
    refreshUsers,
}: Props) {
    const api = useAuthApi();

    const [loading, setLoading] = useState(false);
    const [profileData,setProfileData] = useState(null); 
    const [userData,setUserData] = useState(null); 

    const getRetailerProfile = async () => {
        if(user?.role !== "RETAILER") {
            return;
        }
        if(loading) return;

        try {
            setLoading(true);


            const response = await api.get(`/api/superAdmin/user/${user!._id}/retailer/profile`);
            setProfileData(response.data.profile);
            setUserData(response.data.user);
            
        } catch (err: any) {

            toast.error(
                err?.response?.data?.message ??
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        if (!open) return;

        if(user?.role !== "RETAILER") {
            onOpenChange(false);
        }

        getRetailerProfile();

    }, [user, open]);


    const approveRetailer = async (approveStatus:boolean=true) => {
        if(loading) return;
        try {
            setLoading(true);


            await api.patch(`/api/superAdmin/user/${user!._id}/retailer/profile/approve`,{
                approveStatus
            });

            toast.success(
                "Retailer Approved"
            );
            

            refreshUsers();

            onOpenChange(false);

        } catch (err: any) {

            toast.error(
                err?.response?.data?.message ??
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }
    };

    if(!profileData || !userData){
        return;
    }

    return (

        <CustomDialog
            open={open}
            onOpenChange={(open) => {
                onOpenChange(open);
                if (!open) {
                    setProfileData(null);
                    setUserData(null);
                }
            }}
        >
            <OnboardingProfileView approveRetailer={approveRetailer} user={userData} profile={profileData} />
        </CustomDialog>
    )

}