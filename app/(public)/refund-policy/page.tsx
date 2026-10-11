import { FileText, Info } from "lucide-react";

const refundSections = [
    {
        title: "1. Eligibility for Refund",
        content: (
            <>
                <h3 className="font-medium text-gray-800">
                    (A) Order Cancellation Before Shipment
                </h3>
                <p>
                    If a customer has completed payment for an order but the order has
                    not yet been processed for shipment or dispatched, the customer may
                    request cancellation of the order and receive a full refund.
                </p>
                <p>
                    Upon verification of the order status, the Company will process the
                    refund of the full amount to the original payment method, subject to
                    eligibility.
                </p>

                <h3 className="mt-3 font-medium text-gray-800">
                    (B) Refund After Product Delivery
                </h3>
                <p>
                    Refunds after delivery are available only under limited circumstances
                    and subject to the following conditions:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>
                        The customer must submit a refund request within{" "}
                        <strong>24 hours</strong> of receiving the product.
                    </li>
                    <li>
                        The customer may be required to provide evidence of the product
                        condition, including photographs, videos, or other relevant
                        information.
                    </li>
                    <li>
                        Upon approval of the refund request, the Company will attempt to
                        arrange pickup of the product within <strong>3 business days</strong>.
                    </li>
                    <li>
                        Final approval of the refund will be subject to inspection and
                        verification of the returned product.
                    </li>
                </ul>
            </>
        ),
    },
    {
        title: "2. Conditions for Refund Approval",
        content: (
            <>
                <p>
                    A refund will be approved only if all of the following conditions are
                    satisfied during inspection:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>The product is completely new, unused, and in resalable condition.</li>
                    <li>The original seal of the product remains intact and unopened.</li>
                    <li>
                        The product is returned with its original packaging, manuals,
                        accessories, warranty card, and all other included materials.
                    </li>
                    <li>
                        The product shows no signs of usage, damage, tampering,
                        modification, or physical deterioration.
                    </li>
                    <li>
                        The returned product is the same product originally delivered to
                        the customer.
                    </li>
                </ul>
            </>
        ),
    },
    {
        title: "3. Circumstances Where Refunds Will Not Be Granted",
        content: (
            <>
                <p>Refund requests will not be approved under the following circumstances:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>The product seal has been opened, broken, or removed.</li>
                    <li>The product has been used.</li>
                    <li>
                        The product has been tampered with, repaired, altered, or modified
                        by the customer.
                    </li>
                    <li>
                        The refund request is submitted more than <strong>24 hours</strong>{" "}
                        after delivery.
                    </li>
                    <li>
                        The product is returned without its original packaging, accessories,
                        manuals, warranty card, or other included materials.
                    </li>
                    <li>
                        Inspection reveals that the product is used, damaged, or not in
                        resalable condition.
                    </li>
                    <li>Issues resulting from normal wear and tear.</li>
                    <li>
                        Requests based on personal preference, change of mind, color
                        preference, design preference, or model selection, where the
                        product has been opened or used.
                    </li>
                </ul>
            </>
        ),
    },
    {
        title: "4. Inspection and Verification Process",
        content: (
            <>
                <p>
                    All returned products will undergo quality inspection and verification
                    by the Company. During the inspection process, the Company may examine:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Product condition</li>
                    <li>Packaging condition</li>
                    <li>Original seal status</li>
                    <li>Included accessories and documentation</li>
                    <li>Evidence of usage or damage</li>
                </ul>
                <p>
                    The Company's decision based on the inspection report shall be final
                    and binding.
                </p>
            </>
        ),
    },
    {
        title: "5. Refund Process",
        content: (
            <>
                <p>Once a refund request is approved:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>
                        Refunds will be issued only to the original payment method used
                        during the purchase.
                    </li>
                    <li>
                        The time required for the refunded amount to reflect in the
                        customer's account may vary depending on the customer's bank,
                        payment gateway, or financial institution.
                    </li>
                    <li>
                        The Company shall not be responsible for delays caused by banks,
                        payment processors, or third-party financial institutions.
                    </li>
                </ul>
            </>
        ),
    },
    {
        title: "6. Pickup and Return Process",
        content: (
            <p>
                For approved refund requests, the Company may arrange product pickup
                through its logistics partners. Customers are responsible for ensuring
                that the product is securely packed and made available for pickup.
            </p>
        ),
    },
    {
        title: "7. Fraudulent Claims and Abuse",
        content: (
            <p>
                If the Company suspects fraud, misrepresentation, product substitution,
                intentional damage, false claims, or abuse of this Refund Policy, the
                Company reserves the right to reject the refund request and take
                appropriate legal action where necessary.
            </p>
        ),
    },
    {
        title: "8. Changes to This Policy",
        content: (
            <p>
                ZINICXA reserves the right to modify, update, amend, or replace this
                Refund Policy at any time without prior notice. Any changes will become
                effective immediately upon publication on the website.
            </p>
        ),
    },
    {
        title: "9. Contact Us",
        content: (
            <>
                <p>
                    If you have any questions, concerns, complaints, or require assistance
                    regarding this Refund Policy, please contact our Customer Support Team:
                </p>
                <div className="mt-2 space-y-1">
                    <p className="font-medium text-gray-800">ZINICXA Customer Support</p>
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
                </div>
            </>
        ),
    },
];

export default function RefundPolicyPage() {
    return (
        <main className="px-8 py-6">
            <div className="mx-5">
                <div className="border-b border-neutral-200 pb-4">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                        Refund Policy
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Last Updated: October 11, 2026
                    </p>
                </div>

                <p className="mb-5 text-sm leading-6 text-gray-600">
                    Welcome to <strong>ZINICXA</strong>. We are committed to providing our
                    customers with the best products and services. This Refund Policy
                    outlines the terms, conditions, and procedures related to refunds. By
                    placing an order through our website, you agree to this Refund Policy.
                </p>

                <div className="space-y-5 text-sm leading-6 text-gray-600">
                    {refundSections.map((section) => (
                        <section key={section.title} className="space-y-2">
                            <h2 className="text-base font-semibold text-gray-900">
                                {section.title}
                            </h2>
                            {section.content}
                        </section>
                    ))}
                </div>

                <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                        <div>
                            <h2 className="mb-2 text-base font-semibold text-gray-900">
                                Important Notice
                            </h2>
                            <p className="text-sm leading-6 text-gray-600">
                                Due to the nature of electronic products and mobile accessories
                                sold by ZINICXA, refunds are <strong>not available</strong> for
                                products that have been opened, unsealed, activated, or used.
                                Refunds are only available for products that are returned in an
                                unused, sealed, and resalable condition and meet all requirements
                                specified in this Refund Policy.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
                    ZINICXA — Quality Accessories. Trusted Service.
                </div>
            </div>
        </main>
    );
}