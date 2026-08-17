import { motion } from 'framer-motion';
import { Database, Zap, Wrench, UserCheck, ShieldCheck } from 'lucide-react';

const CARDS = [
    {
        title: "RAG knowledge engine",
        desc: "We feed Frosty your PDFs and crawl up to 200 pages of your site. It chunks, embeds and indexes them into a semantic brain - so answers are grounded in your content, never generic.",
        icon: <Database size={24} className="text-emerald-700" strokeWidth={1.5} />,
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        iconBg: "bg-white",
        span: "col-span-1 md:col-span-2 lg:col-span-2",
        titleColor: "text-emerald-900",
    },
    {
        title: "The right model for every task",
        desc: "Multi-model under the hood - Gemini and GPT-4o. Our team picks and tunes the best model for each job in your workspace.",
        icon: <Zap size={24} className="text-blue-700" strokeWidth={1.5} />,
        bg: "bg-blue-50",
        border: "border-blue-100",
        iconBg: "bg-white",
        span: "col-span-1 md:col-span-1 lg:col-span-1",
        titleColor: "text-blue-900",
    },
    {
        title: "Acts through your tools",
        desc: "Calendar for bookings, Gmail for follow-ups, Slack for alerts, WhatsApp for chat.",
        icon: <Wrench size={24} className="text-orange-700" strokeWidth={1.5} />,
        bg: "bg-orange-50",
        border: "border-orange-100",
        iconBg: "bg-white",
        span: "col-span-1 md:col-span-1 lg:col-span-1",
        titleColor: "text-orange-900",
    },
    {
        title: "Human-in-the-loop",
        desc: "Pause the agent in one click, take over live, auto-resume when you're done.",
        icon: <UserCheck size={24} className="text-teal-700" strokeWidth={1.5} />,
        bg: "bg-teal-50",
        border: "border-teal-100",
        iconBg: "bg-white",
        span: "col-span-1 md:col-span-1 lg:col-span-1",
        titleColor: "text-teal-900",
    },
    {
        title: "Secure & certified",
        desc: "ISO 27001 & ISO 9001 certified, GDPR-ready. Your content trains only your own agent.",
        icon: <ShieldCheck size={24} className="text-rose-700" strokeWidth={1.5} />,
        bg: "bg-rose-50",
        border: "border-rose-100",
        iconBg: "bg-white",
        span: "col-span-1 md:col-span-1 lg:col-span-1",
        titleColor: "text-rose-900",
    }
];

export default function PremiumBento() {
    return (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {CARDS.map((card, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className={`relative p-8 md:p-10 rounded-[32px] border ${card.bg} ${card.border} ${card.span} flex flex-col items-start text-left overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
                >
                    {/* Inner highlight for a premium glass feel */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none rounded-[32px]" />
                    
                    <div className="relative z-10 w-full">
                        <div className={`w-14 h-14 rounded-2xl ${card.iconBg} border ${card.border} shadow-sm flex items-center justify-center mb-6`}>
                            {card.icon}
                        </div>
                        <h3 className={`text-xl md:text-2xl font-bold mb-3 tracking-tight ${card.titleColor}`} style={{ fontFamily: 'var(--font-sans, "Inter", sans-serif)' }}>
                            {card.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-[15px] md:text-[16px] max-w-[90%]">
                            {card.desc}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
