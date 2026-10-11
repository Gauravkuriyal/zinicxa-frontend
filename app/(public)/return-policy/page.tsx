import { FileText } from "lucide-react";

const returnSections = [
    {
        title: "1. Return Period",
        content: (
            <p>
                Customers may submit a return request within <strong>3 (Three) calendar
                    days</strong> from the date of delivery of the product. Any return
                request submitted after the expiration of the 3-day return period may
                not be accepted unless otherwise required by applicable law or expressly
                approved by the Company.
            </p>
        ),
    },
    {
        title: "2. Damage, Defect, or Wrong Product Reporting",
        content: (
            <>
                <p>If a customer receives a product that is:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Physically damaged;</li>
                    <li>Defective upon delivery;</li>
                    <li>Broken or non-functional upon initial inspection;</li>
                    <li>Incorrect or different from the product ordered; or</li>
                    <li>Missing essential components or accessories.</li>
                </ul>
                <p>
                    The customer must notify ZINICXA within{" "}
                    <strong>24 hours of delivery.</strong>
                </p>
                <p>Customers may be required to provide the following for verification:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Order number;</li>
                    <li>Clear photographs of the product;</li>
                    <li>Photographs of the external packaging;</li>
                    <li>
                        Unboxing video (strongly recommended and may be required in certain
                        cases);
                    </li>
                    <li>Detailed description of the issue.</li>
                </ul>
                <p>
                    Claims relating to physical damage, missing items, tampered packages,
                    or incorrect products reported after 24 hours of delivery may not be
                    accepted.
                </p>
            </>
        ),
    },
    {
        title: "3. Eligible Return Conditions",
        content: (
            <>
                <p>A return request may be approved if:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>The customer received the wrong product.</li>
                    <li>The delivered product differs from the ordered model or specifications.</li>
                    <li>The product was physically damaged during transit.</li>
                    <li>The product contains a verified manufacturing defect upon initial use.</li>
                    <li>The Company expressly authorizes the return under special circumstances.</li>
                </ul>
                <p>
                    All return approvals are subject to verification and inspection by
                    ZINICXA.
                </p>
            </>
        ),
    },
    {
        title: "4. Non-Returnable Situations",
        content: (
            <>
                <p>Returns shall not be accepted under the following circumstances:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Change of mind after purchase.</li>
                    <li>Product no longer required by the customer.</li>
                    <li>Dissatisfaction due to personal preference.</li>
                    <li>Requests made after the applicable return period.</li>
                    <li>
                        Damage caused by misuse, negligence, mishandling, accidents, drops,
                        water exposure, fire, power surges, or unauthorized modifications.
                    </li>
                    <li>Products repaired or altered by unauthorized persons.</li>
                    <li>
                        Missing, removed, or tampered serial numbers, labels, seals, or
                        warranty stickers.
                    </li>
                    <li>Absence of original packaging, accessories, manuals, or included items.</li>
                    <li>Physical damage reported after the mandatory 24-hour reporting period.</li>
                </ul>
            </>
        ),
    },
    {
        title: "5. Product Condition Requirements",
        content: (
            <>
                <p>To qualify for return, the product must:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Be returned in its original packaging.</li>
                    <li>Include all accessories, manuals, cables, and promotional items supplied with the product.</li>
                    <li>Be free from customer-induced damage.</li>
                    <li>Not be altered, repaired, or modified.</li>
                    <li>Remain in a condition suitable for inspection and resale where applicable.</li>
                </ul>
                <p>
                    Failure to meet these conditions may result in rejection of the return
                    request.
                </p>
            </>
        ),
    },
    {
        title: "6. Return Request Procedure",
        content: (
            <>
                <p>To initiate a return request, customers must:</p>
                <ol className="list-decimal space-y-1 pl-5">
                    <li>Contact ZINICXA Customer Support within the applicable return period.</li>
                    <li>Provide the order number and purchase details.</li>
                    <li>Submit supporting photographs, videos, and relevant information.</li>
                    <li>Cooperate with any verification process requested by the Company.</li>
                </ol>
                <p>
                    After reviewing the submitted information, ZINICXA will notify the
                    customer regarding approval or rejection of the return request.
                </p>
            </>
        ),
    },
    {
        title: "7. Inspection and Verification",
        content: (
            <>
                <p>
                    All returned products are subject to technical and physical inspection
                    upon receipt.
                </p>
                <p>If inspection confirms that:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>The product is defective due to a manufacturing fault;</li>
                    <li>The wrong product was delivered; or</li>
                    <li>The issue resulted from an error attributable to ZINICXA.</li>
                </ul>
                <p>The Company may, at its sole discretion, provide:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>A replacement product;</li>
                    <li>A refund;</li>
                    <li>Store credit; or</li>
                    <li>Any other appropriate remedy permitted under applicable laws.</li>
                </ul>
                <p>
                    If inspection reveals that the reported issue does not exist or falls
                    outside the scope of this policy, the return request may be denied.
                </p>
            </>
        ),
    },
    {
        title: "8. Return Shipping",
        content: (
            <p>
                Where the return is approved due to an error by ZINICXA, the Company may
                bear the return shipping cost. For other approved return situations,
                customers may be responsible for return shipping charges, handling fees,
                or related expenses as determined by the Company.
            </p>
        ),
    },
    {
        title: "9. Fraud Prevention and Policy Misuse",
        content: (
            <p>
                ZINICXA reserves the right to reject any return request that appears
                fraudulent, abusive, misleading, repetitive, suspicious, or inconsistent
                with this Return Policy. The Company may also take appropriate action
                against customers found to be engaging in fraudulent return activities.
            </p>
        ),
    },
    {
        title: "10. Limitation of Liability",
        content: (
            <p>
                To the maximum extent permitted by applicable law, ZINICXA shall not be
                liable for any indirect, incidental, consequential, special, or punitive
                damages arising from the use, misuse, inability to use, or return of any
                product.
            </p>
        ),
    },
    {
        title: "11. Policy Amendments",
        content: (
            <>
                <p>
                    ZINICXA reserves the right to modify, revise, update, or replace this
                    Return Policy at any time without prior notice. Any changes shall
                    become effective immediately upon publication on the website.
                </p>
                <p>
                    Customers are encouraged to review this policy periodically for
                    updates.
                </p>
            </>
        ),
    },
    {
        title: "12. Contact Information",
        content: (
            <>
                <p>
                    For any questions regarding this Return Policy, please contact our
                    Customer Support Team:
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
                </div>
            </>
        ),
    },
];

export default function ReturnPolicyPage() {
    return (
        <main className="mx-auto px-8 py-6">
            <div className="mx-5">
                <div className="border-b border-neutral-200 pb-4">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                        Return Policy
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Last Updated: October 11, 2026
                    </p>
                </div>

                <p className="mb-5 text-sm leading-6 text-gray-600">
                    Welcome to <strong>ZINICXA</strong>. We are committed to providing
                    high-quality electronic products and ensuring customer satisfaction.
                    This Return Policy outlines the terms, conditions, eligibility criteria,
                    and procedures governing product returns purchased through our website.
                    By placing an order or purchasing any product from ZINICXA, you
                    acknowledge that you have read, understood, and agreed to this Return
                    Policy.
                </p>

                <div className="space-y-5 text-sm leading-6 text-gray-600">
                    {returnSections.map((section) => (
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