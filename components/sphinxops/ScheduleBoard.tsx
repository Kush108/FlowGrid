'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { MOCK_PROFILES, MOCK_SHIFTS, MOCK_SITES } from '@/lib/sphinixops/mock-data';
import { PROGRAMS, SITE_COLORS, type SiteCode } from '@/lib/sphinixops/constants';
import type { Shift } from '@/lib/sphinixops/types';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' });
}

export function ScheduleBoard() {
  const [shifts, setShifts] = useState<Shift[]>(MOCK_SHIFTS);
  const [modal, setModal] = useState<'new' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Shift | null>(null);
  const [toast, setToast] = useState('');

  const employees = MOCK_PROFILES.filter((p) => p.role === 'employee');

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function openNew() {
    setEditing(null);
    setModal('new');
  }

  function openEdit(s: Shift) {
    setEditing(s);
    setModal('edit');
  }

  function deleteShift(id: string) {
    setShifts((prev) => prev.filter((s) => s.id !== id));
    notify('Shift removed — employee notified (demo)');
    setModal(null);
  }

  function saveShift(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const employeeId = fd.get('employeeId') as string;
    const emp = employees.find((x) => x.id === employeeId);
    const siteId = fd.get('siteId') as string;
    const site = MOCK_SITES.find((s) => s.id === siteId);
    const payload: Shift = {
      id: editing?.id ?? `sh-${Date.now()}`,
      employeeId,
      employeeName: emp?.fullName ?? 'Staff',
      siteId,
      siteCode: (site?.code ?? 'main') as SiteCode,
      program: fd.get('program') as string,
      title: fd.get('title') as string,
      location: fd.get('location') as string,
      startsAt: `${fd.get('date')}T${fd.get('startTime')}:00`,
      endsAt: `${fd.get('date')}T${fd.get('endTime')}:00`,
      status: 'scheduled',
      requiresVisitLog: true,
      notes: (fd.get('notes') as string) || undefined,
    };
    if (editing) {
      setShifts((prev) => prev.map((s) => (s.id === editing.id ? payload : s)));
      notify(`Updated shift for ${emp?.fullName} — notification sent`);
    } else {
      setShifts((prev) => [...prev, payload]);
      notify(`Assigned ${emp?.fullName} — instant notification (demo)`);
    }
    setModal(null);
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Schedule builder</h1>
          <p className="text-white/45 text-sm mt-1">Assign shifts in advance or same-day · employees see updates immediately</p>
        </div>
        <button type="button" onClick={openNew} className="ops-btn-primary flex items-center gap-2 text-sm">
          <Plus size={18} />
          Assign shift
        </button>
      </div>

      <div className="ops-card overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="text-xs uppercase text-white/45 border-b border-white/[0.08]">
              <th className="p-3 text-left">Staff</th>
              <th className="p-3 text-left">Site</th>
              <th className="p-3 text-left">Shift</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Program</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((s) => (
              <tr key={s.id} className="border-b border-white/[0.06] hover:bg-white/[0.02]">
                <td className="p-3 font-medium">{s.employeeName}</td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: SITE_COLORS[s.siteCode] }} />
                    {MOCK_SITES.find((x) => x.id === s.siteId)?.name}
                  </span>
                </td>
                <td className="p-3">{s.title}</td>
                <td className="p-3 text-white/55">
                  {formatTime(s.startsAt)} – {formatTime(s.endsAt)}
                </td>
                <td className="p-3 text-white/55 capitalize">{s.program.replace('_', ' ')}</td>
                <td className="p-3 text-right">
                  <button type="button" onClick={() => openEdit(s)} className="p-2 text-white/50 hover:text-white inline-flex" aria-label="Edit">
                    <Pencil size={16} />
                  </button>
                  <button type="button" onClick={() => deleteShift(s.id)} className="p-2 text-red-400/80 hover:text-red-400 inline-flex" aria-label="Delete">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-white/35 mt-4">Week view ({DAYS.join(' · ')}) — full calendar grid in Phase 2 with drag-and-drop</p>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <form onSubmit={saveShift} className="ops-card w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">{modal === 'new' ? 'Assign shift' : 'Edit shift'}</h2>
            <div className="space-y-3">
              <label className="block text-xs text-white/45">
                Employee
                <select name="employeeId" required defaultValue={editing?.employeeId} className="ops-input mt-1">
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.fullName}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs text-white/45">
                Site
                <select name="siteId" required defaultValue={editing?.siteId ?? 's-main'} className="ops-input mt-1">
                  {MOCK_SITES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs text-white/45">
                Program
                <select name="program" defaultValue={editing?.program ?? 'group_care'} className="ops-input mt-1">
                  {PROGRAMS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs text-white/45">
                Title
                <input name="title" required defaultValue={editing?.title} className="ops-input mt-1" placeholder="e.g. Group home AM shift" />
              </label>
              <label className="block text-xs text-white/45">
                Location
                <input name="location" required defaultValue={editing?.location} className="ops-input mt-1" />
              </label>
              <label className="block text-xs text-white/45">
                Date
                <input name="date" type="date" required defaultValue={editing?.startsAt?.slice(0, 10) ?? today} className="ops-input mt-1" />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-xs text-white/45">
                  Start
                  <input name="startTime" type="time" required defaultValue={editing?.startsAt?.slice(11, 16) ?? '09:00'} className="ops-input mt-1" />
                </label>
                <label className="block text-xs text-white/45">
                  End
                  <input name="endTime" type="time" required defaultValue={editing?.endsAt?.slice(11, 16) ?? '17:00'} className="ops-input mt-1" />
                </label>
              </div>
              <label className="block text-xs text-white/45">
                Notes (optional)
                <textarea name="notes" rows={2} defaultValue={editing?.notes} className="ops-input mt-1 resize-none" />
              </label>
            </div>
            <div className="flex gap-2 mt-6">
              <button type="submit" className="ops-btn-primary flex-1">
                Save &amp; notify
              </button>
              <button type="button" onClick={() => setModal(null)} className="ops-btn-ghost">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#22c55e] text-[#052e16] px-4 py-3 rounded-xl text-sm font-semibold shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
