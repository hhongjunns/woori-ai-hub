"use client";

import { useState } from "react";
import { getContactFinderMockResponse } from "@/lib/services/contact-finder";
import type { ChatMessage } from "@/lib/types/contact-finder";
import ContactFinderSidebar from "./ContactFinderSidebar";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";

interface ContactFinderClientProps {
  frequentlyFoundOrgs: string[];
  recentSearches: string[];
}

export default function ContactFinderClient({
  frequentlyFoundOrgs,
  recentSearches,
}: ContactFinderClientProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  async function handleSubmit(query: string) {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      content: query,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    const response = await getContactFinderMockResponse(query);
    setMessages((prev) => [...prev, response]);
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-49px)] flex-col p-8">
      <h1 className="text-[14px] font-bold text-brand">담당자 찾기</h1>
      <p className="mt-1 text-[14px] text-foreground">
        질문을 입력하면 관련 담당자를 찾아드려요.
      </p>
      <div className="mt-6 flex flex-1 gap-6">
        <ContactFinderSidebar
          frequentlyFoundOrgs={frequentlyFoundOrgs}
          recentSearches={recentSearches}
        />
        <div className="flex min-w-0 flex-1 flex-col border-l border-border pl-6">
          <div className="flex-1 overflow-y-auto">
            <ChatMessageList messages={messages} onQuickReply={handleSubmit} />
          </div>
          <div className="mt-4">
            <ChatInput onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
