'use client';

import { useEffect, useMemo, useState } from 'react';
import SystemTile, { type SystemTileData } from './SystemTile';
import IntakeModal from './IntakeModal';

const systems: SystemTileData[] = [
  {
    id: 'fieldtrack',
    title: 'FieldTrack',
    description: 'Time, mileage, jobs, live status — payroll-ready exports.',
    status: 'live-demo',
    href: 'https://fieldtrack-demo.netlify.app/',
    icon: '📍',
    highlights: ['One-tap punch in/out', 'Per-job mileage logs', 'Manager dashboard + exports'],
  },
  {
    id: 'bookingflow',
    title: 'BookingFlow',
    description: 'Booking + payments + reminders for service businesses.',
    status: 'available',
    icon: '📅',
    highlights: ['Stripe payments', 'SMS/email reminders', 'No-app install (PWA-ready)'],
  },
  {
    id: 'opmdash',
    title: 'OpsDash',
    description: 'Dashboards that make weekly operations obvious.',
    status: 'available',
    icon: '📈',
    highlights: ['KPI snapshots', 'Scheduled reports', 'Role-based access'],
  },
  {
    id: 'staffhub',
    title: 'StaffHub',
    description: 'Scheduling + shifts + approvals without spreadsheet chaos.',
    status: 'build',
    icon: '🧑‍🏭',
    highlights: ['Shift scheduling', 'Time edits with audit trail', 'Team notifications'],
  },
  {
    id: 'clientportal',
    title: 'ClientPortal',
    description: 'Invoices, approvals, documents — one clean place.',
    status: 'build',
    icon: '🧾',
    highlights: ['Invoice + status', 'File uploads', 'Approvals + notes'],
  },
];

export default function SystemsGrid() {
  const [selected, setSelected] = useState<SystemTileData | null>(null);
  const [open, setOpen] = useState(false);

  const selectedName = useMemo(() => selected?.title ?? '', [selected]);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ source?: string }>;
      setSelected((prev) => prev ?? systems[0]);
      setOpen(true);
      void ce;
    };
    window.addEventListener('flowgrid:intake-open', handler);
    return () => window.removeEventListener('flowgrid:intake-open', handler);
  }, []);

  const request = (system: SystemTileData) => {
    setSelected(system);
    setOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8">
        {systems.map((s) => (
          <SystemTile key={s.id} data={s} onRequest={request} />
        ))}
      </div>

      <IntakeModal
        isOpen={open}
        onClose={() => setOpen(false)}
        systemName={selectedName}
      />
    </>
  );
}

