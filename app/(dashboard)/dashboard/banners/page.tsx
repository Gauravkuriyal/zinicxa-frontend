"use client";

import { useEffect, useState } from "react";

import { useAuthApi } from "@/hooks/useAuthApi";

import toast from "react-hot-toast";
import { Banner } from "@/types/banner";
import BannerToolbar from "@/components/dashboard/superAdmin/banner/bannerToolbar";
import BannerTable from "@/components/dashboard/superAdmin/banner/bannerTable";
import BannerFormDialog from "@/components/dashboard/superAdmin/banner/bannerFormDialog";

export default function BannersPage() {    

    const api = useAuthApi();

    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [selectedBanner, setSelectedBanner] =
        useState<Banner | null>(null);

    const [banners, setBanners] = useState([]);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const getBanners = async () => {
        try {

            setLoading(true);

            const res = await api.get("/api/superAdmin/banner", {
                params: {
                    page,
                    search,
                },
            });

            setBanners(res.data.banners);

            setTotalPages(res.data.totalPages);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteBanner = async (bannerId:string) => {
        try {

            setLoading(true);
            const res = await api.delete(`/api/superAdmin/banner/${bannerId}`);
            toast.success("Deleted Successfully");
            getBanners();

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBanners();
    }, [page, search]);

    return (
        <div className="space-y-6">
            <div>

                <h1
                    className="
                        text-3xl
                        font-bold
                    "
                >
                    Banners
                </h1>
            </div>


            <BannerToolbar
                search={search}
                setSearch={setSearch}
                setSelectedBanner={setSelectedBanner}
                setDialogOpen={setDialogOpen}
            />

            <BannerTable
                loading={loading}
                banners={banners}
                onEdit={(banner:Banner) => {
                    setSelectedBanner(banner);

                    setDialogOpen(true);
                }}
                onDelete={(banner:Banner) => {
                    deleteBanner(banner._id||"");
                }}
                onAdd={() => {
                    setSelectedBanner(null);
                    setDialogOpen(true);
                }}
            />

            <BannerFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                banner={selectedBanner}
                refreshBanners={getBanners}
            />

            {/* Pagination will come next */}

        </div>
    );
}