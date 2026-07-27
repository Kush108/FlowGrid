'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, MoreHorizontal } from 'lucide-react';

type BottomNavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

type MobileBottomNavProps = {
  items: BottomNavItem[];
  onMore: () => void;
};

export function MobileBottomNav({ items, onMore }: MobileBottomNavProps) {
  const pathname = usePathname();
  const showMore = items.length > 5;
  const primary = showMore ? items.slice(0, 4) : items;
  const overflowActive = showMore && items.some(
    (item) =>
      !primary.some((p) => p.href === item.href) &&
      (pathname === item.href || (item.href !== items[0]?.href && pathname.startsWith(item.href))),
  );

  function isActive(href: string, isFirst: boolean) {
    return pathname === href || (!isFirst && pathname.startsWith(href));
  }

  return (
    <nav className="ops-bottom-nav" aria-label="Primary navigation">
      {primary.map((item, i) => {
        const active = isActive(item.href, i === 0);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`ops-bottom-nav-item${active ? ' active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            <span className="ops-bottom-nav-icon">{item.icon}</span>
            <span className="ops-bottom-nav-label">{item.label}</span>
          </Link>
        );
      })}
      {showMore && (
        <button
          type="button"
          onClick={onMore}
          className={`ops-bottom-nav-item ops-bottom-nav-more${overflowActive ? ' active' : ''}`}
          aria-label="More navigation"
        >
          <span className="ops-bottom-nav-icon">
            {overflowActive ? <LayoutGrid size={20} /> : <MoreHorizontal size={20} />}
          </span>
          <span className="ops-bottom-nav-label">More</span>
        </button>
      )}
    </nav>
  );
}
