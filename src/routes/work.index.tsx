import { createFileRoute, Link } from "@tanstack/react-router";
import { projects, pad } from "@/lib/projects";
import { FullFooter, Reveal, SiteNav } from "@/components/site";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — HM Interiors" },
      { name: "description", content: "Twelve residential and commercial interior architecture projects by HM Interiors." },
      { property: "og:title", content: "Work — HM Interiors" },
      { property: "og:description", content: "Selected interior architecture projects across Karachi, Canada and the USA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  return (
    <main>
      <SiteNav current={<span>WORK</span>} />
      <section className="grid grid-cols-1 gap-x-5 gap-y-16 px-5 pt-28 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 120}>
            <Link to="/work/$slug" params={{ slug: p.slug }} className="group block">
              <div className="aspect-[4/3] overflow-hidden bg-card">
                <img src={p.images[0]} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
              </div>
              <div className="label mt-3 flex justify-between">
                <span>{p.name}</span>
                <span className="text-muted-foreground">{pad(i + 1)}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
      <FullFooter />
    </main>
  );
}
