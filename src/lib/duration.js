// ---------------------------------------------------------------------------
// Turns the start/end dates in portfolio.js into readable periods and
// durations, so a current role's length keeps counting on its own.
// ---------------------------------------------------------------------------

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-04-01" → Date, parsed as local time (not UTC) so days don't shift. */
function parse(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/** Calendar difference, borrowing days from the previous month like a human would. */
export function diffParts(start, end) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }
  return { years, months, days };
}

/** { years, months, days } → "1 yr 3 mos 25 days" */
export function formatDuration(start, end, { withDays = true } = {}) {
  const { years, months, days } = diffParts(start, end);
  const parts = [];
  if (years) parts.push(plural(years, "yr", "yrs"));
  if (months) parts.push(plural(months, "mo", "mos"));
  if (withDays && days) parts.push(plural(days, "day", "days"));
  return parts.length ? parts.join(" ") : "Started today";
}

/** Whole months between two months, counting both ends — used when only the month is known. */
function monthSpan(start, end) {
  const total = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  return [years && plural(years, "yr", "yrs"), months && plural(months, "mo", "mos")]
    .filter(Boolean)
    .join(" ");
}

const label = (date, precision) =>
  precision === "month"
    ? `${MONTHS[date.getMonth()]} ${date.getFullYear()}`
    : `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

/**
 * Builds the date range and the duration shown on a job card.
 * `now` is passed in so the server and the first client render agree;
 * once mounted, the live date keeps an ongoing role's duration current.
 */
export function formatPeriod(job, now) {
  if (!job.start) return { range: job.period, duration: null };

  const precision = job.precision ?? "day";
  const start = parse(job.start);
  const ongoing = !job.end;
  const end = ongoing ? now ?? start : parse(job.end);

  const range = `${label(start, precision)} – ${ongoing ? "Present" : label(end, precision)}`;

  // Month-only dates can't produce an honest day count.
  if (precision === "month") {
    return { range, duration: monthSpan(start, end) };
  }

  return { range, duration: formatDuration(start, end) };
}
