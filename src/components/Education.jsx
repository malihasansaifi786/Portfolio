import { education } from "@/data/portfolio";
import Icon from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-24 border-y border-ink-800/80 bg-ink-900/30 py-24 lg:py-28"
    >
      <div className="container-x">
        <SectionHeading kicker="04 — Education" title="Academic qualification" />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {education.map((item, i) => (
            <Reveal key={item.degree} delay={i * 80}>
              <article
                className={`surface h-full p-6 transition-colors duration-300 hover:border-accent-500/40 ${
                  item.accent ? "border-accent-500/40" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-ink-600 bg-ink-800/60 text-accent-300">
                    <Icon.cap className="h-5 w-5" />
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${
                      item.accent
                        ? "border-accent-400/40 bg-accent-500/10 text-accent-300"
                        : "border-ink-600 bg-ink-800/60 text-mist-300"
                    }`}
                  >
                    {item.period}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold">{item.degree}</h3>
                <p className="mt-1 text-sm text-mist-400">{item.institute}</p>

                <div className="mt-5 flex items-baseline gap-2 border-t border-ink-700/70 pt-4">
                  <strong className="font-display text-2xl font-bold text-mist-100">
                    {item.score}
                  </strong>
                  <span className="text-sm text-mist-400">marks</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
