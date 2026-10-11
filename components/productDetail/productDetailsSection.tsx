"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Product } from "@/types/product"

import {
  ShieldCheck,
  Droplets,
  BriefcaseBusiness,
  Laptop,
  Ruler,
  Weight,
} from "lucide-react"

const specifications = [
  {
    icon: Droplets,
    label: "Material",
    value:
      "1680D Ballistic Nylon, Premium Italian Leather",
  },
  {
    icon: Ruler,
    label: "Dimensions",
    value: '18" × 12" × 6"',
  },
  {
    icon: Weight,
    label: "Weight",
    value: "1.8 lbs (0.8 kg)",
  },
  {
    icon: BriefcaseBusiness,
    label: "Capacity",
    value: "22 Liters",
  },
  {
    icon: Laptop,
    label: "Laptop Sleeve",
    value: "Fits up to 16-inch MacBook Pro",
  },
  {
    icon: ShieldCheck,
    label: "Durability",
    value:
      "Military-grade weather resistant exterior",
  },
]

export default function ProductDetailsSection({product}:{product:Product}) {
  return (
    <section className="border-t bg-background">
      <div className="mx-auto px-4 py-20 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto text-left">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Product Details
          </p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Designed with a balance of minimal aesthetics,
            premium craftsmanship, and functional utility for
            creators, professionals, and daily commuters.
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT SIDE */}
          <div className="overflow-scroll rounded-3xl border bg-card p-5 scrollbar-hide tiptap"  dangerouslySetInnerHTML={{ __html: product.description }}>
            {/* <Accordion
              type="single"
              collapsible
              defaultValue="story"
              className="w-full"
            >
              <AccordionItem
                value="story"
                className="border-b border-neutral-200 px-6"
              >
                <AccordionTrigger className="py-3 text-left text-sm font-semibold hover:no-underline">
                  The Story
                </AccordionTrigger>

                <AccordionContent>
                  <div className="space-y-6 pb-2 text-muted-foreground">
                    <p className="leading-6">
                      Crafted for individuals who demand both
                      sophistication and utility, The Obsidian
                      Daypack blends architectural minimalism
                      with engineered functionality.
                    </p>

                    <p className="leading-6">
                      Constructed from ultra-durable
                      water-repellent ballistic nylon and
                      complemented with full-grain leather
                      detailing, every stitch and compartment
                      has been carefully considered for
                      performance and longevity.
                    </p>

                    <p className="leading-6">
                      Internal pocket placement was developed
                      through ergonomic weight-distribution
                      studies, ensuring optimal comfort during
                      extended commutes and travel sessions.
                    </p>

                    <div className="grid gap-4 pt-4 md:grid-cols-3">
                      <div className="rounded-2xl border bg-muted/40 p-5">
                        <h4 className="font-semibold">
                          Weather Resistant
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          Designed to protect your essentials
                          against unpredictable urban weather.
                        </p>
                      </div>

                      <div className="rounded-2xl border bg-muted/40 p-5">
                        <h4 className="font-semibold">
                          Smart Organization
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          Intelligently arranged compartments
                          for seamless daily workflow.
                        </p>
                      </div>

                      <div className="rounded-2xl border bg-muted/40 p-5">
                        <h4 className="font-semibold">
                          Premium Craftsmanship
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          Luxury materials paired with precise
                          industrial-grade construction.
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="design"
                className="border-b border-neutral-200 px-6"
              >
                <AccordionTrigger className="py-3 text-left text-sm font-semibold hover:no-underline">
                  Design Philosophy
                </AccordionTrigger>

                <AccordionContent>
                  <div className="space-y-5 pb-2 text-muted-foreground">
                    <p className="leading-6">
                      Inspired by modern architecture and
                      Scandinavian minimalism, the silhouette
                      removes unnecessary visual clutter while
                      maintaining everyday practicality.
                    </p>

                    <p className="leading-6">
                      Every curve, seam, and zipper placement
                      was intentionally refined to create a
                      product that feels elegant in both
                      professional and casual environments.
                    </p>

                    <blockquote className="rounded-2xl border-l-4 border-black bg-muted/40 p-6 italic text-foreground">
                      “True luxury is not excess — it is
                      precision.”
                    </blockquote>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="shipping"
                className="px-6"
              >
                <AccordionTrigger className="py-3 text-left text-sm font-semibold hover:no-underline">
                  Shipping & Warranty
                </AccordionTrigger>

                <AccordionContent>
                  <div className="space-y-4 pb-2 text-muted-foreground">
                    <p className="leading-6">
                      Free worldwide shipping on all orders.
                      Most orders are processed within 24
                      hours and delivered in 4-7 business
                      days.
                    </p>

                    <p className="leading-6">
                      Backed by our lifetime craftsmanship
                      warranty and 30-day hassle-free returns.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion> */}
          </div>

          {/* RIGHT SIDE */}
          <div className="rounded-3xl border bg-card p-8 sticky h-fit top-5">
            {/* Header */}
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Specifications
              </p>

              <h3 className="mt-3 font-heading text-xl font-bold">
                Technical Details
              </h3>
            </div>

            {/* Specs Table */}
            <div className="mt-3 space-y-2">
              {Object.entries(product.specifications).map((spec, index) => {
                // const Icon = spec.icon

                return (
                  <div
                    key={index}
                    className="flex items-start justify-between gap-5 border-b border-neutral-200 pb-2"
                  >
                    <div className="flex items-center gap-3">
                      {/* <div className="rounded-xl bg-muted p-2">
                        <Icon className="h-5 w-5" />
                      </div> */}

                      <span className="font-medium text-sm">
                        {spec[0]}
                      </span>
                    </div>

                    <span className="max-w-[220px] text-right text-sm leading-6 text-muted-foreground">
                      {spec[1]}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Additional Info */}
            <div className="mt-10 rounded-2xl bg-black p-6 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                Sustainability
              </p>

              <p className="mt-3 text-xl font-semibold">
                Built To Last
              </p>

              <p className="mt-2 text-sm text-white/70">
                We prioritize durable materials and timeless
                design principles to reduce waste and extend
                the lifecycle of every product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}