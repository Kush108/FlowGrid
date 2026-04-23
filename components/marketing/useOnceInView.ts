'use client';

import { useEffect, useRef, useState } from 'react';

export function useOnceInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setInView(true);
        obs.disconnect();
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -10% 0px',
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [inView, options?.rootMargin, options?.threshold]);

  return { ref, inView };
}
