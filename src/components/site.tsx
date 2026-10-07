import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { STUDIO } from "@/lib/projects";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { el.classList.add("is-in"); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function LiveClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date()));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t || "--:--:--"}</span>;
}

/** Fixed top-left nav: "HM Interiors / HOME …" — the HOME/… element toggles an overlay menu. */
export function SiteNav({ current, onImage = false }: { current?: ReactNode; onImage?: boolean }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  const tone = open ? "text-foreground" : onImage ? "text-on-image" : "text-foreground";
  return (
    <>
      <header className={`label fixed left-0 top-0 z-50 flex items-center gap-2 p-5 transition-colors duration-500 ${tone}`}>
        <Link to="/" className="link-line" onClick={() => setOpen(false)}>{STUDIO.name}</Link>
        <span className="opacity-50">/</span>
        {current ?? (
          <button type="button" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen((o) => !o)} className="label link-line flex items-center gap-2">
            <span>{open ? "CLOSE" : "HOME"}</span>
            <span className={`inline-block transition-transform duration-500 ${open ? "rotate-90" : ""}`}>{open ? "×" : "…"}</span>
          </button>
        )}
      </header>
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      >
        <nav className={`flex h-full flex-col justify-end gap-1 p-5 pb-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-y-0 scale-100" : "translate-y-6 scale-[0.98]"}`}>
          {([["/", "HOME"], ["/work", "WORK"], ["/about", "ABOUT"]] as const).map(([to, l], i) => (
            <Link key={to} to={to} className="w-fit text-[14vw] font-medium leading-[0.9] tracking-[-0.05em] transition-opacity hover:opacity-40 md:text-[9vw]" style={{ transitionDelay: open ? `${100 + i * 70}ms` : "0ms" }}>
              {l}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export function FullFooter() {
  return (
    <footer className="grid grid-cols-1 gap-12 px-5 pb-6 pt-32 md:grid-cols-12">
      <p className="text-xl leading-snug tracking-tight md:col-span-6 md:text-2xl">{STUDIO.about}</p>
      <div className="label flex flex-col gap-1 md:col-span-3 md:col-start-8">
        <span className="text-muted-foreground">KARACHI</span>
        <LiveClock />
      </div>
      <ul className="label flex flex-col gap-1 md:col-span-2 md:col-start-11">
        <li><a className="link-line" href={`mailto:${STUDIO.email}`}>EMAIL</a></li>
        <li><a className="link-line" href={STUDIO.instagram} target="_blank" rel="noreferrer">INSTAGRAM</a></li>
        <li><a className="link-line" href={STUDIO.linkedin} target="_blank" rel="noreferrer">LINKEDIN</a></li>
        <li><a className="link-line" href={STUDIO.behance} target="_blank" rel="noreferrer">BEHANCE</a></li>
      </ul>
      <div className="label flex justify-between text-muted-foreground md:col-span-12 md:pt-16">
        <span>{STUDIO.name}</span>
        <span>ⓒ ALL RIGHTS RESERVED 2026</span>
      </div>
    </footer>
  );
}
