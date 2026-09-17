import { navLinks, profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-950 py-12">
      <div className="container-x grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div>
          <a href="#home" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent-500/40 bg-accent-500/10 font-display text-sm font-bold text-accent-300">
              {profile.initials}
            </span>
            <span className="leading-tight">
              <strong className="block font-display text-[0.95rem] font-semibold text-mist-100">
                {profile.name}
              </strong>
              <small className="text-[0.72rem] text-mist-400">Civil Technologist &amp; Developer</small>
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm text-mist-400">
            {profile.location} · References available upon request.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm md:justify-end">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-mist-300 transition hover:text-accent-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-x mt-10 border-t border-ink-800 pt-6">
        <p className="text-xs text-mist-400">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved. Built with Next.js
          &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
