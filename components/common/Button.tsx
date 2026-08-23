import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-[#006ba8] disabled:bg-border disabled:text-muted-foreground",
  secondary:
    "bg-[#e5e5e5] text-foreground hover:bg-[#d8d8d8] disabled:opacity-50",
  ghost:
    "border border-border bg-white text-foreground hover:bg-[#f5f5f5] disabled:opacity-50",
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-[4px] px-4 py-2 text-[12px] font-bold tracking-[-0.6px] transition-colors disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
