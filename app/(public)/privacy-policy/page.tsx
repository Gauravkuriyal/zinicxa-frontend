import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  LockKeyhole,
  Cookie,
  Building2,
  CreditCard,
  UserRound,
  FileText,
} from "lucide-react";
import { privacyPolicyEffectiveDate, privacyPolicySections } from "@/components/privacy-policy/privacy-policy";


const sectionIcons = [
  ShieldCheck,
  UserRound,
  Building2,
  UserRound,
  Building2,
  FileText,
  CreditCard,
  LockKeyhole,
  Cookie,
  ShieldCheck,
  Building2,
  UserRound,
  FileText,
];

export default function PrivacyPolicyPage() {
  return (
    <main id="top" className="bg-muted/30">
      {/* Page header */}
      <section className="relative overflow-hidden border-b bg-background">
        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-4 py-6 sm:px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-sm text-muted-foreground shadow-sm">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Your privacy matters to us
          </div>

          <h1 className="max-w-3xl text-2xl font-bold tracking-tight ">
            Privacy <span className="text-primary">Policy</span>
          </h1>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Learn how ZINICXA PRIVATE LIMITED collects, uses, stores, protects,
            and shares personal and business information when you use our
            website, services, and business platforms.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <div className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Effective date:</span>
              <span className="font-medium">{privacyPolicyEffectiveDate}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                Customers &amp; business partners
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-4 grid gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:py-14">
        {/* Table of contents */}
        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-2xl border bg-background shadow-sm">
            <h2 className="mb-4 px-5 pt-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </h2>
            <nav aria-label="Privacy policy sections" className="space-y-1">
              {privacyPolicySections.map((section, index) => {
                const Icon = sectionIcons[index % sectionIcons.length];
                return (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex items-start gap-2 rounded-lg pl-5 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" />
                    <span className="min-w-0 flex-1 leading-5">
                      {section.title}
                    </span>
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-4 rounded-2xl border bg-primary/[0.04] p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold">Questions about privacy?</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Contact ZINICXA through its official customer support or
              communication channels for questions, concerns, or requests.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Contact support <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>

        {/* Policy content */}
        <div className="min-w-0 space-y-6">
          <div className="rounded-2xl border bg-background p-5 shadow-sm sm:p-7">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">At a glance</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  This policy covers information from individual customers
                  (B2C) and retailers, distributors, and business partners
                  (B2B), including account details, transactions, support,
                  warranty services, payment security, cookies, and user
                  requests.
                </p>
              </div>
            </div>
          </div>

          {privacyPolicySections.map((section, index) => {
            const Icon = sectionIcons[index % sectionIcons.length];
            return (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 rounded-2xl border bg-background p-5 shadow-sm sm:p-8"
              >
                <div className="mb-5 flex items-start gap-4 border-b pb-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Section {index + 1}
                    </p>
                    <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${section.id}-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <a
                    href="#top"
                    className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    Back to top ↑
                  </a>
                </div>
              </section>
            );
          })}

          <div className="rounded-2xl border bg-background p-5 text-sm leading-6 text-muted-foreground shadow-sm sm:p-7">
            <p>
              This page presents the privacy policy supplied by ZINICXA PRIVATE
              LIMITED. Please ensure the effective date and official support
              contact details are correct before publishing.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
