import type { Metadata } from "next";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Woori AI Hub",
  description: "사내 임직원을 위한 AI 업무지원 플랫폼",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex h-full min-h-screen flex-col bg-white">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
