import { Product } from "./product";
import { User } from "./user";

export interface RetailCartItem {
    product: Product;
    quantity: number;
}

export interface RetailCart {
    _id: string;
    user: User;

    items: [RetailCartItem];

    createdAt?: string;

    updatedAt?: string;

}