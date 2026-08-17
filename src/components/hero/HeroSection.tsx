'use client';

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/* ═══════════════════════════════════════════════════════════════
   ANIMATION STATE MACHINE
   ═══════════════════════════════════════════════════════════════ */
type AnimPhase =
  | 'IDLE'
  | 'CURSOR_MOVE'
  | 'CURSOR_CLICK'
  | 'CHAT_OPEN'
  | 'TYPE_Q1'
  | 'REPLY_A1'
  | 'TYPE_Q2'
  | 'REPLY_A2'
  | 'PAUSE'
  | 'FADE_RESET';

const PHASE_DURATIONS: Record<AnimPhase, number> = {
  IDLE: 1200,
  CURSOR_MOVE: 1400,
  CURSOR_CLICK: 400,
  CHAT_OPEN: 600,
  TYPE_Q1: 1600,
  REPLY_A1: 2400,
  TYPE_Q2: 1800,
  REPLY_A2: 2800,
  PAUSE: 2200,
  FADE_RESET: 800,
};

const PHASE_ORDER: AnimPhase[] = [
  'IDLE', 'CURSOR_MOVE', 'CURSOR_CLICK', 'CHAT_OPEN',
  'TYPE_Q1', 'REPLY_A1', 'TYPE_Q2', 'REPLY_A2',
  'PAUSE', 'FADE_RESET'
];

/* ═══════════════════════════════════════════════════════════════
   CONVERSATION DATA
   ═══════════════════════════════════════════════════════════════ */
const CONVERSATION = [
  { role: 'user' as const, text: 'Do you have this in black?' },
  { role: 'bot' as const, text: 'Yes! We have it in black in Medium and Large. Would you like to see the options?' },
  { role: 'user' as const, text: 'Which one would you recommend?' },
  { role: 'bot' as const, text: 'The Medium fits perfectly — it\'s our bestseller in black, rated 4.9★. Want me to add it to cart?' },
];

/* ═══════════════════════════════════════════════════════════════
   TYPING HOOK
   ═══════════════════════════════════════════════════════════════ */
function useTypingEffect(text: string, active: boolean, speed = 35) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) { setDisplayed(''); setDone(false); return; }
    let i = 0;
    setDisplayed('');
    setDone(false);
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, active, speed]);

  return { displayed, done };
}

/* ═══════════════════════════════════════════════════════════════
   MINI PRODUCT CARD
   ═══════════════════════════════════════════════════════════════ */
function MiniProductCard({ color, name, price, rating }: {
  color: string; name: string; price: string; rating: string;
}) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      border: '1px solid rgba(0,0,0,0.05)',
      flex: '1 1 0',
      minWidth: 0,
    }}>
      {/* Product image placeholder */}
      <div style={{
        height: 68,
        background: color,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Faux product shape */}
        <div style={{
          width: 28, height: 34,
          background: 'rgba(255,255,255,0.35)',
          borderRadius: 4,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }} />
      </div>
      <div style={{ padding: '6px 8px 8px' }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: '#1a1a2e', lineHeight: 1.3, fontFamily: "'DM Sans', sans-serif" }}>{name}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: '#0396A6', fontFamily: "'DM Sans', sans-serif" }}>{price}</span>
          <span style={{ fontSize: 7, color: '#888', fontFamily: "'DM Sans', sans-serif" }}>★ {rating}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAT MESSAGE BUBBLE
   ═══════════════════════════════════════════════════════════════ */
function ChatBubble({ role, text, isTyping }: {
  role: 'user' | 'bot'; text: string; isTyping?: boolean;
}) {
  const isUser = role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: '82%',
        padding: '7px 10px',
        borderRadius: isUser ? '10px 10px 3px 10px' : '10px 10px 10px 3px',
        fontSize: 9.5,
        lineHeight: 1.45,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: isUser ? 400 : 500,
        background: isUser ? '#f0edf8' : '#0396A6',
        color: isUser ? '#2a2a3e' : '#fff',
        boxShadow: isUser
          ? '0 1px 3px rgba(0,0,0,0.04)'
          : '0 2px 8px rgba(68,34,174,0.25)',
      }}
    >
      {text}
      {isTyping && (
        <span className="hero-typing-dots" style={{ marginLeft: 2 }}>
          <span>.</span><span>.</span><span>.</span>
        </span>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED CURSOR
   ═══════════════════════════════════════════════════════════════ */
function AnimatedCursor({ phase }: { phase: AnimPhase }) {
  const isVisible = ['CURSOR_MOVE', 'CURSOR_CLICK', 'CHAT_OPEN'].includes(phase);
  const isClicking = phase === 'CURSOR_CLICK';

  // Position: start from center area, end at chat widget (bottom-right)
  const getPosition = () => {
    if (phase === 'IDLE') return { x: '40%', y: '35%' };
    if (phase === 'CURSOR_MOVE') return { x: '85%', y: '82%' };
    return { x: '85%', y: '82%' };
  };

  const pos = getPosition();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, left: '40%', top: '35%' }}
          animate={{
            opacity: 1,
            left: pos.x,
            top: pos.y,
            scale: isClicking ? 0.85 : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            left: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
            top: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
            scale: { duration: 0.15 },
            opacity: { duration: 0.3 },
          }}
          style={{
            position: 'absolute',
            zIndex: 50,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
          }}
        >
          {/* SVG cursor */}
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
            <path
              d="M1 1L1 17.5L5.5 13.5L9 21L12 19.5L8.5 12.5L14 12L1 1Z"
              fill="#1a1a2e"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          {/* Click ripple */}
          {isClicking && (
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: 16, height: 16,
                borderRadius: '50%',
                background: 'rgba(68,34,174,0.3)',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LIVE PRODUCT DEMO (RIGHT COLUMN)
   ═══════════════════════════════════════════════════════════════ */
function LiveProductDemo({ phase, q1Text, a1Text, q2Text, a2Text, isTypingQ1, isTypingQ2 }: {
  phase: AnimPhase;
  q1Text: string; a1Text: string;
  q2Text: string; a2Text: string;
  isTypingQ1: boolean; isTypingQ2: boolean;
}) {
  const chatOpen = !['IDLE', 'CURSOR_MOVE', 'CURSOR_CLICK'].includes(phase);
  const showChat = chatOpen && phase !== 'FADE_RESET';
  const isFading = phase === 'FADE_RESET';

  const showQ1 = ['TYPE_Q1', 'REPLY_A1', 'TYPE_Q2', 'REPLY_A2', 'PAUSE'].includes(phase);
  const showA1 = ['REPLY_A1', 'TYPE_Q2', 'REPLY_A2', 'PAUSE'].includes(phase);
  const showQ2 = ['TYPE_Q2', 'REPLY_A2', 'PAUSE'].includes(phase);
  const showA2 = ['REPLY_A2', 'PAUSE'].includes(phase);
  const showTypingIndicator = phase === 'REPLY_A1' || phase === 'REPLY_A2';

  return (
    <motion.div
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      className="hero-demo-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 520,
        borderRadius: 16,
        overflow: 'hidden',
        background: '#f8f7fc',
        boxShadow: '0 25px 80px -12px rgba(68,34,174,0.18), 0 8px 24px -4px rgba(0,0,0,0.08)',
        border: '1px solid rgba(68,34,174,0.08)',
        aspectRatio: '4 / 3',
      }}
    >
      {/* ── Browser Chrome ────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 14px',
        background: '#faf9fe',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
        </div>
        {/* URL bar */}
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: 6,
          padding: '4px 12px',
          fontSize: 9,
          color: '#888',
          fontFamily: "'DM Sans', monospace",
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.333A4.667 4.667 0 003.333 6v.667A5.333 5.333 0 008 12a5.333 5.333 0 004.667-5.333V6A4.667 4.667 0 008 1.333z" stroke="#28c840" strokeWidth="1.5" />
          </svg>
          yourstore.com
        </div>
      </div>

      {/* ── Website Content ────────────────────────── */}
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden', height: 'calc(100% - 37px)' }}>

        {/* Site nav */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 14px',
          background: '#fff',
          borderBottom: '1px solid rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: 'linear-gradient(135deg, #0396A6, #7c5fd6)' }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: '#1a1a2e', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>YourStore</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {['Shop', 'New In', 'Sale'].map(t => (
              <span key={t} style={{ fontSize: 8, color: '#666', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Hero banner */}
        <div style={{
          margin: '8px 10px',
          borderRadius: 8,
          background: 'linear-gradient(135deg, #f3f0ff 0%, #ede9fe 50%, #e8e4fd 100%)',
          padding: '14px 16px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a2e', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Summer Collection
          </div>
          <div style={{ fontSize: 8, color: '#666', marginTop: 3, fontFamily: "'DM Sans', sans-serif" }}>
            Up to 40% off selected styles
          </div>
          <div style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            width: 32, height: 38, background: 'rgba(68,34,174,0.12)', borderRadius: 6,
          }} />
        </div>

        {/* Product grid */}
        <div style={{
          display: 'flex', gap: 8,
          padding: '4px 10px 10px',
        }}>
          <MiniProductCard color="linear-gradient(135deg, #e8e4fd, #d4ccf0)" name="Classic Tee" price="$49" rating="4.8" />
          <MiniProductCard color="linear-gradient(135deg, #fce7f3, #f5d0e6)" name="Slim Hoodie" price="$89" rating="4.9" />
          <MiniProductCard color="linear-gradient(135deg, #dbeafe, #bfdbfe)" name="Denim Jacket" price="$129" rating="4.7" />
        </div>

        {/* ── Frosty Chat Widget ────────────────────── */}
        <AnimatePresence>
          {!showChat && (
            <motion.div
              key="widget-bubble"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                position: 'absolute',
                bottom: 12, right: 12,
                width: 36, height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0396A6, #6644cc)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(68,34,174,0.35)',
                cursor: 'pointer',
                zIndex: 30,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              {/* Notification dot */}
              <div style={{
                position: 'absolute', top: -1, right: -1,
                width: 10, height: 10,
                borderRadius: '50%',
                background: '#ff5f57',
                border: '2px solid #f8f7fc',
              }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Chat Panel ────────────────────────── */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              key="chat-panel"
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              style={{
                position: 'absolute',
                bottom: 8, right: 8,
                width: 200,
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.06)',
                zIndex: 40,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Chat header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 10px',
                background: 'linear-gradient(135deg, #0396A6, #5533bb)',
                color: '#fff',
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9,
                }}>❄</div>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>Frosty</div>
                  <div style={{ fontSize: 7, opacity: 0.8, fontFamily: "'DM Sans', sans-serif" }}>AI Assistant · Online</div>
                </div>
              </div>

              {/* Chat greeting */}
              <div style={{
                padding: '6px 10px',
                background: '#faf9fe',
                borderBottom: '1px solid rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  fontSize: 8, color: '#666',
                  fontFamily: "'DM Sans', sans-serif",
                  lineHeight: 1.4,
                }}>
                  👋 Hi! How can I help you today?
                </div>
              </div>

              {/* Messages area */}
              <div style={{
                padding: '6px 8px',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                minHeight: 80,
                maxHeight: 120,
                overflowY: 'auto',
              }}>
                {showQ1 && <ChatBubble role="user" text={q1Text} />}
                {showA1 && showTypingIndicator && phase === 'REPLY_A1' && a1Text.length < CONVERSATION[1].text.length && (
                  <div style={{
                    alignSelf: 'flex-start',
                    display: 'flex', gap: 3,
                    padding: '6px 10px',
                    borderRadius: 10,
                    background: '#0396A6',
                  }}>
                    <span className="hero-typing-dot" style={{ animationDelay: '0ms' }} />
                    <span className="hero-typing-dot" style={{ animationDelay: '150ms' }} />
                    <span className="hero-typing-dot" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
                {showA1 && a1Text.length > 0 && <ChatBubble role="bot" text={a1Text} />}
                {showQ2 && <ChatBubble role="user" text={q2Text} />}
                {showA2 && showTypingIndicator && phase === 'REPLY_A2' && a2Text.length < CONVERSATION[3].text.length && (
                  <div style={{
                    alignSelf: 'flex-start',
                    display: 'flex', gap: 3,
                    padding: '6px 10px',
                    borderRadius: 10,
                    background: '#0396A6',
                  }}>
                    <span className="hero-typing-dot" style={{ animationDelay: '0ms' }} />
                    <span className="hero-typing-dot" style={{ animationDelay: '150ms' }} />
                    <span className="hero-typing-dot" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
                {showA2 && a2Text.length > 0 && <ChatBubble role="bot" text={a2Text} />}
              </div>

              {/* Chat input */}
              <div style={{
                padding: '6px 8px',
                borderTop: '1px solid rgba(0,0,0,0.06)',
                display: 'flex', alignItems: 'center', gap: 5,
              }}>
                <div style={{
                  flex: 1, background: '#f5f5f7', borderRadius: 6,
                  padding: '5px 8px', fontSize: 8, color: '#aaa',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  Type a message...
                </div>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: '#0396A6', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Animated Cursor ────────────────────── */}
        <AnimatedCursor phase={phase} />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION — MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const [phase, setPhase] = useState<AnimPhase>('IDLE');
  const [reducedMotion, setReducedMotion] = useState(false);
  const phaseRef = useRef<AnimPhase>('IDLE');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect reduced motion preference
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Typing effects
  const isQ1Active = phase === 'TYPE_Q1';
  const isA1Active = phase === 'REPLY_A1';
  const isQ2Active = phase === 'TYPE_Q2';
  const isA2Active = phase === 'REPLY_A2';

  const q1Typing = useTypingEffect(CONVERSATION[0].text, isQ1Active, 50);
  const a1Typing = useTypingEffect(CONVERSATION[1].text, isA1Active, 22);
  const q2Typing = useTypingEffect(CONVERSATION[2].text, isQ2Active, 50);
  const a2Typing = useTypingEffect(CONVERSATION[3].text, isA2Active, 22);

  // Keep shown text sticky once typed
  const [q1Final, setQ1Final] = useState('');
  const [a1Final, setA1Final] = useState('');
  const [q2Final, setQ2Final] = useState('');
  const [a2Final, setA2Final] = useState('');

  useEffect(() => { if (q1Typing.done) setQ1Final(CONVERSATION[0].text); }, [q1Typing.done]);
  useEffect(() => { if (a1Typing.done) setA1Final(CONVERSATION[1].text); }, [a1Typing.done]);
  useEffect(() => { if (q2Typing.done) setQ2Final(CONVERSATION[2].text); }, [q2Typing.done]);
  useEffect(() => { if (a2Typing.done) setA2Final(CONVERSATION[3].text); }, [a2Typing.done]);

  // Reset finals on cycle restart
  useEffect(() => {
    if (phase === 'IDLE') {
      setQ1Final(''); setA1Final(''); setQ2Final(''); setA2Final('');
    }
  }, [phase]);

  const q1Display = q1Final || q1Typing.displayed;
  const a1Display = a1Final || a1Typing.displayed;
  const q2Display = q2Final || q2Typing.displayed;
  const a2Display = a2Final || a2Typing.displayed;

  // Phase advancement
  const advancePhase = useCallback(() => {
    const currentIdx = PHASE_ORDER.indexOf(phaseRef.current);
    const nextIdx = (currentIdx + 1) % PHASE_ORDER.length;
    const nextPhase = PHASE_ORDER[nextIdx];
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      // Show final state without animation
      setPhase('PAUSE');
      setQ1Final(CONVERSATION[0].text);
      setA1Final(CONVERSATION[1].text);
      setQ2Final(CONVERSATION[2].text);
      setA2Final(CONVERSATION[3].text);
      return;
    }

    // Auto-advance for non-typing phases
    const nonTypingPhases: AnimPhase[] = ['IDLE', 'CURSOR_MOVE', 'CURSOR_CLICK', 'CHAT_OPEN', 'PAUSE', 'FADE_RESET'];
    if (nonTypingPhases.includes(phase)) {
      timerRef.current = setTimeout(advancePhase, PHASE_DURATIONS[phase]);
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }
  }, [phase, advancePhase, reducedMotion]);

  // Advance on typing completion
  useEffect(() => { if (q1Typing.done && phase === 'TYPE_Q1') advancePhase(); }, [q1Typing.done, phase, advancePhase]);
  useEffect(() => { if (a1Typing.done && phase === 'REPLY_A1') {
    timerRef.current = setTimeout(advancePhase, 400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }}, [a1Typing.done, phase, advancePhase]);
  useEffect(() => { if (q2Typing.done && phase === 'TYPE_Q2') advancePhase(); }, [q2Typing.done, phase, advancePhase]);
  useEffect(() => { if (a2Typing.done && phase === 'REPLY_A2') {
    timerRef.current = setTimeout(advancePhase, 400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }}, [a2Typing.done, phase, advancePhase]);

  return (
    <section
      id="hero"
      className="hero-section-root"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
      }}
    >
      {/* Subtle warm background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(68,34,174,0.04), transparent 70%), radial-gradient(ellipse 60% 50% at 80% 30%, rgba(139,92,246,0.03), transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div className="hero-content-grid" style={{
        position: 'relative', zIndex: 10,
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 28px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '56px',
        alignItems: 'center',
      }}>
        {/* ── LEFT COLUMN ────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px',
              borderRadius: 999,
              background: 'rgba(68,34,174,0.06)',
              border: '1px solid rgba(68,34,174,0.1)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: '#0396A6',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#0396A6',
                boxShadow: '0 0 0 0 rgba(68,34,174,0.4)',
                animation: 'hero-pulse 2.4s infinite',
              }} />
              AI-Powered Customer Agent
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#1a1a2e',
              marginTop: 24,
              marginBottom: 0,
            }}
          >
            Your AI agent that{' '}
            <span style={{
              background: 'linear-gradient(135deg, #0396A6, #7c5fd6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              actually knows
            </span>{' '}
            your business.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: '#64748b',
              maxWidth: '48ch',
              marginTop: 20,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Frosty talks to your customers, answers questions using your real business knowledge, and helps turn conversations into customers.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 32 }}
          >
            <Link
              href="/login?mode=register"
              className="hero-cta-primary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #0396A6, #5533bb)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                textDecoration: 'none',
                boxShadow: '0 8px 24px -4px rgba(68,34,174,0.35)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              Build Your Agent
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="#how-it-works"
              className="hero-cta-secondary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px',
                borderRadius: 12,
                background: 'transparent',
                color: '#0396A6',
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                textDecoration: 'none',
                border: '1.5px solid rgba(68,34,174,0.2)',
                transition: 'transform 0.2s ease, border-color 0.2s ease, background 0.2s ease',
                cursor: 'pointer',
              }}
            >
              See How It Works
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 20,
              marginTop: 40,
              paddingTop: 24,
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {[
              { val: '500+', label: 'Businesses' },
              { val: '98%', label: 'Satisfaction' },
              { val: '3×', label: 'More Leads' },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>{m.val}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <LiveProductDemo
            phase={phase}
            q1Text={q1Display}
            a1Text={a1Display}
            q2Text={q2Display}
            a2Text={a2Display}
            isTypingQ1={isQ1Active && !q1Typing.done}
            isTypingQ2={isQ2Active && !q2Typing.done}
          />
        </motion.div>
      </div>
    </section>
  );
}
