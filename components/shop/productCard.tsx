import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthApi } from "@/hooks/useAuthApi";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductCard({
    product,
}: {
    product: Product
}) {

    const { addToCart, removeFromCart, checkInCart } = useCart();
    const api = useAuthApi();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isWishlisted,setIsWishlisted] = useState<boolean>(product.isWishlisted?product.isWishlisted:false);

    const toggleWishlist = async () => {
        if (loading) return;
        if(!user){
            toast.error("Please login to wishlist")
        }
        if(user?.role !== "CUSTOMER") return;
        setLoading(true);
        try {
            const res = await api.post(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/customer/wishlist/${product._id}`);
            // toast.success("Wishlisted");
            setIsWishlisted(!isWishlisted);
        } catch (err) {
            console.log(err);
            let errorMessage = "Something went wrong. Please try again.";
            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.message || errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            toast.error(errorMessage)
        }
        finally{
            setLoading(false)
        }

    }

    return (
        <div className="group overflow-hidden rounded-lg transition-all duration-300 border-none hover:-translate-y-1 hover:shadow-2xl p-0">
            {/* Image */}
            <div className="relative overflow-hidden">
                <Link target="_blank" href={`/product/${product.slug}`} className="block aspect-square overflow-hidden">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${product.cover}`}
                        alt={product.name}
                        fill
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                {/* <Badge className="absolute left-4 top-4 rounded-xl">
          {product.category.name}
        </Badge> */}
                <button onClick={toggleWishlist} className="group/button absolute right-4 p-0 top-4 rounded-xl bg-white text-rose-800 hover:text-rose-800 cursor-pointer">
                    <Heart className={`transition-all group-hover/button:scale-[110%] ${isWishlisted?"fill-rose-800":""}`} />
                </button>
            </div>

            {/* Content */}
            <div className="space-y-4 p-5 pt-0">
                <div className="mb-0">
                    <div className="flex justify-between items-center">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            {product.category.name}
                        </p>
                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 rounded-full bg-yellow-300 px-3 py-1 text-xs">
                                <Star className="h-3 w-3 fill-current" />
                                {product.rating}
                            </div>
                        </div>
                    </div>
                    {product.subCategory ? <Badge className=" rounded-xl my-2">
                        {product.subCategory.name}
                    </Badge> : null}

                    <Link target="_blank" href={`/product/${product.slug}`} className="mt-2 text font-semibold line-clamp-1">
                        {product.name}
                    </Link>
                </div>

                <div className="text-xs line-clamp-2 mt-2 mb-4 text-muted-foreground">
                    {product.shortDescription}
                </div>


                {/* Price */}
                <div className="flex items-center pt-0 justify-between">
                    <div>
                        <p className="text-lg font-bold">
                            ₹{product.discountPrice} {product.discountPrice ?
                                <span className="text-xs font-bold line-through text-muted-foreground ">
                                    ₹{product.price}
                                </span> : null}
                        </p>

                    </div>

                    {checkInCart(product._id) ?
                        <Button onClick={() => removeFromCart(product._id)} className="text-xs bg-rose-600">
                            Remove From Cart
                        </Button> :
                        <Button onClick={() => addToCart(product._id)} className="text-xs">
                            Add To Cart
                        </Button>}
                </div>
            </div>
        </div>
    )
}