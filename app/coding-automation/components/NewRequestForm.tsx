"use client";

import { useState } from "react";
import Button from "@/components/common/Button";

interface NewRequestFormProps {
  disabled: boolean;
  onConvert: (requestText: string) => void;
}

export default function NewRequestForm({
  disabled,
  onConvert,
}: NewRequestFormProps) {
  const [requestText, setRequestText] = useState("");

  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-muted-foreground">
        새 작업 요청
      </p>
      <div className="mt-2 flex gap-2">
        <input
          value={requestText}
          onChange={(event) => setRequestText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !disabled && requestText.trim()) {
              onConvert(requestText.trim());
            }
          }}
          disabled={disabled}
          placeholder="한 줄로 요청해 보세요. (예: 결제 요청이 실패했을 때 자동 재시도되도록 해줘)"
          className="h-10 flex-1 rounded-[4px] border border-border px-3 text-[13px] text-foreground placeholder:text-[#c9c9c9] focus:border-brand focus:outline-none disabled:bg-[#f5f5f5]"
        />
        <Button
          type="button"
          disabled={disabled || requestText.trim().length === 0}
          onClick={() => onConvert(requestText.trim())}
          className="h-10 shrink-0"
        >
          카드로 변환
        </Button>
      </div>
    </div>
  );
}
