import { useEffect, useState } from "react";
import { useAuthApi } from "@/hooks/useAuthApi";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import CustomerOrderCard from "./customerOrderCard";
import { Order } from "@/types/order";
import { CustomPagination } from "@/components/utils/customPagination";
import { useAuth } from "@/context/AuthContext";

export default function CustomerOrdersList() {
    const api = useAuthApi();
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // const [filters, setFilters] = useState<{
    //     orderStatus: string;
    //     paymentStatus: string;
    //     paymentMethod: string;
    // }>({
    //     orderStatus: "",
    //     paymentStatus: "",
    //     paymentMethod: ""
    // });

    const fetchOrders = async () => {
        if (user?.role != "CUSTOMER") return;
        if (loading) return
        setLoading(true);
        try {
            const res = await api.get("/api/customer/order", {
                params: {
                    page,
                }
            });
            setOrders(res.data.orders);
            setTotalPages(res.data.totalPages);
        } catch {
            toast.error("Failed to load orders.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (!user) return;
        if (user.role != "CUSTOMER") return;
        fetchOrders();
    }, [user, page])

    if (loading) return (
        <div className="p-4 ">
            <p>Loading</p> <span className="animate-spin"><Loader /></span>
        </div>
    )
    else if (orders?.length <= 0) return (
        <div className="p-4">
            <p>No orders to show </p>
        </div>
    )
    return (
        <div>

            <div className="space-y-5">
                {orders?.map((order: Order) => (
                    <CustomerOrderCard
                        key={order._id}
                        order={order}
                    />
                ))}
            </div>

            <CustomPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>

    );
}