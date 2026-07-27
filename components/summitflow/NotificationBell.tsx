'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bell, Car, ClipboardList, Plane, AlertTriangle, Clock, X } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '@/lib/summitflow/mock-data';
import { SITE_COLORS, type SiteCode } from '@/lib/summitflow/constants';
import type { OpsNotification } from '@/lib/summitflow/types';

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
    if (open) {
      document.addEventListener('mousedown', onClickOutside);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      if (open) document.body.style.overflow = '';
    };
  }, [open]);

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  return (
    <div ref={panelRef} className="ops-notif-root">
      {open && <div className="ops-notif-scrim lg:hidden" onClick={() => setOpen(false)} aria-hidden />}

      <button
        type="button"
        aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`ops-icon-btn ops-notif-btn${open ? ' active' : ''}`}
      >
        <Bell size={18} />
        {unread > 0 && <span className="ops-notif-badge">{unread}</span>}
      </button>

      {open && (
        <div className="ops-notif-panel ops-fade-in">
          <div className="ops-notif-header">
            <span className="ops-notif-title">Notifications</span>
            <div className="ops-notif-header-actions">
              {unread > 0 && (
                <button type="button" onClick={markAllRead} className="ops-notif-mark-all">
                  Mark all read
                </button>
              )}
              <button
                type="button"
                aria-label="Close notifications"
                onClick={() => setOpen(false)}
                className="ops-notif-close lg:hidden"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="ops-notif-list">
            {items.length === 0 ? (
              <p className="ops-notif-empty">No notifications</p>
            ) : (
              items.map((n) => {
                const Icon = TYPE_ICONS[n.type];
                const content = (
                  <div
                    className={`ops-notif-item${n.read ? '' : ' unread'}`}
                    onClick={() => {
                      markRead(n.id);
                      if (!n.href) return;
                      setOpen(false);
                    }}
                  >
                    <div
                      className="ops-notif-item-icon"
                      style={{
                        color: n.siteCode ? SITE_COLORS[n.siteCode as SiteCode] : 'var(--ops-blue)',
                      }}
                    >
                      <Icon size={15} />
                    </div>
                    <div className="ops-notif-item-body">
                      <div className="ops-notif-item-title">{n.title}</div>
                      <div className="ops-notif-item-msg">{n.message}</div>
                      <div className="ops-notif-item-time">{timeAgo(n.createdAt)}</div>
                    </div>
                    {!n.read && <span className="ops-notif-unread-dot" />}
                  </div>
                );

                return n.href ? (
                  <Link key={n.id} href={n.href} className="ops-notif-link">
                    {content}
                  </Link>
                ) : (
                  <div key={n.id}>{content}</div>
                );
              })
            )}
          </div>

          <div className="ops-notif-footer">
            Sphinx Healing · Group Care, Family Living, PDD &amp; TAP
          </div>
        </div>
      )}
    </div>
  );
}
