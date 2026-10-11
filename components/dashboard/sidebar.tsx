// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { sidebarItems } from "@/lib/sidebarConfig";
// import { useAuth } from "@/context/AuthContext";

// import {
//     Sidebar,
//     SidebarContent,
//     SidebarGroup,
//     SidebarGroupContent,
//     SidebarMenu,
//     SidebarMenuItem,
//     SidebarMenuButton,
// } from "@/components/ui/sidebar";

// export default function DashboardSidebar() {
//     const pathname = usePathname();

//     const { user } = useAuth();

//     if (!user) return null;

//     const items = sidebarItems.filter((item) =>
//         item.roles.includes(user.role)
//     );

//     return (
//         <Sidebar>
//             <SidebarContent>

//                 <SidebarGroup>

//                     <SidebarGroupContent>

//                         <SidebarMenu>

//                             {items.map((item) => (
//                                 <SidebarMenuItem key={item.title}>

//                                     <SidebarMenuButton
//                                         asChild
//                                         isActive={
//                                             pathname === item.url
//                                         }
//                                     >
//                                         <Link href={item.url}>
//                                             <item.icon size={18} />
//                                             <span>
//                                                 {item.title}
//                                             </span>
//                                         </Link>
//                                     </SidebarMenuButton>

//                                 </SidebarMenuItem>
//                             ))}

//                         </SidebarMenu>

//                     </SidebarGroupContent>

//                 </SidebarGroup>

//             </SidebarContent>
//         </Sidebar>
//     );
// }


"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { sidebarItems } from "@/lib/sidebarConfig";

import { ArrowLeft, LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function DashboardSidebar() {
    const pathname = usePathname();

    const { user, setUser } = useAuth();
    const router = useRouter();

    if (!user) return null;

    const items = sidebarItems.filter(item =>
        item.roles.includes(user.role)
    );

    const logout = async () => {
        console.log("Logged out")
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        setUser(null);
        router.push("/login");
    }

    return (
        <aside
            className="
                w-72
                border-r
                bg-background
                flex
                flex-col
                shrink-0
            "
        >
            {/* Logo */}

            <div className="flex justify-between p-6 border-b">
                <div>
                    <h2 className="text-xl font-bold">
                        Zinicxa
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Dashboard
                    </p>
                </div>

                <Link href={"/"} className="cursor-pointer" ><Button className="cursor-pointer flex gap-2"><ArrowLeft className="w-2"/> Back</Button></Link>
            </div>

            {/* Menu */}

            <div className="flex-1 overflow-y-auto p-3">

                <div className="space-y-1">

                    {items.map(item => {
                        const active =
                            pathname === item.url;

                        return (
                            <Link
                                key={item.title}
                                href={item.url}
                                className={`
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-4
                                    py-3
                                    transition-all

                                    ${active
                                        ? "bg-primary text-primary-foreground shadow"
                                        : "hover:bg-muted"
                                    }
                                `}
                            >
                                <item.icon size={18} />

                                <span>
                                    {item.title}
                                </span>
                            </Link>
                        );
                    })}
                </div>

            </div>

            {/* User Section */}

            <div className="border-t p-4">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            h-10
                            w-10
                            rounded-full
                            bg-primary
                            text-primary-foreground
                            flex
                            items-center
                            justify-center
                            font-semibold
                        "
                    >
                        {user.name?.charAt(0)}
                    </div>

                    <div>

                        <p className="font-medium">
                            {user.name}
                        </p>

                        <p
                            className="
                                text-xs
                                text-muted-foreground
                            "
                        >
                            {user.role}
                        </p>

                    </div>

                </div>

                <button
                    className="
                        mt-4
                        flex
                        w-full
                        items-center
                        gap-2
                        rounded-lg
                        border
                        px-3
                        py-2
                        hover:bg-muted
                        cursor-pointer
                    "
                    onClick={logout}
                >
                    <LogOut size={16} />
                    Logout
                </button>

            </div>

        </aside>
    );
}