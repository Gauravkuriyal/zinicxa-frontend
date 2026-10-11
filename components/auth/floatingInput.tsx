"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function FloatingInput({
    label,
    type,
    rightElement,
    name,
    value,
    onChange
}: {
    label: string
    type: string
    rightElement?: React.ReactNode,
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    const [focused, setFocused] = useState(false)

    return (
        <div className="relative">
            {/* Label */}
            <motion.label
                animate={{
                    y:
                        focused || value ? -20 : 0,
                    scale:
                        focused || value ? 0.85 : 1,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "absolute left-0 top-3 origin-left text-neutral-400 pointer-events-none"
                )}
            >
                {label}
            </motion.label>

            {/* Input */}
            <div className="relative flex items-center border-b border-neutral-200">
                <input
                    type={type}
                    value={value}
                    name={name}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="h-14 w-full bg-transparent pr-10 pt-4 text-sm outline-none"
                />

                {rightElement && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        {rightElement}
                    </div>
                )}

                {/* Animated Line */}
                <motion.div
                    animate={{
                        scaleX: focused ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.3,
                    }}
                    className="absolute bottom-0 left-0 h-[1px] w-full origin-center bg-black"
                />
            </div>
        </div>
    )
}