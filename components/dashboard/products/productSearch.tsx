import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function ProductSearch({search,setSearch}:{search:string,setSearch:(query:string)=>void}) {
    const {user} = useAuth();
    return (
        <div className="relative flex gap-2 items-center">
            <div className="w-full">
                <Search
                    className="
                    absolute
                    left-3
                    top-3
                    h-4
                    w-4
                    text-muted-foreground
                "
                />

                <Input
                    placeholder="Search products..."
                    className="pl-10 h-10"
                    onChange={(e)=>{
                        setSearch(e.target.value)
                    }}
                />
            </div>

            {user?.role === "SUPER_ADMIN"?<Link href={"/dashboard/products/new"}>
                <Button className="h-10">
                    Add New
                </Button>
            </Link>:null}
        </div>
    );
}