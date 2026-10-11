"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    ArrowRight,
    Eye,
    EyeOff,
    Loader,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import FloatingInput from "./floatingInput"


export default function ForgetPasswordForm({
    forgetPassword,
    forgetPasswordOtpSent,
    loading,
    sendOtpForForgetPassword,
    forgetPasswordFormData,
    handleForgetPasswordFormData,
    setIsForgetPasswordFormActive,
    setForgetPasswordOtpSent
}: {
    loading: boolean,
    forgetPassword: (e: React.SubmitEvent) => void,
    forgetPasswordOtpSent: boolean,
    sendOtpForForgetPassword: () => void,
    forgetPasswordFormData: {
        email: string,
        newPassword: string,
        otp: string
    },
    handleForgetPasswordFormData: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setIsForgetPasswordFormActive: (active: boolean) => void;
    setForgetPasswordOtpSent: (active: boolean) => void;

}) {
    const [showPassword, setShowPassword] =
        useState(false)

    return (
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
                    Forget Password
                </p>
            </div>

            <form className="mt-5 space-y-6" onSubmit={forgetPassword}>
                {forgetPasswordOtpSent ?
                    <>
                        <FloatingInput
                            label="OTP"
                            type="number"
                            name="otp"
                            value={forgetPasswordFormData.otp}
                            onChange={handleForgetPasswordFormData}
                        />

                        <div>
                            <FloatingInput
                                label="Create New Password"
                                type={showPassword ? "text" : "password"}
                                value={forgetPasswordFormData.newPassword}
                                name="newPassword"
                                onChange={handleForgetPasswordFormData}
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

                        </div>
                        {/* CTA */}

                        {loading ?
                            <Button type="button" className="group mt-4 w-full rounded-full bg-green-800 text-xs py-2 uppercase tracking-[0.2em] text-white transition-all hover:bg-green-800/90">
                                Fetching your account

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
                            label="Email Address"
                            type="email"
                            name="email"
                            value={forgetPasswordFormData.email}
                            onChange={handleForgetPasswordFormData}
                        />

                        {/* CTA */}

                        {loading ?
                            <Button type="button" className="group mt-4 w-full rounded-full bg-green-800 text-xs py-2 uppercase tracking-[0.2em] text-white transition-all hover:bg-green-800/90">
                                Sending OTP

                                <Loader className="ml-2 h-4 w-4 animate-spin" />
                            </Button>
                            :
                            <Button type="button" className="group mt-4 w-full rounded-full bg-black text-xs py-2 uppercase tracking-[0.2em] text-white transition-all hover:bg-black/90" onClick={sendOtpForForgetPassword}>
                                Send OTP

                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        }
                    </>

                }
            </form>
            {/* Switch */}
            <p className="mt-10 text-sm text-neutral-500">
                Remember your password?{" "}
                <button
                    onClick={()=>{
                        setForgetPasswordOtpSent(false);
                        setIsForgetPasswordFormActive(false)
                    }}
                    className="text-black underline underline-offset-4 transition hover:opacity-70"
                >
                    Sign In.
                </button>
            </p>
        </motion.div>
    )
}