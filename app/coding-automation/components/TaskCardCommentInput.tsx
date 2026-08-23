"use client";

import { useState } from "react";

interface TaskCardCommentInputProps {
  onSubmit: (content: string) => void;
}

export default function TaskCardCommentInput({
  onSubmit,
}: TaskCardCommentInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue("");
  }

  return (
    <div className="flex items-center gap-2 rounded-[4px] border border-border bg-white px-3 py-2">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleSubmit();
        }}
        placeholder="댓글로 지시를 추가해보세요 (예: 테스트 케이스도 같이 추가해줘)"
        className="flex-1 bg-transparent text-[12px] text-foreground placeholder:text-[#c9c9c9] focus:outline-none"
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={value.trim().length === 0}
        className="shrink-0 rounded-[4px] bg-[#e5e5e5] px-3 py-1.5 text-[11px] font-bold text-foreground disabled:opacity-40"
      >
        추가
      </button>
    </div>
  );
}
