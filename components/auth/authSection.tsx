"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Role } from "@/lib/roles"
import { redirect, useRouter } from "next/navigation"
import SignupForm from "./signUpForm"
import LoginForm from "./loginForm"
import toast from "react-hot-toast"
import axios from "axios";
import { useAuth } from "@/context/AuthContext"
import ForgetPasswordForm from "./forgetPasswordForm"

const ease = [0.16, 1, 0.3, 1]

export default function AuthSection() {
    const { setUser } = useAuth();
    const [isSignup, setIsSignup] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [isForgetPasswordFormActive, setIsForgetPasswordFormActive] = useState<boolean>(false);
    const [forgetPasswordOtpSent, setForgetPasswordOtpSent] = useState<boolean>(false);


    const router = useRouter();

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: ""
    })

    const [signUpFormData, setSignUpLoginFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        otp: "",
        mobile: ""
    })
    
    const [forgetPasswordFormData, setForgetPasswordFormData] = useState({
        email: "",
        newPassword: "",
        otp: ""
    })

    const handleLoginFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    }

    const handleSignUpFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpLoginFormData({ ...signUpFormData, [e.target.name]: e.target.value });
    }
    
    const handleForgetPasswordFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForgetPasswordFormData({ ...forgetPasswordFormData, [e.target.name]: e.target.value });
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
                    toast.error("User already exists. Please login");
                    setIsSignup(false);
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

    const sendOtpForForgetPassword = async () => {
        if (loading) return;
        setLoading(true);

        if (!forgetPasswordFormData.email) {
            toast.error("Please enter all the valid information")
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/auth/check-account/`, { email: forgetPasswordFormData.email });
            if (response.data.success) {
                if (!response.data.exists) {
                    toast.error("User does not exist. Please create account.");
                    setIsSignup(false);
                }
                else {
                    sendOtp(forgetPasswordFormData.email);
                    setForgetPasswordOtpSent(true);
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/auth/register/`,
                { email: signUpFormData.email, password: signUpFormData.password, name: signUpFormData.fullName, mobile: signUpFormData.mobile, otp: signUpFormData.otp },
                {
                    withCredentials: true,
                }
            );
            if (response.data.success) {
                const { token, user } = response.data;
                // localStorage.setItem("access_token", token);
                // localStorage.setItem("user", JSON.stringify(user));
                // localStorage.setItem("role", user?.role);
                // toast.success("Welcome " + user?.name);
                // setUser(user);
                router.push("/dashboard");
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

    const login = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        if (!loginFormData.email || !loginFormData.password) {
            toast.error("Please enter all the valid information")
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/auth/login/`, { email: loginFormData.email, password: loginFormData.password },
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
                router.push("/dashboard");
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


    const forgetPassword = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        if (!forgetPasswordFormData.email || !forgetPasswordFormData.newPassword || !forgetPasswordFormData.otp) {
            toast.error("Please enter all the valid information")
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/auth/forgot-password/`, { email: forgetPasswordFormData.email, newPassword: forgetPasswordFormData.newPassword, otp: forgetPasswordFormData.otp },
                {
                    withCredentials: true,
                }
            );
            if (response.data.success) {
                const { token, user } = response.data;

                // localStorage.setItem("access_token", token);
                // localStorage.setItem("user", JSON.stringify(user));
                // localStorage.setItem("role", user?.role);
                // toast.success("Welcome " + user?.name);
                // setUser(user);
                router.push("/dashboard");
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
                    x: isSignup ? "100%" : "0%",
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

            {/* FORMS WRAPPER */}
            {/* <div className="grid h-full w-full md:grid-cols-2">
                EMPTY SIDE 
                <div className="hidden md:block" />

                 FORM SIDE 
                <div className="relative flex items-center justify-center overflow-hidden px-6 py-10 md:px-16">
                    <div className="w-full max-w-md">
                        <AnimatePresence mode="wait">
                            {isSignup ? (
                                <SignupForm
                                    key="signup"
                                    onSwitch={() => setIsSignup(false)}
                                />
                            ) : (
                                <LoginForm
                                    key="login"
                                    onSwitch={() => setIsSignup(true)}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div> */}

            <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
                {/* LEFT SIDE */}
                <div
                    className={cn(
                        "relative flex items-center justify-center px-5 py-6 md:px-10",
                        isSignup ? "md:order-0" : "md:order-1"
                    )}
                >
                    <div className="w-full max-w-sm">
                        <AnimatePresence mode="wait">
                            {isSignup ? (
                                <SignupForm
                                    key="signup"
                                    onSwitch={() => setIsSignup(false)}
                                    signup={signup}
                                    otpSent={otpSent}
                                    loading={loading}
                                    sendOtpForSignUp={sendOtpForSignUp}
                                    signUpFormData={signUpFormData}
                                    handleSignUpFormData={handleSignUpFormData}
                                />
                            ) : (
                                isForgetPasswordFormActive ? (
                                    <ForgetPasswordForm
                                        key="forget"
                                        forgetPassword={forgetPassword}
                                        forgetPasswordOtpSent={forgetPasswordOtpSent}
                                        loading={loading}
                                        sendOtpForForgetPassword={sendOtpForForgetPassword}
                                        forgetPasswordFormData={forgetPasswordFormData}
                                        handleForgetPasswordFormData={handleForgetPasswordFormData}
                                        setIsForgetPasswordFormActive={setIsForgetPasswordFormActive}
                                        setForgetPasswordOtpSent={setForgetPasswordOtpSent}
                                    />
                                ) : (
                                    <LoginForm
                                        key="login"
                                        onSwitch={() => setIsSignup(true)}
                                        login={login}
                                        loginFormData={loginFormData}
                                        handleLoginFormData={handleLoginFormData}
                                        loading={loading}
                                        isForgetPasswordFormActive={isForgetPasswordFormActive}
                                        setIsForgetPasswordFormActive={setIsForgetPasswordFormActive}
                                    />
                                )
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* RIGHT EMPTY SIDE */}
                <div className="hidden md:block" />
            </div>
        </main>
    )
}