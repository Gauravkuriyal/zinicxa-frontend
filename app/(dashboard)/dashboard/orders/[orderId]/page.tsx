import CustomerOrderDetail from "@/components/dashboard/orders/customerOrderDetail";

interface OrderDetailPageProps {
    params: Promise<{
        orderId: string;
    }>;
}

export default async function OrderDetailPage({
    params,
}: OrderDetailPageProps) {

    const { orderId } = await params;


    return (
        <div className="space-y-6">

            <div>

                <h1
                    className="
                        text-3xl
                        font-bold
                    "
                >
                    Order Detail
                </h1>

            </div>
            <CustomerOrderDetail orderId={orderId} />
         </div>
    );
}