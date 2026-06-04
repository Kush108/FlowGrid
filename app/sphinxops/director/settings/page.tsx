import { APP_NAME } from '@/lib/sphinxops/constants';

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
          <h2 className="font-semibold mb-2">Platform integrations</h2>
          <p className="text-sm ops-text-muted mb-3">
            {APP_NAME} replaces limited BrightHR workflows with fleet, CRM, payroll sync, and visit logging — while
            optional HRIS import keeps historical rosters.
          </p>
          <ul className="text-sm text-white/55 space-y-1.5 list-disc list-inside">
            <li>BrightHR / roster CSV import (phase 2)</li>
            <li>Payroll export — approved hours + mileage</li>
            <li>Fleet telematics webhook (optional)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
