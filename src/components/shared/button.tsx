import type React from "react";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "neon" | "ghost"
  size?: "sm" | "md" | "lg" | "xl"
  isLoading?: boolean
  glowEffect?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      glowEffect = true,
      className = "",
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "font-black tracking-wider transition-all duration-200 transform border-4 relative overflow-hidden"

    const variants = {
      primary:
        "bg-gradient-to-r from-pink-500 to-cyan-400 text-black border-white hover:from-pink-600 hover:to-cyan-500",
      secondary: "bg-black text-white border-gray-600 hover:border-cyan-400 hover:text-cyan-400",
      danger: "bg-red-600 text-white border-red-400 hover:bg-red-500",
      success:
        "bg-gradient-to-r from-green-500 to-cyan-400 text-black border-white hover:from-green-600 hover:to-cyan-500",
      warning:
        "bg-gradient-to-r from-yellow-500 to-orange-400 text-black border-white hover:from-yellow-600 hover:to-orange-500",
      neon: "bg-black text-cyan-400 border-cyan-400 hover:text-pink-400 hover:border-pink-400",
      ghost: "bg-transparent p-0 w-fit"
    }

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-lg",
      lg: "px-8 py-4 text-xl",
      xl: "px-12 py-6 text-3xl",
    }

    const glowEffects = {
      primary: glowEffect ? "shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)]" : "",
      secondary: glowEffect ? "hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]" : "",
      danger: glowEffect ? "shadow-[0_0_20px_rgba(239,68,68,0.6)] hover:shadow-[0_0_30px_rgba(239,68,68,0.8)]" : "",
      success: glowEffect ? "shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)]" : "",
      warning: glowEffect ? "shadow-[0_0_30px_rgba(250,204,21,0.6)] hover:shadow-[0_0_40px_rgba(251,146,60,0.8)]" : "",
      neon: glowEffect ? "shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]" : "",
      ghost: ""
    }

    const hoverEffects = "hover:scale-105 active:scale-95"
    const disabledClasses = "disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"

    return (
      <button
        ref={ref}
        className={`
          ${baseClasses}
          ${variants[variant]}
          ${sizes[size]}
          ${glowEffects[variant]}
          ${hoverEffects}
          ${disabledClasses}
          ${className}
        `}
        disabled={disabled || isLoading}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></div>

        <div className="relative flex items-center justify-center space-x-2">
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : (
            children
          )}
        </div>
      </button>
    )
  },
)

Button.displayName = "Button";

export default Button;
