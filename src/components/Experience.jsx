"use client";

import { useEffect, useMemo, useState } from "react";
import { experience, filters } from "@/data/portfolio";
import { formatPeriod } from "@/lib/duration";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function JobCard({ job, now }) {
  const { range, duration } = formatPeriod(job, now);

  return (
    <article className="surface group relative p-6 transition-colors duration-300 hover:border-accent-500/40 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-semibold text-mist-100">{job.role}</h3>
          <p className="mt-1 text-sm text-accent-300/90">{job.org}</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {job.current && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Current
            </span>
          )}
          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              job.featured
                ? "border-gold-400/40 bg-gold-400/10 text-gold-300"
                : "border-ink-600 bg-ink-800/60 text-mist-300"
            }`}
          >
            {range}
          </span>
        </div>
      </div>

      {duration && (
        <p className="mt-2 text-xs font-medium tracking-wide text-mist-400">{duration}</p>
      )}

      {job.summary && (
        <p className="mt-4 rounded-lg border-l-2 border-accent-500/50 bg-ink-800/40 px-4 py-3 text-sm text-mist-300">
          {job.summary}
        </p>
      )}

      {job.columns && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {job.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-mist-400">
                {col.title}
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm text-mist-300">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {job.pointsTitle && (
        <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-mist-400">
          {job.pointsTitle}
        </h4>
      )}

      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-mist-300">
        {job.points.map((point, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-500/70" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {job.extra && (
        <div className="mt-5 rounded-xl border border-ink-700 bg-ink-950/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-300">
            {job.extra.title}
          </p>
          <p className="mt-2 text-sm font-semibold text-mist-100">{job.extra.heading}</p>
          <p className="mt-1 text-sm text-mist-300">{job.extra.body}</p>
        </div>
      )}

      <ul className="mt-6 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <li key={tag} className="chip">
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Experience() {
  const [filter, setFilter] = useState("all");

  // Set after mount so the server render and the first client render match;
  // an ongoing role then counts from the visitor's own date.
  const [now, setNow] = useState(null);
  useEffect(() => setNow(new Date()), []);

  const visible = useMemo(
    () =>
      filter === "all"
        ? experience
        : experience.filter((job) => job.categories.includes(filter)),
    [filter]
  );

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-y border-ink-800/80 bg-ink-900/30 py-24 lg:py-28"
    >
      <div className="container-x">
        <SectionHeading
          kicker="02 — Experience"
          title="12+ years across education, administration & operations"
          subtitle="Filter by the kind of work you're hiring for."
        />

        <Reveal className="mt-10 flex flex-wrap gap-2.5">
          {filters.map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-accent-400 bg-accent-500/15 text-accent-300"
                    : "border-ink-700 text-mist-300 hover:border-ink-600 hover:text-mist-100"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </Reveal>

        {/* Timeline */}
        <ol className="relative mt-12 space-y-8 border-l border-ink-700 pl-6 sm:pl-10">
          {visible.map((job, i) => (
            <li key={`${job.role}-${job.org}`} className="relative">
              <span
                className={`absolute -left-[1.9rem] top-8 grid h-3.5 w-3.5 place-items-center rounded-full ring-4 ring-ink-950 sm:-left-[3.15rem] ${
                  job.featured ? "bg-gold-400" : "bg-accent-500"
                }`}
                aria-hidden="true"
              />
              <Reveal delay={Math.min(i, 4) * 60}>
                <JobCard job={job} now={now} />
              </Reveal>
            </li>
          ))}
        </ol>

        {visible.length === 0 && (
          <p className="mt-10 text-center text-mist-400">No roles in this category yet.</p>
        )}
      </div>
    </section>
  );
}
