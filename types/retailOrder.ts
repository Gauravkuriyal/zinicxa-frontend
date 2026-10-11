import { User } from "./user";

export enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED",
}


export enum ApprovalStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export enum CurrentStage {
    PLACED = "PLACED",
    UNDER_SALESMAN_REVIEW = "UNDER_SALESMAN_REVIEW",
    UNDER_ADMIN_REVIEW = "UNDER_ADMIN_REVIEW",
    APPROVED = "APPROVED",
    PROCESSING = "PROCESSING",
    DISPATCHED = "DISPATCHED",
    DELIVERED = "DELIVERED",
    REJECTED = "REJECTED"
}


export interface RetailOrder {
  _id: string;
  orderNumber: string;
  subtotal: number;
  discount: number;
  shippingCharge: number;
  totalAmount: number;
  createdAt: string;

  invoice: string;
  
  paymentMethod: string;
  paymentStatus: PaymentStatus;

  salesmanStatus: ApprovalStatus;
  adminStatus: ApprovalStatus;
  currentStage: CurrentStage;

  salesmanApprovedAt: string;
  adminApprovedAt : string;

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

  retailer : User;
  salesman : User;
  placedBy : User;

  items: {
    product: string;
    productName: string;
    productImage: string;
    retailPrice: number;
    quantity: number;
  }[];
  

  history: {
    status: string;
    remarks: string;
    updatedBy: User;
    createdAt: string;
  }[];
}