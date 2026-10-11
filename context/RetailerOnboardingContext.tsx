"use client";

import { useAuthApi } from "@/hooks/useAuthApi";
import { useRouter } from "next/navigation";
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import toast from "react-hot-toast";

/* =========================================================
   TYPES
========================================================= */

const SESSION_KEY = "retailer-onboarding-session-data";
const NEW_USER_SESSION_KEY = "new-retailer-onboarding";

export type BusinessType =
    | "PROPRIETORSHIP"
    | "PARTNERSHIP"
    | "PVT_LTD"
    | "LLP"
    | "PUBLIC_LTD"
    | "OTHER";

export type AuthorizedSignatoryStatus = "PROPRIETOR" | "PARTNER" | "DIRECTOR" | "AUTHORIZED_PERSON" | "OTHER";

export type SupportLevel = "SALESMAN" | "ADMIN";

/* ---------------------------------------------------------
   Registration
--------------------------------------------------------- */

export interface RegistrationData {
    email: string;
    password: string;
    confirmPassword: string;
    otp: string;
}

/* ---------------------------------------------------------
   Business Address
--------------------------------------------------------- */

export interface BusinessAddress {
    addressLine1: string;
    addressLine2: string;
    townCity: string;
    district: string;
    state: string;
    pincode: string;
    country: string;
}

/* ---------------------------------------------------------
   Bank Details
--------------------------------------------------------- */

export interface BankDetails {
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
    ifsc: string;
    branch: string;
}

/* ---------------------------------------------------------
   Territory
--------------------------------------------------------- */

export interface Territory {
    towns: [] | [string];
    districts: [] | [string];
    // city: string;
    // area: string;
    // pincode: string;
    // description: string;
}

/* ---------------------------------------------------------
   Property
--------------------------------------------------------- */

export interface PropertyData {
    address: string;
    ownedBy:
    | "FIRM"
    | "PROPRIETOR"
    | "PARTNER"
    | "DIRECTOR"
    | "INDIVIDUAL"
    | "OTHER";
    ownerName: string;
    relationshipWithOwner: string;
}

/* ---------------------------------------------------------
   Business Person
--------------------------------------------------------- */

export interface BusinessPerson {
    name: string;
    officeAddress: string;
    officePhone: string;
    residenceAddress: string;
    residencePhone: string;
    qualification: string;
    shareInBusiness: number;
    designation: "PROPRIETOR" | "PARTNER" | "DIRECTOR" | "OTHER";
}

/* ---------------------------------------------------------
   Sister Concern
--------------------------------------------------------- */

export interface SisterConcern {
    name: string;
    officeAddress: string;
    phone: string;
    natureOfBusiness: string;
    approximateAnnualTurnover: number;
}

/* ---------------------------------------------------------
   Authorized Signatory
--------------------------------------------------------- */

export interface AuthorizedSignatory {
    name: string;
    status: AuthorizedSignatoryStatus;
    signature: File | null | string;
}

/* ---------------------------------------------------------
   Declaration
--------------------------------------------------------- */

export interface DeclarationData {
    declarationAccepted: boolean;
    signedBy: string;
    declarationDate: string;
    declarationPlace: string;
}

/* ---------------------------------------------------------
   Insurance
--------------------------------------------------------- */

export interface InsuranceData {
    companyName: string;
    companyAddress: string;
    phone: string;
    contactPerson: string;
    riskCovered: string;
    riskCoveredValue: number;
}

/* ---------------------------------------------------------
   Documents
--------------------------------------------------------- */

export interface RetailerDocuments {
    pan: File | null;
    aadhaar: File | null;
    cancelledChequeOrPassbook: File | null;

    showroomFrontPhoto: File | null;
    showroomInsidePhoto: File | null;

    gstCertificate: File | null;

    photograph: File | null;

    memorandumAndArticlesofAssociation: File | null;
    listOfDirectors: File | null;
    boardResolution: File | null;

    partnershipDeed: File | null;
    listOfPartners: File | null;

    electricityOrTelephoneBill: File | null;
    bankStatement: File | null;
    creditCertificate: File | null;

    stVatCertificate: File | null;
    masterCharges: File | null;
    signature: File | null;

    balanceSheets: File[];
    incomeTaxReturns: File[];
    otherDocuments: File[];
}

/* ---------------------------------------------------------
   Complete Onboarding Form
--------------------------------------------------------- */

export interface RetailerOnboardingFormData {
    /* Business Information */

    businessType: BusinessType | "";

    firmName: string;

    ownerName: string;

    mobile: string;

    email: string;

    gstin: string;

    pan: string;

    gstApplicable: boolean;

    proposedInvestment: string;

    /* Address */

    businessAddress: BusinessAddress;

    /* Bank */

    bankDetails: BankDetails;

    /* Optional Business Information */

    constitution: Record<string, any>;

    territory: Territory;

    /* Dynamic sections */

    properties: PropertyData[];

    businessPersons: BusinessPerson[];

    sisterConcerns: SisterConcern[];

    authorizedSignatories: AuthorizedSignatory[];

    // Insurance

    insurance: InsuranceData;

    /* Declaration */

    declarationAccepted: boolean;

    signedBy: string;

    declarationDate: string;

    declarationPlace: string;

    /* Documents */

    documents: RetailerDocuments;

    /* Applied For */

    appliedFor: string[];
}

/* =========================================================
   CONTEXT TYPE
========================================================= */

interface RetailerOnboardingContextType {
    /* -----------------------------------------------------
               Registration
            ----------------------------------------------------- */

    registration: RegistrationData;

    setRegistration: React.Dispatch<React.SetStateAction<RegistrationData>>;

    /* -----------------------------------------------------
               Main Form
            ----------------------------------------------------- */

    formData: RetailerOnboardingFormData;

    setFormData: React.Dispatch<React.SetStateAction<RetailerOnboardingFormData>>;

    // updateFormData: <K extends keyof RetailerOnboardingFormData>(
    //     field: K,
    //     value: RetailerOnboardingFormData[K]
    // ) => void;

    updateFormData: (updates: Partial<RetailerOnboardingFormData>) => void;

    /* -----------------------------------------------------
               Business Information
            ----------------------------------------------------- */

    businessInformation: {
        businessType: BusinessType | "";
        firmName: string;
        ownerName: string;
        mobile: string;
        email: string;
        gstin: string;
        pan: string;
        gstApplicable: boolean;
        proposedInvestment: string;
    };

    setBusinessInformation: React.Dispatch<
        React.SetStateAction<{
            businessType: BusinessType | "";
            firmName: string;
            ownerName: string;
            mobile: string;
            email: string;
            gstin: string;
            pan: string;
            gstApplicable: boolean;
            proposedInvestment: string;
        }>
    >;

    /* -----------------------------------------------------
               Business Address
            ----------------------------------------------------- */

    businessAddress: BusinessAddress;

    setBusinessAddress: React.Dispatch<React.SetStateAction<BusinessAddress>>;

    /* -----------------------------------------------------
               Bank
            ----------------------------------------------------- */

    bankDetails: BankDetails;

    setBankDetails: React.Dispatch<React.SetStateAction<BankDetails>>;

    /* -----------------------------------------------------
               Territory
            ----------------------------------------------------- */

    territory: Territory;

    /* -----------------------------------------------------
               Dynamic Arrays
            ----------------------------------------------------- */

    properties: PropertyData[];

    businessPersons: BusinessPerson[];

    sisterConcerns: SisterConcern[];

    authorizedSignatories: AuthorizedSignatory[];

    /* -----------------------------------------------------
               Declaration
            ----------------------------------------------------- */

    declarationAccepted: boolean;

    signedBy: string;

    declarationDate: string;

    declarationPlace: string;

    /* -----------------------------------------------------
               Documents
            ----------------------------------------------------- */

    documents: RetailerDocuments;

    setDocuments: React.Dispatch<React.SetStateAction<RetailerDocuments>>;

    /* -----------------------------------------------------
               Onboarding Navigation
            ----------------------------------------------------- */

    currentStep: number;

    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;

    totalSteps: number;

    nextStep: () => void;

    previousStep: () => void;

    goToStep: (step: number) => void;

    isNewRetailer: boolean;

    /* -----------------------------------------------------
               Reset
            ----------------------------------------------------- */

    resetOnboarding: () => void;
    submitOnboarding: () => void;
}

/* =========================================================
   DEFAULT VALUES
========================================================= */

const initialRegistration: RegistrationData = {
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
};

const initialBusinessAddress: BusinessAddress = {
    addressLine1: "",
    addressLine2: "",
    townCity: "",
    district: "",
    state: "",
    pincode: "",
    country: "India",
};

const initialBankDetails: BankDetails = {
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    ifsc: "",
    branch: "",
};

const initialInsuranceData: InsuranceData = {
    companyName: "",
    companyAddress: "",
    phone: "",
    contactPerson: "",
    riskCovered: "",
    riskCoveredValue: 0,
};

const initialTerritory: Territory = {
    // state: "",
    towns: [],
    districts: [],
    // city: "",
    // area: "",
    // pincode: "",
    // description: "",
};

const initialDocuments: RetailerDocuments = {
    pan: null,
    aadhaar: null,
    cancelledChequeOrPassbook: null,

    showroomFrontPhoto: null,
    showroomInsidePhoto: null,

    gstCertificate: null,

    photograph: null,

    memorandumAndArticlesofAssociation: null,
    listOfDirectors: null,
    boardResolution: null,

    partnershipDeed: null,
    listOfPartners: null,

    electricityOrTelephoneBill: null,
    bankStatement: null,
    creditCertificate: null,

    stVatCertificate: null,
    masterCharges: null,
    signature: null,

    balanceSheets: [],
    incomeTaxReturns: [],
    otherDocuments: [],
};

const initialFormData: RetailerOnboardingFormData = {
    /* Business */

    businessType: "",

    firmName: "",

    ownerName: "",

    mobile: "",

    email: "",

    gstin: "",

    pan: "",

    gstApplicable: true,

    proposedInvestment: "",

    /* Address */

    businessAddress: initialBusinessAddress,

    /* Bank */

    bankDetails: initialBankDetails,

    /* Optional */

    constitution: {},

    territory: initialTerritory,

    /* Arrays */

    properties: [],

    businessPersons: [],

    sisterConcerns: [],

    authorizedSignatories: [],

    insurance: initialInsuranceData,

    /* Declaration */

    declarationAccepted: false,

    signedBy: "",

    declarationDate: "",

    declarationPlace: "",

    /* Documents */

    documents: initialDocuments,

    /* Applied for */

    appliedFor: ["RETAILER"],
};

/* =========================================================
   CONTEXT
========================================================= */

const RetailerOnboardingContext = createContext<
    RetailerOnboardingContextType | undefined
>(undefined);

/* =========================================================
   PROVIDER
========================================================= */

interface ProviderProps {
    children: ReactNode;
}

export function RetailerOnboardingProvider({ children }: ProviderProps) {
    const api = useAuthApi();
    /* -----------------------------------------------------
               Registration
            ----------------------------------------------------- */

    const [registration, setRegistration] =
        useState<RegistrationData>(initialRegistration);

    /* -----------------------------------------------------
               Main Form
            ----------------------------------------------------- */

    const [formData, setFormData] =
        useState<RetailerOnboardingFormData>(initialFormData);

    /* -----------------------------------------------------
               Navigation
            ----------------------------------------------------- */

    const [currentStep, setCurrentStep] = useState(1);

    const [submitting, setSubmitting] = useState(false);

    const [isNewRetailer, setIsNewRetailer] = useState(true);

    const router = useRouter();

    /*
     * Change this according to your actual
     * onboarding pages.
     *
     * Registration is normally handled before
     * these steps, so these are the onboarding
     * steps after account creation.
     */

    const getDataFromApi = async () => {
        try {
            const apiFormData = await api.get("/api/retailer/profile");
            console.log("data from api", apiFormData.data);
            const profileData = apiFormData.data.profile;
            setFormData({...profileData,declarationAccepted:true,signedBy: profileData.declaration.signedBy,declarationDate:new Date(profileData.declaration.acceptedAt).toDateString,declarationPlace:profileData.declaration.place})
            setIsNewRetailer(false);
            sessionStorage.setItem(NEW_USER_SESSION_KEY, "false");
        } catch (err) {
            console.log(err);
        }

    }
    useEffect(() => {
        const data = sessionStorage.getItem(SESSION_KEY);
        if (data) {
            const jsonData = JSON.parse(data);
            const isNewRetailer = sessionStorage.getItem(NEW_USER_SESSION_KEY);
            if (isNewRetailer) {
                setIsNewRetailer(isNewRetailer == "false" ? false : true);
            }
            setFormData(jsonData);
        }
        if (!data) {
            getDataFromApi();
        }
    }, []);

    const totalSteps = 9;

    /* -----------------------------------------------------
               Update Form
            ----------------------------------------------------- */

    //   const updateFormData = <K extends keyof RetailerOnboardingFormData>(
    //     field: K,
    //     value: RetailerOnboardingFormData[K]
    //   ) => {
    //     setFormData((previous) => ({
    //       ...previous,
    //       [field]: value,
    //     }));
    //   };

    const updateFormData = (updates: Partial<RetailerOnboardingFormData>) => {
        setFormData((prev) => ({
            ...prev,
            ...updates,
        }));
    };

    /* -----------------------------------------------------
               Business Information
               Alias around formData
            ----------------------------------------------------- */

    const businessInformation = {
        businessType: formData.businessType,

        firmName: formData.firmName,

        ownerName: formData.ownerName,

        mobile: formData.mobile,

        email: formData.email,

        gstin: formData.gstin,

        pan: formData.pan,

        gstApplicable: formData.gstApplicable,

        proposedInvestment: formData.proposedInvestment,
    };

    const setBusinessInformation: React.Dispatch<
        React.SetStateAction<typeof businessInformation>
    > = (value) => {
        setFormData((previous) => {
            const next =
                typeof value === "function"
                    ? value({
                        businessType: previous.businessType,

                        firmName: previous.firmName,

                        ownerName: previous.ownerName,

                        mobile: previous.mobile,

                        email: previous.email,

                        gstin: previous.gstin,

                        pan: previous.pan,

                        gstApplicable: previous.gstApplicable,

                        proposedInvestment: previous.proposedInvestment,
                    })
                    : value;

            return {
                ...previous,
                ...next,
            };
        });
    };

    /* -----------------------------------------------------
               Business Address
               Alias around formData
            ----------------------------------------------------- */

    const businessAddress = formData.businessAddress;

    const setBusinessAddress: React.Dispatch<
        React.SetStateAction<BusinessAddress>
    > = (value) => {
        setFormData((previous) => {
            const next =
                typeof value === "function" ? value(previous.businessAddress) : value;

            return {
                ...previous,
                businessAddress: next,
            };
        });
    };

    /* -----------------------------------------------------
               Bank Details
            ----------------------------------------------------- */

    const bankDetails = formData.bankDetails;

    const setBankDetails: React.Dispatch<React.SetStateAction<BankDetails>> = (
        value
    ) => {
        setFormData((previous) => {
            const next =
                typeof value === "function" ? value(previous.bankDetails) : value;

            return {
                ...previous,
                bankDetails: next,
            };
        });
    };

    /* -----------------------------------------------------
               Documents
            ----------------------------------------------------- */

    const documents = formData.documents;

    const setDocuments: React.Dispatch<
        React.SetStateAction<RetailerDocuments>
    > = (value) => {
        setFormData((previous) => {
            const next =
                typeof value === "function" ? value(previous.documents) : value;

            return {
                ...previous,
                documents: next,
            };
        });
    };

    /* -----------------------------------------------------
               Navigation
            ----------------------------------------------------- */

    const nextStep = () => {
        try {
            validateStep();
            // setCurrentStep((previous) => Math.min(previous + 1, totalSteps - 1));
            if (currentStep == totalSteps) {
                return;
            }

            setCurrentStep(
                currentStep + 1
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(formData));
            console.log(formData);
            console.log("nen", currentStep)
        } catch (err: any) {
            toast.error(err.message)
        }
    };

    const previousStep = () => {
        // setCurrentStep((previous) => Math.max(previous - 1, 0));
        if (currentStep == 1) {
            return;
        }

        setCurrentStep(
            currentStep - 1
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const goToStep = (step: number) => {
        if (step < 0 || step >= totalSteps) {
            return;
        }

        setCurrentStep(step);
    };

    /* -----------------------------------------------------
               Reset
            ----------------------------------------------------- */

    const resetOnboarding = () => {
        setRegistration(initialRegistration);

        setFormData(initialFormData);

        setCurrentStep(0);
    };

    const validateBusinessInformation = (): void => {
        if (!formData.businessType) {
            throw new Error("Business type is required");
        }

        if (!formData.firmName?.trim()) {
            throw new Error("Firm name is required");
        }

        if (!formData.ownerName?.trim()) {
            throw new Error("Owner name is required");
        }

        if (!formData.mobile?.trim()) {
            throw new Error("Mobile number is required");
        }

        if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
            throw new Error("Please enter a valid 10-digit mobile number");
        }

        if (!formData.email?.trim()) {
            throw new Error("Email is required");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            throw new Error("Please enter a valid email address");
        }

        if (!formData.pan?.trim()) {
            throw new Error("PAN is required");
        }

        if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan.trim().toUpperCase())) {
            throw new Error("Please enter a valid PAN");
        }

        if (formData.gstApplicable) {
            if (!formData.gstin?.trim()) {
                throw new Error("GSTIN is required when GST is applicable");
            }

            if (
                !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(
                    formData.gstin.trim().toUpperCase()
                )
            ) {
                throw new Error("Please enter a valid GSTIN");
            }
        }

        // if (!formData.proposedInvestment?.trim()) {
        //   throw new Error("Proposed investment is required");
        // }
    };

    const validateBusinessAddress = (): void => {
        const addressData: BusinessAddress = formData.businessAddress;
        if (!addressData.addressLine1?.trim()) {
            throw new Error("Address Line 1 is required");
        }

        if (!addressData.townCity?.trim()) {
            throw new Error("Town/City is required");
        }

        if (!addressData.district?.trim()) {
            throw new Error("District is required");
        }

        if (!addressData.state?.trim()) {
            throw new Error("State is required");
        }

        if (!addressData.pincode?.trim()) {
            throw new Error("Pincode is required");
        }

        if (!/^\d{6}$/.test(addressData.pincode.trim())) {
            throw new Error("Please enter a valid 6-digit pincode");
        }

        if (!addressData.country?.trim()) {
            throw new Error("Country is required");
        }
    };

    const validateBankDetails = (): void => {
        const bankDetails: BankDetails = formData.bankDetails;
        if (!bankDetails.bankName?.trim()) {
            throw new Error("Bank name is required");
        }

        if (!bankDetails.accountHolderName?.trim()) {
            throw new Error("Account holder name is required");
        }

        if (!bankDetails.accountNumber?.trim()) {
            throw new Error("Account number is required");
        }

        if (!/^\d{9,18}$/.test(bankDetails.accountNumber.trim())) {
            throw new Error("Please enter a valid account number");
        }

        if (!bankDetails.ifsc?.trim()) {
            throw new Error("IFSC code is required");
        }

        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankDetails.ifsc.trim().toUpperCase())) {
            throw new Error("Please enter a valid IFSC code");
        }

        if (!bankDetails.branch?.trim()) {
            throw new Error("Branch name is required");
        }
    };

    const validatePropertiesData = (properties: PropertyData[]): void => {
        if (!Array.isArray(properties) || properties.length === 0) {
            throw new Error("At least one property is required");
        }

        const validOwnedBy = [
            "FIRM",
            "PROPRIETOR",
            "PARTNER",
            "DIRECTOR",
            "INDIVIDUAL",
            "OTHER",
        ];

        properties.forEach((property, index) => {
            const propertyNumber = index + 1;

            if (!property.address?.trim()) {
                throw new Error(`Address is required for property ${propertyNumber}`);
            }

            if (!property.ownedBy) {
                throw new Error(
                    `Owner type is required for property ${propertyNumber}`
                );
            }

            if (!validOwnedBy.includes(property.ownedBy)) {
                throw new Error(`Invalid owner type for property ${propertyNumber}`);
            }

            if (!property.ownerName?.trim()) {
                throw new Error(
                    `Owner name is required for property ${propertyNumber}`
                );
            }

            if (!property.relationshipWithOwner?.trim()) {
                throw new Error(
                    `Relationship with owner is required for property ${propertyNumber}`
                );
            }
        });
    };

    const validateBusinessPersons = (businessPersons: BusinessPerson[]): void => {
        if (!Array.isArray(businessPersons) || businessPersons.length === 0) {
            throw new Error("At least one business person is required");
        }

        const validDesignations: BusinessPerson["designation"][] = [
            "PROPRIETOR",
            "PARTNER",
            "DIRECTOR",
            "OTHER",
        ];

        businessPersons.forEach((person, index) => {
            const personNumber = index + 1;

            if (!person.name?.trim()) {
                throw new Error(`Name is required for business person ${personNumber}`);
            }

            if (!person.officeAddress?.trim()) {
                throw new Error(
                    `Office address is required for business person ${personNumber}`
                );
            }

            if (!person.officePhone?.trim()) {
                throw new Error(
                    `Office phone is required for business person ${personNumber}`
                );
            }

            if (!person.residenceAddress?.trim()) {
                throw new Error(
                    `Residence address is required for business person ${personNumber}`
                );
            }

            if (!person.residencePhone?.trim()) {
                throw new Error(
                    `Residence phone is required for business person ${personNumber}`
                );
            }

            if (!person.qualification?.trim()) {
                throw new Error(
                    `Qualification is required for business person ${personNumber}`
                );
            }

            console.log(person.shareInBusiness)
            console.log(typeof person.shareInBusiness)
            if (
                typeof person.shareInBusiness !== "number" ||
                Number.isNaN(person.shareInBusiness)
            ) {
                throw new Error(
                    `Share in business must be a valid number for business person ${personNumber}`
                );
            }

            if (person.shareInBusiness < 0 || person.shareInBusiness > 100) {
                throw new Error(
                    `Share in business must be between 0 and 100 for business person ${personNumber}`
                );
            }

            if (!person.designation) {
                throw new Error(
                    `Designation is required for business person ${personNumber}`
                );
            }

            if (!validDesignations.includes(person.designation)) {
                throw new Error(
                    `Invalid designation for business person ${personNumber}`
                );
            }
        });
    };

    const validateSisterConcerns = (sisterConcerns: SisterConcern[]): void => {
        if (!Array.isArray(sisterConcerns)) {
            throw new Error("Invalid sister concerns data");
        }

        sisterConcerns.forEach((concern, index) => {
            const concernNumber = index + 1;

            if (!concern.name?.trim()) {
                throw new Error(`Name is required for sister concern ${concernNumber}`);
            }

            if (!concern.officeAddress?.trim()) {
                throw new Error(
                    `Office address is required for sister concern ${concernNumber}`
                );
            }

            if (!concern.phone?.trim()) {
                throw new Error(
                    `Phone number is required for sister concern ${concernNumber}`
                );
            }

            if (!concern.natureOfBusiness?.trim()) {
                throw new Error(
                    `Nature of business is required for sister concern ${concernNumber}`
                );
            }

            if (
                typeof concern.approximateAnnualTurnover !== "number" ||
                Number.isNaN(concern.approximateAnnualTurnover)
            ) {
                throw new Error(
                    `Approximate annual turnover must be a valid number for sister concern ${concernNumber}`
                );
            }

            if (concern.approximateAnnualTurnover < 0) {
                throw new Error(
                    `Approximate annual turnover cannot be negative for sister concern ${concernNumber}`
                );
            }
        });
    };

    const validateAuthorizedSignatories = (
        authorizedSignatories: AuthorizedSignatory[]
    ): void => {
        if (
            !Array.isArray(authorizedSignatories) ||
            authorizedSignatories.length === 0
        ) {
            throw new Error("At least one authorized signatory is required");
        }

        authorizedSignatories.forEach((signatory, index) => {
            const signatoryNumber = index + 1;

            if (!signatory.name?.trim()) {
                throw new Error(
                    `Name is required for authorized signatory ${signatoryNumber}`
                );
            }

            if (!signatory.status?.trim()) {
                throw new Error(
                    `Status is required for authorized signatory ${signatoryNumber}`
                );
            }

            // if (!(signatory.signature instanceof File)) {
            //     throw new Error(
            //         `Signature is required for authorized signatory ${signatoryNumber}`
            //     );
            // }
            const isValidSignature =
                signatory.signature instanceof File ||
                (typeof signatory.signature === "string" && signatory.signature.trim() !== "");

            if (!isValidSignature) {
                throw new Error(
                    `Signature is required for authorized signatory ${signatoryNumber}`
                );
            }
        });
    };

    const validateBusinessDetails = (): void => {
        if (formData.constitution) {
            const currentYear = new Date().getFullYear();

            for (const [key, value] of Object.entries(formData.constitution)) {
                if (!key.trim()) {
                    throw new Error("Constitution detail key cannot be empty");
                }

                if (!value?.trim()) {
                    throw new Error(`Value is required for constitution detail "${key}"`);
                }

                if (!/^\d{4}$/.test(value.trim())) {
                    throw new Error(
                        `Please enter a valid establishment year for "${key}"`
                    );
                }

                const year = Number(value);

                if (year < 1800 || year > currentYear) {
                    throw new Error(
                        `Please enter a valid establishment year for "${key}"`
                    );
                }
            }
        }

        if (formData.properties && formData.properties?.length > 0) {
            validatePropertiesData(formData.properties);
        }

        if (formData.businessPersons && formData.businessPersons?.length > 0) {
            validateBusinessPersons(formData.businessPersons);
        }

        if (formData.sisterConcerns && formData.sisterConcerns?.length > 0) {
            validateSisterConcerns(formData.sisterConcerns);
        }

        if (
            formData.authorizedSignatories &&
            formData.authorizedSignatories?.length > 0
        ) {
            validateAuthorizedSignatories(formData.authorizedSignatories);
        }
    };

    const validateTerritoryDetails = (): void => {
        const territoryData: Territory = formData.territory;
        if (!territoryData || typeof territoryData !== "object") {
            throw new Error("territoryData details are required");
        }

        if (!Array.isArray(territoryData.towns)) {
            throw new Error("Towns must be a valid list");
        }

        if (!Array.isArray(territoryData.districts)) {
            throw new Error("Districts must be a valid list");
        }

        territoryData.towns.forEach((town, index) => {
            if (typeof town !== "string" || !town.trim()) {
                throw new Error(`Town ${index + 1} must be a valid name`);
            }
        });

        territoryData.districts.forEach((district, index) => {
            if (typeof district !== "string" || !district.trim()) {
                throw new Error(`District ${index + 1} must be a valid name`);
            }
        });
    };

    const validateInsuranceDetails = (): void => {
        const insuranceData: InsuranceData = formData.insurance;

        if (!insuranceData) {
            return;
        }

        const hasAnyData =
            !!insuranceData.companyName?.trim() ||
            !!insuranceData.companyAddress?.trim() ||
            !!insuranceData.phone?.trim() ||
            !!insuranceData.contactPerson?.trim() ||
            !!insuranceData.riskCovered?.trim() ||
            (insuranceData.riskCoveredValue !== null &&
                insuranceData.riskCoveredValue !== undefined &&
                insuranceData.riskCoveredValue !== 0);

        // Insurance details are completely optional
        if (!hasAnyData) {
            return;
        }

        if (!insuranceData.companyName?.trim()) {
            throw new Error("Insurance company name is required");
        }

        if (!insuranceData.companyAddress?.trim()) {
            throw new Error("Insurance company address is required");
        }

        if (!insuranceData.phone?.trim()) {
            throw new Error("Insurance company phone number is required");
        }

        if (!/^[6-9]\d{9}$/.test(insuranceData.phone.trim())) {
            throw new Error("Please enter a valid insurance company phone number");
        }

        if (!insuranceData.contactPerson?.trim()) {
            throw new Error("Insurance contact person is required");
        }

        if (!insuranceData.riskCovered?.trim()) {
            throw new Error("Risk covered is required");
        }

        if (
            typeof insuranceData.riskCoveredValue !== "number" ||
            Number.isNaN(insuranceData.riskCoveredValue) ||
            insuranceData.riskCoveredValue <= 0
        ) {
            throw new Error("Risk covered value must be a valid positive number");
        }
    };

    const validateDocuments = (): void => {
        if (!isNewRetailer) return;
        const documents: RetailerDocuments = formData.documents;
        const gstApplicable: boolean = formData.gstApplicable;
        if (!documents) {
            throw new Error("Documents are required");
        }

        // Required documents
        if (!(documents.pan instanceof File)) {
            throw new Error("PAN document is required");
        }

        if (!(documents.aadhaar instanceof File)) {
            throw new Error("Aadhaar document is required");
        }

        if (!(documents.cancelledChequeOrPassbook instanceof File)) {
            throw new Error("Cancelled Cheque or Passbook is required");
        }

        if (!(documents.showroomFrontPhoto instanceof File)) {
            throw new Error("Shop front photo is required");
        }

        if (!(documents.showroomInsidePhoto instanceof File)) {
            throw new Error("Shop inside photo is required");
        }

        // GST Certificate is required only when GST is applicable
        if (gstApplicable && !(documents.gstCertificate instanceof File)) {
            throw new Error("GST Certificate is required when GST is applicable");
        }

        // Validate uploaded files
        const singleFileDocuments: Array<[keyof RetailerDocuments, string]> = [
            ["pan", "PAN"],
            ["aadhaar", "Aadhaar"],
            ["cancelledChequeOrPassbook", "Cancelled Cheque or Passbook"],
            ["showroomFrontPhoto", "Shop front photo"],
            ["showroomInsidePhoto", "Shop inside photo"],
            ["gstCertificate", "GST Certificate"],
            ["photograph", "Photograph"],
            [
                "memorandumAndArticlesofAssociation",
                "Memorandum and Articles of Association",
            ],
            ["listOfDirectors", "List of Directors"],
            ["boardResolution", "Board Resolution"],
            ["partnershipDeed", "Partnership Deed"],
            ["listOfPartners", "List of Partners"],
            ["electricityOrTelephoneBill", "Electricity or Telephone Bill"],
            ["bankStatement", "Bank Statement"],
            ["creditCertificate", "Credit Certificate"],
            ["stVatCertificate", "ST/VAT Certificate"],
            ["masterCharges", "Master Charges"],
            ["signature", "Signature"],
        ];

        for (const [field, label] of singleFileDocuments) {
            const file = documents[field];

            // Optional documents can be null
            if (file === null || file === undefined) {
                continue;
            }

            if (!(file instanceof File)) {
                throw new Error(`${label} must be a valid file`);
            }

            if (file.size === 0) {
                throw new Error(`${label} cannot be empty`);
            }
        }

        // Validate multiple-file documents
        const multipleFileDocuments: Array<[keyof RetailerDocuments, string]> = [
            ["balanceSheets", "Balance Sheets"],
            ["incomeTaxReturns", "Income Tax Returns"],
            ["otherDocuments", "Other Documents"],
        ];

        for (const [field, label] of multipleFileDocuments) {
            const files = documents[field];

            if (!Array.isArray(files)) {
                throw new Error(`${label} must be a valid list of files`);
            }

            for (const file of files) {
                if (!(file instanceof File)) {
                    throw new Error(`${label} contains an invalid file`);
                }

                if (file.size === 0) {
                    throw new Error(`${label} contains an empty file`);
                }
            }
        }
    };

    const validateDeclaration = (): void => {
        if (!formData.declarationAccepted) {
            throw new Error("Please accept the declaration");
        }
    };

    const validateStep = () => {
        switch (currentStep) {
            case 1:
                validateBusinessInformation();
                break;
            case 2:
                validateBusinessAddress();
                break;
            case 3:
                validateBankDetails();
                break;
            case 4:
                validateBusinessDetails();
                break;
            case 5:
                validateTerritoryDetails();
                break;
            case 6:
                validateInsuranceDetails();
                break;
            case 7:
                validateDocuments();
                break;
            case 8:
                validateDeclaration();
                break;
        }
    };

    const submitOnboarding = async () => {
        try {
            if (submitting) return;
            setSubmitting(true);

            const formDataToSend = new FormData();

            /*
             * ==========================================
             * BASIC BUSINESS INFORMATION
             * ==========================================
             */

            formDataToSend.append("businessType", formData.businessType);

            formDataToSend.append("firmName", formData.firmName);

            formDataToSend.append("ownerName", formData.ownerName);

            formDataToSend.append("mobile", formData.mobile);

            formDataToSend.append("email", formData.email);

            formDataToSend.append("gstin", formData.gstin);

            formDataToSend.append("pan", formData.pan);

            formDataToSend.append("gstApplicable", String(formData.gstApplicable));

            /*
             * ==========================================
             * DECLARATION
             * ==========================================
             */

            formDataToSend.append(
                "declarationAccepted",
                String(formData.declarationAccepted)
            );

            if (formData.signedBy) {
                formDataToSend.append("signedBy", formData.signedBy);
            }

            if (formData.declarationDate) {
                formDataToSend.append("declarationDate", formData.declarationDate);
            }

            if (formData.declarationPlace) {
                formDataToSend.append("declarationPlace", formData.declarationPlace);
            }

            /*
             * ==========================================
             * INVESTMENT
             * ==========================================
             */

            if (formData.proposedInvestment) {
                formDataToSend.append(
                    "proposedInvestment",
                    String(formData.proposedInvestment)
                );
            }

            /*
             * ==========================================
             * JSON OBJECTS / ARRAYS
             * ==========================================
             */

            formDataToSend.append(
                "businessAddress",
                JSON.stringify(formData.businessAddress)
            );

            formDataToSend.append(
                "bankDetails",
                JSON.stringify(formData.bankDetails)
            );

            if (formData.appliedFor) {
                formDataToSend.append(
                    "appliedFor",
                    JSON.stringify(formData.appliedFor)
                );
            }

            // if (formData.constitution) {
            //     formDataToSend.append(
            //         "constitution",
            //         JSON.stringify(formData.constitution)
            //     );
            // }

            if (formData.territory) {
                formDataToSend.append("territory", JSON.stringify(formData.territory));
            }

            // if (formData.insurance) {
            //     formDataToSend.append(
            //         "insurance",
            //         JSON.stringify(formData.insurance)
            //     );
            // }

            if (formData.properties?.length) {
                formDataToSend.append(
                    "properties",
                    JSON.stringify(formData.properties)
                );
            }

            if (formData.businessPersons?.length) {
                formDataToSend.append(
                    "businessPersons",
                    JSON.stringify(formData.businessPersons)
                );
            }

            if (formData.sisterConcerns?.length) {
                formDataToSend.append(
                    "sisterConcerns",
                    JSON.stringify(formData.sisterConcerns)
                );
            }

            if (formData.authorizedSignatories?.length) {
                const sanitizedSignatories = formData.authorizedSignatories.map(
                    ({ signature, ...rest }) => rest
                );

                formDataToSend.append(
                    "authorizedSignatories",
                    JSON.stringify(sanitizedSignatories)
                );

                formData.authorizedSignatories.forEach((signatory) => {
                    if (signatory.signature) {
                        formDataToSend.append(`authorizedSignatorySignatures`, signatory.signature);
                    }
                });
            }

            /*
             * ==========================================
             * DOCUMENTS
             * ==========================================
             */

            const documents = formData.documents;

            if (documents) {
                /*
                 * Single-file documents
                 */

                const singleFileFields = [
                    "pan",
                    "aadhaar",
                    "cancelledChequeOrPassbook",
                    "showroomFrontPhoto",
                    "showroomInsidePhoto",
                    "gstCertificate",
                    "photograph",
                    "memorandumAndArticlesofAssociation",
                    "listOfDirectors",
                    "boardResolution",
                    "partnershipDeed",
                    "listOfPartners",
                    "electricityOrTelephoneBill",
                    "bankStatement",
                    "creditCertificate",
                    "stVatCertificate",
                    "masterCharges",
                    "signature",
                ] as const;

                singleFileFields.forEach((field) => {
                    const file = documents[field];

                    if (file instanceof File) {
                        formDataToSend.append(field, file);
                    }
                });

                /*
                 * Multiple documents
                 */

                if (documents.balanceSheets?.length) {
                    documents.balanceSheets.forEach((file) => {
                        if (file instanceof File) {
                            formDataToSend.append("balanceSheets", file);
                        }
                    });
                }

                if (documents.incomeTaxReturns?.length) {
                    documents.incomeTaxReturns.forEach((file) => {
                        if (file instanceof File) {
                            formDataToSend.append("incomeTaxReturns", file);
                        }
                    });
                }

                if (documents.otherDocuments?.length) {
                    documents.otherDocuments.forEach((file) => {
                        if (file instanceof File) {
                            formDataToSend.append("otherDocuments", file);
                        }
                    });
                }
            }

            /*
             * ==========================================
             * API REQUEST
             * ==========================================
             */
            let response;
            if (isNewRetailer) {
                response = await api.post("/api/retailer/profile", formDataToSend);
            }
            else {
                response = await api.patch("/api/retailer/profile", formDataToSend);
            }
            console.log("Retailer onboarding response:", response.data);

            setSubmitting(false);

            
            router.push("/retailer/onboarding/success");
            
            setCurrentStep(10);
            sessionStorage.removeItem(SESSION_KEY);

            return {
                success: true,
                data: response.data,
            };
        } catch (error: any) {
            console.error("Retailer onboarding failed:", error);

            setSubmitting(false);

            return {
                success: false,
                error:
                    error?.response?.data?.message ||
                    "Failed to submit retailer onboarding.",
            };
        }
    };

    /* -----------------------------------------------------
               Context Value
            ----------------------------------------------------- */

    const value: RetailerOnboardingContextType = {
        /* Registration */

        registration,
        setRegistration,

        /* Main form */

        formData,
        setFormData,
        updateFormData,

        /* Business information */

        businessInformation,
        setBusinessInformation,

        /* Address */

        businessAddress,
        setBusinessAddress,

        /* Bank */

        bankDetails,
        setBankDetails,

        /* Territory */

        territory: formData.territory,

        /* Arrays */

        properties: formData.properties,

        businessPersons: formData.businessPersons,

        sisterConcerns: formData.sisterConcerns,

        authorizedSignatories: formData.authorizedSignatories,

        /* Declaration */

        declarationAccepted: formData.declarationAccepted,

        signedBy: formData.signedBy,

        declarationDate: formData.declarationDate,

        declarationPlace: formData.declarationPlace,

        /* Documents */

        documents,
        setDocuments,

        /* Navigation */

        currentStep,
        setCurrentStep,

        totalSteps,

        nextStep,
        previousStep,
        goToStep,

        isNewRetailer,

        /* Reset */

        resetOnboarding,
        submitOnboarding,
    };

    return (
        <RetailerOnboardingContext.Provider value={value}>
            {children}
        </RetailerOnboardingContext.Provider>
    );
}

/* =========================================================
   HOOK
========================================================= */

export function useRetailerOnboarding() {
    const context = useContext(RetailerOnboardingContext);

    if (!context) {
        throw new Error(
            "useRetailerOnboarding must be used inside RetailerOnboardingProvider"
        );
    }

    return context;
}
