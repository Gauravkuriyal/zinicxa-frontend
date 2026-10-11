import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types/user";
import { useState } from "react";

export default function ProfileCard({user}:{user:User}) {

    const [userData,setUserData] = useState(user);

    const handleUserData = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setUserData({...userData,[e.target.name]:e.target.value});
    }

    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Profile Information
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                <div>

                    <Label htmlFor="name">
                        Name
                    </Label>

                    <Input
                        value={userData.name} name="name" className="mt-1"
                        onChange={handleUserData}
                    />

                </div>

                <div>

                    <Label htmlFor="mobile">
                        Mobile Number
                    </Label>

                    <Input
                        value={userData.mobile} name="mobile" className="mt-1"
                        onChange={handleUserData}
                    />

                </div>

                <div>

                    <Label htmlFor="email">
                        Email Address
                    </Label>

                    <Input
                        disabled
                        name="email"
                        className="mt-1"
                        defaultValue={userData.email}
                    />

                </div>

            </CardContent>

        </Card>
    );
}