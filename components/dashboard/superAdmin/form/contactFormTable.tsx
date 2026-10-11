"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Button,
} from "@/components/ui/button";

import {
    Pencil,
    Trash2,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";
import Image from "next/image";
import { ContactForm } from "@/types/contactForm";

export default function ContactFormTable({
    contactForms,
    loading,
    viewContactForm
}: {
    contactForms:ContactForm[],
    loading:boolean,
    viewContactForm: (contactForm:ContactForm)=>void
}) {
    if (loading) {
        return (
            <Card>
                <CardContent className="py-16 text-center text-muted-foreground">
                    Loading contact forms...
                </CardContent>
            </Card>
        );
    }

    if (contactForms.length === 0) {
        return (
            <Card>
                <CardContent className="py-16 text-center">
                    <h3 className="text-lg font-semibold">
                        No data Found
                    </h3>

                    <p className="text-muted-foreground mt-2">
                        Try changing your search.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>

            <CardContent className="p-0">

                <Table>

                    <TableHeader>

                        <TableRow>

                            <TableHead className="w-[80px]">
                                Id
                            </TableHead>

                            <TableHead>
                                Name
                            </TableHead>

                            <TableHead>
                                Email
                            </TableHead>

                            <TableHead>
                                Phone
                            </TableHead>

                            <TableHead>
                                Subject
                            </TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {contactForms.map((contactForm:ContactForm) => (
                            <TableRow key={contactForm._id}>

                                <TableCell>
                                    <span onClick={()=>viewContactForm(contactForm)} className="underline cursor-pointer">{contactForm._id}</span>

                                </TableCell>

                                <TableCell className="font-medium">
                                    {contactForm.name}
                                </TableCell>

                                <TableCell>
                                    {contactForm.email}
                                </TableCell>

                                <TableCell>
                                    {contactForm.phone}
                                </TableCell>

                                <TableCell>
                                    {contactForm.subject}
                                </TableCell>

                            </TableRow>
                        ))}

                    </TableBody>

                </Table>

            </CardContent>

        </Card>
    );
}