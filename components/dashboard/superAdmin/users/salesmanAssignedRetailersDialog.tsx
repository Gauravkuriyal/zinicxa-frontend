"use client";

import { useEffect, useState } from "react";

import { useAuthApi } from "@/hooks/useAuthApi";
import toast from "react-hot-toast";

import { User } from "@/types/user";
import { CustomDialog } from "@/components/utils/customDialog";
import OnboardingProfileView from "./onboardingRetailerProfileView";
import SalesmanAssignedRetailersView from "./salesmanAssignedRetailersView";

interface Props {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    user: User | null;
}

export default function SalesmanAssignedRetailersDialog({
    open,
    onOpenChange,
    user,
}: Props) {
    const api = useAuthApi();

    const [loading, setLoading] = useState(false);
    const [assignedRetailersData, setAssignedRetailerData] = useState(null);

    const getAssignedRetailers = async () => {
        if (user?.role !== "SALESMAN") {
            return;
        }
        if (loading) return;

        try {
            setLoading(true);


            const response = await api.get(`/api/superAdmin/retailerSalesman/salesman/${user!._id}/retailers/?limit=-1`);
            setAssignedRetailerData(response.data.retailers);

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

        if (user?.role !== "SALESMAN") {
            onOpenChange(false);
        }

        getAssignedRetailers();

    }, [user, open]);

    if (!assignedRetailersData) {
        return;
    }

    return (

        <CustomDialog
            open={open}
            onOpenChange={(open) => {
                onOpenChange(open);
                if (!open) {
                    setAssignedRetailerData(null);
                }
            }}
        >
            <SalesmanAssignedRetailersView retailers={assignedRetailersData} />
        </CustomDialog>
    )

}