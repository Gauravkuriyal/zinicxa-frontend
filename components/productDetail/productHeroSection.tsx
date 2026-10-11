// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { ShieldCheck, Truck, RefreshCcw } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"
// import { Product } from "@/types/product"
// import { Badge } from "../ui/badge"

// // const sizes = ["15L", "22L"]

// export default function ProductHeroSection({ product }: { product: Product }) {
//     const [selectedImage, setSelectedImage] = useState(
//         product.cover
//     )

//     // const [selectedColor, setSelectedColor] = useState(
//     //     colors[0].name
//     // )

//     // const [selectedSize, setSelectedSize] = useState("22L")

//     return (
//         <section className="bg-background">
//             <div className="mx-auto grid gap-10 px-4 py-10 md:px-8 lg:grid-cols-3 lg:px-12">
//                 {/* LEFT COLUMN */}
//                 <div className="space-y-5">
//                     {/* Main Image */}
//                     <div className="overflow-hidden rounded-3xl border bg-muted">
//                         <div className="group relative aspect-square overflow-hidden">
//                             <Image
//                                 src={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${selectedImage}`}
//                                 alt="Product Image"
//                                 fill
//                                 className="object-cover transition-transform duration-700 group-hover:scale-105"
//                             />
//                         </div>
//                     </div>

//                     {/* Thumbnails */}
//                     <div className="grid grid-cols-4 gap-4">
//                         {[product.cover, ...product.gallery].map((image, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => setSelectedImage(image)}
//                                 className={cn(
//                                     "relative overflow-hidden rounded-2xl border transition-all",
//                                     selectedImage === image
//                                         ? "border-black ring-2 ring-black/10"
//                                         : "border-border hover:border-black/40"
//                                 )}
//                             >
//                                 <div className="relative aspect-[4/5]">
//                                     <Image
//                                         src={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${image}`}
//                                         alt={`Thumbnail ${index + 1}`}
//                                         fill
//                                         className="object-cover"
//                                     />
//                                 </div>
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* RIGHT COLUMN */}
//                 <div className="lg:sticky lg:top-24 h-fit col-span-2">
//                     {/* Brand Label */}
//                     {/* <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
//                         Essentials Collection
//                     </p> */}

//                     {/* Title */}
//                     <h1 className="mt-4 font-heading text-xl font-bold tracking-tight md:text-3xl">
//                         {product.name}
//                     </h1>

//                     {/* Price */}
//                     <div className="mt-6 flex items-center gap-3">
//                         <span className="text-3xl font-bold">
//                             ₹{product.discountPrice}{product.discountPrice ?
//                                 <span className="ml-2 text-sm font-bold line-through text-muted-foreground">
//                                     ₹{product.price}
//                                 </span> : null}
//                         </span>

//                         <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
//                             In Stock
//                         </span>
//                     </div>

//                     {/* Description */}
//                     <p className="text-sm mt-6 leading-7 text-muted-foreground">
//                         {product.shortDescription}
//                     </p>

//                     <Badge className="text-sm mt-6 leading-7 px-6 py-4">
//                         {product.category.name} - {product.subCategory?product.subCategory.name:""}
//                     </Badge>

//                     {/* Divider */}
//                     <div className="my-8 h-px bg-border" />

//                     {/* Colors */}
//                     {/* <div>
//                         <div className="mb-4 flex items-center justify-between">
//                             <h3 className="font-medium">
//                                 Color
//                             </h3>

//                             <span className="text-sm text-muted-foreground">
//                                 {selectedColor}
//                             </span>
//                         </div>

//                         <div className="flex items-center gap-4">
//                             {colors.map((color) => (
//                                 <button
//                                     key={color.name}
//                                     onClick={() =>
//                                         setSelectedColor(color.name)
//                                     }
//                                     className={cn(
//                                         "relative h-5 w-5 rounded-full border-2 transition-all",
//                                         selectedColor === color.name
//                                             ? "border-black scale-110"
//                                             : "border-border hover:border-black/40"
//                                     )}
//                                     style={{
//                                         backgroundColor: color.value,
//                                     }}
//                                 >
//                                     {selectedColor === color.name && (
//                                         <span className="absolute inset-0 rounded-full ring-4 ring-black/10" />
//                                     )}
//                                 </button>
//                             ))}
//                         </div>
//                     </div> */}

//                     {/* Sizes */}
//                     {/* <div className="mt-8">
//                         <div className="mb-4 flex items-center justify-between">
//                             <h3 className="font-medium">
//                                 Size
//                             </h3>

//                             <span className="text-sm text-muted-foreground">
//                                 {selectedSize}
//                             </span>
//                         </div>

//                         <div className="flex items-center gap-3">
//                             {sizes.map((size) => (
//                                 <button
//                                     key={size}
//                                     onClick={() =>
//                                         setSelectedSize(size)
//                                     }
//                                     className={cn(
//                                         "flex items-center justify-center rounded-2xl border px-4 py-2 text-xs font-medium transition-all",
//                                         selectedSize === size
//                                             ? "border-black bg-black text-white"
//                                             : "border-border bg-background hover:border-black/40"
//                                     )}
//                                 >
//                                     {size}
//                                 </button>
//                             ))}
//                         </div>
//                     </div> */}

//                     {/* CTA Buttons */}
//                     <div className="mt-10 grid gap-4 grid-cols-2">
//                         <Button className="h-10 w-full rounded-2xl bg-black text-base font-medium text-white hover:bg-black/90">
//                             Add To Cart
//                         </Button>

//                         <Button
//                             variant="outline"
//                             className="h-10 w-full rounded-2xl border-black text-base font-medium hover:bg-black hover:text-white"
//                         >
//                             Buy Now
//                         </Button>
//                     </div>

//                     {/* Trust Badges */}
//                     <div className="mt-10 flex flex-wrap gap-5 border-t pt-6 text-sm text-muted-foreground">
//                         <div className="flex items-center gap-2">
//                             <ShieldCheck className="h-4 w-4" />
//                             Lifetime Warranty
//                         </div>

//                         <div className="flex items-center gap-2">
//                             <Truck className="h-4 w-4" />
//                             Free Shipping
//                         </div>

//                         <div className="flex items-center gap-2">
//                             <RefreshCcw className="h-4 w-4" />
//                             30-Day Returns
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }




"use client"

import { useState } from "react"
import Image from "next/image"
import {
    ShieldCheck,
    Truck,
    RefreshCcw,
    CheckCircle2,
    Star,
    StarHalf,
    Heart
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Product } from "@/types/product"
import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"
import { useAuthApi } from "@/hooks/useAuthApi"
import { useAuth } from "@/context/AuthContext"
import axios from "axios"
import toast from "react-hot-toast"

export default function ProductHeroSection({
    product,
}: {
    product: Product
}) {
    const [selectedImage, setSelectedImage] = useState(product.cover)
    const [isWishlisted, setIsWishlisted] = useState<boolean>(product.isWishlisted ? product.isWishlisted : false);
    const { checkInCart, addToCart, removeFromCart } = useCart();
    const images = [product.cover, ...(product.gallery ?? [])]
    const router = useRouter();
    const api = useAuthApi();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const hasDiscount =
        product.discountPrice &&
        Number(product.discountPrice) < Number(product.price)

    const discountPercentage =
        hasDiscount
            ? Math.round(
                ((Number(product.price) - Number(product.discountPrice)) /
                    Number(product.price)) *
                100
            )
            : 0

    const handleBuyNow = () => {
        if (!checkInCart(product._id)) {
            addToCart(product._id);
        }
        router.push("/dashboard/cart");
    }

    const toggleWishlist = async () => {
        if (loading) return;
        if (user?.role !== "CUSTOMER") return;
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
        finally {
            setLoading(false)
        }

    }

    return (
        <section className="bg-background">
            <div className="mx-auto px-4 py-10 md:px-8 lg:px-12">
                <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
                    {/* LEFT */}
                    <div className="border-0">
                        {/* Main Image */}
                        <div className="overflow-hidden rounded-3xl">
                            <div className="group relative aspect-square shadow-none">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${selectedImage}`}
                                    alt={product.name}
                                    fill
                                    priority
                                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                                />
                                <Button onClick={toggleWishlist} className="group/button absolute right-4 p-0 top-4 rounded-xl bg-white text-rose-800 hover:text-rose-800 cursor-pointer">
                                    <Heart className={`transition-all group-hover/button:scale-[110%] ${isWishlisted ? "fill-rose-800" : ""}`} />
                                </Button>
                            </div>
                        </div>

                        {/* Gallery */}
                        <div className="mt-5 grid grid-cols-4 gap-3">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(image)}
                                    className={cn(
                                        "overflow-hidden rounded-2xl border transition-all duration-200 hover:scale-105",
                                        selectedImage === image
                                            ? "border-primary ring-2 ring-primary/20"
                                            : "border-border"
                                    )}
                                >
                                    <div className="relative aspect-[4/5]">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${image}`}
                                            alt={`${product.name} ${index + 1}`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="rounded-3xl bg-card p-8 ">
                            {/* Category */}
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">
                                    {product.category.name}
                                </Badge>

                                {product.subCategory && (
                                    <Badge variant="outline">
                                        {product.subCategory.name}
                                    </Badge>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="mt-5 text-3xl font-bold leading-tight flex justify-between items-center">
                                {product.name}  <StarRating rating={product.rating} />
                            </h1>

                            {/* Price */}
                            <div className="mt-4">
                                <div className="flex flex-wrap items-end gap-3">
                                    {hasDiscount && (
                                        <Badge className="bg-green-600 hover:bg-green-800 mb-[5px]">
                                            {discountPercentage}% OFF
                                        </Badge>
                                    )}
                                    <span className="text-2xl font-bold tracking-tight">
                                        ₹{hasDiscount ? product.discountPrice : product.price}
                                    </span>

                                    {hasDiscount && (
                                        <>
                                            <span className="pb-1 text-sm text-muted-foreground line-through">
                                                ₹{product.price}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            {product.shortDescription && (
                                <p className="mt-6 text-base leading-7 text-muted-foreground">
                                    {product.shortDescription}
                                </p>
                            )}

                            {/* Purchase Card */}
                            <div className="mt-8 rounded-2xl border bg-muted/40 p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">
                                            Availability
                                        </span>

                                        <Badge className="bg-green-600 hover:bg-green-600">
                                            In Stock
                                        </Badge>
                                    </div>

                                    <div className="h-px bg-border" />

                                    <div className="flex items-center gap-3">
                                        <Truck className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="font-medium text-sm">
                                                Free Shipping
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Delivered safely to your doorstep.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="font-medium text-sm">
                                                Lifetime Warranty
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Built to last with premium quality.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <RefreshCcw className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="font-medium text-sm">
                                                Easy Returns
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Hassle-free return policy.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {checkInCart(product._id) ?
                                    <Button onClick={() => removeFromCart(product._id)} size="lg"
                                        className="h-12 rounded-xl text-base font-semibold bg-rose-600">
                                        Remove From Cart
                                    </Button> :

                                    <Button
                                        onClick={() => addToCart(product._id)}
                                        size="lg"
                                        className="h-12 rounded-xl text-base font-semibold"
                                    >
                                        Add to Cart
                                    </Button>
                                }
                                <Button
                                    onClick={handleBuyNow}
                                    size="lg"
                                    variant="outline"
                                    className="h-12 rounded-xl text-base font-semibold"
                                >
                                    Buy Now
                                </Button>
                            </div>

                            {/* Bottom trust row */}
                            <div className="mt-8 grid gap-3 border-t pt-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    Secure Checkout
                                </div>

                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    Premium Quality Materials
                                </div>

                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    Trusted by Thousands of Customers
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}



interface StarRatingProps {
    rating: number; // e.g., 4.5
    maxStars?: number; // defaults to 5
}

export function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
    // Clamp rating between 0 and maxStars
    const validatedRating = Math.min(Math.max(rating, 0), maxStars);

    const fullStars = Math.floor(validatedRating);
    const hasHalfStar = validatedRating % 1 >= 0.25 && validatedRating % 1 < 0.75;
    // If the decimal is 0.75 or higher, we round up to a full star visually
    const adjustedFullStars = validatedRating % 1 >= 0.75 ? fullStars + 1 : fullStars;
    const emptyStars = maxStars - adjustedFullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of ${maxStars} stars`}>
            {/* Render Full Stars */}
            {[...Array(adjustedFullStars)].map((_, i) => (
                <Star
                    key={`full-${i}`}
                    className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0"
                />
            ))}

            {/* Render Half Star if applicable */}
            {hasHalfStar && (
                <div className="relative w-4 h-4 shrink-0">
                    {/* Empty star background */}
                    <Star className="absolute top-0 left-0 w-4 h-4 text-muted-foreground/30" />
                    {/* Half star foreground */}
                    <StarHalf className="absolute top-0 left-0 w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
            )}

            {/* Render Empty Stars */}
            {[...Array(emptyStars)].map((_, i) => (
                <Star
                    key={`empty-${i}`}
                    className="w-4 h-4 text-muted-foreground/30 shrink-0"
                />
            ))}

            {/* Optional text label matching Shadcn typography */}
            <span className="text-xs font-medium text-muted-foreground ml-1">
                {rating.toFixed(1)}
            </span>
        </div>
    );
}