import { useAuth } from "@/context/AuthContext";
import { CheckCircle2, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";

export default function OrderTimeline({
    stageNumber,
}: {
    stageNumber: number;
}) {
    const { user } = useAuth();
    // const stages = [
    //     "Retailer",
    //     "Salesman",
    //     "Admin",
    //     // "Super Admin",
    // ];

    const [stages,setStages] = useState<string[]>([])

    
    useEffect(()=>{
        if(!user) return;
        if(user.role=="RETAILER"){
            setStages(["Retailer","Salesman"])
        }
        if(user.role == "ADMIN" || user.role =="SUPER_ADMIN" || user.role == "SALESMAN"){
            setStages(["Retailer","Salesman","Admin"])
        }
    },[user])
    
    // let activeStage = 1;
    
    // if (status === "UNDER_REVIEW")
    //     activeStage = 2;
    
    // if (status === "APPROVED")
    //     activeStage = 4;
    
    if(!user) return;
    return (
        <div className="flex items-center gap-2">
            {stages.map((stage, index) => {
                const completed = index + 1 <= stageNumber;

                return (
                    <div
                        key={stage}
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >
                        {completed ? (
                            <CheckCircle2
                                className="
                                    h-5
                                    w-5
                                    text-green-600
                                "
                            />
                        ) : (
                            <Clock3
                                className="
                                    h-5
                                    w-5
                                    text-muted-foreground
                                "
                            />
                        )}

                        <span
                            className="
                                text-xs
                            "
                        >
                            {stage}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
