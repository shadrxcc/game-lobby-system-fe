import { Input as InputComponent } from "@/components/ui/input";
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  errorMessage,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block mb-1 font-medium text-white text-sm">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <InputComponent
          className={`w-full rounded-md px-4 py-4 h-10 text-white placeholder:text-white/50 border transition-all duration-200 focus:ring-0 focus:border-primary/60 outline-none ${
            error ? 'border-red-500' : 'border-white'
          } ${className}`}
          {...props}
        />
      </div>
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
