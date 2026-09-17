import { profile } from "@/data/portfolio";
import Icon from "./Icons";
import ProfilePhoto from "./ProfilePhoto";
import Stats from "./Stats";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Blueprint grid + glow backdrop */}
      <div className="blueprint mask-fade-b pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-accent-500/15 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-40 -left-40 h-[26rem] w-[26rem] rounded-full bg-gold-400/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Copy */}
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-xs font-medium text-accent-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
            </span>
            {profile.status}
          </p>

          <h1 className="mt-6 font-display text-4xl leading-[1.08] font-extrabold text-mist-100 sm:text-5xl lg:text-6xl">
            Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
            <br />
            {profile.tagline}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist-300 sm:text-lg">
            {profile.intro}
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {profile.highlights.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-accent-400 hover:shadow-glow"
            >
              Hire me
              <Icon.arrowRight className="h-4 w-4" />
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-full border border-ink-600 px-6 py-3 text-sm font-semibold text-mist-200 transition hover:border-accent-500/60 hover:text-accent-300"
            >
              View experience
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-mist-300 transition hover:text-accent-300"
            >
              <Icon.download className="h-4 w-4" />
              Download CV
            </a>
          </div>

          <Stats />
        </div>

        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] border border-ink-700 bg-ink-900 shadow-2xl shadow-black/50">
            <ProfilePhoto />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink-950/70 via-transparent via-35% to-transparent" />
            {/* Drafting corner marks */}
            {[
              "left-4 top-4 border-l-2 border-t-2",
              "right-4 top-4 border-r-2 border-t-2",
              "left-4 bottom-4 border-l-2 border-b-2",
              "right-4 bottom-4 border-r-2 border-b-2",
            ].map((pos) => (
              <span
                key={pos}
                className={`pointer-events-none absolute h-7 w-7 border-accent-400/60 ${pos}`}
                aria-hidden="true"
              />
            ))}
          </div>

          <div className="animate-float absolute -left-4 bottom-32 hidden items-center gap-3 rounded-2xl border border-ink-700 bg-ink-900/90 px-4 py-3 backdrop-blur-md sm:flex lg:-left-10">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-500/15 text-accent-300">
              <Icon.drafting className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <strong className="block text-sm text-mist-100">AutoCAD</strong>
              <small className="text-[0.7rem] text-mist-400">4-month certified · GCT Lahore</small>
            </span>
          </div>

          <div className="animate-float-slow absolute -right-3 bottom-8 hidden items-center gap-3 rounded-2xl border border-ink-700 bg-ink-900/90 px-4 py-3 backdrop-blur-md sm:flex lg:-right-8">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-400/15 text-gold-300">
              <Icon.code className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <strong className="block text-sm text-mist-100">MERN Stack</strong>
              <small className="text-[0.7rem] text-mist-400">NAVTTC certified</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
