"use client";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import RichTextEditor from "@/components/editor/richTextEditor";
import { Textarea } from "@/components/ui/textarea";

interface Category {
    _id: string;
    name: string;
}

interface Props {
    name: string;
    setName: (v: string) => void;

    slug: string;
    setSlug: (v: string) => void;

    brand: string;
    setBrand: (v: string) => void;

    description: string;
    setDescription: (
        value: string
    ) => void;

    shortDescription: string,
    setShortDescription: (value: string) => void;

    category: Category;
    setCategory: (
        value: Category
    ) => void;

    subCategory: Category | null;
    setSubCategory: (
        value: Category
    ) => void;

    categories: Category[];
}

export default function ProductGeneralSection({
    name,
    setName,
    slug,
    setSlug,
    brand,
    setBrand,
    description,
    shortDescription,
    setShortDescription,
    setDescription,
    category,
    setCategory,
    subCategory,
    setSubCategory,
    categories,
}: Props) {

    return (
        <div className="space-y-6">

            <div className="grid grid-cols-2 gap-6">

                <div>

                    <Label className="mb-2">
                        Product Name
                    </Label>

                    <Input
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div>

                    <Label className="mb-2">
                        Slug
                    </Label>

                    <Input
                        value={slug}
                        onChange={(e) =>
                            setSlug(
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>

            <div>

                <Label className="mb-2">Brand</Label>

                <Input
                    value={brand}
                    onChange={(e) =>
                        setBrand(
                            e.target.value
                        )
                    }
                />

            </div>

            <div className="grid grid-cols-2 gap-6">

                <div>

                    <Label className="mb-2">
                        Category
                    </Label>

                    <Select
                        value={category?._id || ""}
                        onValueChange={(selectedId) => {
                            const fullCategoryObject = categories.find((cat) => cat._id === selectedId);

                            if (fullCategoryObject) {
                                setCategory(fullCategoryObject);
                            }
                        }}
                    >
                        <SelectTrigger>

                            <SelectValue />

                        </SelectTrigger>

                        <SelectContent>

                            {categories.map(
                                (cat) => (
                                    <SelectItem
                                        key={
                                            cat._id
                                        }
                                        value={
                                            cat._id
                                        }
                                    >
                                        {
                                            cat.name
                                        }
                                    </SelectItem>
                                )
                            )}

                        </SelectContent>

                    </Select>

                </div>

                <div>

                    <Label className="mb-2">
                        Sub Category
                    </Label>

                    <Select
                        value={subCategory?._id || ""}

                        onValueChange={(selectedId) => {
                            const fullCategoryObject = categories.find((cat) => cat._id === selectedId);

                            if (fullCategoryObject) {
                                setSubCategory(fullCategoryObject);
                            }
                        }}
                    >
                        <SelectTrigger>

                            <SelectValue placeholder="None" />

                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="none">
                                None
                            </SelectItem>

                            {categories.map(
                                (cat) => (
                                    <SelectItem
                                        key={
                                            cat._id
                                        }
                                        value={
                                            cat._id
                                        }
                                    >
                                        {
                                            cat.name
                                        }
                                    </SelectItem>
                                )
                            )}

                        </SelectContent>

                    </Select>

                </div>

            </div>

            <div>

                <Label className="mb-2">
                    Short Description
                </Label>

                <Textarea
                    value={shortDescription}
                    onChange={(e) =>
                        setShortDescription(
                            e.target.value
                        )
                    }
                />

            </div>

            <div>

                <Label className="mb-2">
                    Description
                </Label>

                <RichTextEditor
                    value={description}
                    onChange={
                        setDescription
                    }
                />

            </div>

        </div>
    );
}