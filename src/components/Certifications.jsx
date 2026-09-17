import { certifications, courses } from "@/data/portfolio";
import Icon from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-24 py-24 lg:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="05 — Training"
          title="IT qualifications & certifications"
          subtitle="Formal programs completed alongside my civil technology career."
        />

        {/* Course programs */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {courses.map((course, i) => (
            <Reveal key={course.title} delay={(i % 4) * 70}>
              <article
                className={`surface h-full p-6 transition-colors duration-300 hover:border-accent-500/40 ${
                  course.highlight ? "border-accent-500/45 shadow-glow" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold">{course.title}</h3>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.7rem] font-medium ${
                      course.highlight
                        ? "border-accent-400/40 bg-accent-500/10 text-accent-300"
                        : "border-ink-600 bg-ink-800/60 text-mist-300"
                    }`}
                  >
                    {course.duration}
                  </span>
                </div>
                <p className="mt-1 text-sm italic text-mist-400">{course.institute}</p>

                <ul className="mt-5 space-y-2 text-sm text-mist-300">
                  {course.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Certificates */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 80}>
              <article className="surface flex h-full items-start gap-5 p-6 transition-colors duration-300 hover:border-gold-400/40">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-gold-400/30 bg-gold-400/10 font-display text-sm font-bold text-gold-300">
                  {cert.badge}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{cert.title}</h3>
                  <p className="mt-1 text-sm text-mist-300">{cert.issuer}</p>
                  <p className="mt-3 text-xs text-mist-400">
                    Issued {cert.issued} · Certificate ID{" "}
                    <code className="rounded bg-ink-800 px-1.5 py-0.5 font-mono text-accent-300">
                      {cert.id}
                    </code>
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
