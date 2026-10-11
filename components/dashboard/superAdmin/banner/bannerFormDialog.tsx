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
import { Banner } from "@/types/banner";

interface Props {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    banner?: Banner | null;

    refreshBanners: () => void;
}

export default function BannerFormDialog({
    open,
    onOpenChange,
    banner,
    refreshBanners,
}: Props) {
    const api = useAuthApi();

    const isEdit = !!banner;

    const [loading, setLoading] = useState(false);

    const [bannerData, setBannerData] = useState<Banner>({
        heading: "",
        subHeading: "",
        buttonText: "",
        link: "",
        order: NaN,
        bannerCover: null,
        isActive: true
    })

    const handleBannerDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBannerData({ ...bannerData, [e.target.name]: e.target.value });

    }

    const [preview, setPreview] =
        useState("");


    useEffect(() => {

        if (!open) return;

        if (!banner) {
            setPreview("");

            return;
        }

        setBannerData({
            heading: banner.heading,
            subHeading: banner.subHeading,
            buttonText: banner.buttonText,
            link: banner.link,
            order: banner.order,
            bannerCover: banner.bannerCover,
            isActive: banner.isActive,
        })

        if (typeof banner.bannerCover === "string") {
            setPreview(
                process.env.NEXT_PUBLIC_BACKEND_DOMAIN +"/"+ banner.bannerCover
            );
        }


    }, [banner, open]);


    const handleBannerCoverChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setBannerData({ ...bannerData, bannerCover: file });

        setPreview(
            URL.createObjectURL(file)
        );

    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (!bannerData.heading.trim()) {
                toast.error("Banner heading is required.");
                return;
            }
            if (!bannerData.subHeading.trim()) {
                toast.error("Banner sub heading is required.");
                return;
            }
            if (!bannerData.buttonText.trim()) {
                toast.error("Banner button text is required.");
                return;
            }
            if (!bannerData.link.trim()) {
                toast.error("Banner link is required.");
                return;
            }
            if (!bannerData.order) {
                toast.error("Banner order is required.");
                return;
            }
            if (!bannerData.bannerCover) {
                toast.error("Banner banner cover is required.");
                return;
            }

            const formData = new FormData();

            formData.append("heading", bannerData.heading);
            formData.append("subHeading", bannerData.subHeading);
            formData.append("buttonText", bannerData.buttonText);
            formData.append("link", bannerData.link);
            formData.append("order", bannerData.order.toString());
            formData.append("bannerCover", bannerData.bannerCover);
            formData.append("isActive", String(bannerData.isActive));


            if (isEdit) {
                await api.patch(
                    `/api/superAdmin/banner/${banner!._id}`,
                    formData
                );

                toast.success(
                    "Banner updated successfully."
                );
            } else {
                await api.post(
                    "/api/superAdmin/banner",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );

                toast.success(
                    "Banner created successfully."
                );
            }

            refreshBanners();
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
                    setBannerData({
                        heading: "",
                        subHeading: "",
                        buttonText: "",
                        link: "",
                        order: NaN,
                        bannerCover: null,
                        isActive: true
                    })
                }
                
                refreshBanners();
            }}
        >

            <DialogContent className="max-w-xl">

                <DialogHeader>

                    <DialogTitle>

                        {isEdit
                            ? "Edit Banner"
                            : "Add Banner"}

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div>

                        <Label className="mb-2">Heading</Label>

                        <Input
                            value={bannerData.heading}
                            name="heading"
                            onChange={handleBannerDataChange}
                        />

                    </div>

                    <div>

                        <Label className="mb-2">Sub Heading</Label>

                        <Input

                            value={bannerData.subHeading}
                            name="subHeading"
                            onChange={handleBannerDataChange}

                        />

                    </div>
                    <div>

                        <Label className="mb-2">Button Text</Label>

                        <Input

                            value={bannerData.buttonText}
                            name="buttonText"
                            onChange={handleBannerDataChange}

                        />

                    </div>
                    
                    <div>

                        <Label className="mb-2">Button Link</Label>

                        <Input

                            value={bannerData.link}
                            name="link"
                            onChange={handleBannerDataChange}

                        />

                    </div>
                    <div>

                        <Label className="mb-2">Order</Label>

                        <Input

                            value={bannerData.order}
                            name="order"
                            type="number"
                            min={0}
                            onChange={handleBannerDataChange}

                        />

                    </div>

                    <div>

                        <Label className="mb-2">

                            Cover

                        </Label>

                        <Input

                            type="file"

                            accept="image/*"

                            onChange={
                                handleBannerCoverChange
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

                            checked={bannerData.isActive}

                            onCheckedChange={(value)=>setBannerData({...bannerData,isActive:value})}

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