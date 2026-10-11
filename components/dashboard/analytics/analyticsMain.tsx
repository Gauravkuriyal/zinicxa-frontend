"use client";

import OrderStatusAnalytics from "./orderStatusAnalytics";
import RevenueTrend from "./revenueTrend";
import TopSellingProducts from "./topSellingProducts";

export default function AnalyticsMain() {
    return(
        <>
            <RevenueTrend />
            <OrderStatusAnalytics />
            <TopSellingProducts />
        </>
    )
}