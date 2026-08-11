/** Display formatting. Kept in one file so numbers read the same on every screen. */

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const NUM = new Intl.NumberFormat("en-IN");

export function inr(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return INR.format(value);
}

export function num(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return NUM.format(value);
}

/** Credits are fractional (a turn can cost less than one), so show up to two places. */
export function credits(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return value.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

export function dateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function dateOnly(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

/** "3 minutes ago" / "in 28 minutes" — used for impersonation expiry and alert age. */
export function relative(iso: string | null | undefined): string {
  if (!iso) return "—";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const deltaSec = Math.round((then - Date.now()) / 1000);
  const abs = Math.abs(deltaSec);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (abs < 60) return rtf.format(deltaSec, "second");
  if (abs < 3600) return rtf.format(Math.round(deltaSec / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(deltaSec / 3600), "hour");
  return rtf.format(Math.round(deltaSec / 86400), "day");
}

/** A uuid is unreadable in a table cell; the first segment is enough to correlate. */
export function shortId(id: string | null | undefined): string {
  if (!id) return "—";
  return id.length > 12 ? `${id.slice(0, 8)}…` : id;
}

export function titleCase(value: string | null | undefined): string {
  if (!value) return "—";
  return value.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * A date-time in the merchant's timezone, for a meeting row.
 *
 * Ported from the parallel build's `formatWhen`. The timezone argument matters more than it looks:
 * `meetings.timezone` is stored per meeting (`Asia/Kolkata` by default), and rendering a booking in
 * the READER's local zone is how a merchant in Delhi and an attendee in London disagree about when
 * the call is. An invalid zone falls back to the reader's rather than throwing — `Intl` raises a
 * RangeError on a bad `timeZone`, which would blank the whole list over one bad row.
 */
export function formatWhen(iso: string | null | undefined, timeZone?: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const opts: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  };
  if (timeZone) {
    try {
      return d.toLocaleString("en-IN", { ...opts, timeZone, timeZoneName: "short" });
    } catch {
      /* an unknown zone falls through to the reader's own */
    }
  }
  return d.toLocaleString("en-IN", opts);
}

/**
 * An ISO instant as a value for `<input type="datetime-local">`.
 *
 * ⚠️ DELIBERATELY IN THE BROWSER'S LOCAL ZONE, because that is the only thing the control accepts —
 * `datetime-local` has no zone, and the browser interprets whatever string it is given as local.
 * Feeding it a UTC string silently shifts the displayed time by the reader's offset, which for
 * Asia/Kolkata is five and a half hours: a reschedule form that opens on the wrong time.
 */
export function toLocalInputValue(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function bytes(value: number | null | undefined): string {
  if (value === null || value === undefined || value === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(value) / Math.log(k));
  return `${parseFloat((value / Math.pow(k, i)).toFixed(1))} ${sizes[i] || "B"}`;
}
