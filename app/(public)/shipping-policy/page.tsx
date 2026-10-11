import { FileText } from "lucide-react";

const shippingSections = [
  {
    title: "1. Order Processing",
    points: [
      "All orders are processed only after successful payment confirmation.",
      "Orders are generally dispatched within 1–3 business days from the date of payment confirmation.",
      "Processing times may be extended due to Sundays, public holidays, or unforeseen circumstances.",
      "If an order cannot be processed for any reason, the customer will be informed as soon as reasonably possible.",
    ],
  },
  {
    title: "2. Shipping & Delivery",
    points: [
      "ZINICXA delivers to most serviceable PIN code locations across India.",
      "Orders are shipped through reliable logistics and courier partners.",
      "After dispatch, the estimated delivery time is generally 3–10 business days, depending on the delivery location.",
      "Delivery timelines may be affected by remote locations, adverse weather conditions, natural disasters, government restrictions, courier delays, or other circumstances beyond our reasonable control.",
    ],
  },
  {
    title: "3. Shipping Charges",
    points: [
      "Shipping charges may vary depending on the product, order value, package weight, and delivery location.",
      "Applicable shipping charges, if any, will be displayed during the checkout process before payment.",
      "ZINICXA may offer free shipping or promotional shipping offers from time to time at its sole discretion.",
    ],
  },
  {
    title: "4. Order Tracking",
    points: [
      "Once an order has been dispatched, tracking details may be shared with the customer via Email, SMS, or WhatsApp, where applicable.",
      'Customers can track the status of their shipment through the "Track Your Order" section available on our website.',
      "Tracking information may take 24–48 hours to become active after dispatch.",
    ],
  },
  {
    title: "5. Delivery Delays",
    points: [
      "Estimated delivery timelines are provided for reference only and are not guaranteed.",
      "ZINICXA shall not be liable for delays caused by courier partners, weather conditions, transportation disruptions, government actions, natural disasters, or any other events beyond its reasonable control.",
      "In the event of a delay, we will make reasonable efforts to assist customers in obtaining updated shipment information.",
    ],
  },
  {
    title: "6. Incorrect Address & Failed Delivery",
    points: [
      "Customers are responsible for providing accurate and complete shipping information, including their name, mobile number, and delivery address.",
      "Additional shipping charges may apply if delivery fails due to incorrect, incomplete, or inaccurate address details provided by the customer.",
      "If an order is returned to us due to customer unavailability or an incorrect address, re-shipping charges may be applicable before the order is dispatched again.",
    ],
  },
  {
    title: "7. Damaged or Incorrect Products",
    points: [
      "If a customer receives a damaged, defective, or incorrect product, they must contact our Customer Support Team within 24 hours of delivery with clear photographs and an unboxing video as supporting evidence.",
      "Such requests will be reviewed and handled in accordance with our Return Policy and Replacement Policy.",
    ],
  },
  {
    title: "8. Contact Us",
    paragraphs: [
      "For any questions, concerns, or assistance regarding shipping or delivery, customers may contact our Customer Support Team through the contact details provided on our website.",
    ],
  },
  {
    title: "9. Changes to This Shipping Policy",
    paragraphs: [
      "ZINICXA reserves the right to modify, update, amend, or replace this Shipping Policy at any time without prior notice. Any changes shall become effective immediately upon publication on the website. Customers are encouraged to review this policy periodically to stay informed of any updates.",
    ],
  },
];

export default function ShippingPolicyPage() {
  return (
    <main className="w-full px-8 py-8">
      <div className="mx-5">
        <div className="mb-5 border-b pb-4">

          <div className="border-b border-neutral-200 pb-4">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
              Shipping Policy
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Last Updated: October 11, 2026
            </p>
          </div>

          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            Welcome to <strong className="text-foreground">ZINICXA</strong>. This
            Shipping Policy explains our order processing, shipping, delivery
            procedures, and related terms to ensure a transparent shopping
            experience. By placing an order through our website, you agree to the
            terms outlined below.
          </p>
        </div>

        <div className="space-y-5">
          {shippingSections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-2 text-lg font-semibold tracking-tight sm:text-xl">
                {section.title}
              </h2>

              {section.points && (
                <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-muted-foreground sm:text-base">
                  {section.points.map((point) => (
                    <li key={point} className="pl-0.5">
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {section.paragraphs && (
                <div className="space-y-2 text-sm leading-6 text-muted-foreground sm:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <footer className="mt-6 border-t pt-4">
          <p className="font-semibold">ZINICXA</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Quality Accessories. Trusted Service.
          </p>
        </footer>
      </div>
    </main>
  );
}