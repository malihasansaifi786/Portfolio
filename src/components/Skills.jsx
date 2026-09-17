import { skills } from "@/data/portfolio";
import Icon from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24 lg:py-28">
      <div className="container-x">
        <SectionHeading kicker="03 — Skills" title="What I bring to a team" />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => {
            const Glyph = Icon[group.icon] ?? Icon.spark;
            return (
              <Reveal key={group.title} delay={(i % 3) * 80}>
                <article className="surface h-full p-6 transition-colors duration-300 hover:border-accent-500/40">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent-500/25 bg-accent-500/10 text-accent-300">
                    <Glyph className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{group.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
