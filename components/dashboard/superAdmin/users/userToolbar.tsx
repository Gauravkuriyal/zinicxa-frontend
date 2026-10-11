"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Role } from "@/lib/roles";

interface Props {
    search: string;
    setSearch: (v: string) => void;
    setSelectedUser: (v: any) => void;
    setDialogOpen: (v: boolean) => void;
    filters: {
        role?: string
    },
    setFilters: (v: any) => void;

}

export default function UserToolbar({
    search,
    setSearch,
    setSelectedUser,
    setDialogOpen,
    filters,
    setFilters
}: Props) {
    return (
        <div className="flex items-center gap-4">

            <div className="relative w-full">

                <Search
                    className="absolute left-3 top-2 h-4 w-4 text-muted-foreground"
                />

                <Input
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="pl-10"
                    placeholder="Search user..."
                />


            </div>

            <div>
                <Select onValueChange={(value)=>{
                    value==="ALL"?setFilters({...filters,role:""}):setFilters({...filters,role:value})
                }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Role" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value={"ALL"}>
                                All
                        </SelectItem>
                        {Object.entries(Role).map(([key, value]) => (
                            <SelectItem key={key} value={value}>
                                {key}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>


            {/* <Button
                onClick={() => {
                    setSelectedUser(null);

                    setDialogOpen(true);
                }}
            >

                <Plus className="mr-2 h-4 w-4" />

                Add User

            </Button> */}

        </div>
    );
}