"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    price: number;
    setPrice: (value: number) => void;

    discountPrice: number;
    setDiscountPrice: (value: number) => void;
    
    retailPrice: number;
    setRetailPrice: (value: number) => void;
    
    minimumOrderQuantity: number;
    setMinimumOrderQuantity: (value: number) => void;

    stock: number;
    setStock: (value: number) => void;

    rating: number;
    setRating: (value: number) => void;
}

export default function ProductPricingSection({
    price,
    setPrice,
    discountPrice,
    setDiscountPrice,
    retailPrice,
    setRetailPrice,
    minimumOrderQuantity,
    setMinimumOrderQuantity,
    stock,
    setStock,
    rating,
    setRating
}: Props) {
    return (
        <div className="space-y-6">

            {/* <h2 className="text-lg font-semibold">
                Pricing
            </h2> */}

            <div className="grid grid-cols-4 gap-5">

                <div>

                    <Label className="mb-2">Price</Label>

                    <Input
                        type="number"
                        min={0}
                        value={price}
                        onChange={(e) =>
                            setPrice(Number(e.target.value))
                        }
                    />

                </div>

                <div>

                    <Label className="mb-2">Discount Price</Label>

                    <Input
                        type="number"
                        min={0}
                        value={discountPrice}
                        onChange={(e) =>
                            setDiscountPrice(Number(e.target.value))
                        }
                    />

                </div>

                <div>

                    <Label className="mb-2">Stock</Label>

                    <Input
                        type="number"
                        min={0}
                        value={stock}
                        onChange={(e) =>
                            setStock(Number(e.target.value))
                        }
                    />

                </div>

                <div>

                    <Label className="mb-2">Rating</Label>

                    <Input
                        type="number"
                        min={0}
                        value={rating}
                        onChange={(e) =>
                            setRating(Number(e.target.value))
                        }
                    />

                </div>

                <div>

                    <Label className="mb-2">Retail Price</Label>

                    <Input
                        type="number"
                        min={0}
                        value={retailPrice}
                        onChange={(e) =>
                            setRetailPrice(Number(e.target.value))
                        }
                    />

                </div>
                
                <div>

                    <Label className="mb-2">Minimum Order Quantity</Label>

                    <Input
                        type="number"
                        min={0}
                        value={minimumOrderQuantity}
                        onChange={(e) =>
                            setMinimumOrderQuantity(Number(e.target.value))
                        }
                    />

                </div>

            </div>

        </div>
    );
}