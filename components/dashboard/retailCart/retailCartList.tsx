import RetailCartItem from "./retailCartItem";

export default function RetailCartList({
    items,
}: any) {

    return (
        <div className="space-y-4">
            {items.map((item: any,index:number) => (
                <RetailCartItem
                    key={index}
                    item={item}
                />
            ))}
        </div>
    );
}