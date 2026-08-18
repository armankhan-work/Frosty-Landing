"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Inbox, Book, FlaskConical, UserPlus, ArrowRight } from "lucide-react";

export function QuickActions() {
  const actions = [
    { label: "Open Inbox", href: "/inbox", icon: <Inbox className="w-5 h-5 text-blue-400" />, desc: "Chat with live users" },
    { label: "Add Knowledge", href: "/knowledge", icon: <Book className="w-5 h-5 text-teal-400" />, desc: "Train your agents" },
    { label: "Open Sandbox", href: "/sandbox", icon: <FlaskConical className="w-5 h-5 text-teal-400" />, desc: "Test AI responses" },
    { label: "Invite Team", href: "/team", icon: <UserPlus className="w-5 h-5 text-orange-400" />, desc: "Collaborate together" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-3"
      >
        {actions.map((action, idx) => (
          <motion.div key={idx} variants={item}>
            <Link href={action.href} className="group block h-full">
              <div className="relative overflow-hidden h-full p-4 rounded-2xl border border-white/5 bg-background/40 backdrop-blur-md shadow-sm hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300">
                <div className="mb-3 bg-white/5 w-10 h-10 rounded-full flex items-center justify-center border border-white/5 group-hover:scale-110 group-hover:bg-white/10 transition-transform">
                  {action.icon}
                </div>
                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  {action.label}
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                </h4>
                <p className="text-[11px] text-muted-foreground/60 mt-1.5">{action.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
