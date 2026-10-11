import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Globe, TrendingUp } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="bg-white text-neutral-800 py-8 px-8 sm:px-6 lg:px-8">
      <main className="mx-5 space-y-6">
        
        {/* Header Section */}
        <header className="border-b border-neutral-200 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
              About Us
            </h1>
            <span className="text-xs font-medium bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full w-fit">
              Established: April 2026
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-1">
            ZINICXA PRIVATE LIMITED
          </p>
        </header>

        {/* Brand Introduction */}
        <section className="space-y-3 text-sm leading-relaxed text-neutral-700">
          <p>
            ZINICXA is an Indian consumer electronics brand dedicated to fulfilling the everyday technological needs of customers through quality, reliable, and affordable electronic products. Our objective is not only to provide excellent products but also to create new growth and business opportunities for traders, retailers, and business partners.
          </p>
          <p>
            We focus on the development, selection, and distribution of products that align with the needs and expectations of modern consumers. Our goal is to offer products that provide the right balance of quality, usability, performance, and value for money.
          </p>
        </section>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border border-neutral-200 shadow-sm bg-neutral-50/50">
            <CardContent className="p-5 space-y-2">
              <h2 className="text-base font-semibold text-neutral-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-neutral-700" />
                Our Mission
              </h2>
              <p className="text-xs leading-relaxed text-neutral-700">
                To meet customers&apos; needs through quality, reliable, and affordable consumer electronics products while creating better business opportunities for traders, retailers, and business partners. Our mission is to build long-term relationships based on excellent service, transparency, and trust.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-neutral-200 shadow-sm bg-neutral-50/50">
            <CardContent className="p-5 space-y-2">
              <h2 className="text-base font-semibold text-neutral-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-neutral-700" />
                Our Vision
              </h2>
              <p className="text-xs leading-relaxed text-neutral-700">
                We aspire to establish ZINICXA as a trusted and recognized brand not only in India but also across international markets. Our vision is that whenever people see the name ZINICXA in global markets, they recognize it as a symbol of Indian quality, reliability, and innovation.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Customer Experience & Service Philosophy */}
        <section className="space-y-3 text-sm leading-relaxed text-neutral-700">
          <h2 className="text-lg font-semibold text-neutral-900">
            Service-Core Philosophy &amp; Support
          </h2>
          <p>
            We believe that a brand’s true identity is built not only through its products but also through the trust, service, and customer experience it delivers. With this philosophy, ZINICXA has placed service at the core of its business model. We strive to ensure that customers do not have to face unnecessary or complicated procedures when seeking support after purchasing our products.
          </p>
          <p>
            Through our website, customers can directly access warranty support, register complaints, request replacements or refunds, track order-related information, and receive other assistance services. Our authorized service and logistics partners provide assistance across various regions to ensure a seamless experience.
          </p>
        </section>

        {/* Our Commitments */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-neutral-900">
            Our Commitment
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-neutral-700">
            <li className="flex items-center gap-2 bg-neutral-50 p-3 rounded-md border border-neutral-100">
              <CheckCircle2 className="w-4 h-4 text-neutral-600 shrink-0" />
              <span>Quality and reliable products</span>
            </li>
            <li className="flex items-center gap-2 bg-neutral-50 p-3 rounded-md border border-neutral-100">
              <CheckCircle2 className="w-4 h-4 text-neutral-600 shrink-0" />
              <span>Transparent and customer-centric services</span>
            </li>
            <li className="flex items-center gap-2 bg-neutral-50 p-3 rounded-md border border-neutral-100">
              <CheckCircle2 className="w-4 h-4 text-neutral-600 shrink-0" />
              <span>Timely support and solutions</span>
            </li>
            <li className="flex items-center gap-2 bg-neutral-50 p-3 rounded-md border border-neutral-100">
              <CheckCircle2 className="w-4 h-4 text-neutral-600 shrink-0" />
              <span>Long-term partnerships with traders and retailers</span>
            </li>
            <li className="flex items-center gap-2 bg-neutral-50 p-3 rounded-md border border-neutral-100 sm:col-span-2">
              <CheckCircle2 className="w-4 h-4 text-neutral-600 shrink-0" />
              <span>Continuous improvement and customer satisfaction</span>
            </li>
          </ul>
        </section>

        {/* Tagline Footer */}
        <footer className="border-t border-neutral-200 pt-4 text-center">
          <p className="text-sm font-semibold text-neutral-900 tracking-wide">
            Better Products • Better Service • Better Opportunities
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            — This is the identity of ZINICXA.
          </p>
        </footer>

      </main>
    </div>
  );
}