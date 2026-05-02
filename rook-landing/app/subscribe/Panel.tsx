export function Panel({ title, body }: { title: string; body?: string }) {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {body && <p className="text-[15px] text-muted-foreground">{body}</p>}
    </div>
  );
}
