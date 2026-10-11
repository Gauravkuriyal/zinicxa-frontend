"use client"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Product } from "@/types/product"
import ProductCard from "../shop/productCard"

export default function LatestProducts({ latestProducts }: { latestProducts: Product[] }) {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-10">
      {/* Section Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Recently Launched Products
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Explore our most recent electronics.
          </p>
        </div>

        <Link href={"/shop"} className="cursor-pointer">
          <Button
            variant="outline"
            className="hidden md:flex rounded-xl"
          >
            View All
          </Button>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 lg:grid-cols-6">
        {latestProducts.map((product) => (

          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}