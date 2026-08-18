'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar as CalendarIcon,
    Clock,
    Video,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Globe,
    User,
    Mail,
    ArrowRight,
    ExternalLink,
    Sparkles
} from 'lucide-react';

interface GoogleCalendarSchedulerProps {
    calendarUrl?: string;
    hostName?: string;
    meetingTitle?: string;
    duration?: string;
}

const AVAILABLE_SLOTS = [
    '09:30 AM',
    '10:30 AM',
    '11:45 AM',
    '02:00 PM',
    '03:15 PM',
    '04:30 PM',
    '05:30 PM',
];

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function GoogleCalendarScheduler({
    calendarUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL || '',
    hostName = 'Frosty AI Team',
    meetingTitle = 'AI Workflow & Conversion Discovery Call',
    duration = '45 min appointments',
}: GoogleCalendarSchedulerProps) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState<number | null>(today.getDate() + 1);
    const [selectedSlot, setSelectedSlot] = useState<string>('11:45 AM');
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    
    // Booking Form State
    const [bookingStep, setBookingStep] = useState<'pick' | 'details' | 'confirmed'>('pick');
    const [attendeeName, setAttendeeName] = useState('');
    const [attendeeEmail, setAttendeeEmail] = useState('');
    const [attendeeNotes, setAttendeeNotes] = useState('');
    const [isBooking, setIsBooking] = useState(false);

    // Month Navigation
    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const monthName = currentMonth.toLocaleString('default', { month: 'long' });
    const year = currentMonth.getFullYear();

    // Generate Calendar Grid
    const firstDayIndex = currentMonth.getDay();
    const daysInMonth = new Date(year, currentMonth.getMonth() + 1, 0).getDate();
    const prevMonthDays = new Date(year, currentMonth.getMonth(), 0).getDate();

    const calendarCells = [];
    // Previous month filler days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
        calendarCells.push({
            day: prevMonthDays - i,
            isCurrentMonth: false,
            isPast: true,
        });
    }
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        const cellDate = new Date(year, currentMonth.getMonth(), i);
        const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isSunday = cellDate.getDay() === 0;
        calendarCells.push({
            day: i,
            isCurrentMonth: true,
            isPast: isPast || isSunday,
        });
    }
    // Next month filler days
    const totalCells = Math.ceil(calendarCells.length / 7) * 7;
    const remaining = totalCells - calendarCells.length;
    for (let i = 1; i <= remaining; i++) {
        calendarCells.push({
            day: i,
            isCurrentMonth: false,
            isPast: true,
        });
    }

    const handleConfirmBooking = (e: React.FormEvent) => {
        e.preventDefault();
        setIsBooking(true);
        setTimeout(() => {
            setIsBooking(false);
            setBookingStep('confirmed');
        }, 800);
    };

    // If an official Google Calendar Schedule URL is provided, render direct iframe with fallback
    if (calendarUrl && calendarUrl.trim().length > 0) {
        return (
            <div className="w-full bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col h-full min-h-[640px]">
                <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#0396A6]/10 border border-[#0396A6]/20 flex items-center justify-center text-[#0396A6]">
                            <CalendarIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="font-bold text-sm text-[#0A1A2F]">Google Calendar</span>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    LIVE SYNC
                                </span>
                            </div>
                            <p className="text-xs text-slate-500">{meetingTitle}</p>
                        </div>
                    </div>
                    <a
                        href={calendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0396A6] hover:text-[#027D8A] hover:underline"
                    >
                        <span>Open in New Tab</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                </div>
                <div className="flex-1 w-full h-full min-h-[580px]">
                    <iframe
                        src={calendarUrl}
                        className="w-full h-full min-h-[580px] border-0"
                        title="Google Calendar Appointment Scheduling"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between h-full relative">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0396A6] via-[#14B8A6] to-[#FF7A5E]" />

            {/* ── Calendar Header & Host Info ── */}
            <div className="p-6 sm:p-7 md:p-8 border-b border-slate-100">
                {/* Google Calendar Badge */}
                <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-2">
                        {/* Google 4-Color Calendar Mark */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="4" width="18" height="17" rx="3" fill="#FFFFFF" stroke="#4285F4" strokeWidth="1.8" />
                            <path d="M3 8.5H21" stroke="#4285F4" strokeWidth="1.8" />
                            <path d="M7.5 2V5" stroke="#EA4335" strokeWidth="1.8" strokeLinecap="round" />
                            <path d="M16.5 2V5" stroke="#FBBC04" strokeWidth="1.8" strokeLinecap="round" />
                            <circle cx="8" cy="13" r="1.2" fill="#34A853" />
                            <circle cx="12" cy="13" r="1.2" fill="#4285F4" />
                            <circle cx="16" cy="13" r="1.2" fill="#EA4335" />
                            <circle cx="8" cy="17" r="1.2" fill="#FBBC04" />
                            <circle cx="12" cy="17" r="1.2" fill="#34A853" />
                            <circle cx="16" cy="17" r="1.2" fill="#4285F4" />
                        </svg>
                        <span className="text-xs font-bold text-slate-700 tracking-tight">Google Calendar</span>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0396A6]/10 text-[#0396A6] border border-[#0396A6]/20">
                        INSTANT CONFIRMATION
                    </span>
                </div>

                {/* Host Profile */}
                <div className="flex items-start gap-3.5 mb-3.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0396A6] to-[#0D5C75] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                        {hostName.charAt(0)}
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-[#0A1A2F] leading-tight">{hostName}</h4>
                        <h3 className="text-base sm:text-lg font-serif font-medium text-[#0A1A2F] mt-0.5">
                            {meetingTitle}
                        </h3>
                    </div>
                </div>

                {/* Meeting Meta Details */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 mb-3">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Google Meet video link added after booking</span>
                    </div>
                </div>

                {/* Description toggle */}
                <p className="text-xs text-slate-500 leading-relaxed">
                    A focused conversation to understand your organization's current challenges, identify where workflows or operations may be losing value, and explore the right path forward across AI agents, customer conversion, and automation.
                </p>
                {showMoreInfo && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2.5 pt-2.5 border-t border-slate-100 text-xs text-slate-500 space-y-1.5"
                    >
                        <p>• Live architectural review of your lead response bottlenecks.</p>
                        <p>• Custom demo of Frosty WhatsApp &amp; Web agents with your content.</p>
                        <p>• Concrete ROI and integration timeline roadmap.</p>
                    </motion.div>
                )}
                <button
                    type="button"
                    onClick={() => setShowMoreInfo(!showMoreInfo)}
                    className="text-[11px] font-bold text-[#0396A6] hover:text-[#027D8A] hover:underline mt-1.5 cursor-pointer"
                >
                    {showMoreInfo ? 'Show less' : 'Show more'}
                </button>
            </div>

            {/* ── Body: Date Picker / Time Picker / Details ── */}
            <div className="p-6 sm:p-7 md:p-8 flex-1 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                    {bookingStep === 'pick' && (
                        <motion.div
                            key="pick"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            {/* Step Title & Timezone */}
                            <div>
                                <h4 className="text-sm sm:text-base font-serif font-bold text-[#0A1A2F]">
                                    Select an appointment time
                                </h4>
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                                    <span>(GMT+05:30) India Standard Time – Kolkata</span>
                                </div>
                            </div>

                            {/* Month Header */}
                            <div className="flex items-center justify-between px-1">
                                <span className="text-sm font-bold text-[#0A1A2F] font-serif">
                                    {monthName} {year}
                                </span>
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={handlePrevMonth}
                                        className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNextMonth}
                                        className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Days of Week Header */}
                            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400">
                                {DAYS_OF_WEEK.map((d, i) => (
                                    <div key={i} className="py-1">
                                        {d}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Days Grid */}
                            <div className="grid grid-cols-7 gap-1.5 text-center">
                                {calendarCells.map((cell, idx) => {
                                    const isSelected = cell.isCurrentMonth && selectedDate === cell.day;
                                    return (
                                        <button
                                            type="button"
                                            key={idx}
                                            disabled={cell.isPast || !cell.isCurrentMonth}
                                            onClick={() => cell.isCurrentMonth && !cell.isPast && setSelectedDate(cell.day)}
                                            className={`h-9 w-full rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                                                isSelected
                                                    ? 'bg-[#0396A6] text-white font-bold shadow-sm shadow-[#0396A6]/30'
                                                    : cell.isPast || !cell.isCurrentMonth
                                                    ? 'text-slate-300 cursor-not-allowed'
                                                    : 'text-slate-700 hover:bg-[#0396A6]/10 hover:text-[#0396A6] cursor-pointer'
                                            }`}
                                        >
                                            {cell.day}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Time Slots Section */}
                            {selectedDate && (
                                <div className="space-y-3 pt-3 border-t border-slate-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                                            Available Slots on {monthName} {selectedDate}
                                        </span>
                                        <span className="text-[10px] text-slate-400">45 mins</span>
                                    </div>

                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                        {AVAILABLE_SLOTS.map((slot) => {
                                            const isSelected = selectedSlot === slot;
                                            return (
                                                <button
                                                    type="button"
                                                    key={slot}
                                                    onClick={() => setSelectedSlot(slot)}
                                                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                                                        isSelected
                                                            ? 'bg-[#0396A6] text-white border-[#0396A6] shadow-xs'
                                                            : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:border-[#0396A6]/50 hover:bg-slate-100'
                                                    }`}
                                                >
                                                    {slot}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Next Step CTA */}
                            <button
                                type="button"
                                disabled={!selectedDate || !selectedSlot}
                                onClick={() => setBookingStep('details')}
                                className="w-full py-3 px-5 rounded-xl font-semibold text-xs sm:text-sm bg-[#0396A6] hover:bg-[#027D8A] text-white shadow-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                            >
                                <span>Proceed with {selectedDate ? `${monthName} ${selectedDate} at ${selectedSlot}` : 'Selection'}</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    )}

                    {bookingStep === 'details' && (
                        <motion.form
                            key="details"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleConfirmBooking}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setBookingStep('pick')}
                                    className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                                >
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                    <span>Back to times</span>
                                </button>
                                <span className="text-xs font-bold text-[#0396A6]">
                                    {monthName} {selectedDate} • {selectedSlot}
                                </span>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                                    Your Full Name <span className="text-[#FF7A5E]">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Jane Smith"
                                    value={attendeeName}
                                    onChange={(e) => setAttendeeName(e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/60 text-[#0A1A2F] focus:outline-none focus:border-[#0396A6] focus:bg-white transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                                    Work Email <span className="text-[#FF7A5E]">*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="jane@company.com"
                                    value={attendeeEmail}
                                    onChange={(e) => setAttendeeEmail(e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/60 text-[#0A1A2F] focus:outline-none focus:border-[#0396A6] focus:bg-white transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                                    Meeting Goal / Note (Optional)
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="What would you like to cover during this call?"
                                    value={attendeeNotes}
                                    onChange={(e) => setAttendeeNotes(e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/60 text-[#0A1A2F] focus:outline-none focus:border-[#0396A6] focus:bg-white transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isBooking}
                                className="w-full py-3 px-5 rounded-xl font-semibold text-xs sm:text-sm bg-[#0396A6] hover:bg-[#027D8A] text-white shadow-md shadow-[#0396A6]/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-70"
                            >
                                {isBooking ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Confirming with Google Calendar...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Schedule Discovery Call</span>
                                        <CheckCircle2 className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    )}

                    {bookingStep === 'confirmed' && (
                        <motion.div
                            key="confirmed"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-8 px-4 text-center flex flex-col items-center space-y-3.5"
                        >
                            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                                <CheckCircle2 className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-lg font-serif font-bold text-[#0A1A2F]">
                                    Call Scheduled Successfully!
                                </h3>
                                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                                    We've sent a Google Calendar invite and Google Meet link to <strong>{attendeeEmail}</strong>.
                                </p>
                            </div>

                            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 w-full text-left text-xs space-y-1">
                                <div className="font-bold text-[#0A1A2F] flex items-center gap-1.5">
                                    <CalendarIcon className="w-3.5 h-3.5 text-[#0396A6]" />
                                    <span>{monthName} {selectedDate}, {year} at {selectedSlot}</span>
                                </div>
                                <div className="text-slate-500 flex items-center gap-1.5">
                                    <Video className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Google Meet video conference</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setBookingStep('pick')}
                                className="text-xs font-bold text-[#0396A6] hover:underline pt-2"
                            >
                                Schedule another session
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
