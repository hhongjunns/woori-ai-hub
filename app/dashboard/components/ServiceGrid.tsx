import Image from "next/image";
import Link from "next/link";
import type { AIService } from "@/lib/types/ai-service";

const CARD_ICON: Record<AIService["category"], string> = {
  "coding-automation": "/icons/card-coding-automation.svg",
  "contact-finder": "/icons/card-contact-finder.svg",
  "work-assistant": "/icons/card-work-assistant.svg",
  monitoring: "/icons/card-monitoring.svg",
};

interface ServiceGridProps {
  services: AIService[];
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {services.map((service) => (
        <Link
          key={service.id}
          href={service.href}
          className={`flex h-[177px] flex-col gap-4 rounded-[10px] border p-5 transition-colors ${
            service.isFrequentlyUsed
              ? "border-brand bg-brand text-white"
              : "border-border bg-white text-foreground hover:border-brand"
          }`}
        >
          <Image
            src={CARD_ICON[service.category]}
            alt=""
            width={24}
            height={24}
            className={service.isFrequentlyUsed ? "invert" : ""}
          />
          <span className="text-[14px] font-bold tracking-[-0.35px]">
            {service.name}
          </span>
          <span
            className={`text-[14px] ${
              service.isFrequentlyUsed ? "text-white/90" : "text-muted-foreground"
            }`}
          >
            {service.description}
          </span>
        </Link>
      ))}
    </div>
  );
}
