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
    ClipboardEdit,
    Pencil,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";
import { User } from "@/types/user";
import UserRetailerSalesmanDialog from "./userRetailerSalesmanDialog";
import { useState } from "react";

interface Props {
    users: User[];
    loading: boolean;
    onEdit: (user: User) => void;
    onRetailerProfileView: (user: User) => void;
    onSalesmanAssignedRetailersView: (user: User) => void;
    onDelete: (user: User) => void;
    restoreUser: (user: User) => void;
    onAdd: (user: User) => void;
}

export default function UserTable({
    users,
    loading,
    onEdit,
    onRetailerProfileView,
    onSalesmanAssignedRetailersView,
    onDelete,
    restoreUser,
    onAdd,
}: Props) {

    const [openSalesmanAssignmentDialog, setOpenSalesmanAssignmentDialog] = useState(false);
    const [selectedRetailer, setSelectedRetailer] = useState<User>();

    if (loading) {
        return (
            <Card>
                <CardContent className="py-16 text-center text-muted-foreground">
                    Loading users...
                </CardContent>
            </Card>
        );
    }

    if (users.length === 0) {
        return (
            <Card>
                <CardContent className="py-16 text-center">
                    <h3 className="text-lg font-semibold">
                        No User Found
                    </h3>

                    <p className="text-muted-foreground mt-2">
                        Try changing your search.
                    </p>
                </CardContent>
            </Card>
        );
    }




    return (
        <>
            <Card>

                <CardContent className="p-0">

                    <Table>

                        <TableHeader>

                            <TableRow>

                                <TableHead>
                                    User Id
                                </TableHead>

                                <TableHead>
                                    Name
                                </TableHead>

                                <TableHead>
                                    Email
                                </TableHead>

                                <TableHead>
                                    Mobile
                                </TableHead>

                                <TableHead>
                                    Role
                                </TableHead>

                                <TableHead>
                                    Status
                                </TableHead>

                                <TableHead className="text-right">
                                    Actions
                                </TableHead>

                            </TableRow>

                        </TableHeader>

                        <TableBody>

                            {users.map((user) => (
                                <TableRow key={user._id}>

                                    <TableCell className="font-medium">
                                        {user._id}
                                    </TableCell>

                                    <TableCell>
                                        <div className={user.role=="RETAILER"||user.role=="SALESMAN"?"underline cursor-pointer":""}
                                            onClick={()=>{
                                                if(user.role == "RETAILER"){
                                                    onRetailerProfileView(user);
                                                }
                                                else if(user.role == "SALESMAN"){
                                                    onSalesmanAssignedRetailersView(user);
                                                }
                                            }}
                                        >
                                            {user.name}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {user.email}
                                    </TableCell>

                                    <TableCell>
                                        {user.mobile}
                                    </TableCell>

                                    <TableCell>
                                        {user.role}
                                    </TableCell>

                                    <TableCell>

                                        <div className="flex gap-1 flex-col">
                                            <Badge
                                                variant={
                                                    user.isActive
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {user.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </Badge>
                                            {user.role == "RETAILER" && <Badge className={`${user.isApproved ? "bg-green-800" : "bg-red-800"}`}>
                                                {user.isApproved ? "Approved" : "Not Approved"}
                                            </Badge> }
                                        </div>

                                    </TableCell>

                                    <TableCell>

                                        <div className="flex justify-end gap-2">

                                            {user.role == "RETAILER" ? <Button
                                                variant="outline"
                                                title="Assign retailers"
                                                onClick={() => {
                                                    setSelectedRetailer(user);
                                                    setOpenSalesmanAssignmentDialog(true);
                                                }
                                                }
                                            >
                                                <ClipboardEdit className="h-4 w-4" /> Salesman
                                            </Button> : null}
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() =>
                                                    onEdit(user)
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>

                                            {user.isActive ?
                                                <Button
                                                    // size="icon"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        onDelete(user)
                                                    }
                                                >
                                                    Deactivate
                                                </Button> :
                                                <Button
                                                    // size="icon"
                                                    onClick={() =>
                                                        restoreUser(user)
                                                    }
                                                >
                                                    Activate
                                                </Button>}

                                        </div>

                                    </TableCell>

                                </TableRow>
                            ))}

                        </TableBody>

                    </Table>

                </CardContent>

            </Card>

            <UserRetailerSalesmanDialog open={openSalesmanAssignmentDialog} onOpenChange={setOpenSalesmanAssignmentDialog} retailer={selectedRetailer} />
        </>
    );
}