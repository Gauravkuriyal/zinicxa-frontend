"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Category } from "@/types/category";

interface Props {
    search: string;
    setSearch: (v: string) => void;
    setSelectedCategory: (v: any) => void;
    setDialogOpen: (v: boolean) => void;
}

export default function CategoryToolbar({
    search,
    setSearch,
    setSelectedCategory,
    setDialogOpen
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
                    placeholder="Search categories..."
                />

            </div>

            <Button
                onClick={() => {
                    setSelectedCategory(null);

                    setDialogOpen(true);
                }}
            >

                <Plus className="mr-2 h-4 w-4" />

                Add Category

            </Button>

        </div>
    );
}