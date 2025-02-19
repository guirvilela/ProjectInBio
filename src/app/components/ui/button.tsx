import { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utilts";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({
  children,
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        "p-3 flex items-center justify-center text-white rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70",
        variant === "primary" && "bg-accent-purple",
        variant === "secondary" && "bg-background-tertiary",
        variant === "ghost" && "border-border-primary",
        rest.className
      )}
    >
      {children}
    </button>
  );
}
