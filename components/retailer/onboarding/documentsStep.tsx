"use client";


import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import DocumentUploader from "./documentUploader";
import MultiDocumentUploader from "./multiDocumentUploader";
import { useRetailerOnboarding } from "@/context/RetailerOnboardingContext";

export default function DocumentsStep() {
    const {
        formData,
        updateFormData,
        isNewRetailer
    } = useRetailerOnboarding();

    console.log(formData)

    const documents = formData.documents;

    const updateDocument = (
        field: string,
        file: File | null
    ) => {
        updateFormData({
            documents: {
                ...documents,
                [field]: file,
            },
        });
    };

    const updateMultipleDocuments = (
        field: string,
        files: File[]
    ) => {
        updateFormData({
            documents: {
                ...documents,
                [field]: files,
            },
        });
    };

    return (
        <div className="space-y-6">

            {/* Required Documents */}

            <Card>

                <CardHeader>
                    <CardTitle>
                        Required Documents
                    </CardTitle>

                    <p className="text-sm text-muted-foreground">
                        Please upload all documents marked
                        as required.
                    </p>
                </CardHeader>

                <CardContent className="grid gap-6">

                    <DocumentUploader
                        label="PAN Card"
                        required
                        file={
                            documents.pan
                        }
                        onChange={(file) =>
                            updateDocument(
                                "pan",
                                file
                            )
                        }
                        savedFile={isNewRetailer?null:documents.pan}
                    />

                    <DocumentUploader
                        label="Aadhaar Card"
                        required
                        file={
                            documents.aadhaar
                        }
                        savedFile={isNewRetailer?null:documents.aadhaar}
                        onChange={(file) =>
                            updateDocument(
                                "aadhaar",
                                file
                            )
                        }
                    />

                    <DocumentUploader
                        label="Cancelled Cheque / Passbook"
                        required
                        file={
                            documents.cancelledChequeOrPassbook
                        }
                        savedFile={isNewRetailer?null:documents.cancelledChequeOrPassbook}
                        onChange={(file) =>
                            updateDocument(
                                "cancelledChequeOrPassbook",
                                file
                            )
                        }
                    />

                    <DocumentUploader
                        label="Showroom Front Photo"
                        required
                        accept="image/*"
                        file={
                            documents.showroomFrontPhoto
                        }
                        savedFile={isNewRetailer?null:documents.showroomFrontPhoto}
                        onChange={(file) =>
                            updateDocument(
                                "showroomFrontPhoto",
                                file
                            )
                        }
                    />

                    <DocumentUploader
                        label="Showroom Inside Photo"
                        required
                        accept="image/*"
                        file={
                            documents.showroomInsidePhoto
                        }
                        savedFile={isNewRetailer?null:documents.showroomInsidePhoto}
                        onChange={(file) =>
                            updateDocument(
                                "showroomInsidePhoto",
                                file
                            )
                        }
                    />

                </CardContent>

            </Card>

            {/* GST */}

            {formData.gstApplicable === true && (

                <Card>

                    <CardHeader>
                        <CardTitle>
                            GST Documents
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        <DocumentUploader
                            label="GST Certificate"
                            required
                            file={
                                documents.gstCertificate
                            }
                            onChange={(file) =>
                                updateDocument(
                                    "gstCertificate",
                                    file
                                )
                            }
                        />

                    </CardContent>

                </Card>

            )}

            {/* Personal */}

            <Card>

                <CardHeader>
                    <CardTitle>
                        Personal Documents
                    </CardTitle>
                </CardHeader>

                <CardContent>

                    <DocumentUploader
                        label="Passport Size Photograph"
                        file={
                            documents.photograph
                        }
                        savedFile={isNewRetailer?null:documents.photograph}
                        onChange={(file) =>
                            updateDocument(
                                "photograph",
                                file
                            )
                        }
                        accept="image/*"
                    />

                </CardContent>

            </Card>

            {/* Company Documents */}

            <Card>

                <CardHeader>
                    <CardTitle>
                        Business / Company Documents
                    </CardTitle>
                </CardHeader>

                <CardContent className="grid gap-6">

                    <DocumentUploader
                        label="Memorandum & Articles of Association"
                        file={
                            documents.memorandumAndArticlesofAssociation
                        }
                        savedFile={isNewRetailer?null:documents.memorandumAndArticlesofAssociation}
                        onChange={(file) =>
                            updateDocument(
                                "memorandumAndArticlesofAssociation",
                                file
                            )
                        }
                    />

                    <DocumentUploader
                        label="List of Directors"
                        file={
                            documents.listOfDirectors
                        }
                        savedFile={isNewRetailer?null:documents.listOfDirectors}
                        onChange={(file) =>
                            updateDocument(
                                "listOfDirectors",
                                file
                            )
                        }
                    />

                    <DocumentUploader
                        label="Board Resolution"
                        file={
                            documents.boardResolution
                        }
                        savedFile={isNewRetailer?null:documents.boardResolution}
                        onChange={(file) =>
                            updateDocument(
                                "boardResolution",
                                file
                            )
                        }
                    />

                    <DocumentUploader
                        label="Partnership Deed"
                        file={
                            documents.partnershipDeed
                        }
                        savedFile={isNewRetailer?null:documents.partnershipDeed}
                        onChange={(file) =>
                            updateDocument(
                                "partnershipDeed",
                                file
                            )
                        }
                    />

                    <DocumentUploader
                        label="List of Partners"
                        file={
                            documents.listOfPartners
                        }
                        savedFile={isNewRetailer?null:documents.listOfPartners}
                        onChange={(file) =>
                            updateDocument(
                                "listOfPartners",
                                file
                            )
                        }
                    />

                </CardContent>

            </Card>

            {/* Financial / Verification */}

            <Card>

                <CardHeader>
                    <CardTitle>
                        Financial & Verification Documents
                    </CardTitle>
                </CardHeader>

                <CardContent className="grid gap-6">

                    <DocumentUploader
                        label="Electricity / Telephone Bill"
                        file={
                            documents.electricityOrTelephoneBill
                        }
                        savedFile={isNewRetailer?null:documents.electricityOrTelephoneBill}
                        onChange={(file) =>
                            updateDocument(
                                "electricityOrTelephoneBill",
                                file
                            )
                        }
                    />

                    <DocumentUploader
                        label="Bank Statement"
                        file={
                            documents.bankStatement
                        }
                        savedFile={isNewRetailer?null:documents.bankStatement}
                        onChange={(file) =>
                            updateDocument(
                                "bankStatement",
                                file
                            )
                        }
                    />

                    <DocumentUploader
                        label="Credit Certificate"
                        file={
                            documents.creditCertificate
                        }
                        savedFile={isNewRetailer?null:documents.creditCertificate}
                        onChange={(file) =>
                            updateDocument(
                                "creditCertificate",
                                file
                            )
                        }
                    />

                    <DocumentUploader
                        label="ST / VAT Certificate"
                        file={
                            documents.stVatCertificate
                        }
                        savedFile={isNewRetailer?null:documents.stVatCertificate}
                        onChange={(file) =>
                            updateDocument(
                                "stVatCertificate",
                                file
                            )
                        }
                    />

                    <DocumentUploader
                        label="Master Charges"
                        file={
                            documents.masterCharges
                        }
                        savedFile={isNewRetailer?null:documents.masterCharges}
                        onChange={(file) =>
                            updateDocument(
                                "masterCharges",
                                file
                            )
                        }
                    />

                    <DocumentUploader
                        label="Signature"
                        file={
                            documents.signature
                        }
                        savedFile={isNewRetailer?null:documents.signature}
                        onChange={(file) =>
                            updateDocument(
                                "signature",
                                file
                            )
                        }
                        accept="image/*"
                    />

                </CardContent>

            </Card>

            {/* Multiple Documents */}

            <Card>

                <CardHeader>
                    <CardTitle>
                        Additional Documents
                    </CardTitle>

                    <p className="text-sm text-muted-foreground">
                        You may upload multiple documents
                        where applicable.
                    </p>
                </CardHeader>

                <CardContent className="grid gap-8">

                    <MultiDocumentUploader
                        label="Balance Sheets"
                        maxFiles={5}
                        files={
                            documents.balanceSheets ??
                            []
                        }
                        savedFile={isNewRetailer?null:documents.balanceSheets}
                        onChange={(files) =>
                            updateMultipleDocuments(
                                "balanceSheets",
                                files
                            )
                        }
                    />

                    <MultiDocumentUploader
                        label="Income Tax Returns"
                        maxFiles={5}
                        files={
                            documents.incomeTaxReturns ??
                            []
                        }
                        savedFile={isNewRetailer?null:documents.incomeTaxReturns}
                        onChange={(files) =>
                            updateMultipleDocuments(
                                "incomeTaxReturns",
                                files
                            )
                        }
                    />

                    <MultiDocumentUploader
                        label="Other Documents"
                        maxFiles={10}
                        files={
                            documents.otherDocuments ??
                            []
                        }
                        savedFile={isNewRetailer?null:documents.otherDocuments}
                        onChange={(files) =>
                            updateMultipleDocuments(
                                "otherDocuments",
                                files
                            )
                        }
                    />

                </CardContent>

            </Card>

        </div>
    );
}