"use client";

interface Props {
    title: string;

    description?: string;

    children: React.ReactNode;
}

export default function FormSection({
    title,
    description,
    children,
}: Props) {
    return (
        <section className="rounded-xl border bg-card">

            <div className="border-b px-6 py-4">

                <h3 className="text-lg font-semibold">
                    {title}
                </h3>

                {description && (
                    <p className="text-sm text-muted-foreground mt-1">
                        {description}
                    </p>
                )}

            </div>

            <div className="p-6">

                {children}

            </div>

        </section>
    );
}