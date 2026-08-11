"use client";

import React from "react";

export type TimelineRange = {
  label: string;
  days: number;
};

export const DEFAULT_TIMELINE_RANGES: TimelineRange[] = [
  { label: "7d", days: 7 },
  { label: "14d", days: 14 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
];

export type TimelineFilterProps = {
  value: number;
  onChange: (days: number) => void;
  ranges?: TimelineRange[];
  disabled?: boolean;
  className?: string;
};

export function TimelineFilter({
  value,
  onChange,
  ranges = DEFAULT_TIMELINE_RANGES,
  disabled = false,
  className = "",
}: TimelineFilterProps) {
  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl border border-[#E2DCEF] bg-white shadow-sm ${className}`}
      style={{ background: "#FFFFFF" }}
    >
      {ranges.map((r) => {
        const isActive = value === r.days;
        return (
          <button
            key={r.days}
            type="button"
            onClick={() => onChange(r.days)}
            disabled={disabled}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
              isActive
                ? "bg-[#6C3FBF] text-white shadow-[0_4px_12px_rgba(108,63,191,0.3)]"
                : "text-[#64748B] hover:text-[#111318] bg-transparent"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {r.label}
          </button>
        );
      })}
    </div>
  );
}
