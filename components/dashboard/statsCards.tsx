import {
    FileText,
    Package,
    ShoppingCart,
    IndianRupee,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useAuthApi } from "@/hooks/useAuthApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Order } from "@/types/order";

const stats = [
    {
        title: "Total Orders",
        value: "totalOrders",
        icon: Package,
    },
    // {
    //     title: "Invoices",
    //     value: "97",
    //     icon: FileText,
    // },
    // {
    //     title: "Total Spend",
    //     value: "₹2.4L",
    //     icon: IndianRupee,
    // },
];

export default function StatsCards() {
    const api = useAuthApi();
    const {user} = useAuth();

    const [statsData,setStatsData] = useState({
        totalOrders: 0
    });
    const [recentOrders,setRecentOrders] = useState<Order[]>([]);
    const fetchOrders = async () => {
        try {
            let url = "";
            if(user?.role == "CUSTOMER") url = "/api/customer/order";
            if(user?.role == "RETAILER") url = "/api/retailer/order";
            if(user?.role == "SALESMAN") url = "/api/salesman/order";
            if(user?.role == "ADMIN") url = "/api/admin/order";
            if(user?.role == "SUPER_ADMIN") url = "/api/superAdmin/order";
            if(url == "")return;
            const res = await api.get(url);
            
            
            
            // await api.get("api/analytics/sales/top-products");
            


            setStatsData({...statsData,totalOrders:res.data.orders.length});
            setRecentOrders(res.data.orders);
        } catch (err){
            console.log(err);
            toast.error("Failed to load orders.");
        } finally {
        }
    }
    useEffect(() => {
        if(!user) return;
        fetchOrders();
    },[user])

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    {stat.title}
                                </p>

                                <h3 className="mt-2 text-2xl font-bold">
                                    {statsData[stat.value as "totalOrders"]}
                                </h3>
                            </div>

                            <stat.icon className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
        
    );
}