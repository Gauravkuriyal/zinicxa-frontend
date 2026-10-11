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


export default function SignupForm({
    onSwitch,
    loading,
    signup,
    otpSent,
    sendOtpForSignUp,
    signUpFormData,
    handleSignUpFormData
}: {
    onSwitch: () => void,
    loading: boolean,
    signup: (e: React.SubmitEvent) => void,
    otpSent: boolean,
    sendOtpForSignUp: () => void,
    signUpFormData: {
        fullName: string,
        email: string,
        password: string,
        otp: string,
        mobile: string
    },
    handleSignUpFormData: (e: React.ChangeEvent<HTMLInputElement>) => void,

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
                    Begin Your Journey
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
                <button
                    onClick={onSwitch}
                    className="text-black underline underline-offset-4 transition hover:opacity-70"
                >
                    Sign In.
                </button>
            </p>
        </motion.div>
    )
}