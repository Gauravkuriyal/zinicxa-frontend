import ProductCard from "./productCard";

export default function ProductGrid({
    products,
    deleteProduct,
    restoreProduct
}: any) {

    console.log("pro",products)
    return (
        <div
            // className="
            //     grid
            //     gap-6
            //     sm:grid-cols-2
            //     xl:grid-cols-3
            //     2xl:grid-cols-4
            // "
            className="
                flex
                flex-col
                gap-6
            "
        >
            {products.map((product: any) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    deleteProduct={deleteProduct}
                    restoreProduct={restoreProduct}
                />
            ))}
        </div>
    );
}