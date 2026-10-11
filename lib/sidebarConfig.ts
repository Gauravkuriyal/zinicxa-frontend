import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    Package,
    ClipboardList,
    BarChart3,
    Settings,
    LifeBuoy,
    FileText,
    Target,
    Store,
    ShoppingCart,
    Bell,
    Wallet,
    User2,
    Tag,
    Heart,
    ClipboardEdit,
    UserCheck,
    RectangleGoggles,
    Form,
} from "lucide-react";

import { Role } from "./roles";

export const sidebarItems = [
    // Common
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        roles: Object.values(Role),
    },

    {
        title: "Support",
        url: "/dashboard/support",
        icon: LifeBuoy,
        roles: Object.values(Role),
    },

    {
        title: "Account",
        url: "/dashboard/account",
        icon: User2,
        roles: Object.values(Role),
    },

    // {
    //     title: "Notifications",
    //     url: "/dashboard/notifications",
    //     icon: Bell,
    //     roles: Object.values(Role),
    // },

    // SUPER ADMIN

    {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
        roles: [Role.SUPER_ADMIN],
    },

    {
        title: "Banners",
        url: "/dashboard/banners",
        icon: RectangleGoggles,
        roles: [Role.SUPER_ADMIN],
    },
    
    {
        title: "Contact Forms",
        url: "/dashboard/contact-forms",
        icon: Form,
        roles: [Role.SUPER_ADMIN],
    },
    
    {
        title: "Subscribe Forms",
        url: "/dashboard/subscribe-forms",
        icon: Form,
        roles: [Role.SUPER_ADMIN],
    },

    {
        title: "Categories",
        url: "/dashboard/categories",
        icon: Tag,
        roles: [Role.SUPER_ADMIN],
    },

    {
        title: "Products",
        url: "/dashboard/products",
        icon: ShoppingBag,
        roles: [Role.SUPER_ADMIN],
    },

    // {
    //     title: "Inventory",
    //     url: "/dashboard/inventory",
    //     icon: Package,
    //     roles: [Role.SUPER_ADMIN],
    // },

    {
        title: "Orders",
        url: "/dashboard/orders",
        icon: ClipboardList,
        roles: [Role.SUPER_ADMIN],
    },
    {
        title: "Retail Orders",
        url: "/dashboard/orders/retail-orders",
        icon: ClipboardEdit,
        roles: [Role.SUPER_ADMIN],
    },

    {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: BarChart3,
        roles: [Role.SUPER_ADMIN],
    },

    // {
    //     title: "Reports",
    //     url: "/dashboard/reports",
    //     icon: FileText,
    //     roles: [Role.SUPER_ADMIN],
    // },

    // {
    //     title: "Pricing",
    //     url: "/dashboard/pricing",
    //     icon: Wallet,
    //     roles: [Role.SUPER_ADMIN],
    // },

    // ADMIN

    {
        title: "Orders",
        url: "/dashboard/orders",
        icon: ClipboardList,
        roles: [Role.ADMIN],
    },
    {
        title: "Retail Orders",
        url: "/dashboard/orders/retail-orders",
        icon: ClipboardEdit,
        roles: [Role.ADMIN],
    },

    // {
    //     title: "Retailers",
    //     url: "/dashboard/retailers",
    //     icon: Store,
    //     roles: [Role.ADMIN],
    // },

    {
        title: "Products",
        url: "/dashboard/products",
        icon: ShoppingBag,
        roles: [Role.ADMIN],
    },

    // {
    //     title: "Inventory",
    //     url: "/dashboard/inventory",
    //     icon: Package,
    //     roles: [Role.ADMIN],
    // },

    // {
    //     title: "Invoices",
    //     url: "/dashboard/invoices",
    //     icon: FileText,
    //     roles: [Role.ADMIN],
    // },

    // {
    //     title: "Analytics",
    //     url: "/dashboard/analytics",
    //     icon: BarChart3,
    //     roles: [Role.ADMIN],
    // },

    // SALESMAN

    {
        title: "Assigned Retailers",
        url: "/dashboard/assigned-retailers",
        icon: Store,
        roles: [Role.SALESMAN],
    },

    {
        title: "Products",
        url: "/dashboard/products",
        icon: ShoppingBag,
        roles: [Role.SALESMAN],
    },

    {
        title: "Cart",
        url: "/dashboard/retail-cart",
        icon: ShoppingCart,
        roles: [Role.SALESMAN],
    },

    {
        title: "Orders",
        url: "/dashboard/orders",
        icon: ClipboardList,
        roles: [Role.SALESMAN],
    },

    // {
    //     title: "Targets",
    //     url: "/dashboard/targets",
    //     icon: Target,
    //     roles: [Role.SALESMAN],
    // },

    // {
    //     title: "Visit Reports",
    //     url: "/dashboard/visit-reports",
    //     icon: FileText,
    //     roles: [Role.SALESMAN],
    // },

    // {
    //     title: "Analytics",
    //     url: "/dashboard/analytics",
    //     icon: BarChart3,
    //     roles: [Role.SALESMAN],
    // },

    // RETAILER

    {
        title: "Products",
        url: "/dashboard/products",
        icon: ShoppingBag,
        roles: [Role.RETAILER],
    },

    {
        title: "Cart",
        url: "/dashboard/retail-cart",
        icon: ShoppingCart,
        roles: [Role.RETAILER],
    },

    {
        title: "My Orders",
        url: "/dashboard/orders",
        icon: ClipboardList,
        roles: [Role.RETAILER],
    },

    {
        title: "Profile",
        url: "/retailer/onboarding",
        icon: UserCheck,
        roles: [Role.RETAILER],
    },

    // {
    //     title: "Invoices",
    //     url: "/dashboard/invoices",
    //     icon: FileText,
    //     roles: [Role.RETAILER],
    // },

    // {
    //     title: "Analytics",
    //     url: "/dashboard/analytics",
    //     icon: BarChart3,
    //     roles: [Role.RETAILER],
    // },

    // CUSTOMER

    // {
    //     title: "Products",
    //     url: "/dashboard/products",
    //     icon: ShoppingBag,
    //     roles: [Role.CUSTOMER],
    // },

    {
        title: "Cart",
        url: "/dashboard/cart",
        icon: ShoppingCart,
        roles: [Role.CUSTOMER],
    },

    {
        title: "My Orders",
        url: "/dashboard/orders",
        icon: ClipboardList,
        roles: [Role.CUSTOMER],
    },

    {
        title: "Wishlist",
        url: "/dashboard/wishlist",
        icon: Heart,
        roles: [Role.CUSTOMER],
    },
];