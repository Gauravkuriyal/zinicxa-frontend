"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import FloatingInput from "./floatingInput";

export default function LoginForm({
    onSwitch,
    login,
    loginFormData,
    handleLoginFormData,
    isForgetPasswordFormActive,
    setIsForgetPasswordFormActive,
    loading,
}: {
    onSwitch: () => void;
    login: (e: React.SubmitEvent) => void;
    loginFormData: {
        email: string;
        password: string;
    };
    handleLoginFormData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isForgetPasswordFormActive: boolean;
    setIsForgetPasswordFormActive: (active: boolean) => void;
    loading: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);

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
                <p className="text-xs uppercase tracking-[0.3em] ">Welcome Back</p>

                <p className="mt-2 text-sm leading-7 text-neutral-500">
                    Enter your details to access your custom profile.
                </p>
            </div>

            {/* Social */}
            {/* <div className="mt-10 flex gap-3">
        <button className="flex h-12 flex-1 items-center justify-center rounded-2xl border border-neutral-200 bg-white transition hover:border-neutral-400">
          <Apple className="h-5 w-5" />
        </button>

        <button className="flex h-12 flex-1 items-center justify-center rounded-2xl border border-neutral-200 bg-white transition hover:border-neutral-400">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M21.35 11.1h-9.18v2.92h5.27c-.23 1.48-1.74 4.35-5.27 4.35a5.88 5.88 0 1 1 0-11.76c2.01 0 3.35.85 4.12 1.58l2.8-2.71C17.3 3.84 14.97 3 12.17 3A9 9 0 1 0 12 21c5.19 0 8.64-3.64 8.64-8.77c0-.59-.06-1.04-.14-1.43"
            />
          </svg>
        </button>
      </div> */}

            {/* Divider */}
            <div className="my-10 flex items-center gap-4">
                <div className="h-px flex-1 bg-neutral-200" />

                <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                    Continue with Email
                </span>

                <div className="h-px flex-1 bg-neutral-200" />
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={login}>
                <FloatingInput
                    label="Email Address"
                    type="email"
                    name="email"
                    value={loginFormData.email}
                    onChange={handleLoginFormData}
                />

                <FloatingInput
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={loginFormData.password}
                    onChange={handleLoginFormData}
                    name="password"
                    rightElement={
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
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

                <div className="text-right">
                    <span className="text-xs cursor-pointer hover:underline" onClick={()=>setIsForgetPasswordFormActive(true)} >Forget Password?</span>
                </div>

                {/* CTA */}
                {loading ? (
                    <Button
                        type="button"
                        className="group mt-4 w-full rounded-full bg-green-800 text-xs py-2 uppercase tracking-[0.2em] text-white transition-all hover:bg-green-800/90"
                    >
                        Logging you in
                        <Loader className="ml-2 h-4 w-4 animate-spin" />
                    </Button>
                ) : (
                    <Button className="group mt-4 w-full rounded-full bg-black text-xs py-2 uppercase tracking-[0.2em] text-white transition-all hover:bg-black/90">
                        Continue To Profile
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                )}
            </form>

            {/* Switch */}
            <p className="mt-10 text-sm text-neutral-500">
                New to the collective?{" "}
                <button
                    onClick={onSwitch}
                    className="text-black underline underline-offset-4 transition hover:opacity-70"
                >
                    Create an account.
                </button>
            </p>
        </motion.div>
    );
}
