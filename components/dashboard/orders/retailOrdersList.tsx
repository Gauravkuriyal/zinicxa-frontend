import { useEffect, useState } from "react";
import OrderCard from "./orderCard";
import { RetailOrder } from "@/types/retailOrder";
import { useAuthApi } from "@/hooks/useAuthApi";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { CustomPagination } from "@/components/utils/customPagination";
import RetailOrderToolbar from "./retailOrderToolbar";

export default function RetailOrdersList() {

    const api = useAuthApi();
    const { user } = useAuth();
    const [orders, setOrders] = useState<RetailOrder[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<{
        pending: string;
        retailer: string;
        salesman: string;
        currentStage: string;
        paymentStatus: string;
    }>({
        pending: "",
        retailer: "",
        salesman: "",
        currentStage: "",
        paymentStatus: ""
    });

    const [totalPages, setTotalPages] = useState(1);

    const fetchOrders = async () => {
        if (loading) return;
        try {
            let url = "";
            if (user?.role == "RETAILER") url = "/api/retailer/order";
            else if (user?.role == "SALESMAN") url = "/api/salesman/order";
            else if (user?.role == "ADMIN") url = "/api/admin/retail-order";
            else if (user?.role == "SUPER_ADMIN") url = "/api/superAdmin/retail-order";
            if (url == "") return;

            setLoading(true)
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

            toast.error("Failed to load orders.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (!user) return;
        fetchOrders();
    }, [user, page, search, filters])


    if (orders.length <= 0) {
        return (
            <div className="p-4">
                <p>No orders to show </p>
            </div>
        )
    }

    return (
        <div>
            {user?.role == "SUPER_ADMIN" || user?.role === "ADMIN" || user?.role === "SALESMAN" ? <RetailOrderToolbar
                search={search}
                setSearch={setSearch}
                filters={filters}
                setFilters={setFilters}
            /> : null}

            <div className="space-y-5">
                {orders.map((order: RetailOrder) => (
                    <OrderCard
                        key={order._id}
                        order={order}
                        fetchOrders={fetchOrders}
                    />
                ))}
            </div>

            <CustomPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>

    );
}