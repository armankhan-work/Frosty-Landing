'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Snowflake, Sun, Globe, Mail, MessageCircle, AlertCircle, User, ArrowRight, NotebookPen } from 'lucide-react';

interface Interaction {
  id: string;
  channel: 'Website' | 'WhatsApp' | 'Email';
  action: string;
  time: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

interface Lead {
  id: string;
  name: string;
  action: string;
  score: number;
  state: 'entering' | 'scoring' | 'segregating' | 'done';
  category?: 'hot' | 'warm' | 'cold';
  avatar: string;
}

const INITIAL_INTERACTIONS: Interaction[] = [
  { id: '1', channel: 'Website', action: 'Visited pricing page', time: '10:24 AM', icon: <Globe className="w-4 h-4" />, color: 'text-[#C4B5FD]', bgColor: 'bg-[#5F23C8]/20' },
  { id: '2', channel: 'WhatsApp', action: 'Asked for bulk order discount', time: '10:26 AM', icon: <MessageCircle className="w-4 h-4" />, color: 'text-[#34D399]', bgColor: 'bg-[#10B981]/20' }
];

const INCOMING_LEADS = [
  { name: 'Sarah Jenkins', action: 'Viewed case study', score: 55, avatar: 'https://i.pravatar.cc/150?img=5', category: 'warm' as const },
  { name: 'James Carter', action: 'Requested proposal', score: 82, avatar: 'https://i.pravatar.cc/150?img=68', category: 'hot' as const, isTrigger: true },
  { name: 'Emily Davis', action: 'Pricing enquiry', score: 68, avatar: 'https://i.pravatar.cc/150?img=20', category: 'warm' as const },
  { name: 'David Wilson', action: 'Downloaded brochure', score: 45, avatar: 'https://i.pravatar.cc/150?img=33', category: 'cold' as const }
];

export default function CRMLeadIntelligenceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // --- CRM State ---
  const [showProfile, setShowProfile] = useState(false);
  const [crmScore, setCrmScore] = useState(72);
  const [interactions, setInteractions] = useState<Interaction[]>(INITIAL_INTERACTIONS);
  const [showInsight, setShowInsight] = useState(false);

  // --- Live Leads State ---
  const [activeLeads, setActiveLeads] = useState<Lead[]>([
    { id: 'l1', name: 'Jessica Taylor', action: 'Pricing enquiry', score: 76, state: 'done', avatar: 'https://i.pravatar.cc/150?img=44' },
    { id: 'l2', name: 'Robert Brown', action: 'Request for quote', score: 76, state: 'done', avatar: 'https://i.pravatar.cc/150?img=60' },
    { id: 'l3', name: 'Amanda White', action: 'Downloaded brochure', score: 61, state: 'done', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 'l4', name: 'Thomas Miller', action: 'Website visit', score: 42, state: 'done', avatar: 'https://i.pravatar.cc/150?img=8' }
  ]);

  const leadIndex = useRef(0);

  // --- Segregation Stats ---
  const [hotCount, setHotCount] = useState(12);
  const [warmCount, setWarmCount] = useState(28);
  const [coldCount, setColdCount] = useState(46);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.2 });
    
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // One-time animation for the CRM Profile when it opens
  useEffect(() => {
    if (!showProfile) return;
    let isAlive = true;

    const runProfileAnim = async () => {
      const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      await wait(800);
      if (!isAlive) return;
      
      setInteractions(prev => [
        ...prev, 
        { id: '3', channel: 'Email', action: 'Requested proposal', time: '10:31 AM', icon: <Mail className="w-4 h-4" />, color: 'text-[#A78BFA]', bgColor: 'bg-[#8B5CF6]/20' }
      ]);
      
      await wait(600);
      if (!isAlive) return;
      setCrmScore(78);
      
      await wait(600);
      if (!isAlive) return;
      setCrmScore(82);
      setShowInsight(true);
    };

    runProfileAnim();
    return () => { isAlive = false; };
  }, [showProfile]);

  useEffect(() => {
    if (!inView) return;

    let isAlive = true;
    const timers: NodeJS.Timeout[] = [];
    const wait = (ms: number) => new Promise<void>(resolve => {
      const t = setTimeout(resolve, ms);
      timers.push(t);
    });

    const runSimulation = async () => {
      while (isAlive) {
        // --- Stage 1: New Lead enters ---
        await wait(1000);
        if (!isAlive) break;
        
        let incoming = INCOMING_LEADS[leadIndex.current % INCOMING_LEADS.length];
        leadIndex.current += 1;
        
        // If we loop back around and James Carter is selected again, swap him out 
        // since the profile is already open and he shouldn't appear twice.
        if (incoming.isTrigger && showProfile) {
           incoming = { name: 'Michael Smith', action: 'Requested demo', score: 78, avatar: 'https://i.pravatar.cc/150?img=11', category: 'hot' as const } as typeof INCOMING_LEADS[0];
        }
        
        const newLeadId = Date.now().toString() + Math.random();
        
        const newLead: Lead = {
          id: newLeadId,
          name: incoming.name,
          action: incoming.action,
          score: incoming.score - 12, // start lower for the counting animation
          state: 'entering',
          avatar: incoming.avatar,
          category: incoming.category
        };
        
        // Add new lead at top, keep max 4 leads
        setActiveLeads(prev => [newLead, ...prev].slice(0, 4));

        // --- Stage 2: Lead Stream scoring a lead ---
        await wait(1000);
        if (!isAlive) break;
        
        setActiveLeads(prev => prev.map(l => l.id === newLeadId ? { ...l, state: 'scoring', score: l.score + 8 } : l));
        
        // If it's James Carter and he's now highlighted (scoring), open the profile!
        if (incoming.isTrigger) {
           setShowProfile(true);
        }
        
        await wait(800);
        setActiveLeads(prev => prev.map(l => l.id === newLeadId ? { ...l, score: incoming.score } : l));

        await wait(1200);
        setActiveLeads(prev => prev.map(l => l.id === newLeadId ? { ...l, state: 'segregating' } : l));
        
        await wait(800);
        if (!isAlive) break;
        
        if (incoming.category === 'hot') setHotCount(prev => prev + 1);
        else if (incoming.category === 'warm') setWarmCount(prev => prev + 1);
        else setColdCount(prev => prev + 1);

        // Instead of removing the lead, just set its state to 'done' so it stays in the list!
        setActiveLeads(prev => prev.map(l => l.id === newLeadId ? { ...l, state: 'done' } : l));

        // --- Stage 3: Wait before next lead ---
        await wait(1500);
      }
    };

    runSimulation();

    return () => {
      isAlive = false;
      timers.forEach(clearTimeout);
    };
  }, [inView]);

  return (
    <section ref={containerRef} className="relative w-full py-24 overflow-hidden z-10 flex flex-col items-center bg-transparent font-sans">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center overflow-hidden">
        {/* Right Purple Radial */}
        <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[800px] bg-[#5F23C8]/10 rounded-[100%] blur-[120px]" />
        {/* Left Purple Radial */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[600px] bg-[#5F23C8]/10 rounded-[100%] blur-[120px]" />
      </div>

      {/* --- HEADER --- */}
      <div className="relative z-10 text-center mb-16 max-w-2xl px-6">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-6 shadow-sm">
          <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#C4B5FD]">CRM + Lead Intelligence</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-4">
          Know every customer. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD]">Focus on the right ones.</span>
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Frosty keeps every interaction in one place and automatically prioritizes the leads that matter most.
        </p>
      </div>

      <div className="w-full flex flex-col items-center transform scale-[0.85] origin-top -mb-[100px] mt-4">
        
        {/* --- DYNAMIC COLUMN LAYOUT --- */}
        <motion.div 
          layout
          className={`relative z-10 w-full mx-auto px-6 grid grid-cols-1 gap-6 lg:gap-8 items-start ${showProfile ? 'max-w-[1280px] lg:grid-cols-[1.1fr_1fr_1.1fr]' : 'max-w-[900px] lg:grid-cols-2'}`}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          
          {/* ========================================================
              LEFT: CRM PROFILE (ANIMATES IN)
          ======================================================== */}
          <AnimatePresence mode="popLayout">
            {showProfile && (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9, x: -30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                className="bg-[#0D0F1A] border border-[#2A2E44] rounded-[24px] p-6 shadow-[0_24px_50px_rgba(0,0,0,0.4)] flex flex-col relative overflow-hidden"
              >
                
                {/* Subtle top glare */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#5F23C8]/50 to-transparent opacity-50" />

                {/* Profile Header */}
                <div className="flex items-start gap-4 mb-6 relative z-10">
                  <div className="w-[68px] h-[68px] rounded-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-[3px] border-[#1A1D2D] flex items-center justify-center shrink-0 overflow-hidden shadow-lg">
                     <img src="https://i.pravatar.cc/150?img=68" alt="James Carter" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-white font-bold text-[19px]">James Carter</h3>
                      <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#5F23C8]/15 text-[#C4B5FD] border border-[#5F23C8]/30 flex items-center gap-1 shadow-sm">
                        <Flame className="w-3 h-3" strokeWidth={2.5} /> High Intent
                      </div>
                    </div>
                    <p className="text-slate-400 text-[12px] font-medium">Bengaluru, India &nbsp;&bull;&nbsp; Repeat visitor</p>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-500 text-[9px] font-bold uppercase tracking-wider mb-1">Lead Score</div>
                    <div className="flex flex-col items-end">
                       <motion.div key={crmScore} className="text-[32px] font-bold text-white leading-none tracking-tight" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.3 }}>
                         {crmScore}
                       </motion.div>
                       {crmScore > 72 ? (
                         <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[#34D399] text-[11px] font-bold mt-1.5 flex items-center">
                           <ArrowRight className="w-3 h-3 rotate-[-45deg] mr-0.5" /> +{crmScore - 72}
                         </motion.div>
                       ) : (
                         <div className="h-[20px]" /> // Spacer
                       )}
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 border-b border-[#2A2E44] mb-6 relative z-10">
                  <div className="text-white text-[12px] font-semibold pb-3 border-b-2 border-[#A78BFA]">Overview</div>
                  <div className="text-slate-500 hover:text-slate-400 text-[12px] font-semibold pb-3 cursor-pointer transition-colors">Conversations</div>
                  <div className="text-slate-500 hover:text-slate-400 text-[12px] font-semibold pb-3 cursor-pointer transition-colors">Notes</div>
                  <div className="text-slate-500 hover:text-slate-400 text-[12px] font-semibold pb-3 cursor-pointer transition-colors">Deals</div>
                </div>

                <div className="flex-1 relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-white/90 text-[13px] font-semibold">Recent Interactions</h4>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse shadow-[0_0_8px_#34D399]" />
                      <span className="text-[10px] text-[#34D399] font-bold tracking-wide">Live</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-[13px] top-[10px] bottom-[10px] w-px bg-[#2A2E44] z-0" />
                    
                    <AnimatePresence>
                      {interactions.map((interaction) => (
                        <motion.div 
                          key={interaction.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="relative z-10 flex items-center gap-4"
                        >
                          {/* Timeline Node */}
                          <div className="relative">
                             <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-[#0D0F1A] border-2 border-slate-600 z-10`} />
                             <div className={`w-7 h-7 ml-4 rounded-full flex items-center justify-center shrink-0 ${interaction.bgColor} ${interaction.color}`}>
                               {interaction.icon}
                             </div>
                          </div>
                          
                          <div className="flex-1 flex justify-between items-center py-1">
                            <div>
                              <div className="text-white/90 text-[12.5px] font-semibold mb-0.5">{interaction.channel}</div>
                              <div className="text-slate-400 text-[11.5px]">{interaction.action}</div>
                            </div>
                            <div className="text-slate-500 text-[10px] font-medium">{interaction.time}</div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* AI Insight Box */}
                  <AnimatePresence>
                    {showInsight && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="bg-[#121424] border border-[#2A2E44] rounded-xl p-4 overflow-hidden relative"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#8B5CF6]" />
                        <div className="flex items-center gap-2 mb-2 pl-2">
                          <AlertCircle className="w-4 h-4 text-[#C4B5FD]" />
                          <span className="text-white text-[12px] font-bold">AI Insight</span>
                        </div>
                        <p className="text-slate-400 text-[12px] leading-[1.6] pl-2">
                          High buying intent. Interested in 100+ units.<br/>
                          Best time to reach out: <strong className="text-white/90 font-medium">Today.</strong>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex gap-3 mt-8 relative z-10">
                  <button className="flex-1 bg-[#5F23C8] hover:bg-[#7C3AED] text-white text-[12.5px] font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(95,35,200,0.3)]">
                    <MessageCircle className="w-4 h-4" /> Start Conversation
                  </button>
                  <button className="flex-1 bg-[#121424] border border-[#2A2E44] hover:bg-[#1A1D2D] text-white/90 text-[12.5px] font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                    <NotebookPen className="w-4 h-4 text-slate-400" /> Add Note
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ========================================================
              CENTER: LIVE LEADS STREAM
          ======================================================== */}
          <motion.div layout className="bg-[#0B0C15]/50 backdrop-blur-xl border border-white/5 rounded-[24px] p-6 flex flex-col relative overflow-hidden h-[600px]">
            
            <div className="flex items-center justify-between mb-6 z-10 relative">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse shadow-[0_0_8px_#34D399]" />
                <h3 className="text-white font-bold text-[15px]">Live Leads</h3>
              </div>
              <div className="bg-[#121424] border border-[#2A2E44] px-3 py-1 rounded-full text-[#C4B5FD] text-[10px] font-bold tracking-wide">
                12 this hour
              </div>
            </div>
            <p className="text-slate-500 text-[11.5px] mb-5 z-10 relative">New leads coming in</p>

            <div className="flex-1 relative z-10 w-full">
               <AnimatePresence initial={false}>
                 {activeLeads.map((lead) => (
                   <motion.div
                      key={lead.id}
                      layout
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: lead.state === 'scoring' ? 1.02 : 1,
                        x: lead.state === 'segregating' ? 40 : 0
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className={`mb-3 p-3 rounded-[16px] flex items-center gap-3 border transition-colors duration-300 relative overflow-visible ${
                        lead.state === 'scoring' || lead.state === 'segregating'
                          ? (lead.category === 'hot' ? (lead.state === 'scoring' ? 'bg-gradient-to-r from-red-500/10 to-[#121424] border-red-500/30' : 'bg-gradient-to-r from-red-500/20 to-[#121424] border-red-500/50')
                             : lead.category === 'warm' ? (lead.state === 'scoring' ? 'bg-gradient-to-r from-amber-500/10 to-[#121424] border-amber-500/30' : 'bg-gradient-to-r from-amber-500/20 to-[#121424] border-amber-500/50')
                             : (lead.state === 'scoring' ? 'bg-gradient-to-r from-blue-500/10 to-[#121424] border-blue-500/30' : 'bg-gradient-to-r from-blue-500/20 to-[#121424] border-blue-500/50'))
                          : 'bg-transparent border-transparent'
                      }`}
                   >
                      <div className="w-[38px] h-[38px] rounded-full bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
                        <img src={lead.avatar} alt={lead.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-[13px] font-bold truncate">{lead.name}</div>
                        <div className="text-slate-400 text-[11px] truncate">{lead.action}</div>
                      </div>
                      <div className="text-right pl-2 pr-2">
                        <motion.div 
                          className={`text-[18px] font-bold ${
                            (lead.state === 'scoring' || lead.state === 'segregating') 
                               ? (lead.category === 'hot' ? 'text-red-400' : lead.category === 'warm' ? 'text-amber-400' : 'text-blue-400') 
                               : 'text-[#334155]'
                          }`}
                          animate={lead.state === 'scoring' ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          {lead.score}
                        </motion.div>
                      </div>

                      {/* Animated arrow shooting across */}
                      {lead.state === 'scoring' && (
                        <motion.div 
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 80 }}
                          className="absolute right-[-80px] top-1/2 -translate-y-1/2 flex items-center z-50 pointer-events-none"
                        >
                          <div className={`h-[1px] w-full opacity-50 ${lead.category === 'hot' ? 'bg-gradient-to-r from-red-500' : lead.category === 'warm' ? 'bg-gradient-to-r from-amber-500' : 'bg-gradient-to-r from-blue-500'} to-transparent`} />
                          <ArrowRight className={`w-5 h-5 absolute right-0 -translate-y-1/2 top-1/2 ${lead.category === 'hot' ? 'text-red-500' : lead.category === 'warm' ? 'text-amber-500' : 'text-blue-500'}`} />
                        </motion.div>
                      )}
                   </motion.div>
                 ))}
               </AnimatePresence>
            </div>
            
            {/* Bottom gradient fade for the stream */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0C15] to-transparent pointer-events-none z-20" />
          </motion.div>

          {/* ========================================================
              RIGHT: LEAD SEGREGATION
          ======================================================== */}
          <motion.div layout className="flex flex-col relative h-[600px]">
            
            <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="text-white font-bold text-[15px]">Smart Lead Segregation</h3>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5F23C8]/15 border border-[#5F23C8]/30">
                <span className="w-3 h-3 text-[#C4B5FD]"><Flame className="w-full h-full" /></span>
                <span className="text-[9px] text-[#C4B5FD] font-bold uppercase tracking-wider">Auto prioritizing</span>
              </div>
            </div>

            <div className="space-y-4 flex-1 flex flex-col">
              
              {/* HOT LEADS */}
              <motion.div 
                className="relative p-5 rounded-[20px] border flex flex-col group overflow-hidden bg-gradient-to-br from-red-500/10 to-[#0D0F1A]"
                animate={activeLeads.some(l => l.state === 'segregating' && l.category === 'hot') ? { scale: 1.02, borderColor: 'rgba(239,68,68,0.5)', boxShadow: '0 0 40px rgba(239,68,68,0.15)' } : { scale: 1, borderColor: 'rgba(239,68,68,0.2)', boxShadow: 'none' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between mb-3 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-[42px] h-[42px] rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      <Flame className="w-[22px] h-[22px]" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-[15px]">Hot Leads</div>
                      <div className="text-slate-400 text-[11.5px]">Ready to engage</div>
                    </div>
                  </div>
                  <motion.div 
                    className="text-[32px] font-bold text-white leading-none"
                    key={hotCount}
                    initial={{ scale: 1.3, color: '#F87171' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                  >
                    {hotCount}
                  </motion.div>
                </div>
                <div className="flex items-center gap-3 pl-[58px]">
                   <div className="flex -space-x-2">
                     <img className="w-6 h-6 rounded-full border-2 border-[#151219]" src="https://i.pravatar.cc/150?img=1" alt="avatar" />
                     <img className="w-6 h-6 rounded-full border-2 border-[#151219]" src="https://i.pravatar.cc/150?img=2" alt="avatar" />
                     <img className="w-6 h-6 rounded-full border-2 border-[#151219]" src="https://i.pravatar.cc/150?img=3" alt="avatar" />
                   </div>
                   <div className="text-[#A78BFA] text-[10px] font-bold">+8</div>
                </div>
              </motion.div>

              {/* WARM LEADS */}
              <motion.div 
                className="relative p-5 rounded-[20px] border border-amber-500/10 bg-gradient-to-br from-amber-500/5 to-[#0D0F1A] flex flex-col group overflow-hidden"
                animate={activeLeads.some(l => l.state === 'segregating' && l.category === 'warm') ? { scale: 1.02, borderColor: 'rgba(245,158,11,0.5)', boxShadow: '0 0 40px rgba(245,158,11,0.15)' } : { scale: 1, borderColor: 'rgba(245,158,11,0.2)', boxShadow: 'none' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between mb-3 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-[42px] h-[42px] rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                      <Sun className="w-[22px] h-[22px]" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-[15px]">Warm Leads</div>
                      <div className="text-slate-400 text-[11.5px]">Showing interest</div>
                    </div>
                  </div>
                  <motion.div 
                    className="text-[32px] font-bold text-white leading-none"
                    key={warmCount}
                    initial={{ scale: 1.3, color: '#FCD34D' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                  >
                    {warmCount}
                  </motion.div>
                </div>
                <div className="flex items-center gap-3 pl-[58px]">
                   <div className="flex -space-x-2">
                     <img className="w-6 h-6 rounded-full border-2 border-[#151619]" src="https://i.pravatar.cc/150?img=4" alt="avatar" />
                     <img className="w-6 h-6 rounded-full border-2 border-[#151619]" src="https://i.pravatar.cc/150?img=5" alt="avatar" />
                     <img className="w-6 h-6 rounded-full border-2 border-[#151619]" src="https://i.pravatar.cc/150?img=6" alt="avatar" />
                   </div>
                   <div className="text-[#A78BFA] text-[10px] font-bold">+24</div>
                </div>
              </motion.div>

              {/* COLD LEADS */}
              <motion.div 
                className="relative p-5 rounded-[20px] border border-blue-500/10 bg-gradient-to-br from-blue-500/5 to-[#0D0F1A] flex flex-col group overflow-hidden"
                animate={activeLeads.some(l => l.state === 'segregating' && l.category === 'cold') ? { scale: 1.02, borderColor: 'rgba(59,130,246,0.5)', boxShadow: '0 0 40px rgba(59,130,246,0.15)' } : { scale: 1, borderColor: 'rgba(59,130,246,0.2)', boxShadow: 'none' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between mb-3 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-[42px] h-[42px] rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                      <Snowflake className="w-[22px] h-[22px]" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-[15px]">Cold Leads</div>
                      <div className="text-slate-400 text-[11.5px]">Low intent</div>
                    </div>
                  </div>
                  <motion.div 
                    className="text-[32px] font-bold text-white leading-none"
                    key={coldCount}
                    initial={{ scale: 1.3, color: '#93C5FD' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                  >
                    {coldCount}
                  </motion.div>
                </div>
                <div className="flex items-center gap-3 pl-[58px]">
                   <div className="flex -space-x-2">
                     <img className="w-6 h-6 rounded-full border-2 border-[#14161A]" src="https://i.pravatar.cc/150?img=7" alt="avatar" />
                     <img className="w-6 h-6 rounded-full border-2 border-[#14161A]" src="https://i.pravatar.cc/150?img=8" alt="avatar" />
                     <img className="w-6 h-6 rounded-full border-2 border-[#14161A]" src="https://i.pravatar.cc/150?img=9" alt="avatar" />
                   </div>
                   <div className="text-[#A78BFA] text-[10px] font-bold">+42</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </motion.div>

        {/* ========================================================
            BOTTOM STATS BAR
        ======================================================== */}
        <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 mt-12 hidden md:block">
           <div className="bg-transparent border-t border-b border-[#2A2E44] py-5 px-8 flex justify-between items-center">
             
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full border border-[#5F23C8]/40 flex items-center justify-center text-[#A78BFA]">
                  <User className="w-5 h-5" />
               </div>
               <div>
                 <div className="text-white font-bold text-[19px] leading-tight">2,453</div>
                 <div className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Total Customers</div>
               </div>
             </div>
             <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#2A2E44] to-transparent" />
             
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full border border-[#5F23C8]/40 flex items-center justify-center text-[#A78BFA]">
                  <ArrowRight className="w-5 h-5 rotate-[-45deg]" />
               </div>
               <div>
                 <div className="text-white font-bold text-[19px] leading-tight">312</div>
                 <div className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Active Conversations</div>
               </div>
             </div>
             <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#2A2E44] to-transparent" />

             <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full border border-[#5F23C8]/40 flex items-center justify-center text-[#A78BFA]">
                  <Globe className="w-5 h-5" />
               </div>
               <div>
                 <div className="text-white font-bold text-[19px] leading-tight">24.7%</div>
                 <div className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Lead to Deal Conversion</div>
               </div>
             </div>
             <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#2A2E44] to-transparent" />

             <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full border border-[#5F23C8]/40 flex items-center justify-center text-[#A78BFA]">
                  <AlertCircle className="w-5 h-5" />
               </div>
               <div>
                 <div className="text-white font-bold text-[19px] leading-tight">~60%</div>
                 <div className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Faster Follow-ups</div>
               </div>
             </div>

           </div>
        </div>
      </div>

    </section>
  );
}
