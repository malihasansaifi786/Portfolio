import Reveal from "./Reveal";

export default function SectionHeading({ kicker, title, subtitle, align = "left" }) {
  const centered = align === "center";

  return (
    <Reveal className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent-400">
        {!centered && <span className="h-px w-8 bg-accent-500/60" />}
        {kicker}
      </p>
      <h2 className="text-3xl font-bold leading-tight text-mist-100 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-mist-300">{subtitle}</p>}
    </Reveal>
  );
}
