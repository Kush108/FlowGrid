import { ModuleHubPage } from '@/components/summitflow/ModuleHubPage';
import { OPS_BASE } from '@/lib/summitflow/constants';

export default function DirectorCrmPage() {
  return (
    <ModuleHubPage
      title="Customer & job CRM"
      description="Track installs, repairs, maintenance plans, and warranty callbacks — customer history, equipment records, and service agreements in one place."
      highlights={[
        'Job pipelines: furnace install, AC service, emergency repair, maintenance plans',
        'Customer contacts with property and equipment notes',
        'Warranty and callback tracking with SLA alerts',
        'Technician job history linked to customer records',
        'Referral and new-install intake queue for dispatch',
      ]}
      relatedHref={`${OPS_BASE}/director/sites`}
      relatedLabel="View service zones"
    />
  );
}
