import type { ChatMessage } from "@/lib/types/contact-finder";

interface ChatMessageListProps {
  messages: ChatMessage[];
}

export default function ChatMessageList({ messages }: ChatMessageListProps) {
  if (messages.length === 0) {
    return (
      <p className="text-[13px] text-white/50">
        &ldquo;결제&rdquo;는 범위가 넓어서, 어떤 이슈인지 알려주시면 더
        정확히 찾아드릴게요.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) =>
        message.role === "user" ? (
          <div key={message.id} className="flex justify-end">
            <div className="max-w-[70%] rounded-[10px] bg-brand px-4 py-2 text-[13px] text-white">
              {message.content}
            </div>
          </div>
        ) : (
          <div
            key={message.id}
            className="rounded-[10px] border border-white/10 bg-[#181b21] p-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-white/40">
              Contact Finder
            </p>
            <p className="mt-2 text-[13px] text-white">{message.content}</p>
            {message.contacts && message.contacts.length > 0 && (
              <ul className="mt-3 flex flex-col gap-2">
                {message.contacts.map((contact) => (
                  <li
                    key={contact.id}
                    className="flex items-center justify-between rounded-[8px] bg-[#20242c] p-3"
                  >
                    <div>
                      <p className="text-[13px] font-bold text-white">
                        {contact.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-white/50">
                        {contact.title}
                      </p>
                      <p className="mt-1 text-[11px] text-white/40">
                        {contact.extension}
                      </p>
                      <div className="mt-1 flex gap-1">
                        {contact.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-[4px] bg-white/5 px-1.5 py-0.5 text-[10px] text-white/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 rounded-[4px] bg-[#f2a33c] px-3 py-1.5 text-[11px] font-bold text-[#1f2428]"
                    >
                      연락하기
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ),
      )}
    </div>
  );
}
