import { ModuleHubPage } from '@/components/summitflow/ModuleHubPage';
import { OPS_BASE } from '@/lib/summitflow/constants';

export default function DirectorFleetPage() {
  return (
    <ModuleHubPage
      title="Fleet management"
      description="Track company vehicles across Edmonton and Leduc sites, maintenance schedules, and personal-vehicle reimbursement — integrated with mileage approvals."
      highlights={[
        'Fleet roster with site assignment and odometer history',
        'Company vehicle KM for compliance — no duplicate reimbursement',
        'Personal vehicle claims at configurable Alberta rates',
        'Maintenance and insurance renewal reminders',
        'Export for finance and seasonal surge reports',
      ]}
      relatedHref={`${OPS_BASE}/director/mileage`}
      relatedLabel="Open mileage approvals"
    />
  );
}
