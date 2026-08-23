"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "홈",
    icon: "/icons/nav-home.svg",
    activeIcon: "/icons/nav-home-active.svg",
  },
  {
    href: "/coding-automation",
    label: "코딩 자동화",
    icon: "/icons/nav-coding-automation.svg",
    activeIcon: "/icons/nav-coding-automation-active.svg",
  },
  {
    href: "/contact-finder",
    label: "담당자 찾기",
    icon: "/icons/nav-contact-finder.svg",
    activeIcon: "/icons/nav-contact-finder-active.svg",
  },
  {
    href: "/work-assistant",
    label: "업무 도우미",
    icon: "/icons/nav-work-assistant.svg",
    activeIcon: "/icons/nav-work-assistant-active.svg",
  },
  {
    href: "/monitoring",
    label: "모니터링",
    icon: "/icons/nav-monitoring.svg",
    activeIcon: "/icons/nav-monitoring-active.svg",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex w-[150px] shrink-0 flex-col gap-8 border-r border-border bg-white pt-8">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-6 text-[14px] font-bold tracking-[-0.35px] ${
              isActive ? "text-brand" : "text-foreground"
            }`}
          >
            <Image
              src={isActive ? item.activeIcon : item.icon}
              alt=""
              width={16}
              height={16}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
