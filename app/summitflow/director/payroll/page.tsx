import { ModuleHubPage } from '@/components/summitflow/ModuleHubPage';
import { OPS_BASE } from '@/lib/summitflow/constants';

export default function DirectorPayrollPage() {
  return (
    <ModuleHubPage
      title="Auto payroll sync"
      description="Approved shifts, leave, and mileage flow into payroll-ready exports — no more re-keying from whiteboards, spreadsheets, or three different apps."
      highlights={[
        'Weekly payroll preview from approved time entries',
        'Mileage reimbursement lines auto-calculated by vehicle type',
        'Zone and job-type cost-centre coding for accounting',
        'One-click export (CSV / integration hooks in production)',
        'Audit trail for director and HR sign-off',
      ]}
      relatedHref={`${OPS_BASE}/director/reports`}
      relatedLabel="Open reports & exports"
    />
  );
}
