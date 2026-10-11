import { RetailerOnboardingProvider } from "@/context/RetailerOnboardingContext";

export default function RetailerOnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RetailerOnboardingProvider>
                    {children}
        </RetailerOnboardingProvider>
    );
}