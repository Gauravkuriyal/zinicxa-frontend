import CartItem from "./cartItem";

export default function CartList({
    items,
}: any) {

    return (
        <div className="space-y-4">
            {items.map((item: any,index:number) => (
                <CartItem
                    key={index}
                    item={item}
                />
            ))}
        </div>
    );
}