import { FileText } from "lucide-react";

const replacementSections = [
    {
        title: "1. Purpose of this Policy",
        content: (
            <p>
                This policy applies only to situations where a product received by the
                customer is defective, physically damaged, incorrectly delivered,
                incomplete, or otherwise verified as having a genuine issue. This policy
                is applicable exclusively to end consumers (B2C Customers).
            </p>
        ),
    },
    {
        title: "2. Eligible Replacement Scenarios",
        content: (
            <>
                <p>A customer may request a replacement if:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>The product is received with physical damage at the time of delivery.</li>
                    <li>The customer receives an incorrect product.</li>
                    <li>
                        The delivered model, color, variant, or specification differs from
                        the ordered product.
                    </li>
                    <li>
                        The product is Dead on Arrival (DOA), meaning it does not function
                        upon first use.
                    </li>
                    <li>The product contains a verified manufacturing defect.</li>
                    <li>Essential accessories, components, or items are missing from the package.</li>
                </ul>
            </>
        ),
    },
    {
        title: "3. Time Limit for Reporting Delivery-Related Issues",
        content: (
            <>
                <p>The following issues must be reported:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Physical Damage</li>
                    <li>Wrong Product</li>
                    <li>Missing Items</li>
                    <li>Open or Tampered Package</li>
                </ul>
                <p>
                    The customer must report the issue within{" "}
                    <strong>24 hours of delivery.</strong> Claims submitted after 24 hours
                    may not be accepted, as fair verification of the product condition may
                    no longer be possible.
                </p>
            </>
        ),
    },
    {
        title: "4. Replacement Request Window",
        content: (
            <p>
                Customers must submit a replacement request within{" "}
                <strong>3 (three) calendar days</strong> from the date of delivery.
                Requests submitted after the replacement period may be rejected unless
                the issue is covered under a separate manufacturer warranty or
                applicable consumer protection laws.
            </p>
        ),
    },
    {
        title: "5. How to Request a Replacement",
        content: (
            <>
                <p>To initiate a replacement request, customers must provide:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Order Number</li>
                    <li>Customer Name and Contact Information</li>
                    <li>Detailed Description of the Issue</li>
                    <li>Clear Photographs of the Product</li>
                    <li>Video Evidence of the Defect or Problem, if applicable</li>
                    <li>Unboxing Video Recorded at the Time of Delivery, if available</li>
                </ul>
                <p>
                    ZINICXA reserves the right to request additional information,
                    documentation, or evidence to verify the claim.
                </p>
            </>
        ),
    },
    {
        title: "6. Verification and Inspection",
        content: (
            <>
                <p>
                    All replacement requests are subject to verification and inspection
                    by ZINICXA. The Company may use one or more of the following methods:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Photo Verification</li>
                    <li>Video Verification</li>
                    <li>Remote Technical Troubleshooting</li>
                    <li>Inspection After Reverse Pickup</li>
                    <li>Evaluation by Authorized Technical Personnel</li>
                </ul>
                <p>
                    A replacement will only be approved if the reported issue is found to
                    be genuine and valid.
                </p>
            </>
        ),
    },
    {
        title: "7. Conditions for Replacement Eligibility",
        content: (
            <>
                <p>To qualify for a replacement:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>The product must be returned in its original condition.</li>
                    <li>All accessories, manuals, and included items must be returned.</li>
                    <li>Original packaging must be available.</li>
                    <li>
                        Serial Numbers, IMEI Numbers, Warranty Stickers, and Security Seals
                        must remain intact and untampered.
                    </li>
                    <li>
                        The product must not have been damaged due to customer misuse,
                        negligence, or unauthorized handling.
                    </li>
                </ul>
            </>
        ),
    },
    {
        title: "8. Situations Not Eligible for Replacement",
        content: (
            <>
                <p>Replacement requests will not be approved in the following situations:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Damage caused by misuse, negligence, or improper handling.</li>
                    <li>Damage resulting from drops, impact, crushing, or external force.</li>
                    <li>Water, moisture, liquid, fire, or environmental damage.</li>
                    <li>Normal wear and tear.</li>
                    <li>Unauthorized repairs, modifications, or alterations.</li>
                    <li>Claims submitted after the applicable reporting period.</li>
                    <li>Insufficient evidence supporting the claim.</li>
                    <li>Change of mind after purchase.</li>
                    <li>Dissatisfaction with product appearance, color, design, or aesthetics.</li>
                    <li>Incorrect product ordered by the customer.</li>
                </ul>
            </>
        ),
    },
    {
        title: "9. Replacement Availability",
        content: (
            <>
                <p>
                    If a replacement request is approved and the same product is available
                    in stock, ZINICXA will provide the same model or an equivalent
                    replacement unit.
                </p>
                <p>If the original product is unavailable, ZINICXA may, at its sole discretion:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Provide a product with equivalent or superior specifications;</li>
                    <li>Offer Store Credit;</li>
                    <li>Provide a remedy in accordance with the applicable Refund Policy.</li>
                </ul>
            </>
        ),
    },
    {
        title: "10. Reverse Pickup and Shipping",
        content: (
            <>
                <p>
                    Upon approval of a replacement request, ZINICXA may arrange a reverse
                    pickup service where available.
                </p>
                <p>
                    If reverse pickup is not available at the customer's location, the
                    customer may be required to ship the product to the address specified
                    by ZINICXA.
                </p>
                <p>
                    The Company may require receipt and inspection of the original product
                    before dispatching a replacement.
                </p>
            </>
        ),
    },
    {
        title: "11. Fraud Prevention and Abuse",
        content: (
            <>
                <p>If ZINICXA reasonably believes that:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>A false or misleading claim has been submitted;</li>
                    <li>The product has been intentionally damaged;</li>
                    <li>The Replacement Policy is being misused or abused;</li>
                </ul>
                <p>
                    The Company reserves the right to reject the request and restrict
                    future services, orders, or claims associated with the customer
                    account.
                </p>
            </>
        ),
    },
    {
        title: "12. Relationship Between Warranty and Replacement",
        content: (
            <p>
                This Replacement Policy is separate from any manufacturer or seller
                warranty. Replacement requests are only valid within the replacement
                period specified in this policy. After that period, customers must
                follow the applicable warranty claim process, if available.
            </p>
        ),
    },
    {
        title: "13. Limitation of Liability",
        content: (
            <p>
                To the maximum extent permitted by applicable law, ZINICXA's liability
                shall be limited solely to the replacement, repair, store credit, or
                refund of the affected product, as determined by the Company. Under no
                circumstances shall ZINICXA be liable for any indirect, incidental,
                consequential, special, punitive, or economic damages arising from the
                use of, inability to use, or failure of any product.
            </p>
        ),
    },
    {
        title: "14. Policy Updates and Amendments",
        content: (
            <p>
                ZINICXA reserves the right to modify, amend, update, or replace this
                Replacement Policy at any time without prior notice. Any revised version
                of this policy shall become effective immediately upon publication on
                the website.
            </p>
        ),
    },
    {
        title: "15. Contact Information",
        content: (
            <>
                <p>For replacement-related assistance, please contact us:</p>
                <div className="mt-2 space-y-1">
                    <p>
                        <strong>Email:</strong>{" "}
                        <a
                            href="mailto:info@zinicxa.com"
                            className="text-blue-600 hover:underline"
                        >
                            info@zinicxa.com
                        </a>
                    </p>
                    <p>
                        <strong>Website:</strong>{" "}
                        <a
                            href="https://zinicxa.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            zinicxa.com
                        </a>
                    </p>
                    <p>
                        <strong>Customer Support Hours:</strong> During business days and
                        official working hours as notified by the Company from time to time.
                    </p>
                </div>
            </>
        ),
    },
];

export default function ReplacementPolicyPage() {
    return (
        <main className="px-8 py-6">
            <div className="mx-5">
                <div className="border-b border-neutral-200 pb-4">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                        Replacement Policy
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Last Updated: October 11, 2026
                    </p>
                </div>

                <p className="mb-5 text-sm leading-6 text-gray-600">
                    Welcome to ZINICXA. We are committed to providing high-quality
                    electronic products and ensuring customer satisfaction. This Replacement
                    Policy outlines the terms, conditions, eligibility criteria, and
                    procedures for product replacements purchased through our website. By
                    placing an order or purchasing a product from ZINICXA, you agree to
                    this Replacement Policy.
                </p>

                <div className="space-y-5 text-sm leading-6 text-gray-600">
                    {replacementSections.map((section) => (
                        <section key={section.title} className="space-y-2">
                            <h2 className="text-base font-semibold text-gray-900">
                                {section.title}
                            </h2>
                            {section.content}
                        </section>
                    ))}
                </div>

                <div className="mt-6 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
                    ZINICXA — Quality Accessories. Trusted Service.
                </div>
            </div>
        </main>
    );
}