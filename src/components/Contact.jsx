"use client";

import { useState } from "react";
import { profile } from "@/data/portfolio";
import Icon from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const channels = [
  {
    icon: "phone",
    label: "Mobile",
    value: profile.phones[0],
    href: `tel:${profile.phones[0].replace(/[^\d+]/g, "")}`,
  },
  {
    icon: "phone",
    label: "Alternate",
    value: profile.phones[1],
    href: `tel:${profile.phones[1].replace(/[^\d+]/g, "")}`,
  },
  {
    icon: "mail",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: "chat",
    label: "WhatsApp",
    value: "Message me",
    href: `https://wa.me/${profile.whatsapp}`,
    external: true,
  },
];

export default function Contact() {
  const [status, setStatus] = useState({ state: "idle", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      setStatus({ state: "error", message: "Please fill in your name, email and message." });
      return;
    }

    // With a Formspree ID configured the message is delivered straight to the
    // inbox; without one we fall back to opening the visitor's mail client.
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(data.subject?.trim() || `Portfolio enquiry from ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n—\n${data.name}\n${data.email}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus({ state: "success", message: "Opening your email app…" });
      return;
    }

    try {
      setStatus({ state: "sending", message: "Sending…" });
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setStatus({ state: "success", message: "Thanks — your message has been sent." });
    } catch {
      setStatus({
        state: "error",
        message: `Something went wrong. Please email ${profile.email} directly.`,
      });
    }
  }

  const inputClass =
    "w-full rounded-lg border border-ink-700 bg-ink-950/60 px-4 py-3 text-sm text-mist-100 placeholder:text-mist-400/60 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/25";

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-ink-800/80 bg-ink-900/30 py-24 lg:py-28"
    >
      <div className="container-x">
        <SectionHeading
          kicker="06 — Contact"
          title="Let's work together"
          subtitle="The fastest way to reach me is a call or a WhatsApp message."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Channels */}
          <Reveal className="grid gap-4 sm:grid-cols-2">
            {channels.map((channel) => {
              const Glyph = Icon[channel.icon];
              return (
                <a
                  key={channel.label}
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="surface group flex items-center gap-4 p-5 transition-colors hover:border-accent-500/50"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent-500/25 bg-accent-500/10 text-accent-300 transition group-hover:bg-accent-500/20">
                    <Glyph className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <small className="block text-xs uppercase tracking-wider text-mist-400">
                      {channel.label}
                    </small>
                    <strong className="block truncate text-sm font-medium text-mist-100">
                      {channel.value}
                    </strong>
                  </span>
                </a>
              );
            })}

            <div className="surface flex items-start gap-4 p-5 sm:col-span-2">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink-600 bg-ink-800/60 text-mist-300">
                <Icon.pin className="h-5 w-5" />
              </span>
              <span>
                <small className="block text-xs uppercase tracking-wider text-mist-400">Address</small>
                <strong className="mt-0.5 block text-sm font-medium leading-relaxed text-mist-100">
                  {profile.address}
                </strong>
              </span>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <form onSubmit={handleSubmit} noValidate className="surface p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold">Send a message</h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-mist-400">
                    Your name
                  </span>
                  <input type="text" name="name" required placeholder="Jane Doe" className={inputClass} />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-mist-400">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jane@company.com"
                    className={inputClass}
                  />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-mist-400">
                  Subject
                </span>
                <input
                  type="text"
                  name="subject"
                  placeholder="Drafting work / job opening"
                  className={inputClass}
                />
              </label>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-mist-400">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about the role or project…"
                  className={`${inputClass} resize-y`}
                />
              </label>

              <button
                type="submit"
                disabled={status.state === "sending"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-accent-400 hover:shadow-glow disabled:opacity-60"
              >
                {status.state === "sending" ? "Sending…" : "Send message"}
                <Icon.arrowRight className="h-4 w-4" />
              </button>

              {status.message && (
                <p
                  role="status"
                  className={`mt-4 text-sm ${
                    status.state === "error" ? "text-rose-400" : "text-emerald-400"
                  }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
