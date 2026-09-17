import { about, profile } from "@/data/portfolio";
import Icon from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/** Renders the **bold** spans used in the data file. */
function RichText({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-mist-100">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 lg:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="01 — About"
          title="A multi-skilled professional who adapts across roles"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal className="space-y-5 text-[0.98rem] leading-relaxed text-mist-300">
            {about.paragraphs.map((p, i) => (
              <p key={i}>
                <RichText text={p} />
              </p>
            ))}
          </Reveal>

          <Reveal delay={120}>
            <aside className="surface p-7">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                <Icon.spark className="h-5 w-5 text-accent-400" />
                Quick facts
              </h3>

              <ul className="mt-5 divide-y divide-ink-700/70">
                {about.facts.map((fact) => (
                  <li key={fact.label} className="flex items-start justify-between gap-4 py-3 text-sm">
                    <span className="text-mist-400">{fact.label}</span>
                    <strong
                      className={`text-right font-medium ${
                        fact.accent ? "text-emerald-400" : "text-mist-100"
                      }`}
                    >
                      {fact.value}
                    </strong>
                  </li>
                ))}
              </ul>

              <a
                href={profile.cv}
                download
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-accent-500/50 bg-accent-500/10 px-5 py-3 text-sm font-semibold text-accent-300 transition hover:bg-accent-500/20"
              >
                <Icon.download className="h-4 w-4" />
                Download full CV (PDF)
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
