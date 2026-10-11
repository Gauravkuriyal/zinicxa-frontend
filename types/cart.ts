import { Product } from "./product";
import { User } from "./user";

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Cart {
    _id: string;
    user: User;

    items: [CartItem];

    createdAt?: string;

    updatedAt?: string;

}