import type { InputHTMLAttributes } from "react";

export default function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`h-[40px] w-full rounded-[4px] border border-border px-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none ${className}`}
      {...props}
    />
  );
}
