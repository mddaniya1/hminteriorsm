import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { projects, pad, STUDIO } from "@/lib/projects";
import { Reveal, SiteNav } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HM Interiors — Interior Architecture Studio, Karachi" },
      { name: "description", content: "HM Interiors is a Karachi-based interior architecture studio led by Haura M Merchant. We craft spaces that tell your story." },
      { property: "og:title", content: "HM Interiors — Interior Architecture Studio, Karachi" },
      { property: "og:description", content: "Residential and commercial interior architecture by Haura M Merchant." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);
  const p = projects[i]!;

  const go = (dir: 1 | -1) => {
    setShow(false);
    window.setTimeout(() => { setI((x) => (x + dir + projects.length) % projects.length); setShow(true); }, 350);
  };

  useEffect(() => {
    const id = window.setTimeout(() => go(1), 7000);
    return () => window.clearTimeout(id);
  }, [i]);

  return (
    <main>
      <SiteNav onImage />
      <section className="relative h-svh w-full overflow-hidden bg-foreground">
        {projects.map((proj, k) => (
          <img
            key={proj.slug}
            src={proj.images[0]}
            alt={proj.name}
            width={1600}
            height={1008}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${k === i ? "animate-kenburns opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-overlay" />
        <div className="absolute inset-x-0 bottom-0 grid grid-cols-1 gap-6 p-5 text-on-image md:grid-cols-12">
          <div className="label md:col-span-12">SELECTED PROJECTS</div>
          <div className={`transition-all duration-500 md:col-span-7 ${show ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
            <h1 className="text-[13vw] font-medium leading-[0.85] tracking-[-0.06em] md:text-[8vw]">{p.name}</h1>
          </div>
          <div className={`flex flex-col justify-end gap-6 transition-all delay-75 duration-500 md:col-span-4 md:col-start-9 ${show ? "opacity-100" : "opacity-0"}`}>
            <div className="label flex items-center justify-between">
              <span className="tabular-nums">{pad(i + 1)}/{pad(projects.length)}</span>
              <div className="flex gap-4">
                <button type="button" aria-label="Previous project" onClick={() => go(-1)} className="transition-transform hover:-translate-x-1">←</button>
                <button type="button" aria-label="Next project" onClick={() => go(1)} className="transition-transform hover:translate-x-1">→</button>
              </div>
            </div>
            <p className="text-base leading-snug text-on-image-muted">{p.tagline}</p>
            <Link to="/work/$slug" params={{ slug: p.slug }} className="label link-line w-fit">OPEN</Link>
          </div>
        </div>
      </section>

      <section id="about" className="grid grid-cols-1 gap-10 px-5 py-32 md:grid-cols-12 md:py-48">
        <Reveal className="label md:col-span-3">ABOUT</Reveal>
        <div className="md:col-span-8 md:col-start-5">
          <Reveal><p className="text-3xl leading-[1.1] tracking-[-0.03em] md:text-5xl">{STUDIO.about}</p></Reveal>
          <Reveal delay={150} className="label mt-10 flex flex-col gap-2 text-muted-foreground">
            <span>We craft spaces that tell your story 🪄</span>
            <span>{STUDIO.experience}</span>
          </Reveal>
          <Reveal delay={250} className="mt-10">
            <a href={`mailto:${STUDIO.email}`} className="link-line text-xl tracking-tight">{STUDIO.email}</a>
          </Reveal>
        </div>
      </section>

      <footer className="label flex items-center gap-2 px-5 pb-6">
        <span>{STUDIO.name}</span><span className="opacity-50">/</span><span>HOME</span><span>…</span>
      </footer>
    </main>
  );
}
