'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bell, Car, ClipboardList, Plane, AlertTriangle, Clock } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '@/lib/sphinixops/mock-data';
import { SITE_COLORS, type SiteCode } from '@/lib/sphinixops/constants';
import type { OpsNotification } from '@/lib/sphinixops/types';

const TYPE_ICONS = {
  shift: Clock,
  mileage: Car,
  leave: Plane,
  visit: ClipboardList,
  alert: AlertTriangle,
};

function timeAgo(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<OpsNotification[]>(MOCK_NOTIFICATIONS);
  const panelRef = useRef<HTMLDivElement>(null);

  const unread = items.filter((n) => !n.read).length;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  return (
    <div ref={panelRef} style={{ position: 'relative' }}>
      <button
        type="button"
        aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          border: '1px solid var(--ops-border)',
          background: open ? 'var(--ops-surface-2)' : 'transparent',
          color: 'var(--ops-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <Bell size={16} />
        {unread > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              minWidth: 14,
              height: 14,
              padding: '0 3px',
              borderRadius: 99,
              background: 'var(--ops-red)',
              border: '1.5px solid var(--ops-surface)',
              fontSize: 9,
              fontWeight: 700,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div
          className="ops-fade-in"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: 340,
            maxWidth: '90vw',
            background: 'var(--ops-surface)',
            border: '1px solid var(--ops-border-2)',
            borderRadius: 12,
            boxShadow: 'var(--ops-shadow)',
            zIndex: 60,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '12px 14px',
              borderBottom: '1px solid var(--ops-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ops-text)' }}>Notifications</span>
            {unread > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                style={{
                  fontSize: 11,
                  color: 'var(--ops-green)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          <div style={{ maxHeight: 360, overflowY: 'auto' }}>
            {items.length === 0 ? (
              <p style={{ padding: 24, textAlign: 'center', fontSize: 13, color: 'var(--ops-muted)' }}>
                No notifications
              </p>
            ) : (
              items.map((n) => {
                const Icon = TYPE_ICONS[n.type];
                const content = (
                  <div
                    style={{
                      padding: '12px 14px',
                      borderBottom: '1px solid var(--ops-border)',
                      display: 'flex',
                      gap: 10,
                      background: n.read ? 'transparent' : 'var(--ops-green-dim)',
                      cursor: n.href ? 'pointer' : 'default',
                    }}
                    onClick={() => {
                      markRead(n.id);
                      if (!n.href) return;
                      setOpen(false);
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: 'var(--ops-surface-2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        color: n.siteCode ? SITE_COLORS[n.siteCode as SiteCode] : 'var(--ops-blue)',
                      }}
                    >
                      <Icon size={15} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: n.read ? 500 : 600, color: 'var(--ops-text)' }}>
                        {n.title}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--ops-muted)', marginTop: 2, lineHeight: 1.4 }}>
                        {n.message}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--ops-muted)', marginTop: 4, opacity: 0.8 }}>
                        {timeAgo(n.createdAt)}
                      </div>
                    </div>
                    {!n.read && (
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: '50%',
                          background: 'var(--ops-green)',
                          flexShrink: 0,
                          marginTop: 4,
                        }}
                      />
                    )}
                  </div>
                );

                return n.href ? (
                  <Link key={n.id} href={n.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {content}
                  </Link>
                ) : (
                  <div key={n.id}>{content}</div>
                );
              })
            )}
          </div>

          <div style={{ padding: '10px 14px', borderTop: '1px solid var(--ops-border)', textAlign: 'center' }}>
            <span style={{ fontSize: 11, color: 'var(--ops-muted)' }}>
              Sphinx Healing · Group Care, Family Living, PDD &amp; TAP
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
