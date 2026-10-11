import { FileText } from "lucide-react";

const cancellationSections = [
    {
        title: "1. Eligibility for Order Cancellation",
        content: (
            <>
                <h3 className="font-medium text-gray-800">1.1 Cancellation Before Shipment</h3>
                <p>
                    If the order has been paid for but has not yet entered the shipping or
                    dispatch process, the customer may request cancellation. Upon
                    verification and approval, the customer may be eligible for a full
                    refund of the amount paid.
                </p>

                <h3 className="mt-3 font-medium text-gray-800">
                    1.2 Cancellation After Shipment Has Started
                </h3>
                <p>
                    If the order has already been dispatched, handed over to a courier
                    partner, or is in transit, the customer may still submit a
                    cancellation request. However, actual shipping, logistics, packaging,
                    reverse pickup, and other related charges incurred by the company may
                    be deducted from the refund amount.
                </p>
            </>
        ),
    },
    {
        title: "2. Cancellation After Product Delivery",
        content: (
            <>
                <p>
                    If the customer has already received the product and no longer wishes
                    to keep it, the cancellation or return request will be governed by
                    the applicable Return Policy.
                </p>
                <p>If the following conditions apply:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>The product is not defective.</li>
                    <li>The product has been delivered in proper condition.</li>
                    <li>The customer wishes to return the product for personal reasons.</li>
                </ul>
                <p>
                    The company may provide a refund of the product value, subject to
                    deductions for actual shipping, delivery, reverse logistics, handling,
                    and other applicable charges.
                </p>
            </>
        ),
    },
    {
        title: "3. Charges Applicable to Refunds",
        content: (
            <>
                <p>
                    Customers may not be eligible for a full refund in the following
                    situations:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>The order is cancelled after dispatch.</li>
                    <li>The product is returned after delivery for personal reasons.</li>
                    <li>The customer refuses to accept delivery of the order.</li>
                    <li>
                        The return is permitted under the Return Policy, but the product is
                        not defective.
                    </li>
                </ul>
                <p>
                    In all such cases, actual courier, logistics, shipping, handling, and
                    related expenses may be adjusted against or deducted from the refund
                    amount.
                </p>
            </>
        ),
    },
    {
        title: "4. Cancellation Request Process",
        content: (
            <p>
                To request a cancellation, customers must contact our Customer Support
                Team as soon as possible and provide the necessary order details. All
                cancellation requests will be reviewed, verified, and processed in
                accordance with this policy.
            </p>
        ),
    },
    {
        title: "5. Company's Rights",
        content: (
            <>
                <p>
                    ZINICXA reserves the right to accept or reject any cancellation
                    request if:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>The request does not comply with this policy.</li>
                    <li>
                        The product has already been delivered and the Return Policy is not
                        applicable.
                    </li>
                    <li>Any fraudulent, abusive, or suspicious activity is detected.</li>
                </ul>
            </>
        ),
    },
    {
        title: "6. Policy Amendments",
        content: (
            <p>
                ZINICXA reserves the right to modify, update, or amend this Cancellation
                Policy at any time without prior notice. Any changes will become
                effective immediately upon publication on the website.
            </p>
        ),
    },
    {
        title: "7. Contact Us",
        content: (
            <p>
                If you have any questions regarding this Cancellation Policy, please
                contact our Customer Support Team for assistance.
            </p>
        ),
    },
];

export default function CancellationPolicyPage() {
    return (
        <main className="px-8 py-6">
            <div className="mx-5">
                <div className="border-b border-neutral-200 pb-4">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                        Cancellation Policy
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Last Updated: October 11, 2026
                    </p>
                </div>

                <p className="mb-5 text-sm leading-6 text-gray-600">
                    Welcome to ZINICXA. We are committed to providing transparent and fair
                    services to our customers. This Cancellation Policy explains the terms,
                    conditions, and procedures related to order cancellations. By placing
                    an order or making a payment on our website, you agree to the terms of
                    this policy.
                </p>

                <div className="space-y-5 text-sm leading-6 text-gray-600">
                    {cancellationSections.map((section) => (
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