import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  highlighted?: boolean;
}

export default function Card({
  highlighted = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-[10px] border p-5 ${
        highlighted
          ? "border-brand bg-brand text-white"
          : "border-border bg-white text-foreground"
      } ${className}`}
      {...props}
    />
  );
}
