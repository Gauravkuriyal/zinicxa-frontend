"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { useAuthApi } from "@/hooks/useAuthApi";
import toast from "react-hot-toast";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";

interface Category {
    _id: string;

    name: string;

    slug: string;

    image: string;

    parentCategory: {
        _id: string;

        name: string;
    } | null;

    isActive: boolean;
}

interface Props {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    category?: Category | null;

    refreshCategories: () => void;
}

export default function CategoryFormDialog({
    open,
    onOpenChange,
    category,
    refreshCategories,
}: Props) {
    const api = useAuthApi();

    const isEdit = !!category;

    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState<Category[]>([]);

    const [name, setName] = useState("");

    const [slug, setSlug] = useState("");

    const [parentCategory, setParentCategory] = useState("none");

    const [isActive, setIsActive] =
        useState(true);

    const [image, setImage] =
        useState<File | null>(null);

    const [preview, setPreview] =
        useState("");

    const [slugTouched, setSlugTouched] =
        useState(false);

    useEffect(() => {

        if (slugTouched) return;

        setSlug(
            name
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")
        );

    }, [name]);


    const getCategories = async () => {

        try {

            const res = await api.get("/api/superAdmin/category");

            setCategories(res.data.categories);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        if (open)
            getCategories();

    }, [open]);


    useEffect(() => {

        if (!open) return;

        if (!category) {

            setName("");

            setSlug("");

            setParentCategory("");

            setIsActive(true);

            setImage(null);

            setPreview("");

            setSlugTouched(false);

            return;
        }

        setName(category.name);

        setSlug(category.slug);

        setParentCategory(
            category.parentCategory?._id || ""
        );

        setIsActive(category.isActive);

        setPreview(
            process.env.NEXT_PUBLIC_BACKEND_DOMAIN +
            category.image
        );

        setSlugTouched(true);

    }, [category, open]);


    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setImage(file);

        setPreview(
            URL.createObjectURL(file)
        );

    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (!name.trim()) {
                toast.error("Category name is required.");
                return;
            }

            if (!slug.trim()) {
                toast.error("Slug is required.");
                return;
            }

            const formData = new FormData();

            formData.append("name", name);
            formData.append("slug", slug);
            formData.append("isActive", String(isActive));

            if (parentCategory !== "none") {
                formData.append(
                    "parentCategory",
                    parentCategory
                );
            }

            if (image) {
                formData.append("image", image);
            }

            

            if (isEdit) {
                await api.patch(
                    `/api/superAdmin/category/${category!._id}`,
                    formData
                );

                toast.success(
                    "Category updated successfully."
                );
            } else {
                await api.post(
                    "/api/superAdmin/category",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );

                toast.success(
                    "Category created successfully."
                );
            }

            refreshCategories();

            onOpenChange(false);

        } catch (err: any) {

            toast.error(
                err?.response?.data?.message ??
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <Dialog
            open={open}
            onOpenChange={(open) => {
                onOpenChange(open);

                if (!open) {
                    setName("");

                    setSlug("");

                    setParentCategory("none");

                    setImage(null);

                    setPreview("");

                    setIsActive(true);

                    setSlugTouched(false);
                }
            }}
        >

            <DialogContent className="max-w-xl">

                <DialogHeader>

                    <DialogTitle>

                        {isEdit
                            ? "Edit Category"
                            : "Add Category"}

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div>

                        <Label className="mb-2">Name</Label>

                        <Input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                    </div>

                    <div>

                        <Label className="mb-2">Slug</Label>

                        <Input

                            value={slug}

                            onChange={(e) => {

                                setSlugTouched(true);

                                setSlug(e.target.value);

                            }}

                        />

                    </div>

                    <div>

                        <Label className="mb-2">

                            Parent Category

                        </Label>

                        <Select
                            value={parentCategory}
                            onValueChange={
                                setParentCategory
                            }
                        >

                            <SelectTrigger>

                                <SelectValue
                                    placeholder="None"
                                />

                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="none">
                                    None
                                </SelectItem>

                                {categories

                                    .filter(
                                        (c) =>
                                            c._id !== category?._id
                                    )

                                    .map(category => (

                                        <SelectItem

                                            key={category._id}

                                            value={category._id}

                                        >

                                            {category.name}

                                        </SelectItem>

                                    ))}

                            </SelectContent>

                        </Select>

                    </div>

                    <div>

                        <Label className="mb-2">

                            Image

                        </Label>

                        <Input

                            type="file"

                            accept="image/*"

                            onChange={
                                handleImageChange
                            }

                        />

                        {preview && (

                            <div className="mt-4">

                                <Image

                                    src={preview}

                                    alt="Preview"

                                    width={160}

                                    height={160}

                                    className="rounded-lg border object-cover"

                                />

                            </div>

                        )}

                    </div>

                    <div className="flex items-center justify-between">

                        <Label className="mb-2">

                            Active

                        </Label>

                        <Switch

                            checked={isActive}

                            onCheckedChange={
                                setIsActive
                            }

                        />

                    </div>

                    <div className="flex justify-end gap-3">

                        <Button

                            variant="outline"

                            onClick={() =>
                                onOpenChange(false)
                            }

                        >

                            Cancel

                        </Button>

                        <Button
                            disabled={loading}
                            onClick={handleSubmit}
                        >

                            {
                                loading
                                    ? "Saving..."
                                    : isEdit
                                        ? "Update"
                                        : "Create"
                            }

                        </Button>

                    </div>

                </div>

            </DialogContent>

        </Dialog>
    )

}