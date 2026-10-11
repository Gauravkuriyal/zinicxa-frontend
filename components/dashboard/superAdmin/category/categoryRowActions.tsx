import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CategoryRowActions() {
    return (
        <div className="flex gap-2">

            <Button
                size="icon"
                variant="outline"
            >
                <Pencil className="h-4 w-4" />
            </Button>

            <Button
                size="icon"
                variant="destructive"
            >
                <Trash2 className="h-4 w-4" />
            </Button>

        </div>
    );
}