import { FileText, Info } from "lucide-react";

const warrantySections = [
    {
        title: "1. Warranty Coverage",
        content: (
            <>
                <p>
                    ZINICXA provides a <strong>Limited Warranty of Six (6) Months</strong>{" "}
                    from the date of delivery of the product.
                </p>
                <p>This warranty is applicable only to products purchased through:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>The official ZINICXA website;</li>
                    <li>Authorized sellers;</li>
                    <li>Authorized distributors; or</li>
                    <li>Other approved sales channels designated by ZINICXA.</li>
                </ul>
            </>
        ),
    },
    {
        title: "2. What Is Covered Under Warranty",
        content: (
            <>
                <p>
                    If a product develops a <strong>manufacturing defect</strong> or{" "}
                    <strong>functional defect</strong> during the warranty period under
                    normal usage conditions, ZINICXA may, at its sole discretion:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Repair the defective product; or</li>
                    <li>Replace the product with the same or an equivalent model.</li>
                </ul>
                <p>
                    The final remedy and resolution method shall be determined solely by
                    ZINICXA after evaluation of the warranty claim.
                </p>
            </>
        ),
    },
    {
        title: "3. What Is Not Covered Under Warranty",
        content: (
            <>
                <p>
                    This warranty does not cover defects, damage, or failures resulting
                    from:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Normal wear and tear;</li>
                    <li>Accidental damage, drops, impacts, crushing, or misuse;</li>
                    <li>Exposure to water, moisture, liquids, fire, or natural disasters;</li>
                    <li>Improper use, negligence, or failure to follow product instructions;</li>
                    <li>Unauthorized repair, modification, alteration, or disassembly;</li>
                    <li>
                        Damage caused by power fluctuations, electrical surges, overloading,
                        or improper charging;
                    </li>
                    <li>
                        Removal, alteration, or tampering of serial numbers, labels, or
                        identification marks;
                    </li>
                    <li>
                        Cosmetic damage including scratches, dents, discoloration, or
                        external breakage;
                    </li>
                    <li>Normal degradation of consumable components;</li>
                    <li>Use of incompatible accessories or third-party equipment;</li>
                    <li>
                        Any defect arising from improper storage, handling, or transportation
                        by the customer.
                    </li>
                </ul>
            </>
        ),
    },
    {
        title: "4. Warranty Claim Procedure",
        content: (
            <>
                <p>To submit a warranty claim, the customer must:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>
                        Provide valid proof of purchase, such as an invoice, receipt, or
                        order ID;
                    </li>
                    <li>Provide a detailed description of the issue;</li>
                    <li>
                        Submit photographs, videos, or other supporting evidence if requested;
                    </li>
                    <li>Send the product for inspection when required by the company.</li>
                </ul>
                <p>
                    All warranty claims are subject to verification, evaluation, and
                    approval by ZINICXA.
                </p>
            </>
        ),
    },
    {
        title: "5. Inspection and Approval",
        content: (
            <>
                <p>
                    Upon receipt of a warranty claim, ZINICXA will inspect and evaluate
                    the product.
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>
                        If the defect is determined to be covered under this warranty, the
                        product will be repaired or replaced.
                    </li>
                    <li>
                        If the defect is found not to be covered under this warranty, the
                        claim may be rejected.
                    </li>
                </ul>
                <p>
                    The inspection findings and decision of ZINICXA shall be final and
                    binding.
                </p>
            </>
        ),
    },
    {
        title: "6. Replacement Terms",
        content: (
            <>
                <p>Replacement services are available only for approved warranty claims.</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>
                        Replacement products may be new, refurbished, or equivalent models
                        of similar specifications and functionality.
                    </li>
                    <li>
                        Upon replacement, the original defective product shall become the
                        property of ZINICXA.
                    </li>
                    <li>
                        Any replacement product shall continue under the remaining warranty
                        period of the original purchase and shall not receive a new warranty
                        period.
                    </li>
                </ul>
            </>
        ),
    },
    {
        title: "7. Shipping and Logistics",
        content: (
            <>
                <p>
                    Products submitted for warranty service must be shipped according to
                    ZINICXA's instructions.
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Customers must ensure secure and appropriate packaging of the product.</li>
                    <li>
                        ZINICXA shall not be responsible for damage occurring during transit
                        due to inadequate packaging.
                    </li>
                    <li>
                        Depending on the situation, ZINICXA may arrange reverse pickup,
                        courier collection, or other logistics support at its discretion.
                    </li>
                </ul>
            </>
        ),
    },
    {
        title: "8. Data and Personal Information",
        content: (
            <p>
                If the product is capable of storing data, settings, or personal
                information, customers are solely responsible for backing up such data
                before submitting the product for warranty service. ZINICXA shall not
                be liable for any loss, corruption, or recovery of data during
                inspection, repair, or replacement processes.
            </p>
        ),
    },
    {
        title: "9. Limitation of Warranty and Liability",
        content: (
            <>
                <p>
                    This warranty is limited solely to the repair or replacement of
                    eligible products.
                </p>
                <p>To the maximum extent permitted by applicable law, ZINICXA shall not be liable for:</p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Direct or indirect financial losses;</li>
                    <li>Business interruption or loss of business opportunities;</li>
                    <li>Loss of profits or revenue;</li>
                    <li>Loss of data;</li>
                    <li>Special, incidental, punitive, or consequential damages.</li>
                </ul>
                <p>
                    In all circumstances, ZINICXA's total liability shall not exceed the
                    original purchase price paid for the product.
                </p>
            </>
        ),
    },
    {
        title: "10. Transferability",
        content: (
            <p>
                This warranty is valid only for the <strong>original purchaser</strong>{" "}
                of the product and may not be assigned, transferred, or conveyed to any
                third party without the prior written consent of ZINICXA.
            </p>
        ),
    },
    {
        title: "11. Changes to This Warranty Policy",
        content: (
            <p>
                ZINICXA reserves the right to modify, amend, update, or revise this
                Warranty Policy at any time without prior notice. Any revised version
                shall become effective upon publication on the official website.
            </p>
        ),
    },
    {
        title: "12. Contact Information",
        content: (
            <>
                <p>
                    For warranty support, claim submissions, or assistance, please contact:
                </p>
                <div className="mt-2 space-y-1">
                    <p>
                        <strong>Brand Name:</strong> ZINICXA
                    </p>
                    <p>
                        <strong>Customer Support Email:</strong>{" "}
                        <span className="text-gray-500">[Insert Email Address]</span>
                    </p>
                    <p>
                        <strong>WhatsApp / Mobile:</strong>{" "}
                        <span className="text-gray-500">[Insert Mobile Number]</span>
                    </p>
                    <p>
                        <strong>Working Hours:</strong>{" "}
                        <span className="text-gray-500">[Insert Working Hours]</span>
                    </p>
                </div>
            </>
        ),
    },
];

export default function WarrantyPolicyPage() {
    return (
        <main className="px-8 py-6 sm:px-5 sm:py-8">
            <div className="mx-5">
                <div className="border-b border-neutral-200 pb-4">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                        Warranty Policy
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Last Updated: October 11, 2026
                    </p>
                </div>

                <p className="mb-5 text-sm leading-6 text-gray-600">
                    Welcome to ZINICXA. We are committed to providing high-quality products
                    and reliable customer service. This Warranty Policy outlines the terms,
                    conditions, coverage, and limitations applicable to products sold under
                    the ZINICXA brand. Please read this policy carefully before purchasing
                    or using our products.
                </p>

                <div className="space-y-5 text-sm leading-6 text-gray-600">
                    {warrantySections.map((section) => (
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
                                This Six (6) Month Limited Warranty covers only manufacturing
                                defects and functional failures occurring under normal use
                                conditions. Physical damage, liquid damage, misuse, negligence,
                                unauthorized repairs, alterations, cosmetic damage, and normal
                                wear and tear are expressly excluded from warranty coverage.
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