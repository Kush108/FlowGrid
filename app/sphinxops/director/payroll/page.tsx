import { ModuleHubPage } from '@/components/sphinxops/ModuleHubPage';
import { OPS_BASE } from '@/lib/sphinxops/constants';

export default function DirectorPayrollPage() {
  return (
    <ModuleHubPage
      title="Auto payroll sync"
      description="Approved shifts, leave, and mileage flow into payroll-ready exports — replacing manual BrightHR workarounds and spreadsheet re-entry."
      highlights={[
        'Weekly payroll preview from approved time entries',
        'Mileage reimbursement lines auto-calculated by vehicle type',
        'Program and site cost-centre coding for funders',
        'One-click export (CSV / integration hooks in production)',
        'Audit trail for director and HR sign-off',
      ]}
      relatedHref={`${OPS_BASE}/director/reports`}
      relatedLabel="Open reports & exports"
    />
  );
}
