import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FlowGrid — HVAC dispatch board for Alberta field service teams';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0a1628 0%, #0f1f35 50%, #0a1628 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Header bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '28px 40px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #22c55e, #0ea5e9)',
              }}
            />
            <span style={{ color: '#f1f5f9', fontSize: 28, fontWeight: 700 }}>FlowGrid</span>
          </div>
          <span style={{ color: '#64748b', fontSize: 16 }}>SummitFlow HVAC Demo</span>
        </div>

        {/* Dispatch board mockup */}
        <div style={{ flex: 1, display: 'flex', padding: '32px 40px', gap: 24 }}>
          {/* Sidebar */}
          <div
            style={{
              width: 200,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              padding: 16,
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {['Dispatch', 'Fleet', 'Payroll', 'Reports'].map((item, i) => (
              <div
                key={item}
                style={{
                  padding: '10px 14px',
                  borderRadius: 8,
                  background: i === 0 ? 'rgba(34,197,94,0.15)' : 'transparent',
                  color: i === 0 ? '#22c55e' : '#94a3b8',
                  fontSize: 14,
                  fontWeight: i === 0 ? 600 : 400,
                }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Main board */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'Open shifts', val: '4', color: '#f97316' },
                { label: 'Techs on route', val: '11', color: '#22c55e' },
                { label: 'Emergency', val: '2', color: '#ef4444' },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    flex: 1,
                    padding: '16px 20px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div style={{ color: s.color, fontSize: 32, fontWeight: 700 }}>{s.val}</div>
                  <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Job rows */}
            <div
              style={{
                flex: 1,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {[
                { job: 'Furnace emergency — Mill Woods', tech: 'Jake T.', status: 'En route', sc: '#22c55e' },
                { job: 'AC maintenance — St. Albert', tech: 'Open shift', status: 'Unclaimed', sc: '#f97316' },
                { job: 'Warranty callback — Downtown', tech: 'Maria S.', status: 'On site', sc: '#0ea5e9' },
              ].map((row) => (
                <div
                  key={row.job}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <span style={{ color: '#e2e8f0', fontSize: 15 }}>{row.job}</span>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <span style={{ color: '#94a3b8', fontSize: 13 }}>{row.tech}</span>
                    <span
                      style={{
                        color: row.sc,
                        fontSize: 12,
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: 20,
                        background: `${row.sc}18`,
                      }}
                    >
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer tagline */}
        <div
          style={{
            padding: '20px 40px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#94a3b8', fontSize: 18 }}>
            HVAC dispatch, fleet &amp; payroll — built in Edmonton
          </span>
          <span style={{ color: '#22c55e', fontSize: 16, fontWeight: 600 }}>flowgrid.ca</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
