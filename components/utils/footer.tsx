"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    if (email.trim()) {
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_BACKEND_DOMAIN + "/api/public/subscribe-form", {email:email}
        );

        toast.success(
          "Thank you! Your message has been successfully submitted. We will get back to you shortly."
        );
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 5000); // Reset after 5 seconds
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <footer className="border-t bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12 space-y-12">
        {/* Newsletter Banner Section */}
        <div className="rounded-2xl border bg-muted/30 p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <h3 className="text-lg font-semibold tracking-tight text-foreground flex items-center justify-center lg:justify-start gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Stay ahead with Hump Electronics
            </h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="w-full lg:w-auto flex flex-col sm:flex-row gap-2.5"
          >
            {subscribed ? (
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-lg">
                <CheckCircle2 className="h-4 w-4" />
                <span>Successfully subscribed! Thank you.</span>
              </div>
            ) : (
              <>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full sm:w-72 bg-background"
                />
                <Button
                  type="submit"
                  className="cursor-pointer gap-1.5 shrink-0"
                >
                  Subscribe <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </form>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="font-heading text-2xl font-bold tracking-tight">
                Hump Electronics
              </h2>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Premium audio devices crafted for immersive sound, modern
              lifestyles, and next-generation experiences.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="#"
                aria-label="Facebook"
                className="rounded-lg border bg-background p-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              >
                {/* <Facebook className="h-4 w-4" /> */}
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="rounded-lg border bg-background p-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              >
                {/* <Instagram className="h-4 w-4" /> */}
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="rounded-lg border bg-background p-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              >
                {/* <Twitter className="h-4 w-4" /> */}
              </Link>
              <Link
                href="#"
                aria-label="Youtube"
                className="rounded-lg border bg-background p-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              >
                {/* <Youtube className="h-4 w-4" /> */}
              </Link>
            </div>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h3>

            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="transition-colors hover:text-foreground"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="transition-colors hover:text-foreground"
                >
                  Blogs
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full justify-center"
              >
                <Link href="/retailer/register">Become a Partner</Link>
              </Button>
            </div>
          </div>

          {/* Support Column - Part 1 */}
          <div className="space-y-4">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Support
            </h3>

            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-policy"
                  className="transition-colors hover:text-foreground"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation-policy"
                  className="transition-colors hover:text-foreground"
                >
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/return-policy"
                  className="transition-colors hover:text-foreground"
                >
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column - Part 2 (Balanced alignment) */}
          <div className="space-y-4 pt-0 lg:pt-8">
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/replacement-policy"
                  className="transition-colors hover:text-foreground"
                >
                  Replacement Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="transition-colors hover:text-foreground"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty-policy"
                  className="transition-colors hover:text-foreground"
                >
                  Warranty Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-foreground"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} Hump Electronics. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
