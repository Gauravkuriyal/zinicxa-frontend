"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { User } from "@/types/user";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext =
    createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] =
        useState<User | null>(null);

    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        // console.log("stored User ",JSON.parse(storedUser||""))
        if (storedUser) {
            try{
                setUser(JSON.parse(storedUser));
            } catch(err){
                console.log(err);
                localStorage.removeItem("user");
                localStorage.removeItem("access_token");
                localStorage.removeItem("role");
            }
        }

        setLoading(false);
        
    }, []);

    const logout = async () => {
        console.log("Logged out")
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        setUser(null);
        
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}