interface NodeDetailPanelProps {
  title: string | null;
  fields: Record<string, string> | null;
}

export default function NodeDetailPanel({
  title,
  fields,
}: NodeDetailPanelProps) {
  return (
    <aside className="flex w-[300px] shrink-0 flex-col rounded-[10px] border border-border bg-white p-4">
      <h2 className="text-[14px] font-bold text-foreground">상세 정보</h2>
      <div className="mt-3 flex-1">
        {title && fields ? (
          <>
            <p className="text-[14px] font-bold text-brand">{title}</p>
            <dl className="mt-3 space-y-2">
              {Object.entries(fields).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-[12px] text-muted-foreground">{key}</dt>
                  <dd className="text-[14px] text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </>
        ) : (
          <p className="text-[12px] text-muted-foreground">
            지식그래프의 노드 또는 좌측 목록에서 항목을 선택하면 상세 정보가
            여기에 표시됩니다.
          </p>
        )}
      </div>
      <div className="mt-4 rounded-[4px] border border-dashed border-border p-3 text-[12px] text-muted-foreground">
        AI Chat은 다음 단계에서 이 영역에 연결될 예정입니다.
      </div>
    </aside>
  );
}
