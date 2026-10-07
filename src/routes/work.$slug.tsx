import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { projects, getProject, STUDIO } from "@/lib/projects";
import { FullFooter, Reveal, SiteNav } from "@/components/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const idx = getProject(params.slug);
    if (idx < 0) throw notFound();
    return { idx };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — HM Interiors" }, { name: "robots", content: "noindex" }] };
    const p = projects[loaderData.idx]!;
    return {
      meta: [
        { title: `${p.name} — HM Interiors` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.name} — HM Interiors` },
        { property: "og:description", content: p.tagline },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="label flex min-h-svh items-center justify-center"><Link to="/work" className="link-line">PROJECT NOT FOUND — BACK TO WORK</Link></div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { idx } = Route.useLoaderData();
  const p = projects[idx]!;
  const prev = projects[(idx - 1 + projects.length) % projects.length]!;
  const next = projects[(idx + 1) % projects.length]!;
  const [a, b, c, d, e, f, g] = p.images;
  const discipline = p.commercial ? "Interior Architecture / Commercial Spatial Design / Material Curation" : "Interior Architecture / Spatial Design / Material Curation";

  return (
    <main key={p.slug}>
      <SiteNav current={<><Link to="/work" className="link-line">WORK</Link><span className="opacity-50">/</span><span>{p.name}</span></>} />

      <section className="grid grid-cols-1 items-end gap-5 px-5 pt-24 md:grid-cols-12">
        <Reveal className="md:col-span-8"><img src={a} alt={p.name} className="w-full" width={1600} height={1008} /></Reveal>
        <Reveal delay={150} className="md:col-span-4"><img src={b} alt={`${p.name} detail`} className="w-full" width={1008} height={1408} /></Reveal>
      </section>

      <section className="grid grid-cols-1 gap-10 px-5 py-24 md:grid-cols-12">
        <Reveal className="label grid grid-cols-2 gap-6 md:col-span-4">
          <Meta k="DISCIPLINE" v={discipline} />
          {p.client && <Meta k="CLIENT" v={p.client} />}
          <Meta k="LOCATION" v={p.location} />
          <Meta k="YEAR" v={p.inProgress ? "2026 — In Progress" : "2026"} />
          <Meta k="DESIGN LEAD" v={STUDIO.founder} />
          <Meta k="FIRM" v={STUDIO.name} />
        </Reveal>
        <div className="md:col-span-7 md:col-start-6">
          <Reveal><h1 className="text-[12vw] font-medium leading-[0.88] tracking-[-0.06em] md:text-[6.5vw]">{p.name}</h1></Reveal>
          <Reveal delay={120}><p className="mt-6 max-w-xl text-xl leading-snug tracking-tight text-muted-foreground md:text-2xl">{p.tagline}</p></Reveal>
        </div>
      </section>

      <section className="flex flex-col gap-5 px-5">
        <Reveal><img src={c} alt="" loading="lazy" className="w-full" width={1600} height={1008} /></Reveal>
        <Reveal><img src={d} alt="" loading="lazy" className="w-full" width={1600} height={1008} /></Reveal>
      </section>

      <Text label="APPROACH">
        <p>For {p.name}, the work began with the plan. We curated the spatial layout first — how one moves, pauses and gathers — so that every room earns its place before a single finish is chosen.</p>
        <p>Materials were then selected for longevity and touch, and resolved through bespoke, high-precision detailing: joinery, junctions and light treated as part of the architecture rather than decoration.</p>
      </Text>

      <Text label="CONTEXT">
        <p>{p.type}{p.client ? ` for ${p.client}` : ""}, {p.location}. The brief called for a space that reflects its occupants — {p.commercial ? "a commercial setting with a clear identity and a calm, welcoming first impression." : "a private home shaped around daily routines and personal story."}</p>
      </Text>
      <section className="grid grid-cols-1 gap-5 px-5 md:grid-cols-3">
        {[e, f, b].map((src, k) => (
          <Reveal key={k} delay={k * 120}><img src={src} alt="" loading="lazy" className="aspect-[3/4] w-full object-cover" /></Reveal>
        ))}
      </section>

      <Text label="THE PROCESS">
        <p>From concept boards to site supervision, HM Interiors carried the project end to end — translating drawings into reality with the contractors and craftspeople on site, checking each detail against the original intent.</p>
      </Text>
      <section className="px-5"><Reveal><img src={g} alt="" loading="lazy" className="w-full" width={1600} height={1008} /></Reveal></section>

      {p.inProgress ? (
        <Text label="STATUS"><p>This project is currently in progress. Final photography will follow on completion.</p></Text>
      ) : (
        <Text label="HANDOVER"><p>The space was completed and handed over to the client, ready to be lived in — from concept to final execution.</p></Text>
      )}

      <nav className="grid grid-cols-2 gap-5 border-t px-5 pt-8">
        <Link to="/work/$slug" params={{ slug: prev.slug }} className="group">
          <div className="label text-muted-foreground">PREVIOUS PROJECT</div>
          <div className="mt-2 text-2xl tracking-tight transition-transform duration-500 group-hover:-translate-x-1 md:text-4xl">← {prev.name}</div>
        </Link>
        <Link to="/work/$slug" params={{ slug: next.slug }} className="group text-right">
          <div className="label text-muted-foreground">NEXT PROJECT</div>
          <div className="mt-2 text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">{next.name} →</div>
        </Link>
      </nav>

      <FullFooter />
    </main>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return <div><div className="text-muted-foreground">{k}</div><div className="mt-1 normal-case">{v}</div></div>;
}

function Text({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-6 px-5 py-24 md:grid-cols-12 md:py-32">
      <Reveal className="label md:col-span-3">{label}</Reveal>
      <Reveal delay={100} className="flex flex-col gap-6 text-xl leading-snug tracking-tight md:col-span-6 md:col-start-6 md:text-2xl">{children}</Reveal>
    </section>
  );
}
