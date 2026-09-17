"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/portfolio";
import Icon from "./Icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-700/70 bg-ink-950/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <a href="#home" className="group flex items-center gap-3" aria-label={`${profile.name} — home`}>
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent-500/40 bg-accent-500/10 font-display text-sm font-bold text-accent-300 transition group-hover:border-accent-400 group-hover:bg-accent-500/20">
            {profile.initials}
          </span>
          <span className="hidden leading-tight sm:block">
            <strong className="block font-display text-[0.95rem] font-semibold text-mist-100">
              {profile.name}
            </strong>
            <small className="text-[0.72rem] text-mist-400">Civil Technologist &amp; Developer</small>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          <ul className="flex items-center gap-7 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-active={active === link.href}
                  className={`link-underline font-medium transition-colors ${
                    active === link.href ? "text-accent-300" : "text-mist-300 hover:text-mist-100"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.cv}
            download
            className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-accent-400 hover:shadow-glow"
          >
            <Icon.download className="h-4 w-4" />
            Download CV
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-50 grid h-11 w-11 place-items-center rounded-xl border border-ink-700 bg-ink-900/70 lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-5 flex-col items-end gap-1.5">
            <span
              className={`h-0.5 w-5 rounded bg-mist-200 transition-transform duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-3.5 rounded bg-mist-200 transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded bg-mist-200 transition-transform duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="container-x flex h-full flex-col justify-center gap-2" aria-label="Mobile">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              className={`border-b border-ink-800 py-4 font-display text-2xl font-semibold text-mist-100 transition-all duration-300 ${
                open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
              }`}
            >
              <span className="mr-3 text-sm font-normal text-accent-400">
                0{i + 1}
              </span>
              {link.label}
            </a>
          ))}
          <a
            href={profile.cv}
            download
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 font-semibold text-ink-950"
          >
            <Icon.download className="h-5 w-5" />
            Download CV
          </a>
        </nav>
      </div>
    </header>
  );
}
