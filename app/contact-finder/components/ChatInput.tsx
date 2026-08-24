"use client";

import { useState } from "react";

interface ChatInputProps {
  onSubmit: (query: string) => void;
}

export default function ChatInput({ onSubmit }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed) {
      setError(true);
      return;
    }
    setError(false);
    onSubmit(trimmed);
    setValue("");
  }

  return (
    <div>
      <div className="flex items-center gap-2 rounded-[8px] border border-border bg-white px-3 py-2">
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (error) setError(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSubmit();
          }}
          placeholder="담당자를 찾아보세요 (예: OO 시스템 담당자 누구야?)"
          className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="shrink-0 rounded-[4px] bg-brand px-4 py-1.5 text-[12px] font-bold text-white hover:bg-[#006ba8]"
        >
          전송
        </button>
      </div>
      {error && (
        <p className="mt-1 text-[11px] text-red-500">
          질문을 입력한 뒤 전송해 주세요.
        </p>
      )}
    </div>
  );
}
