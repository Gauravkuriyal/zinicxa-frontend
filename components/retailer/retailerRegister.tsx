"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Role } from "@/lib/roles"
import { redirect, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios";
import {
    ArrowRight,
    Eye,
    EyeOff,
    Loader,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import FloatingInput from "../auth/floatingInput"
import Link from "next/link"

const ease = [0.16, 1, 0.3, 1]

export default function RetailerRegister() {
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);


    const router = useRouter();

    const [signUpFormData, setSignUpLoginFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        otp: "",
        mobile: ""
    })

    const [showPassword, setShowPassword] =
        useState(false)

    const handleSignUpFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpLoginFormData({ ...signUpFormData, [e.target.name]: e.target.value });
    }

    const sendOtp = async (email: string) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/auth/send-otp/`, { email });
            if (response.data.success) {
                toast.success("OTP sent to your email.")
            }
        } catch (err) {
            console.log(err);
            let errorMessage = "Something went wrong. Please try again.";
            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.message || errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            toast.error(errorMessage);
        }
    }

    const sendOtpForSignUp = async () => {
        if (loading) return;
        setLoading(true);

        if (!signUpFormData.email || !signUpFormData.password || !signUpFormData.fullName || !signUpFormData.mobile) {
            toast.error("Please enter all the valid information")
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/auth/check-account/`, { email: signUpFormData.email });
            if (response.data.success) {
                if (response.data.exists) {
                    toast.error("User Already Exist Please login");
                }
                else {
                    sendOtp(signUpFormData.email);
                    setOtpSent(true);
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            console.log(err);
            let errorMessage = "Something went wrong. Please try again.";
            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.message || errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const signup = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        if (!signUpFormData.email || !signUpFormData.password || !signUpFormData.fullName || !signUpFormData.mobile || !signUpFormData.otp) {
            toast.error("Please enter all the valid information")
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/auth/retailer/register/`,
                { email: signUpFormData.email, password: signUpFormData.password, name: signUpFormData.fullName, mobile: signUpFormData.mobile, otp: signUpFormData.otp },
                {
                    withCredentials: true,
                }
            );
            if (response.data.success) {
                const { token, user } = response.data;
                localStorage.setItem("access_token", token);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("role", user?.role);
                toast.success("Welcome " + user?.name);
                setUser(user);
                router.push("/retailer/onboarding");
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            console.log(err);
            let errorMessage = "Something went wrong. Please try again.";
            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.message || errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }


    return (
        <main className="relative flex h-[calc(100vh-100px)] w-full overflow-hidden bg-[#FAFAFA]">
            {/* MEDIA PANEL */}
            <motion.div
                animate={{
                    x: "100%",
                }}
                // style={{
                //     left: isSignup ? "50%" : "0%",
                // }}
                transition={{
                    duration: 0.8,
                }}
                className={cn(
                    "absolute inset-y-0 z-10 hidden w-1/2 overflow-hidden md:block"
                )}
            >
                {/* Background */}
                <div className="relative h-full w-full">
                    <Image
                        src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1600&auto=format&fit=crop"
                        alt="Luxury"
                        fill
                        className="h-full w-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-14 text-white">
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                                Hump Electronics
                            </p>
                        </div>

                        <div className="max-w-md">
                            <h2 className="font-heading text-5xl font-semibold leading-tight">
                                Curated technology crafted for modern living.
                            </h2>

                            <p className="mt-6 text-sm leading-7 text-white/70">
                                Experience premium electronics, intelligent
                                accessories, and seamless ordering designed
                                for professionals and creators.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-white/60">
                            <div className="h-px w-12 bg-white/30" />

                            Premium Collection 2026
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
                {/* LEFT SIDE */}
                <div
                    className={cn(
                        "relative flex items-center justify-center px-5 py-6 md:px-10 md:order-0"
                    )}
                >
                    <div className="w-full max-w-sm">
                        <AnimatePresence mode="wait">
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                transition={{
                                    duration: 0.5,
                                }}
                                className="w-full"
                            >
                                {/* Top */}
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em]">
                                        Become a partner with Zinicxa
                                    </p>

                                    <p className="mt-2 text-sm leading-7 text-neutral-500">
                                        Join to receive curated access, seamless
                                        ordering, and priority updates.
                                    </p>
                                </div>

                                <form className="mt-5 space-y-6" onSubmit={signup}>
                                    {otpSent ?
                                        <>
                                            <FloatingInput
                                                label="OTP"
                                                type="number"
                                                name="otp"
                                                value={signUpFormData.otp}
                                                onChange={handleSignUpFormData}
                                            />
                                            {/* CTA */}

                                            {loading ?
                                                <Button type="button" className="group mt-4 w-full rounded-full bg-green-800 text-xs py-2 uppercase tracking-[0.2em] text-white transition-all hover:bg-green-800/90">
                                                    Creating your account

                                                    <Loader className="ml-2 h-4 w-4 animate-spin" />
                                                </Button>
                                                :
                                                <Button type="submit" className="group mt-4 w-full rounded-full bg-black text-xs py-2 uppercase tracking-[0.2em] text-white transition-all hover:bg-black/90">
                                                    Submit OTP

                                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                </Button>
                                            }
                                        </>
                                        :
                                        <>
                                            <FloatingInput
                                                label="Full Name"
                                                type="text"
                                                name="fullName"
                                                value={signUpFormData.fullName}
                                                onChange={handleSignUpFormData}
                                            />

                                            <FloatingInput
                                                label="Email Address"
                                                type="email"
                                                name="email"
                                                value={signUpFormData.email}
                                                onChange={handleSignUpFormData}
                                            />

                                            <FloatingInput
                                                label="Mobile Number"
                                                type="tel"
                                                name="mobile"
                                                value={signUpFormData.mobile}
                                                onChange={handleSignUpFormData}
                                            />

                                            <div>
                                                <FloatingInput
                                                    label="Create Password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={signUpFormData.password}
                                                    name="password"
                                                    onChange={handleSignUpFormData}
                                                    rightElement={
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowPassword(!showPassword)
                                                            }
                                                            className="text-sm text-neutral-400 transition hover:text-black"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="h-4 w-4" />
                                                            ) : (
                                                                <Eye className="h-4 w-4" />
                                                            )}
                                                        </button>
                                                    }
                                                />

                                                {/* Strength */}
                                                <div className="mt-3">
                                                    <div className="h-[2px] w-full overflow-hidden rounded-full bg-neutral-200">
                                                        <div className="h-full w-2/3 bg-black" />
                                                    </div>

                                                    <p className="mt-2 text-xs text-neutral-400">
                                                        Strong password
                                                    </p>
                                                </div>
                                            </div>

                                            {/* CTA */}

                                            {loading ?
                                                <Button type="button" className="group mt-4 w-full rounded-full bg-green-800 text-xs py-2 uppercase tracking-[0.2em] text-white transition-all hover:bg-green-800/90">
                                                    Sending OTP

                                                    <Loader className="ml-2 h-4 w-4 animate-spin" />
                                                </Button>
                                                :
                                                <Button type="button" className="group mt-4 w-full rounded-full bg-black text-xs py-2 uppercase tracking-[0.2em] text-white transition-all hover:bg-black/90" onClick={sendOtpForSignUp}>
                                                    Create Account

                                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                </Button>
                                            }
                                        </>

                                    }
                                </form>
                                {/* Switch */}
                                <p className="mt-10 text-sm text-neutral-500">
                                    Already have an account?{" "}
                                    <Link href={"/login"}>
                                        <button
                                            className="text-black underline underline-offset-4 transition hover:opacity-70"
                                        >
                                            Sign In.
                                        </button></Link>
                                </p>
                            </motion.div>

                        </AnimatePresence>
                    </div>
                </div>

                {/* RIGHT EMPTY SIDE */}
                <div className="hidden md:block" />
            </div>
        </main>
    )
}