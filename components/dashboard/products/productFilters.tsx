import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ProductFilters() {
    return (
        <div className="flex flex-wrap gap-3">

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="earbuds">
                        Earbuds
                    </SelectItem>

                    <SelectItem value="speakers">
                        Speakers
                    </SelectItem>

                    <SelectItem value="soundbars">
                        Soundbars
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort By" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="rating">
                        Highest Rated
                    </SelectItem>

                    <SelectItem value="price-low">
                        Price Low → High
                    </SelectItem>

                    <SelectItem value="price-high">
                        Price High → Low
                    </SelectItem>
                </SelectContent>
            </Select>

        </div>
    );
}