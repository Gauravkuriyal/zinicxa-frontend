"use client";

import { useRef } from "react";

import {
    Upload,
    X,
    FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface Props {
    label: string;

    description?: string;

    files: File[];

    onChange: (
        files: File[]
    ) => void;

    maxFiles: number;

    accept?: string;

    savedFile?: string[] | null | File[]
}

export default function MultiDocumentUploader({
    label,
    description,
    files,
    onChange,
    maxFiles,
    accept = "image/*,.pdf",
    savedFile = null
}: Props) {
    const inputRef =
        useRef<HTMLInputElement>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFiles =
            Array.from(
                e.target.files ?? []
            );

        if (!selectedFiles.length) return;

        const remaining =
            maxFiles - files.length;

        if (remaining <= 0) {
            alert(
                `You can upload maximum ${maxFiles} files.`
            );

            return;
        }

        const filesToAdd =
            selectedFiles.slice(
                0,
                remaining
            );

        const maxSize =
            10 * 1024 * 1024;

        const validFiles =
            filesToAdd.filter(
                (file) => {
                    if (
                        file.size >
                        maxSize
                    ) {
                        alert(
                            `${file.name} exceeds the 10 MB limit.`
                        );

                        return false;
                    }

                    return true;
                }
            );

        onChange([
            ...files,
            ...validFiles,
        ]);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const removeFile = (
        index: number
    ) => {
        onChange(
            files.filter(
                (_, i) => i !== index
            )
        );
    };

    return (
        <div className="space-y-3">

            <div>
                <Label>
                    {label}
                </Label>

                {description && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {description}
                    </p>
                )}

                <p className="text-xs text-muted-foreground mt-1">
                    {files.length} / {maxFiles} files
                </p>
            </div>

            {files.length < maxFiles && (
                <button
                    type="button"
                    onClick={() =>
                        inputRef.current?.click()
                    }
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

                    <span className="text-sm font-medium">
                        Add documents
                    </span>

                    <span className="text-xs">
                        Maximum {maxFiles} files
                    </span>
                </button>
            )}

            <input
                ref={inputRef}
                type="file"
                multiple
                accept={accept}
                className="hidden"
                onChange={handleChange}
            />

            {files.length > 0 && (
                <div className="space-y-2">

                    {files.map(
                        (
                            file,
                            index
                        ) => (

                            <div
                                key={`${file.name}-${index}`}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    border
                                    rounded-lg
                                    p-3
                                    bg-muted/20
                                "
                            >

                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                    min-w-0
                                ">

                                    <FileText
                                        className="
                                            h-5
                                            w-5
                                            text-primary
                                            shrink-0
                                        "
                                    />

                                    <div className="min-w-0">

                                        <p className="text-sm truncate">
                                            {file.name}
                                        </p>

                                    </div>

                                    {typeof file == "string" ? <div key={index}>
                                        <Link target="_blank" href={process.env.NEXT_PUBLIC_BACKEND_DOMAIN! + "/" + file} className="underline text-blue-500" >view file</Link>
                                    </div> : null}

                                </div>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        removeFile(index)
                                    }
                                >
                                    <X className="h-4 w-4" />
                                </Button>

                            </div>

                        )
                    )}

                </div>
            )}

            {/* {Array.isArray(savedFile) && savedFile?.map((file, index) => (
                typeof file == "string" ? <div key={index}>
                    <Link target="_blank" href={process.env.NEXT_PUBLIC_BACKEND_DOMAIN! + "/" + file} className="underline text-blue-500" >view file</Link>
                </div> : null
            ))} */}

        </div>
    );
}