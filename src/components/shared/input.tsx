"use client"

import type React from "react"
import { forwardRef } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "terminal" | "neon" | "danger" | "success"
  label?: string
  error?: boolean
  errorMessage?: string
  glowEffect?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", label, error, errorMessage, glowEffect = true, className = "", ...props }, ref) => {
    const baseClasses = "w-full font-mono text-xl p-4 border-2 transition-all duration-300 focus:outline-none"

    const variants = {
      default: "bg-black text-white border-gray-600 focus:border-cyan-400 focus:text-cyan-400 placeholder-gray-500",
      terminal:
        "bg-black text-green-400 border-green-400 focus:border-cyan-400 focus:text-cyan-400 placeholder-green-600",
      neon: "bg-black text-cyan-400 border-cyan-400 focus:border-pink-400 focus:text-pink-400 placeholder-cyan-600",
      danger: "bg-black text-red-400 border-red-400 focus:border-red-300 placeholder-red-600",
      success: "bg-black text-green-400 border-green-400 focus:border-green-300 placeholder-green-600",
    }

    const glowEffects = {
      default: glowEffect ? "focus:shadow-[0_0_20px_rgba(34,211,238,0.3)]" : "",
      terminal: glowEffect ? "focus:shadow-[0_0_20px_rgba(34,211,238,0.3)]" : "",
      neon: glowEffect ? "focus:shadow-[0_0_20px_rgba(236,72,153,0.4)]" : "",
      danger: glowEffect ? "focus:shadow-[0_0_20px_rgba(239,68,68,0.4)]" : "",
      success: glowEffect ? "focus:shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "",
    }

    const errorClasses = error ? "border-red-400 text-red-400" : ""

    return (
      <div className="space-y-2">
        {label && (
          <label
            className={`block font-mono text-sm tracking-wider ${
              variant === "terminal"
                ? "text-green-400"
                : variant === "neon"
                  ? "text-cyan-400"
                  : variant === "danger"
                    ? "text-red-400"
                    : variant === "success"
                      ? "text-green-400"
                      : "text-white"
            }`}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            ${baseClasses}
            ${variants[variant]}
            ${glowEffects[variant]}
            ${errorClasses}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-red-400 font-mono text-sm tracking-wider animate-pulse">⚠ {errorMessage}</p>}
      </div>
    )
  },
)

Input.displayName = "Input"

export default Input
