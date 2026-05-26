export default function DirectorSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      <p className="text-white/45 text-sm mb-8">Organization configuration — production will sync with Supabase</p>

      <div className="space-y-4 max-w-xl">
        <div className="ops-card p-5">
          <h2 className="font-semibold mb-2">Mileage policy</h2>
          <p className="text-sm text-white/55 mb-4">
            Company vehicles: track KM for fleet compliance, no reimbursement. Personal vehicles: $0.70/km (Alberta rate
            configurable).
          </p>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" defaultChecked className="rounded" />
            Require odometer photo on punch-out (personal)
          </label>
        </div>
        <div className="ops-card p-5">
          <h2 className="font-semibold mb-2">Visit logs</h2>
          <p className="text-sm text-white/55 mb-4">Staff must submit a visit note before completing a client-site shift.</p>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" defaultChecked className="rounded" />
            Block punch-out until visit log submitted
          </label>
        </div>
        <div className="ops-card p-5">
          <h2 className="font-semibold mb-2">BrightHR migration</h2>
          <p className="text-sm text-white/55">
            Phase 2: import staff roster and historical hours. sphinixOps becomes system of record for field ops; HRIS
            sync optional.
          </p>
        </div>
      </div>
    </div>
  );
}
