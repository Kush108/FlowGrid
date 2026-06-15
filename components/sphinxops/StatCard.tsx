export function StatCard({
  label,
  value,
  sub,
  accent = '#22c55e',
}: {
  label: string;
  value: string | number;
  sub?: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="ops-card p-4 sm:p-5">
      <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider ops-text-muted mb-1.5 sm:mb-2 leading-tight">
        {label}
      </div>
      <div className="text-2xl sm:text-3xl font-bold tabular-nums" style={{ color: accent }}>
        {value}
      </div>
      {sub && <div className="text-[11px] sm:text-xs ops-text-muted mt-1.5 sm:mt-2 leading-snug">{sub}</div>}
    </div>
  );
}
