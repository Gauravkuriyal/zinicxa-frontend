import OrderDetail from "@/components/dashboard/orders/orderDetail";

interface OrderDetailPageProps {
    params: Promise<{
        orderId: string;
    }>;
}

export default async function RetailOrderDetailPage({
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
            <OrderDetail orderId={orderId} />
         </div>
    );
}