import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-[49px] shrink-0 items-center border-b border-border bg-white px-4">
      <Link href="/dashboard" className="flex cursor-pointer items-center">
        <Image src="/icons/logo.png" alt="" width={30} height={30} className="rounded-full" />
        <span className="ml-2 text-[16px] font-bold text-brand">Woori AI Hub</span>
      </Link>
    </header>
  );
}
