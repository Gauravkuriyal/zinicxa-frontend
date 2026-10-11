"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";

interface Props {
    search: string;
    setSearch: (v: string) => void;
}

export default function FormToolbar({
    search,
    setSearch
}: Props) {
    return (
        <div className="flex items-center justify-between gap-4">

            <div className="relative w-96">

                <Search
                    className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
                />

                <Input
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="pl-10"
                    placeholder="Search..."
                />

            </div>

        </div>
    );
}