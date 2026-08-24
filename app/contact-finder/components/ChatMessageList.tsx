import type { ChatMessage } from "@/lib/types/contact-finder";

interface ChatMessageListProps {
  messages: ChatMessage[];
  onQuickReply: (reply: string) => void;
}

const AVATAR_COLORS = ["bg-brand", "bg-foreground"];

export default function ChatMessageList({
  messages,
  onQuickReply,
}: ChatMessageListProps) {
  if (messages.length === 0) {
    return (
      <p className="text-[13px] text-muted-foreground">
        담당자를 자연어로 물어보세요. 예:{" "}
        <span className="text-foreground">
          &ldquo;결제 관련 이슈 담당자 찾아줘&rdquo;
        </span>
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message, index) => {
        const isLastMessage = index === messages.length - 1;

        if (message.role === "user") {
          return (
            <div key={message.id} className="flex justify-end">
              <div className="max-w-[70%] rounded-tl-[14px] rounded-tr-[14px] rounded-bl-[14px] rounded-br-[4px] bg-brand px-4 py-2.5 text-[13px] text-white">
                {message.content}
              </div>
            </div>
          );
        }

        return (
          <div
            key={message.id}
            className="rounded-tl-[14px] rounded-tr-[14px] rounded-br-[14px] rounded-bl-[4px] border border-border bg-white p-4"
          >
            <p className="text-[11px] font-bold uppercase tracking-[-0.5px] text-brand">
              Contact Finder
            </p>
            <p className="mt-2 text-[12px] text-foreground">
              {message.content}
            </p>

            {isLastMessage && message.quickReplies && message.quickReplies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {message.quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => onQuickReply(reply)}
                    className="rounded-[4px] bg-border px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-[#d8d8d8]"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {message.contacts && message.contacts.length > 0 && (
              <ul className="mt-3 flex flex-col gap-3">
                {message.contacts.map((contact, contactIndex) => (
                  <li
                    key={contact.id}
                    className="flex items-start justify-between gap-3 rounded-[10px] border border-border p-3"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex size-[26px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${AVATAR_COLORS[contactIndex % AVATAR_COLORS.length]}`}
                      >
                        {contact.name.charAt(0)}
                      </span>
                      <div>
                        <p className="text-[12px] font-bold text-foreground">
                          {contact.name}
                        </p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          {contact.title}
                        </p>
                        <p className="text-[10px] font-bold text-muted-foreground">
                          {contact.extension}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {contact.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-[4px] bg-border px-1.5 py-0.5 text-[9px] text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 rounded-[4px] bg-foreground px-3 py-1.5 text-[10px] font-bold text-white"
                    >
                      연락하기
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
