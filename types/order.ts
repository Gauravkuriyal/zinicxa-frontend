import { User } from "./user";

export interface Order {
  _id: string;
  orderNumber: string;
  paymentStatus: string;
  orderStatus: string;
  subtotal: number;
  shippingCharge: number;
  totalAmount: number;
  createdAt: string;

  invoice: string;

  shippingAddress: {
    fullName: string;
    mobile: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };

  user : User;

  items: {
    product: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
  }[];
}