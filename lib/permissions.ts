import { Role } from "./roles";

export const permissions = {
    [Role.SUPER_ADMIN]: [
        "users",
        "products",
        "category",
        "orders",
        "inventory",
        "reports",
        "analytics",
    ],

    [Role.ADMIN]: [
        "orders",
        "inventory",
        "retailers",
        "invoice",
    ],

    [Role.SALESMAN]: [
        "assignedRetailers",
        "placeOrder",
        "visitReports",
        "targets",
    ],

    [Role.RETAILER]: [
        "browseProducts",
        "cart",
        "myOrders",
        "support",
    ],
    [Role.CUSTOMER]: [
        "cart",
        "myOrders",
        "support",
    ],
};