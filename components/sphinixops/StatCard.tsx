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
    <div className="ops-card p-5">
      <div className="text-xs font-medium uppercase tracking-wider text-white/45 mb-2">{label}</div>
      <div className="text-3xl font-bold tabular-nums" style={{ color: accent }}>
        {value}
      </div>
      {sub && <div className="text-xs text-white/45 mt-2">{sub}</div>}
    </div>
  );
}
