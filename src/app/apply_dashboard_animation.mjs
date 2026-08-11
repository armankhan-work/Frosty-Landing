import fs from 'fs';
import path from 'path';

const filePath = 'c:/frosty/frontend/src/app/(marketing)/page.tsx';
let source = fs.readFileSync(filePath, 'utf8');

// Replace the dashboard overlay section with framer-motion powered section
const dashboardRegex = /\{\/\* ═══════════════════════════════════════════════════\s*DASHBOARD OVERLAY\s*═══════════════════════════════════════════════════ \*\/\}([\s\S]*?)<\!-- ── Metrics strip ── -->/i;
// Actually the previous section ends with Metrics Strip, but using string boundaries is safer.

const replacement = `{/* ═══════════════════════════════════════════════════
              DASHBOARD OVERLAY (Scroll-Triggered System Flow)
          ═══════════════════════════════════════════════════ */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              background: 'var(--bg-base)',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              paddingTop: 120,
              paddingBottom: 80,
              paddingLeft: '6%',
              paddingRight: '6%',
            }}
          >
            {/* ── Dashboard mockup card ── */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 30 },
                visible: { 
                  opacity: 1, scale: 1, y: 0, 
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1, delayChildren: 0.2 } 
                }
              }}
              style={{
                position: 'relative', zIndex: 1,
                maxWidth: 900, width: '100%', margin: '0 auto',
                background: 'var(--card-bg)',
                border: '1px solid #1C1C1C',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
              }}
            >
              {/* Mockup top bar */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 24px',
                  borderBottom: '1px solid #1C1C1C',
                  background: 'var(--term-bg)',
                }}
              >
                <div style={{ display: 'flex', gap: 6 }}>
                  {['rgba(255,95,87,0.8)', 'rgba(255,189,46,0.8)', 'rgba(40,200,64,0.8)'].map((c) => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>FROSTY DASHBOARD · LIVE</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B82F6', display: 'inline-block', animation: 'dot-pulse 2s ease-in-out infinite' }} />
                  <span style={{ fontSize: 11, color: '#3B82F6' }}>Active</span>
                </div>
              </motion.div>

              {/* Mockup body */}
              <div style={{ padding: '24px 28px' }}>
                {/* Stats row */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                  }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}
                >
                  {[
                    { label: 'Live Sessions', val: '247', sub: '+12 today', color: '#3B82F6' },
                    { label: 'Leads Captured', val: '1,842', sub: '+38 today', color: '#93C5FD' },
                    { label: 'Meetings Booked', val: '94', sub: '+5 today', color: '#93C5FD' },
                    { label: 'Avg Response', val: '1.2s', sub: 'P99 latency', color: '#22C55E' },
                  ].map((s) => (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                      }}
                      key={s.label}
                      style={{
                        background: 'var(--bg-layer-3)',
                        border: '1px solid #1A1A1A',
                        borderRadius: 12,
                        padding: '14px 16px',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ fontSize: 10, color: 'var(--text-body)', letterSpacing: '0.1em', marginBottom: 6, textTransform: 'uppercase' }}>{s.label}</div>
                      <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, marginBottom: 4 }}>{s.val}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{s.sub}</div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Chart + Live feed row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {/* Mini bar chart */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.6, staggerChildren: 0.05, delayChildren: 0.3 } }
                    }}
                    style={{
                      background: 'var(--term-bg)',
                      border: '1px solid #1C1C1C',
                      borderRadius: 12,
                      padding: '16px 18px',
                    }}
                  >
                    <div style={{ fontSize: 10, color: 'var(--text-body)', letterSpacing: '0.1em', marginBottom: 14, textTransform: 'uppercase' }}>Conversations · 7d</div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 64 }}>
                      {[40, 65, 48, 72, 55, 80, 62].map((h, i) => (
                        <motion.div
                          key={i}
                          variants={{
                            hidden: { height: 0 },
                            visible: { height: \`\${h}%\`, transition: { duration: 0.8, ease: "circOut" } }
                          }}
                          style={{
                            flex: 1,
                            borderRadius: 4,
                            background: i === 5 ? '#1D4ED8' : 'var(--border)',
                          }}
                        />
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                        <span key={i} style={{ flex: 1, textAlign: 'center', fontSize: 9, color: 'var(--text-muted)' }}>{d}</span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Live activity feed */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.6, staggerChildren: 0.1, delayChildren: 0.5 } }
                    }}
                    style={{
                      background: 'var(--term-bg)',
                      border: '1px solid #1C1C1C',
                      borderRadius: 12,
                      padding: '16px 18px',
                    }}
                  >
                    <div style={{ fontSize: 10, color: 'var(--text-body)', letterSpacing: '0.1em', marginBottom: 14, textTransform: 'uppercase' }}>Live Activity</div>
                    {[
                      { icon: '🎯', text: 'Lead captured — Priya S.', time: '2s ago', color: '#3B82F6' },
                      { icon: '📅', text: 'Meeting booked — Rahul K.', time: '18s ago', color: '#93C5FD' },
                      { icon: '💬', text: 'WhatsApp conv started', time: '41s ago', color: '#93C5FD' },
                      { icon: '✨', text: 'AI Insight generated', time: '2m ago', color: '#22C55E' },
                    ].map((ev, i) => (
                      <motion.div
                        key={i}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                        }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          paddingBottom: i < 3 ? 10 : 0,
                          marginBottom: i < 3 ? 10 : 0,
                          borderBottom: i < 3 ? '1px solid #141414' : 'none',
                        }}
                      >
                        <span style={{ fontSize: 14 }}>{ev.icon}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-body)', flex: 1, textAlign: 'left' }}>{ev.text}</span>
                        <span style={{ fontSize: 10, color: ev.color, whiteSpace: 'nowrap' }}>{ev.time}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.section>`;

// Target boundaries carefully
const startIndex = source.indexOf('{/* ═══════════════════════════════════════════════════\\n              DASHBOARD OVERLAY');
if (startIndex === -1) {
  const backupStart = source.indexOf('{/* ═══════════════════════════════════════════════════\\r\\n              DASHBOARD OVERLAY');
  if (backupStart !== -1) {
      console.log('Found with CRLF');
      const endIndex = source.indexOf('{/* ═══════════════════════════════════════════════════\\r\\n              METRICS STRIP');
      source = source.substring(0, backupStart) + replacement + "\\n\\n          " + source.substring(endIndex);
  } else {
      console.error('Could not find DASHBOARD OVERLAY section');
  }
} else {
  const endIndex = source.indexOf('{/* ═══════════════════════════════════════════════════\\n              METRICS STRIP');
  source = source.substring(0, startIndex) + replacement + "\\n\\n          " + source.substring(endIndex);
}

fs.writeFileSync(filePath, source);
console.log('Successfully updated DASHBOARD OVERLAY to use Framer Motion Scroll Triggers');
