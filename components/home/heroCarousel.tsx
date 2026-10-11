"use client";

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Banner } from "@/types/banner";
import Link from "next/link";

export default function HeroCarousel({banners}:{banners:Banner[]}) {
  const plugin = React.useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
    })
  )

  return (
    <section className="w-full rounded-3xl overflow-hidden px-4 md:px-8 lg:px-12 py-6">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner._id}>
              <div className="relative overflow-hidden rounded-3xl">
                {/* Standard Hero Aspect Ratio */}
                <div className="relative aspect-[16/7] w-full">
                  <img
                    src={process.env.NEXT_PUBLIC_BACKEND_DOMAIN+"/"+banner.bannerCover}
                    alt={banner.heading}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50" />

                  {/* Content */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="max-w-2xl px-6 md:px-12 text-white">
                      <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                        {banner.heading}
                      </h1>

                      <p className="mt-4 text-sm md:text-lg text-gray-200">
                        {banner.subHeading}
                      </p>

                      <Link href={banner.link}>
                        <button className="mt-6 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200">
                        {banner.buttonText}
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  )
}