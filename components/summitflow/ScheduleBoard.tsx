'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, CalendarDays, Users, Sparkles, Loader2 } from 'lucide-react';
import { MOCK_PROFILES, MOCK_SITES } from '@/lib/summitflow/mock-data';
import { OPS_BASE, PROGRAMS, SITE_COLORS, type SiteCode } from '@/lib/summitflow/constants';
import { formatDateShort, formatTimeShort, isOpenShift } from '@/lib/summitflow/shift-utils';
import type { AssignmentType, Profile, Shift } from '@/lib/summitflow/types';

type FilterTab = 'all' | 'assigned' | 'open';
type ModalMode = 'assign' | 'open';

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' });
}

export function ScheduleBoard({ profile }: { profile: Profile }) {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<FilterTab>('all');
  const [modal, setModal] = useState<{ mode: ModalMode; edit?: Shift } | null>(null);
  const [toast, setToast] = useState('');
  const [saving, setSaving] = useState(false);

  const employees = useMemo(() => {
    const all = MOCK_PROFILES.filter((p) => p.role === 'employee');
    if (profile.role === 'manager' && profile.siteId) {
      return all.filter((e) => e.siteId === profile.siteId);
    }
    return all;
  }, [profile]);

  const sites = useMemo(() => {
    if (profile.role === 'manager' && profile.siteId) {
      return MOCK_SITES.filter((s) => s.id === profile.siteId);
    }
    return MOCK_SITES;
  }, [profile]);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  }, []);

  const loadShifts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${OPS_BASE}/api/shifts`);
      if (res.ok) setShifts(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadShifts();
  }, [loadShifts]);

  const filtered = useMemo(() => {
    if (tab === 'open') return shifts.filter(isOpenShift);
    if (tab === 'assigned') return shifts.filter((s) => s.assignmentType === 'assigned' && s.employeeId);
    return shifts;
  }, [shifts, tab]);

  const stats = useMemo(
    () => ({
      total: shifts.length,
      open: shifts.filter(isOpenShift).length,
      assigned: shifts.filter((s) => s.assignmentType === 'assigned').length,
    }),
    [shifts],
  );

  function openCreate(mode: ModalMode) {
    setModal({ mode });
  }

  function openEdit(s: Shift) {
    setModal({ mode: isOpenShift(s) ? 'open' : 'assign', edit: s });
  }

  async function deleteShift(id: string) {
    setSaving(true);
    try {
      const res = await fetch(`${OPS_BASE}/api/shifts`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'delete' }),
      });
      if (res.ok) {
        setShifts((prev) => prev.filter((s) => s.id !== id));
        notify('Shift removed — staff notified (demo)');
        setModal(null);
      }
    } finally {
      setSaving(false);
    }
  }

  async function saveShift(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const mode = (fd.get('mode') as ModalMode) ?? 'assign';
    const employeeId = mode === 'open' ? null : (fd.get('employeeId') as string);
    const emp = employeeId ? employees.find((x) => x.id === employeeId) : null;
    const siteId = fd.get('siteId') as string;
    const site = MOCK_SITES.find((s) => s.id === siteId);
    const payload = {
      employeeId,
      employeeName: emp?.fullName ?? null,
      siteId,
      siteCode: (site?.code ?? 'main') as SiteCode,
      program: fd.get('program') as string,
      title: fd.get('title') as string,
      location: fd.get('location') as string,
      startsAt: `${fd.get('date')}T${fd.get('startTime')}:00`,
      endsAt: `${fd.get('date')}T${fd.get('endTime')}:00`,
      notes: (fd.get('notes') as string) || undefined,
      assignmentType: mode as AssignmentType,
      requiresVisitLog: true,
    };

    setSaving(true);
    try {
      if (modal?.edit) {
        const res = await fetch(`${OPS_BASE}/api/shifts`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: modal.edit.id, action: 'update', ...payload }),
        });
        if (res.ok) {
          const updated = await res.json();
          setShifts((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
          notify(
            isOpenShift(updated)
              ? 'Open shift updated — available staff notified'
              : `Updated shift for ${updated.employeeName} — notification sent`,
          );
        }
      } else {
        const res = await fetch(`${OPS_BASE}/api/shifts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setShifts((prev) => [created, ...prev]);
          notify(
            mode === 'open'
              ? 'Open shift posted — field staff in this area can claim it'
              : `Assigned ${emp?.fullName} — instant notification (demo)`,
          );
        }
      }
      setModal(null);
    } finally {
      setSaving(false);
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const editing = modal?.edit;

  return (
    <div className="pb-6">
      <header className="mb-5 sm:mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ops-green)] mb-1">Scheduling</p>
        <h1 className="text-xl sm:text-2xl font-bold">Schedule builder</h1>
        <p className="text-sm ops-text-muted mt-1 max-w-xl">
          Assign shifts directly or post open shifts for staff in the area to claim. Changes sync instantly in this demo.
        </p>
      </header>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-6 max-w-lg">
        <div className="ops-card p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-2xl font-bold tabular-nums">{stats.total}</div>
          <div className="text-[10px] sm:text-xs ops-text-muted uppercase tracking-wide mt-0.5">Total</div>
        </div>
        <div className="ops-card p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-2xl font-bold tabular-nums text-[var(--ops-green)]">{stats.assigned}</div>
          <div className="text-[10px] sm:text-xs ops-text-muted uppercase tracking-wide mt-0.5">Assigned</div>
        </div>
        <div className="ops-card p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-2xl font-bold tabular-nums text-[var(--ops-amber)]">{stats.open}</div>
          <div className="text-[10px] sm:text-xs ops-text-muted uppercase tracking-wide mt-0.5">Open</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 mb-5">
        <div className="flex gap-1 p-1 rounded-xl bg-[var(--ops-surface-2)] border border-[var(--ops-border)] w-full sm:w-auto">
          {(['all', 'assigned', 'open'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-xs font-semibold capitalize transition-colors ${
                tab === t ? 'bg-[var(--ops-green)] text-[#052e16]' : 'ops-text-muted hover:text-[var(--ops-text)]'
              }`}
            >
              {t === 'all' ? 'All' : t === 'open' ? 'Open' : 'Assigned'}
            </button>
          ))}
        </div>

        <div className="flex gap-2 sm:ml-auto">
          <button type="button" onClick={() => openCreate('open')} className="ops-btn-ghost flex-1 sm:flex-none flex items-center justify-center gap-2 text-sm py-2.5">
            <Sparkles size={16} />
            Post open
          </button>
          <button type="button" onClick={() => openCreate('assign')} className="ops-btn-primary flex-1 sm:flex-none flex items-center justify-center gap-2 text-sm py-2.5">
            <Plus size={16} />
            Assign
          </button>
        </div>
      </div>

      {loading ? (
        <div className="ops-card p-12 flex flex-col items-center gap-3 ops-text-muted">
          <Loader2 size={28} className="animate-spin" />
          <span className="text-sm">Loading schedule…</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="ops-card p-8 text-center">
          <CalendarDays size={32} className="mx-auto mb-3 ops-text-muted" />
          <p className="font-medium">No shifts in this view</p>
          <p className="text-sm ops-text-muted mt-1">Post an open shift or assign someone to get started.</p>
        </div>
      ) : (
        <>
          <div className="hidden lg:block ops-card overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="text-xs uppercase ops-text-muted border-b border-[var(--ops-border)]">
                  <th className="p-3 text-left">Staff</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Site</th>
                  <th className="p-3 text-left">Shift</th>
                  <th className="p-3 text-left">When</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <ShiftTableRow key={s.id} shift={s} onEdit={openEdit} onDelete={deleteShift} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden space-y-3">
            {filtered.map((s) => (
              <ShiftCard key={s.id} shift={s} onEdit={openEdit} onDelete={deleteShift} />
            ))}
          </div>
        </>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/70">
          <form
            onSubmit={saveShift}
            className="ops-card w-full sm:max-w-md p-5 sm:p-6 max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
          >
            <input type="hidden" name="mode" value={modal.mode} />
            <h2 className="text-lg font-bold mb-1">
              {editing ? 'Edit shift' : modal.mode === 'open' ? 'Post open shift' : 'Assign shift'}
            </h2>
            <p className="text-xs ops-text-muted mb-4">
              {modal.mode === 'open'
                ? 'Staff at this site who are available will see this and can claim it.'
                : 'Employee is notified immediately when saved.'}
            </p>

            <div className="space-y-3">
              {modal.mode === 'assign' && (
                <label className="block text-xs ops-text-muted">
                  Employee
                  <select
                    name="employeeId"
                    required
                    defaultValue={editing?.employeeId ?? employees[0]?.id}
                    className="ops-input mt-1"
                  >
                    {employees.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.fullName}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <label className="block text-xs ops-text-muted">
                Site
                <select name="siteId" required defaultValue={editing?.siteId ?? sites[0]?.id} className="ops-input mt-1">
                  {sites.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-xs ops-text-muted">
                Program
                <select name="program" defaultValue={editing?.program ?? 'group_care'} className="ops-input mt-1">
                  {PROGRAMS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-xs ops-text-muted">
                Title
                <input name="title" required defaultValue={editing?.title} className="ops-input mt-1" placeholder="e.g. Group home PM shift" />
              </label>

              <label className="block text-xs ops-text-muted">
                Location
                <input name="location" required defaultValue={editing?.location} className="ops-input mt-1" />
              </label>

              <label className="block text-xs ops-text-muted">
                Date
                <input name="date" type="date" required defaultValue={editing?.startsAt?.slice(0, 10) ?? today} className="ops-input mt-1" />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block text-xs ops-text-muted">
                  Start
                  <input name="startTime" type="time" required defaultValue={editing?.startsAt?.slice(11, 16) ?? '09:00'} className="ops-input mt-1" />
                </label>
                <label className="block text-xs ops-text-muted">
                  End
                  <input name="endTime" type="time" required defaultValue={editing?.endsAt?.slice(11, 16) ?? '17:00'} className="ops-input mt-1" />
                </label>
              </div>

              <label className="block text-xs ops-text-muted">
                Notes (optional)
                <textarea name="notes" rows={2} defaultValue={editing?.notes} className="ops-input mt-1 resize-none" placeholder={modal.mode === 'open' ? 'Coverage reason, skills needed…' : ''} />
              </label>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-2 mt-6">
              {editing && (
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => deleteShift(editing.id)}
                  className="ops-btn-ghost text-[var(--ops-red)] sm:mr-auto"
                >
                  <Trash2 size={14} className="inline mr-1" />
                  Delete
                </button>
              )}
              <button type="button" onClick={() => setModal(null)} className="ops-btn-ghost flex-1 sm:flex-none">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="ops-btn-primary flex-1 sm:flex-none">
                {saving ? 'Saving…' : modal.mode === 'open' ? 'Post & notify' : 'Save & notify'}
              </button>
            </div>
          </form>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 bg-[var(--ops-green)] text-[#052e16] px-4 py-3 rounded-xl text-sm font-semibold shadow-lg z-50 max-w-[90vw] text-center">
          {toast}
        </div>
      )}
    </div>
  );
}

function ShiftTypeBadge({ shift }: { shift: Shift }) {
  if (isOpenShift(shift)) {
    return <span className="ops-badge ops-badge-amber">Open</span>;
  }
  return <span className="ops-badge ops-badge-green">Assigned</span>;
}

function ShiftTableRow({
  shift: s,
  onEdit,
  onDelete,
}: {
  shift: Shift;
  onEdit: (s: Shift) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="border-b border-[var(--ops-border)] hover:bg-white/[0.02]">
      <td className="p-3 font-medium">
        {isOpenShift(s) ? (
          <span className="flex items-center gap-1.5 ops-text-muted">
            <Users size={14} />
            Awaiting claim
          </span>
        ) : (
          s.employeeName
        )}
      </td>
      <td className="p-3">
        <ShiftTypeBadge shift={s} />
      </td>
      <td className="p-3">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: SITE_COLORS[s.siteCode] }} />
          {MOCK_SITES.find((x) => x.id === s.siteId)?.name}
        </span>
      </td>
      <td className="p-3">{s.title}</td>
      <td className="p-3 ops-text-muted text-xs">
        {formatDateShort(s.startsAt)}
        <br />
        {formatTime(s.startsAt)} – {formatTime(s.endsAt)}
      </td>
      <td className="p-3 text-right">
        <button type="button" onClick={() => onEdit(s)} className="p-2 ops-text-muted hover:text-[var(--ops-text)] inline-flex" aria-label="Edit">
          <Pencil size={16} />
        </button>
        <button type="button" onClick={() => onDelete(s.id)} className="p-2 text-[var(--ops-red)]/80 hover:text-[var(--ops-red)] inline-flex" aria-label="Delete">
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}

function ShiftCard({
  shift: s,
  onEdit,
  onDelete,
}: {
  shift: Shift;
  onEdit: (s: Shift) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <article className="ops-card p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <ShiftTypeBadge shift={s} />
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
              style={{ background: `${SITE_COLORS[s.siteCode]}22`, color: SITE_COLORS[s.siteCode] }}
            >
              {MOCK_SITES.find((x) => x.id === s.siteId)?.name}
            </span>
          </div>
          <h3 className="font-semibold">{s.title}</h3>
          <p className="text-xs ops-text-muted mt-0.5">
            {isOpenShift(s) ? 'Open — staff can claim' : s.employeeName}
          </p>
        </div>
        <div className="flex shrink-0">
          <button type="button" onClick={() => onEdit(s)} className="p-2 ops-text-muted" aria-label="Edit">
            <Pencil size={16} />
          </button>
          <button type="button" onClick={() => onDelete(s.id)} className="p-2 text-[var(--ops-red)]/80" aria-label="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <p className="text-xs ops-text-muted">
        {formatDateShort(s.startsAt)} · {formatTimeShort(s.startsAt)} – {formatTimeShort(s.endsAt)}
      </p>
      {s.notes && <p className="text-xs ops-text-muted mt-2 pt-2 border-t border-[var(--ops-border)]">{s.notes}</p>}
    </article>
  );
}
