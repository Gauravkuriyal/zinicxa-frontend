"use client";

import { useRef } from "react";

import { Upload, X, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface Props {
    label: string;
    description?: string;

    file: File | null;

    onChange: (file: File | null) => void;

    required?: boolean;

    accept?: string;

    savedFile?: string | null | File;
}

export default function DocumentUploader({
    label,
    description,
    file,
    onChange,
    required = false,
    accept = "image/*,.pdf",
    savedFile = null,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        // 10 MB limit
        const maxSize = 10 * 1024 * 1024;

        if (selectedFile.size > maxSize) {
            alert("File size must be less than 10 MB.");

            e.target.value = "";
            return;
        }

        onChange(selectedFile);
    };

    const removeFile = () => {
        onChange(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-2">
            <div>
                <Label className="font-medium">
                    {label}

                    {required && <span className="text-destructive ml-1">*</span>}
                </Label>

                {description && (
                    <p className="text-xs text-muted-foreground mt-1">{description}</p>
                )}
            </div>

            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="
                    w-full
                    rounded-xl
                    border-2
                    border-dashed
                    p-6
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-2
                    text-muted-foreground
                    hover:border-primary
                    hover:text-primary
                    transition
                "
            >
                <Upload className="h-7 w-7" />

                <span className="text-sm font-medium">Click to upload</span>

                <span className="text-xs">PDF, JPG, PNG</span>
            </button>
            {!file ? (
                null
                // <button
                //     type="button"
                //     onClick={() => inputRef.current?.click()}
                //     className="
                //         w-full
                //         rounded-xl
                //         border-2
                //         border-dashed
                //         p-6
                //         flex
                //         flex-col
                //         items-center
                //         justify-center
                //         gap-2
                //         text-muted-foreground
                //         hover:border-primary
                //         hover:text-primary
                //         transition
                //     "
                // >
                //     <Upload className="h-7 w-7" />

                //     <span className="text-sm font-medium">Click to upload</span>

                //     <span className="text-xs">PDF, JPG, PNG</span>
                // </button>
            ) : (
                <div
                    className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    p-4
                    bg-muted/30
                "
                >
                    <div className="flex items-center gap-3 min-w-0">
                        <div
                            className="
                            h-10
                            w-10
                            rounded-lg
                            bg-primary/10
                            flex
                            items-center
                            justify-center
                            shrink-0
                        "
                        >
                            <FileText className="h-5 w-5 text-primary" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={removeFile}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={handleChange}
            />

            {savedFile && typeof savedFile === "string" && (
                <div>
                    <Link
                        target="_blank"
                        href={process.env.NEXT_PUBLIC_BACKEND_DOMAIN! + "/" + savedFile}
                        className="underline text-blue-500"
                    >
                        view file
                    </Link>
                </div>
            )}
        </div>
    );
}
