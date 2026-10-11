"use client";

import { useEffect, useState } from "react";

import FormSection from "./formSection";
import ProductGeneralSection from "./productGeneralSection";
import ProductPricingSection from "./productPricingSection";
import ProductImagesSection from "./productImagesSection";
import ProductSpecificationsSection from "./productSpecificationsSection";
import ProductSettingsSection from "./productSettingsSection";

import { Button } from "@/components/ui/button";
import { useAuthApi } from "@/hooks/useAuthApi";

// import type {
//     Product,
//     ProductSpecification,
// } from "@/types/product";
import toast from "react-hot-toast";

interface Category {
    _id: string;
    name: string;
    parentCategory: string | null;
}

interface Props {
    mode: "create" | "edit";
    productId?: string;
}

export default function ProductForm({
    mode,
    productId,
}: Props) {
    const api = useAuthApi();

    const [loading, setLoading] =
        useState(false);

    const [categories, setCategories] =
        useState<Category[]>([]);

    // ---------- General ----------

    const [name, setName] =
        useState("");

    const [slug, setSlug] =
        useState("");

    const [brand, setBrand] =
        useState("");

    const [
        description,
        setDescription,
    ] = useState("");
    
    const [
        shortDescription,
        setShortDescription,
    ] = useState("");

    const [category, setCategory] =
        useState({
            _id: "",
            name: ""
        });

    const [
        subCategory,
        setSubCategory,
    ] = useState<{_id:string,name:string} | null>(null);

    // ---------- Pricing ----------

    const [price, setPrice] =
        useState(0);

    const [discountPrice,setDiscountPrice] = useState(0);
    
    const [retailPrice,setRetailPrice] = useState(0);

    const [minimumOrderQuantity,setMinimumOrderQuantity] = useState(0);

    const [stock, setStock] = useState(0);
    const [rating, setRating] = useState(0);

    // ---------- Images ----------

    const [cover, setCover] =
        useState<File | null>(null);

    const [
        coverPreview,
        setCoverPreview,
    ] = useState("");

    const [gallery, setGallery] =
        useState<File[]>([]);

    const [
        galleryPreview,
        setGalleryPreview,
    ] = useState<string[]>([]);

    // ---------- Specifications ----------

    const [
        specifications,
        setSpecifications,
    ] = useState<Record<string, string>>({});

    // ---------- Settings ----------

    const [
        isFeatured,
        setIsFeatured,
    ] = useState(false);

    const [
        isActive,
        setIsActive,
    ] = useState(true);

    useEffect(() => {
        fetchCategories();

        if (
            mode === "edit" &&
            productId
        ) {
            fetchProduct();
        }
    }, []);

    const fetchCategories =
        async () => {
            try {
                setLoading(true);
                const res = await api.get("/api/superAdmin/category", {
                    params: {
                        page: -1,
                    },
                });
                setCategories(res.data.categories);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

    const fetchProduct =
        async () => {
            try {
                setLoading(true);
                const res = await api.get(`/api/superAdmin/product/${productId}`);
                const product = res.data.product;

                setName(product.name);
                setSlug(product.slug);
                setBrand(product.brand);
                setDescription(product.description);
                setShortDescription(product.shortDescription);
                setCategory(product.category);
                setSubCategory(product.subCategory);
                setPrice(product.price);
                setDiscountPrice(product.discountPrice);
                setRetailPrice(product.retailPrice);
                setMinimumOrderQuantity(product.minimumOrderQuantity);
                setStock(product.stock);
                setRating(product.rating);
                setCover(product.cover);
                setCoverPreview(process.env.NEXT_PUBLIC_BACKEND_DOMAIN+product.cover);
                setGallery(product.gallery);
                setGalleryPreview(product.gallery.map((image:string)=>{
                    return process.env.NEXT_PUBLIC_BACKEND_DOMAIN+image
                }));
                setSpecifications(product.specifications);
                setIsFeatured(product.isFeatured);
                setIsActive(product.isActive);

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const formData = new FormData();

            // Basic Information
            formData.append("name", name);
            formData.append("slug", slug);
            formData.append("brand", brand);
            formData.append("description", description);
            formData.append("shortDescription", shortDescription);
            formData.append("category", category._id);

            if (subCategory !== null) {
                formData.append("subCategory", subCategory._id);
            }

            // Pricing
            formData.append("price", price.toString());

            if (discountPrice > 0) {
                formData.append(
                    "discountPrice",
                    discountPrice.toString()
                );
            }
            
            if (retailPrice > 0) {
                formData.append(
                    "retailPrice",
                    retailPrice.toString()
                );
            }
            
            if (minimumOrderQuantity > 0) {
                formData.append(
                    "minimumOrderQuantity",
                    minimumOrderQuantity.toString()
                );
            }

            if (rating < 0 || rating > 5) {
                toast.error("Please enter rating between 0 and 5");
                setLoading(false);
                return;
            }

            formData.append("stock", stock.toString());
            formData.append("rating", rating.toString());

            // Specifications
            const specs: Record<string, string> = {};

            // specifications.forEach((spec) => {
            //     if (
            //         spec.key.trim() &&
            //         spec.value.trim()
            //     ) {
            //         specs[spec.key] = spec.value;
            //     }
            // });

            formData.append(
                "specifications",
                // JSON.stringify(specs)
                JSON.stringify(specifications)
            );

            // Settings
            formData.append(
                "isFeatured",
                String(isFeatured)
            );

            formData.append(
                "isActive",
                String(isActive)
            );

            // Cover Image
            if (cover) {
                formData.append("cover", cover);
            }

            // Gallery Images
            gallery.forEach((image) => {
                formData.append("gallery", image);
            });

            if (mode === "edit" && productId) {

                const res = await api.patch(
                    `/api/superAdmin/product/${productId}`,
                    formData
                );

            }
            else {
                const res = await api.post(
                    "/api/superAdmin/product",
                    formData
                );
            }

            toast.success(
                mode === "create"
                    ? "Product created successfully."
                    : "Product updated successfully."
            );

        } catch (err) {
            console.error(err);

            toast.error("Failed to submit");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-7xl space-y-8">

            <FormSection
                title="General Information"
                description="Basic information about the product."
            >
                <ProductGeneralSection
                    name={name}
                    setName={setName}
                    slug={slug}
                    setSlug={setSlug}
                    brand={brand}
                    setBrand={setBrand}
                    description={description}
                    setDescription={setDescription}
                    shortDescription={shortDescription}
                    setShortDescription={setShortDescription}
                    category={category}
                    setCategory={setCategory}
                    subCategory={subCategory}
                    setSubCategory={setSubCategory}
                    categories={categories}
                />
            </FormSection>

            <FormSection
                title="Pricing, Inventory and Rating"
                description="Set product price, available stock and rating."
            >
                <ProductPricingSection
                    price={price}
                    setPrice={setPrice}
                    discountPrice={discountPrice}
                    setDiscountPrice={
                        setDiscountPrice
                    }
                    retailPrice={retailPrice}
                    setRetailPrice={
                        setRetailPrice
                    }
                    
                    minimumOrderQuantity={minimumOrderQuantity}
                    setMinimumOrderQuantity={
                        setMinimumOrderQuantity
                    }
                    stock={stock}
                    setStock={setStock}
                    rating={rating}
                    setRating={setRating}
                />
            </FormSection>

            <FormSection
                title="Images"
                description="Upload cover image and gallery images."
            >
                <ProductImagesSection
                    cover={cover}
                    coverPreview={
                        coverPreview
                    }
                    setCover={setCover}
                    setCoverPreview={
                        setCoverPreview
                    }
                    gallery={gallery}
                    galleryPreview={
                        galleryPreview
                    }
                    setGallery={setGallery}
                    setGalleryPreview={
                        setGalleryPreview
                    }
                />
            </FormSection>

            <FormSection
                title="Specifications"
                description="Technical specifications shown to customers."
            >
                <ProductSpecificationsSection
                    specifications={
                        specifications
                    }
                    setSpecifications={
                        setSpecifications
                    }
                />
            </FormSection>

            <FormSection
                title="Settings"
                description="Control product visibility."
            >
                <ProductSettingsSection
                    isFeatured={
                        isFeatured
                    }
                    setIsFeatured={
                        setIsFeatured
                    }
                    isActive={isActive}
                    setIsActive={
                        setIsActive
                    }
                />
            </FormSection>

            <div className="flex justify-end gap-3">

                <Button
                    variant="outline"
                >
                    Cancel
                </Button>

                <Button
                    onClick={
                        handleSubmit
                    }
                    disabled={loading}
                >
                    {mode === "create"
                        ? "Create Product"
                        : "Update Product"}
                </Button>

            </div>

        </div>
    );
}