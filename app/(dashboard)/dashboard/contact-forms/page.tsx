"use client";

import { useEffect, useState } from "react";

import { useAuthApi } from "@/hooks/useAuthApi";

import toast from "react-hot-toast";
import { ContactForm } from "@/types/contactForm";
import FormToolbar from "@/components/dashboard/superAdmin/form/formToolbar";
import FormDetailsDialog from "@/components/dashboard/superAdmin/form/formDetailsDialog";
import ContactFormTable from "@/components/dashboard/superAdmin/form/contactFormTable";

export default function ContactFormDataPage() {

    const api = useAuthApi();

    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);
    const [contactForms, setContactForms] = useState<ContactForm[]>([]);
    const [selectedContactForm, setSelectedContactForm] = useState<ContactForm | null>(null);

    const [totalPages, setTotalPages] = useState(1);

    const getContactForms = async () => {
        try {

            setLoading(true);

            const res = await api.get("/api/superAdmin/forms/contact-forms", {
                params: {
                    page,
                    search,
                },
            });

            setContactForms(res.data.data);

            setTotalPages(res.data.totalPages);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getContactForms();
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
                    Contact Forms
                </h1>
            </div>


            <FormToolbar
                search={search}
                setSearch={setSearch}
            />

            <ContactFormTable
                loading={loading}
                contactForms={contactForms}
                viewContactForm={(contactForm:ContactForm)=>{
                    setSelectedContactForm(contactForm);
                    setDialogOpen(true);
                }}
            />

            <FormDetailsDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                data={selectedContactForm}
            />

            {/* Pagination will come next */}

        </div>
    );
}