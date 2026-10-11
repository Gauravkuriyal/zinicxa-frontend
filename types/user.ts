import { Role } from "@/lib/roles";

export interface User {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    role: Role;
    isActive: boolean;
    isProfileSubmitted?: boolean;
    isApproved?: boolean;
}

// export interface User {
//     id: string;
//     name: string;
//     email: string;
//     mobile: string;
//     role: Role;
// }