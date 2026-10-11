"use client";

import { useEffect, useState } from "react";

import { useAuthApi } from "@/hooks/useAuthApi";

import toast from "react-hot-toast";
import FormToolbar from "@/components/dashboard/superAdmin/form/formToolbar";
import FormDetailsDialog from "@/components/dashboard/superAdmin/form/formDetailsDialog";
import { SubscriberForm } from "@/types/subscribeForm";
import SubscriberFormTable from "@/components/dashboard/superAdmin/form/subscriberFormTable";

export default function SubscribeFormDataPage() {

    const api = useAuthApi();

    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);
    const [subscribeForms, setSubscribeForms] = useState<SubscriberForm[]>([]);
    const [selectedSubscriberForm, setSelectedSubscriberForm] = useState<SubscriberForm | null>(null);

    const [totalPages, setTotalPages] = useState(1);

    const getSubscriberForms = async () => {
        try {

            setLoading(true);

            const res = await api.get("/api/superAdmin/forms/subscribe-forms", {
                params: {
                    page,
                    search,
                },
            });

            setSubscribeForms(res.data.data);

            setTotalPages(res.data.totalPages);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSubscriberForms();
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
                    Subscribe Forms
                </h1>
            </div>


            <FormToolbar
                search={search}
                setSearch={setSearch}
            />

            <SubscriberFormTable
                loading={loading}
                subscribeForms={subscribeForms}
            />

            <FormDetailsDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                data={selectedSubscriberForm}
            />

            {/* Pagination will come next */}

        </div>
    );
}