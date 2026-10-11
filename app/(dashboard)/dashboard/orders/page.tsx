"use client";

import RetailOrdersList
from "@/components/dashboard/orders/retailOrdersList";

import OrderFilters
from "@/components/dashboard/orders/orderFilters";

import { useAuth } from "@/context/AuthContext";
import CustomerOrdersList from "@/components/dashboard/orders/customerOrderList";
import OrdersComponent from "@/components/dashboard/superAdmin/orders/ordersComponent";

export default function OrdersPage() {
    const {user} = useAuth();

    return (
        <div className="space-y-6">

            <div>

                <h1
                    className="
                        text-3xl
                        font-bold
                    "
                >
                    My Orders
                </h1>

                <p
                    className="
                        text-muted-foreground
                    "
                >
                    Track all your orders.
                </p>

            </div>

            {/* <OrderFilters /> */}

            {user?.role =="RETAILER" || user?.role=="SALESMAN"?<RetailOrdersList/>:null}
            
            {user?.role =="CUSTOMER"?<CustomerOrdersList/>:null}

            {user?.role=="SUPER_ADMIN" || user?.role == "ADMIN"?<OrdersComponent />:null}

        </div>
    );
}