import { Role } from "@/lib/roles";
import { User } from "./user";



export interface SupportMessage {
    sender: User;
    message: string;
    attachments: string[];
    createdAt: string
}

export interface SupportHistory {

    action: "CREATED"| "REPLIED"| "ESCALATED"| "RESOLVED"| "REOPENED"| "CLOSED";

    performedBy: User;

    remarks?: string;

    createdAt: string;
}

export interface SupportTicket {

    _id: string;

    ticketNumber: string;

    subject: string;

    description: string;

    priority: "LOW"| "MEDIUM"| "HIGH";

    status: "OPEN"| "RESOLVED"| "CLOSED";

    currentHandler: "SALESMAN"| "ADMIN"| "SUPER_ADMIN";

    attachments: string[];

    messages: SupportMessage[];

    history: SupportHistory[];

    createdAt: string;

    createdBy: User;
    assignedTo: User;
}