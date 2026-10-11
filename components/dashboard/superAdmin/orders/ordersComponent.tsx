"use client";

import { useEffect, useState } from "react";

import { useAuthApi } from "@/hooks/useAuthApi";

import toast from "react-hot-toast";
import { Order } from "@/types/order";
import OrderToolbar from "./orderToolbar";
import OrderTable from "./orderTable";
import OrderFormDialog from "./orderFormDialog";
import { useAuth } from "@/context/AuthContext";
import { CustomPagination } from "@/components/utils/customPagination";

export default function OrdersComponent() {

    const api = useAuthApi();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [selectedOrder, setSelectedOrder] =
        useState<Order | null>(null);

    const [orders, setOrders] = useState([]);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState<{
        orderStatus: string;
        paymentStatus: string;
        paymentMethod: string;
    }>({
        orderStatus: "",
        paymentStatus: "",
        paymentMethod: ""
    });

    const getOrders = async () => {
        try {
            if (loading) return;
            if (user?.role !== "SUPER_ADMIN" && user?.role !== "ADMIN") return;
            setLoading(true);
            let url = "";
            if (user?.role === "ADMIN") url = "/api/admin/order";
            else if (user?.role === "SUPER_ADMIN") url = "/api/superAdmin/order";
            if (url == "") return;
            const res = await api.get(url, {
                params: {
                    page,
                    search,
                    ...filters
                },
            });

            setOrders(res.data.orders);

            setTotalPages(res.data.totalPages);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // const deleteOrder = async (orderId:string) => {
    //     try {

    //         setLoading(true);
    //         const res = await api.delete(`/api/superAdmin/order/${orderId}`);
    //         toast.success("Deleted Successfully");
    //         getOrders();

    //     } catch (err) {
    //         console.log(err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const restoreOrder = async (userId:string) => {
    //     try {

    //         setLoading(true);
    //         const res = await api.patch(`/api/superAdmin/order/${userId}/unblock`);
    //         toast.success("Deleted Successfully");
    //         getUsers();

    //     } catch (err) {
    //         console.log(err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        if (user?.role !== "SUPER_ADMIN" && user?.role !== "ADMIN") return;
        getOrders();
    }, [page, search, user,filters]);

    return (
        <div className="space-y-6">
            <div>

                <h1
                    className="
                        text-3xl
                        font-bold
                    "
                >
                    Orders
                </h1>
            </div>


            <OrderToolbar
                search={search}
                setSearch={setSearch}
                // setSelectedOrder={setSelectedOrder}
                // setDialogOpen={setDialogOpen}
                filters={filters}
                setFilters={setFilters}
            />

            <OrderTable
                loading={loading}
                orders={orders}
                onEdit={(order: Order) => {
                    setSelectedOrder(order);

                    setDialogOpen(true);
                }}
                // onDelete={(user:User) => {
                //     deleteUser(user._id);
                // }}
                // restoreUser={(user:User) => {
                //     restoreUser(user._id);
                // }}
                onAdd={() => {
                    setSelectedOrder(null);
                    setDialogOpen(true);
                }}
            />

            <OrderFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                order={selectedOrder}
                refreshOrders={getOrders}
            />

            <CustomPagination currentPage={page} totalPages={totalPages} onPageChange={setPage}  />


        </div>
    );
}