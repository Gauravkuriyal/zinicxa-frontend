"use client";

import { useEffect, useState } from "react";

import { useAuthApi } from "@/hooks/useAuthApi";

import CategoryToolbar from "@/components/dashboard/superAdmin/category/categoryToolbar";
import CategoryTable from "@/components/dashboard/superAdmin/category/categoryTable";
import { Category } from "@/types/category";
import CategoryFormDialog from "@/components/dashboard/superAdmin/category/categoryFormDialog";
import toast from "react-hot-toast";

export default function CategoriesPage() {    

    const api = useAuthApi();

    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [selectedCategory, setSelectedCategory] =
        useState<Category | null>(null);

    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const getCategories = async () => {
        try {

            setLoading(true);

            const res = await api.get("/api/superAdmin/category", {
                params: {
                    page,
                    search,
                },
            });

            setCategories(res.data.categories);

            setTotalPages(res.data.totalPages);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (categoryId:string) => {
        try {

            setLoading(true);
            const res = await api.delete(`/api/superAdmin/category/${categoryId}`);
            toast.success("Deleted Successfully");
            getCategories();

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
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
                    Categories
                </h1>
            </div>


            <CategoryToolbar
                search={search}
                setSearch={setSearch}
                setSelectedCategory={setSelectedCategory}
                setDialogOpen={setDialogOpen}
            />

            <CategoryTable
                loading={loading}
                categories={categories}
                onEdit={(category) => {
                    setSelectedCategory(category);

                    setDialogOpen(true);
                }}
                onDelete={(category) => {
                    deleteCategory(category._id);
                }}
                onAdd={() => {
                    setSelectedCategory(null);
                    setDialogOpen(true);
                }}
            />

            <CategoryFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                category={selectedCategory}
                refreshCategories={getCategories}
            />

            {/* Pagination will come next */}

        </div>
    );
}