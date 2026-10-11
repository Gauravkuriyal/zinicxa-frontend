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
import { User } from "@/types/user";
import { Role } from "@/lib/roles";

interface Props {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    user: User | null;

    refreshUsers: () => void;
}

export default function UserFormDialog({
    open,
    onOpenChange,
    user,
    refreshUsers,
}: Props) {
    const api = useAuthApi();

    const isEdit = !!user;
    // const isEdit = true;

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState("");


    useEffect(() => {

        if (!open) return;

        if (!user) {

            setName("");
            setMobile("");
            setRole("");

            return;
        }

        setName(user.name);

        setMobile(user.mobile);
        setRole(user.role);

    }, [user, open]);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (!name.trim()) {
                toast.error("Name is required.");
                return;
            }

            if (!mobile.trim()) {
                toast.error("Mobile is required.");
                return;
            }

            if (!role.trim()) {
                toast.error("Role is required.");
                return;
            }

            const formData = new FormData();

            formData.append("name", name);
            formData.append("mobile", mobile);
            formData.append("role", role);


            if (isEdit) {
                await api.patch(
                    `/api/superAdmin/user/${user!._id}`,
                    formData, {
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                }
                );

                toast.success(
                    "User updated successfully."
                );
            }
            // else {
            //     await api.post(
            //         "/api/superAdmin/user",
            //         formData,
            //         {
            //             headers: {
            //                 "Content-Type":
            //                     "multipart/form-data",
            //             },
            //         }
            //     );

            //     toast.success(
            //         "User created successfully."
            //     );
            // }

            refreshUsers();

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
                    setMobile("");
                }
            }}
        >

            <DialogContent className="max-w-xl">

                <DialogHeader>

                    <DialogTitle>

                        {isEdit
                            ? "Edit User"
                            : "Add User"}

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

                        <Label className="mb-2">Mobile Number</Label>

                        <Input
                            value={mobile}
                            onChange={(e) =>
                                setMobile(e.target.value)
                            }
                        />

                    </div>

                    <div>

                        <Label className="mb-2">Role</Label>

                        <div className="grid grid-cols-2">
                            {Object.keys(Role).map((roleType, index) => (
                                <div className="flex items-center justify-start gap-4 my-2" key={index}>
                                    <Input
                                        value={roleType}
                                        id={roleType}
                                        type="radio"
                                        name="role"
                                        className="w-fit h-fit mt-0 pt-0"
                                        checked={role == roleType}
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                    />
                                    <Label htmlFor={roleType} className="">{roleType}</Label>
                                </div>
                            ))}
                        </div>

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