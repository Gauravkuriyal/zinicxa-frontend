"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { Heart } from "lucide-react"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Product } from "@/types/product"
import { useCart } from "@/context/CartContext"

const Carousel = dynamic(
  () =>
    import("@/components/ui/carousel").then(
      (mod) => mod.Carousel
    ),
  {
    ssr: false,
  }
)

const CarouselContent = dynamic(
  () =>
    import("@/components/ui/carousel").then(
      (mod) => mod.CarouselContent
    ),
  {
    ssr: false,
  }
)

const CarouselItem = dynamic(
  () =>
    import("@/components/ui/carousel").then(
      (mod) => mod.CarouselItem
    ),
  {
    ssr: false,
  }
)

const CarouselNext = dynamic(
  () =>
    import("@/components/ui/carousel").then(
      (mod) => mod.CarouselNext
    ),
  {
    ssr: false,
  }
)

const CarouselPrevious = dynamic(
  () =>
    import("@/components/ui/carousel").then(
      (mod) => mod.CarouselPrevious
    ),
  {
    ssr: false,
  }
)

export default function RelatedProductsSection({ relatedProducts }: { relatedProducts: Product[] }) {
  const { removeFromCart, checkInCart, addToCart } = useCart();
  return (
    <section className="border-t bg-background">
      <div className="mx-auto px-4 py-12 md:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Explore More
            </p>

            <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight">
              You Might Also Like
            </h2>
          </div>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {relatedProducts.map((product) => (
              <CarouselItem
                key={product._id}
                className="pl-3 md:basis-1/2 lg:basis-1/4"
              >
                <Card className="group p-0 overflow-hidden rounded-2xl bg-card shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  {/* Image */}
                  <div className="relative overflow-hidden p-2">
                    <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${product.cover}`}
                        alt={product.name}
                        fill
                        loading="lazy"
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* Badge */}
                    {product.isFeatured ? <Badge className="absolute left-3 top-3 rounded-full px-2 py-0 text-[10px] font-medium">
                      Featured
                    </Badge> : null}

                    {/* Wishlist */}
                    <button className="absolute right-3 top-3 rounded-full border bg-white/90 p-2 backdrop-blur transition hover:bg-white">
                      <Heart className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Content */}
                  <CardContent className="space-y-3 p-4">
                    <div>
                      {/* <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        {product.category.name}
                      </p> */}

                      <Link href={`/product/${product.slug}`} className="mt-1 line-clamp-1 text-sm font-medium">
                        {product.name}
                      </Link>
                    </div>

                    <div className="text-xs line-clamp-2 mt-2 mb-4 text-muted-foreground">
                      {product.shortDescription}
                    </div>

                    {/* Bottom */}
                    <div className="flex items-center pt-0 justify-between">
                      <div>
                        <p className="text-lg font-bold">
                          ₹{product.discountPrice} {product.discountPrice ?
                            <span className="text-xs font-bold line-through text-muted-foreground">
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

                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Nav */}
          <div className="mt-6 flex items-center justify-end gap-2">
            <CarouselPrevious className="static translate-y-0 rounded-xl" />

            <CarouselNext className="static translate-y-0 rounded-xl" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}