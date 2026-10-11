"use client";

import { useAuth } from "@/context/AuthContext";
import { Role } from "@/lib/roles";

interface Props {
    allowedRoles: Role[];
    children: React.ReactNode;
}

export default function RoleGuard({
    allowedRoles,
    children,
}: Props) {
    const { user } = useAuth();

    if (!user) {
        return (
            <div>
                Please Login
            </div>
        );
    }

    if (
        !allowedRoles.includes(
            user.role
        )
    ) {
        return (
            <div>
                Unauthorized
            </div>
        );
    }

    return <>{children}</>;
}