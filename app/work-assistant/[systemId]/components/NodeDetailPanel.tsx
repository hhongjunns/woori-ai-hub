interface SummaryField {
  label: string;
  value: string;
}

interface TaggedRow {
  label: string;
  tag: string;
}

interface NodeDetailPanelProps {
  badgeLabel: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description?: string;
  summaryFields?: SummaryField[];
  tasks?: TaggedRow[];
  documents?: TaggedRow[];
  fields?: Record<string, string> | null;
  chatIntro: string;
}

function TaggedRowList({ rows }: { rows: TaggedRow[] }) {
  return (
    <ul className="mt-2 flex flex-col gap-2">
      {rows.map((row) => (
        <li
          key={row.label}
          className="flex items-center justify-between gap-2 rounded-[10px] border border-border px-3 py-2"
        >
          <span className="text-[12px] font-bold text-foreground">
            {row.label}
          </span>
          <span className="shrink-0 text-[12px] text-muted-foreground">
            {row.tag}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function NodeDetailPanel({
  badgeLabel,
  badgeColor,
  title,
  subtitle,
  description,
  summaryFields,
  tasks,
  documents,
  fields,
  chatIntro,
}: NodeDetailPanelProps) {
  return (
    <aside className="flex w-[350px] shrink-0 flex-col gap-4 overflow-y-auto rounded-[10px] border border-border bg-white p-4">
      <div>
        <span
          className="inline-block rounded-[4px] px-2 py-1 text-[10px] font-bold text-white"
          style={{ background: badgeColor }}
        >
          {badgeLabel}
        </span>
        <p className="mt-2 text-[14px] font-bold text-foreground">{title}</p>
        <p className="mt-1 text-[10px] tracking-[-0.5px] text-muted-foreground">
          {subtitle}
        </p>
        {description && (
          <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {summaryFields && summaryFields.length > 0 && (
        <dl className="rounded-[10px] border border-border px-3 py-1">
          {summaryFields.map((field, index) => (
            <div
              key={field.label}
              className={`flex items-center justify-between py-2 ${
                index === summaryFields.length - 1
                  ? ""
                  : "border-b border-border"
              }`}
            >
              <dt className="text-[12px] text-muted-foreground">
                {field.label}
              </dt>
              <dd className="text-[12px] font-bold text-foreground">
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {fields && (
        <dl className="rounded-[10px] border border-border px-3 py-1">
          {Object.entries(fields).map(([key, value], index, arr) => (
            <div
              key={key}
              className={`flex items-center justify-between gap-3 py-2 ${
                index === arr.length - 1 ? "" : "border-b border-border"
              }`}
            >
              <dt className="text-[12px] text-muted-foreground">{key}</dt>
              <dd className="text-right text-[12px] font-bold text-foreground">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {tasks && tasks.length > 0 && (
        <div>
          <p className="text-[10px] font-bold text-muted-foreground">
            중요 업무 정보
          </p>
          <TaggedRowList rows={tasks} />
        </div>
      )}

      {documents && documents.length > 0 && (
        <div>
          <p className="text-[10px] font-bold text-muted-foreground">
            연결된 문서
          </p>
          <TaggedRowList rows={documents} />
        </div>
      )}

      <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
        <div className="self-end rounded-tl-[14px] rounded-tr-[14px] rounded-bl-[14px] rounded-br-[4px] bg-brand px-3 py-2 text-[12px] text-white">
          이 솔루션이 뭐야?
        </div>
        <div className="rounded-tl-[14px] rounded-tr-[14px] rounded-br-[14px] rounded-bl-[4px] border border-border p-3 text-[12px] text-foreground">
          {chatIntro}
        </div>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            disabled
            placeholder="이 업무에 대해 물어보세요"
            className="h-[40px] flex-1 rounded-[4px] border border-border px-3 text-[12px] text-foreground placeholder:text-border disabled:bg-white"
          />
          <button
            type="button"
            disabled
            className="h-[40px] shrink-0 rounded-[4px] bg-brand px-4 text-[12px] font-bold text-white disabled:opacity-60"
          >
            전송
          </button>
        </div>
      </div>
    </aside>
  );
}
