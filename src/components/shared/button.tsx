import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'danger'
  | 'glass'
  | 'outline'
  | 'white';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-accent-lime text-white hover:from-accent-pink hover:to-primary',
  secondary:
    'bg-gray-200 text-gray-900 hover:bg-gray-300',
  accent:
    'bg-accent-pink text-white hover:bg-accent-yellow',
  success:
    'bg-green-500 text-white hover:bg-green-600',
  danger:
    'bg-red-500 text-white hover:bg-red-600',
  white:
    'bg-white text-primary hover:bg-primary hover:text-white',
  glass:
    'bg-white/20 text-primary shadow-glass hover:bg-white/30',
  outline:
    'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'white',
  className = '',
  children,
  loading = false,
  ...props
}) => {
  return (
    <button
      className={`rounded-md text-xs cursor-pointer font-bold px-6 h-10 flex items-center justify-center gap-2 py-3 transition-all duration-200 focus:outline-none focus:ring-none disabled:opacity-50 disabled:cursor-not-allowed ${
        variantClasses[variant]
      } ${className}`}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
    </button>
  );
};

export default Button;
