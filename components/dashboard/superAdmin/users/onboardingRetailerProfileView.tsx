import React from "react";
import {
    Building2,
    User as UserIcon,
    MapPin,
    Landmark,
    FileText,
    CheckCircle2,
    XCircle,
    Clock,
    ShieldCheck,
    Briefcase,
    Phone,
    Mail,
    FileSpreadsheet,
} from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// --- TypeScript Interfaces ---

export interface UserAccount {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    role: string;
    isProfileSubmitted: boolean;
    isApproved: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface BusinessAddress {
    addressLine1: string;
    addressLine2?: string;
    townCity: string;
    district: string;
    state: string;
    pincode: string;
    country: string;
}

export interface BankDetails {
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
    ifsc: string;
    branch: string;
}

export interface Territory {
    towns: string[];
    districts: string[];
}

export interface Property {
    address: string;
    ownedBy: string;
    ownerName: string;
    relationshipWithOwner: string;
}

export interface AuthorizedSignatory {
    name: string;
    status: string;
    signature: string | null;
}

export interface Documents {
    memorandumAndArticlesofAssociation?: string | null;
    listOfDirectors?: string | null;
    boardResolution?: string | null;
    partnershipDeed?: string | null;
    listOfPartners?: string | null;
    balanceSheets?: string[];
    incomeTaxReturns?: string[];
    electricityOrTelephoneBill?: string | null;
    bankStatement?: string | null;
    creditCertificate?: string | null;
    stVatCertificate?: string | null;
    showroomFrontPhoto?: string | null;
    showroomInsidePhoto?: string | null;
    masterCharges?: string | null;
    otherDocuments?: string[];
    gstCertificate?: string | null;
    pan?: string | null;
    aadhaar?: string | null;
    cancelledChequeOrPassbook?: string | null;
    [key: string]: string | string[] | null | undefined;
}

export interface Declaration {
    accepted: boolean;
    acceptedAt: string;
    signedBy: string;
    signature: string | null;
    date: string;
    place: string;
}

export type OnboardingStatus = "APPROVED" | "REJECTED" | "DRAFT" | "SUBMITTED" | string;

export interface Profile {
    _id: string;
    retailer: string;
    businessType: string;
    firmName: string;
    ownerName: string;
    mobile: string;
    email: string;
    gstin: string;
    proposedInvestment: string;
    pan: string;
    photograph: string | null;
    businessAddress: BusinessAddress;
    bankDetails: BankDetails;
    territory: Territory;
    properties: Property[];
    appliedFor: string[];
    constitution: string | null;
    businessPersons: any[];
    sisterConcerns: any[];
    insurance: string | null;
    authorizedSignatories: AuthorizedSignatory[];
    documents: Documents;
    declaration: Declaration;
    onboardingStatus: OnboardingStatus;
    rejectionReason: string | null;
    reviewedBy: string | null;
    reviewedAt: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// export interface OnboardingProfileData {
//   success: boolean;
//   user: UserAccount;
//   profile: Profile;
// }

interface OnboardingProfileViewProps {
    user: UserAccount;
    profile: Profile;
    approveRetailer: (approveStatus?:boolean) => void;
}

// --- Status Badge Component ---

const StatusBadge: React.FC<{ status: OnboardingStatus }> = ({ status }) => {
    const styles: Record<string, string> = {
        APPROVED: "bg-green-100 text-green-800 border-green-300",
        REJECTED: "bg-red-100 text-red-800 border-red-300",
        DRAFT: "bg-amber-100 text-amber-800 border-amber-300",
        SUBMITTED: "bg-blue-100 text-blue-800 border-blue-300",
    };

    return (
        <span
            className={`px-3 py-1 text-xs font-semibold rounded-full border ${styles[status] || "bg-gray-100 text-gray-800 border-gray-300"
                }`}
        >
            {status}
        </span>
    );
};

// --- Main View Component ---

export default function OnboardingProfileView({ user, profile, approveRetailer }: OnboardingProfileViewProps) {
    if (!profile || !user) {
        return (
            <div className="p-8 text-center text-red-500 font-medium">
                Failed to load profile data or data is missing.
            </div>
        );
    }

    const getFileName = (filePath: string): string => {
        if (!filePath) return "";
        return filePath.split(/[\\/]/).pop() || "";
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen text-gray-800">
            {/* Top Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {profile.firmName || "Unnamed Business"}
                            </h1>
                            <StatusBadge status={profile.onboardingStatus} />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            Applied for:{" "}
                            <span className="font-semibold text-gray-700">
                                {profile.appliedFor?.join(", ")}
                            </span>{" "}
                            • Business Type:{" "}
                            <span className="font-semibold text-gray-700">
                                {profile.businessType}
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                        <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-lg">
                            {user.isApproved ? (
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                                <XCircle className="w-4 h-4 text-amber-600" />
                            )}
                            <span>Approved: {user.isApproved ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-lg">
                            {user.isProfileSubmitted ? (
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                                <Clock className="w-4 h-4 text-gray-400" />
                            )}
                            <span>Profile Submitted</span>
                        </div>
                        <div>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" className="bg-green-800 text-white cursor-pointer hover:bg-green-600 hover:text-white">
                                        Approve Retailer
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will approve the retailer and avail all the retailer services available on the platform.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={()=>approveRetailer(true)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" className="bg-red-800 text-white cursor-pointer hover:bg-red-600 hover:text-white">
                                        Reject Retailer
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will reject the retailer onboarding.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={()=>approveRetailer(false)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: General & Contact Info */}
                <div className="space-y-6 lg:col-span-1">
                    {/* User Account Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
                        <h2 className="text-base font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                            <UserIcon className="w-5 h-5 text-indigo-600" /> Account Information
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-xs text-gray-500">Full Name</p>
                                <p className="font-medium text-gray-900">{user.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Email Address</p>
                                <p className="font-medium text-gray-900 flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5 text-gray-400" /> {user.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Mobile Number</p>
                                <p className="font-medium text-gray-900 flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5 text-gray-400" /> {user.mobile}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Role</p>
                                <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-indigo-50 text-indigo-700 font-medium rounded">
                                    {user.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Business Verification Identifiers */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
                        <h2 className="text-base font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-indigo-600" /> Statutory Details
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-xs text-gray-500">GSTIN</p>
                                <p className="font-mono font-medium text-gray-900 uppercase">
                                    {profile.gstin || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">PAN Number</p>
                                <p className="font-mono font-medium text-gray-900 uppercase">
                                    {profile.pan || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Owner Name</p>
                                <p className="font-medium text-gray-900">{profile.ownerName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Proposed Investment</p>
                                <p className="font-medium text-gray-900">{profile.proposedInvestment || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Banking Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
                        <h2 className="text-base font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                            <Landmark className="w-5 h-5 text-indigo-600" /> Bank Details
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-xs text-gray-500">Bank Name</p>
                                <p className="font-medium text-gray-900">
                                    {profile.bankDetails?.bankName}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Account Holder</p>
                                <p className="font-medium text-gray-900">
                                    {profile.bankDetails?.accountHolderName}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Account Number</p>
                                <p className="font-mono font-medium text-gray-900">
                                    {profile.bankDetails?.accountNumber}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="text-xs text-gray-500">IFSC Code</p>
                                    <p className="font-mono font-medium text-gray-900">
                                        {profile.bankDetails?.ifsc}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Branch</p>
                                    <p className="font-medium text-gray-900">
                                        {profile.bankDetails?.branch}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Address, Territory, Documents, & Declaration */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Address & Territory */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
                        <h2 className="text-base font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-indigo-600" /> Location & Territory
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-50 p-3.5 rounded-lg space-y-1">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    Business Address
                                </p>
                                <p className="text-gray-800">
                                    {profile.businessAddress?.addressLine1}
                                </p>
                                {profile.businessAddress?.addressLine2 && (
                                    <p className="text-gray-800">
                                        {profile.businessAddress?.addressLine2}
                                    </p>
                                )}
                                <p className="text-gray-800">
                                    {profile.businessAddress?.townCity},{" "}
                                    {profile.businessAddress?.district}
                                </p>
                                <p className="text-gray-800">
                                    {profile.businessAddress?.state} -{" "}
                                    {profile.businessAddress?.pincode}
                                </p>
                                <p className="text-xs text-gray-500 font-medium pt-1">
                                    {profile.businessAddress?.country}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-3.5 rounded-lg space-y-3">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Assigned Districts
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                                        {profile.territory?.districts?.map((district, index) => (
                                            <span
                                                key={index}
                                                className="bg-white border border-gray-200 text-gray-700 px-2.5 py-0.5 rounded text-xs font-medium"
                                            >
                                                {district}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Assigned Towns
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                                        {profile.territory?.towns?.map((town, index) => (
                                            <span
                                                key={index}
                                                className="bg-white border border-gray-200 text-gray-700 px-2.5 py-0.5 rounded text-xs font-medium"
                                            >
                                                {town}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documents Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
                        <h2 className="text-base font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-indigo-600" /> Uploaded Documents
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            {Object.entries(profile.documents || {}).map(([key, value]) => {
                                if (!value || (Array.isArray(value) && value.length === 0)) {
                                    return null;
                                }

                                const formattedKey = key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str) => str.toUpperCase());

                                return (
                                    <div
                                        key={key}
                                        className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex flex-col justify-between"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">
                                                    {formattedKey}
                                                </p>
                                                <p className="text-xs font-mono text-gray-800 truncate max-w-[180px] mt-0.5">
                                                    {Array.isArray(value)
                                                        ? `${value.length} files attached`
                                                        : getFileName(value)}
                                                </p>
                                            </div>
                                            <FileSpreadsheet className="w-4 h-4 text-gray-400 shrink-0" />
                                        </div>

                                        <div className="mt-3 pt-2 border-t border-gray-200 flex gap-2">
                                            {Array.isArray(value) ? (
                                                <div className="w-full space-y-1">
                                                    {value.map((filePath, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/${filePath}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium truncate"
                                                        >
                                                            File {idx + 1}: {getFileName(filePath)}
                                                        </a>
                                                    ))}
                                                </div>
                                            ) : (
                                                <a
                                                    href={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/${value}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                                                >
                                                    View Document
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Authorised Signatories & Properties */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Signatories */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-3">
                            <h2 className="text-base font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-indigo-600" /> Signatories
                            </h2>
                            {profile.authorizedSignatories?.map((signatory, idx) => (
                                <div key={idx} className="text-sm bg-gray-50 p-3 rounded-lg space-y-1">
                                    <p className="font-semibold text-gray-900">{signatory.name}</p>
                                    <p className="text-xs text-gray-500">Status: {signatory.status}</p>
                                    {signatory.signature && (
                                        <a
                                            href={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/${signatory.signature}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs text-indigo-600 hover:underline flex items-center gap-1 mt-1"
                                        >
                                            View Signature
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Properties */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-3">
                            <h2 className="text-base font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-indigo-600" /> Properties
                            </h2>
                            {profile.properties?.map((prop, idx) => (
                                <div key={idx} className="text-sm bg-gray-50 p-3 rounded-lg space-y-1">
                                    <p className="font-medium text-gray-900">{prop.address}</p>
                                    <p className="text-xs text-gray-500">
                                        Owned by: {prop.ownerName} ({prop.ownedBy})
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Relation: {prop.relationshipWithOwner}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legal Declaration */}
                    {profile.declaration && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-3">
                            <h2 className="text-base font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-600" /> Legal Declaration
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                                <div>
                                    <p className="text-gray-500">Accepted Status</p>
                                    <p className="font-semibold text-gray-900">
                                        {profile.declaration.accepted ? "Accepted" : "Pending"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Signed By</p>
                                    <p className="font-semibold text-gray-900">
                                        {profile.declaration.signedBy}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Place</p>
                                    <p className="font-semibold text-gray-900">
                                        {profile.declaration.place}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Accepted Date</p>
                                    <p className="font-semibold text-gray-900">
                                        {new Date(profile.declaration.acceptedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}