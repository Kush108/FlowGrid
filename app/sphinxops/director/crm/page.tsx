import { ModuleHubPage } from '@/components/sphinxops/ModuleHubPage';
import { OPS_BASE } from '@/lib/sphinxops/constants';

export default function DirectorCrmPage() {
  return (
    <ModuleHubPage
      title="Client & program CRM"
      description="A trauma-informed CRM aligned with Sphinx Healing’s full-circle care model — from Group Care and Family Living through PDD and Transition to Adulthood."
      highlights={[
        'Program pipelines: Group Care, Family Living, PDD, TAP',
        'Household and guardian contacts with cultural-awareness notes',
        'Care plan milestones and seamless transition tracking',
        'Staff visit history linked to client records',
        'Referral and intake queue for directors and HR',
      ]}
      relatedHref={`${OPS_BASE}/director/sites`}
      relatedLabel="View sites & programs"
    />
  );
}
