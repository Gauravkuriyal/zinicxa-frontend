"use client";

import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";

interface Props {
    cover: File | null;

    coverPreview: string;

    setCover: (file: File | null) => void;

    setCoverPreview: (url: string) => void;

    gallery: File[];

    galleryPreview: string[];

    setGallery: (files: File[]) => void;

    setGalleryPreview: (files: string[]) => void;
}

export default function ProductImagesSection({
    cover,
    coverPreview,
    setCover,
    setCoverPreview,
    gallery,
    galleryPreview,
    setGallery,
    setGalleryPreview,
}: Props) {

    const handleCover = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setCover(file);

        setCoverPreview(
            URL.createObjectURL(file)
        );
    };

    const handleGallery = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const files = Array.from(
            e.target.files || []
        );

        setGallery(files);

        setGalleryPreview(
            files.map((f) =>
                URL.createObjectURL(f)
            )
        );
    };

    const removeGalleryImage = (
        index: number
    ) => {

        setGallery(
            gallery.filter(
                (_, i) => i !== index
            )
        );

        setGalleryPreview(
            galleryPreview.filter(
                (_, i) => i !== index
            )
        );
    };

    return (
        <div className="space-y-8">

            <h2 className="text-lg font-semibold">
                Images
            </h2>

            {/* Cover */}

            <div>

                <Label className="mb-2">
                    Cover Image
                </Label>

                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleCover}
                />

                {coverPreview && (

                    <div className="mt-4">

                        <Image
                            src={coverPreview}
                            alt="Cover"
                            width={180}
                            height={180}
                            className="rounded-lg border object-contain"
                        />

                    </div>

                )}

            </div>

            {/* Gallery */}

            <div>

                <Label className="mb-2">
                    Gallery Images
                </Label>

                <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={
                        handleGallery
                    }
                />

                <div className="mt-5 grid grid-cols-5 gap-4">

                    {galleryPreview.map(
                        (image, index) => (

                            <div
                                key={index}
                                className="relative"
                            >

                                <Image
                                    src={image}
                                    alt=""
                                    width={150}
                                    height={150}
                                    className="rounded-lg border object-contain"
                                />

                                <Button
                                    size="icon"
                                    variant="destructive"
                                    className="absolute right-2 top-2 h-7 w-7"
                                    onClick={() =>
                                        removeGalleryImage(
                                            index
                                        )
                                    }
                                >
                                    <Trash2 size={14} />
                                </Button>

                            </div>

                        )
                    )}

                </div>

            </div>

        </div>
    );
}