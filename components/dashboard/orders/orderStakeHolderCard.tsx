import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building, User, UserSquare } from "lucide-react"; // Or standard clean HTML SVGs if not using lucide

interface UserProfile {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    role?: string;
}

interface StakeholdersProps {
    placedBy: UserProfile;
    retailer: UserProfile;
    salesman: UserProfile;
}

export function OrderStakeholdersCard({ placedBy, retailer, salesman }: StakeholdersProps) {
    
    // Tiny reusable detail wrapper to keep design clean & identical
    const MemberBlock = ({ title, data, icon: Icon }: { title: string; data: UserProfile; icon: any }) => (
        <div className="flex gap-3 py-3 border-b last:border-0 last:pb-0 first:pt-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/5 text-primary shrink-0 mt-0.5">
                <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-semibold text-foreground">{title}</h4>
                    {data.role && (
                        <span className="text-[9px] font-medium bg-secondary text-secondary-foreground px-1.5 py-0.2 rounded">
                            {data.role}
                        </span>
                    )}
                </div>
                <p className="text-sm font-medium text-foreground truncate">{data.name}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-xs text-muted-foreground">
                    <span className="truncate">{data.email}</span>
                    <span className="text-muted-foreground/30">•</span>
                    <span>{data.mobile}</span>
                </div>
            </div>
        </div>
    );

    return (
        <Card>
            <CardHeader className="border-b bg-muted/20 py-4">
                <CardTitle className="text-base font-semibold">Associated Stakeholders</CardTitle>
            </CardHeader>
            <CardContent className="divide-y pt-4">
                <MemberBlock title="Placed By" data={placedBy} icon={User} />
                <MemberBlock title="Retailer Details" data={retailer} icon={Building || UserSquare} />
                <MemberBlock title="Assigned Salesman" data={salesman} icon={User} />
            </CardContent>
        </Card>
    );
}