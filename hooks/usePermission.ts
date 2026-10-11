"use client";

import { useAuth } from "@/context/AuthContext";
import { permissions } from "@/lib/permissions";

export function usePermission() {
    const { user } = useAuth();

    const hasPermission = (
        permission: string
    ) => {
        if (!user) return false;

        return permissions[
            user.role
        ]?.includes(permission);
    };

    return {
        hasPermission,
    };
}