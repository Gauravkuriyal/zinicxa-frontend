"use client";

import { useEffect, useState } from "react";

import { useAuthApi } from "@/hooks/useAuthApi";

import toast from "react-hot-toast";
import { User } from "@/types/user";
import UserToolbar from "@/components/dashboard/superAdmin/users/userToolbar";
import UserTable from "@/components/dashboard/superAdmin/users/userTable";
import UserFormDialog from "@/components/dashboard/superAdmin/users/userFormDialog";
import UserRetailerProfileDialog from "@/components/dashboard/superAdmin/users/userRetailerProfileDialog";
import SalesmanAssignedRetailersDialog from "@/components/dashboard/superAdmin/users/salesmanAssignedRetailersDialog";
import { CustomPagination } from "@/components/utils/customPagination";

export default function UsersPage() {
    const api = useAuthApi();

    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);
    const [salesmanAssignedRetailersDialogOpen, setSalesmanAssignedRetailersDialogOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [filters,setFilters] = useState<{
        role: string
    } >({
        role:""
    });

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const getUsers = async () => {
        try {
            setLoading(true);

            const res = await api.get("/api/superAdmin/user", {
                params: {
                    page,
                    search,
                    ...filters,
                },
            });

            setUsers(res.data.users);

            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId: string) => {
        try {
            setLoading(true);
            const res = await api.delete(`/api/superAdmin/user/${userId}`);
            toast.success("Deleted Successfully");
            getUsers();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const restoreUser = async (userId: string) => {
        try {
            setLoading(true);
            const res = await api.patch(`/api/superAdmin/user/${userId}/unblock`);
            toast.success("Deleted Successfully");
            getUsers();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, [page, search,filters]);

    return (
        <div className="space-y-6">
            <div>
                <h1
                    className="
                        text-3xl
                        font-bold
                    "
                >
                    Users
                </h1>
            </div>

            <UserToolbar
                search={search}
                setSearch={setSearch}
                setSelectedUser={setSelectedUser}
                setDialogOpen={setDialogOpen}
                filters={filters}
                setFilters={setFilters}
            />

            <UserTable
                loading={loading}
                users={users}
                onEdit={(user: User) => {
                    setSelectedUser(user);

                    setDialogOpen(true);
                }}
                onRetailerProfileView={(user: User) => {
                    setSelectedUser(user);
                    setProfileDialogOpen(true);
                }}
                onSalesmanAssignedRetailersView={(user: User) => {
                    setSelectedUser(user);
                    setSalesmanAssignedRetailersDialogOpen(true);
                }}
                onDelete={(user: User) => {
                    deleteUser(user._id);
                }}
                restoreUser={(user: User) => {
                    restoreUser(user._id);
                }}
                onAdd={() => {
                    setSelectedUser(null);
                    setDialogOpen(true);
                }}
            />

            <UserFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                user={selectedUser}
                refreshUsers={getUsers}
            />

            <UserRetailerProfileDialog
                open={profileDialogOpen}
                onOpenChange={setProfileDialogOpen}
                user={selectedUser}
                refreshUsers={getUsers}
            />
            
            <SalesmanAssignedRetailersDialog
                open={salesmanAssignedRetailersDialogOpen}
                onOpenChange={setSalesmanAssignedRetailersDialogOpen}
                user={selectedUser}
            />

            <CustomPagination currentPage={page} totalPages={totalPages} onPageChange={setPage}  />
        </div>
    );
}
