"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Area, AreaChart, Bar, BarChart, Line, LineChart, Pie, PieChart, Cell,
  CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis 
} from "recharts";
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Activity, Settings } from "lucide-react";
import type { AnalyticsOverview } from "@/lib/types";

type Props = {
  overview: AnalyticsOverview | null;
};

export function AnalyticsCharts({ overview }: Props) {
  const [convoChartType, setConvoChartType] = useState<"area" | "bar" | "line">("area");
  const [leadChartType, setLeadChartType] = useState<"bar" | "pie">("bar");
  
  const [isConvoSettingsOpen, setConvoSettingsOpen] = useState(false);
  const [convoTimeframe, setConvoTimeframe] = useState<"day" | "week" | "month">("day");

  const [isLeadSettingsOpen, setLeadSettingsOpen] = useState(false);
  const [leadTimeframe, setLeadTimeframe] = useState<"day" | "week" | "month">("day");
  
  const formatXAxis = (isoStr: string) => {
    const d = new Date(`${isoStr}T12:00:00Z`);
    return d.toLocaleDateString(undefined, { weekday: "short" });
  };

  const conversationsData = overview?.conversations_by_day || [];
  
  const leadsTemp = overview?.leads_by_temperature;
  const funnelData = [
    { name: "Cold", value: leadsTemp?.cold || 0, fill: "#63b6d0" }, // frost
    { name: "Warm", value: leadsTemp?.warm || 0, fill: "#e8b76a" }, // warm
    { name: "Hot", value: leadsTemp?.hot || 0, fill: "#e8805e" }    // hot
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      
      {/* Conversations Volume */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-2 flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-background/40 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-6"
      >
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-serif font-semibold text-foreground">Conversation Volume</h2>
            <p className="text-sm text-muted-foreground">30-day interaction trends</p>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setConvoSettingsOpen(!isConvoSettingsOpen)}
              className="p-2 rounded-lg bg-black/20 border border-white/5 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
              title="Customize Chart"
            >
              <Settings className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {isConvoSettingsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-64 p-4 rounded-xl border border-white/10 bg-background/95 backdrop-blur-3xl shadow-xl z-50 flex flex-col gap-4"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Which chart do you want?</p>
                    <div className="flex items-center gap-2 bg-black/20 p-1 rounded-lg border border-white/5">
                      <button 
                        onClick={() => setConvoChartType("area")}
                        className={`flex-1 flex justify-center p-1.5 rounded-md transition-all ${convoChartType === "area" ? "bg-white/10 text-primary shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
                        title="Area Chart"
                      >
                        <Activity className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setConvoChartType("bar")}
                        className={`flex-1 flex justify-center p-1.5 rounded-md transition-all ${convoChartType === "bar" ? "bg-white/10 text-primary shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
                        title="Bar Chart"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setConvoChartType("line")}
                        className={`flex-1 flex justify-center p-1.5 rounded-md transition-all ${convoChartType === "line" ? "bg-white/10 text-primary shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
                        title="Line Chart"
                      >
                        <LineChartIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Data Grouping</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["Day", "Week", "Month"].map((tf) => (
                        <button
                          key={tf}
                          onClick={() => setConvoTimeframe(tf.toLowerCase() as any)}
                          className={`text-xs py-1.5 rounded-md border transition-all ${convoTimeframe === tf.toLowerCase() ? "border-primary/50 bg-primary/10 text-primary" : "border-white/5 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"}`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="h-[280px] w-full mt-auto">
          {conversationsData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              {convoChartType === "area" ? (
                <AreaChart data={conversationsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorConvo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tickFormatter={formatXAxis} axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(10, 10, 10, 0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} itemStyle={{ color: "#fff", fontWeight: 600 }} labelStyle={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }} />
                  <Area type="monotone" dataKey="conversations" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorConvo)" animationDuration={1000} />
                </AreaChart>
              ) : convoChartType === "bar" ? (
                <BarChart data={conversationsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="barConvo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)"/>
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.4}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tickFormatter={formatXAxis} axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.03)" }} contentStyle={{ backgroundColor: "rgba(10, 10, 10, 0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} itemStyle={{ color: "#fff", fontWeight: 600 }} labelStyle={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }} />
                  <Bar dataKey="conversations" fill="url(#barConvo)" radius={[4, 4, 0, 0]} animationDuration={1000} />
                </BarChart>
              ) : (
                <LineChart data={conversationsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tickFormatter={formatXAxis} axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(10, 10, 10, 0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} itemStyle={{ color: "#fff", fontWeight: 600 }} labelStyle={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }} />
                  <Line type="monotone" dataKey="conversations" stroke="var(--primary)" strokeWidth={3} dot={{ fill: "var(--primary)", r: 4, strokeWidth: 0 }} animationDuration={1000} />
                </LineChart>
              )}
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground/60 text-sm">
              No conversation data available yet
            </div>
          )}
        </div>
      </motion.section>

      {/* Leads Funnel */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="lg:col-span-1 flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-background/40 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-6"
      >
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-serif font-semibold text-foreground">Lead Intent</h2>
            <p className="text-sm text-muted-foreground">Temperature distribution</p>
          </div>
          <div className="relative">
            <button 
              onClick={() => setLeadSettingsOpen(!isLeadSettingsOpen)}
              className="p-2 rounded-lg bg-black/20 border border-white/5 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
              title="Customize Chart"
            >
              <Settings className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {isLeadSettingsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-64 p-4 rounded-xl border border-white/10 bg-background/95 backdrop-blur-3xl shadow-xl z-50 flex flex-col gap-4"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Which chart do you want?</p>
                    <div className="flex items-center gap-2 bg-black/20 p-1 rounded-lg border border-white/5">
                      <button 
                        onClick={() => setLeadChartType("bar")}
                        className={`flex-1 flex justify-center p-1.5 rounded-md transition-all ${leadChartType === "bar" ? "bg-white/10 text-primary shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
                        title="Bar Chart"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setLeadChartType("pie")}
                        className={`flex-1 flex justify-center p-1.5 rounded-md transition-all ${leadChartType === "pie" ? "bg-white/10 text-primary shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
                        title="Pie Chart"
                      >
                        <PieChartIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Data Grouping</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["Day", "Week", "Month"].map((tf) => (
                        <button
                          key={tf}
                          onClick={() => setLeadTimeframe(tf.toLowerCase() as any)}
                          className={`text-xs py-1.5 rounded-md border transition-all ${leadTimeframe === tf.toLowerCase() ? "border-primary/50 bg-primary/10 text-primary" : "border-white/5 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"}`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="h-[280px] w-full mt-auto">
          {funnelData.some(d => d.value > 0) ? (
            <ResponsiveContainer width="100%" height="100%">
              {leadChartType === "bar" ? (
                <BarChart data={funnelData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 500 }} width={50} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.03)" }} contentStyle={{ backgroundColor: "rgba(10, 10, 10, 0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }} itemStyle={{ color: "#fff", fontWeight: 600 }} formatter={(value) => [value, "Leads"]} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} animationDuration={1000}>
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={funnelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1000}
                    stroke="none"
                  >
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "rgba(10, 10, 10, 0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }} itemStyle={{ color: "#fff", fontWeight: 600 }} formatter={(value) => [value, "Leads"]} />
                </PieChart>
              )}
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground/60 text-sm">
              No lead data available yet
            </div>
          )}
        </div>
      </motion.section>

    </div>
  );
}
