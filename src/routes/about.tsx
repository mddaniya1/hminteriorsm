import { createFileRoute } from "@tanstack/react-router";
import { STUDIO } from "@/lib/projects";
import { FullFooter, Reveal, SiteNav } from "@/components/site";
import p3 from "@/assets/p3.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — HM Interiors" },
      { name: "description", content: "Haura M Merchant, Interior Architect — CEO & Founder of HM Interiors, Karachi." },
      { property: "og:title", content: "About — HM Interiors" },
      { property: "og:description", content: "We craft spaces that tell your story." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main>
      <SiteNav current={<span>ABOUT</span>} />
      <section className="grid grid-cols-1 gap-10 px-5 pt-32 md:grid-cols-12">
        <Reveal className="md:col-span-4"><img src={p3} alt="HM Interiors bedroom detail" className="w-full" width={1008} height={1408} /></Reveal>
        <div className="md:col-span-7 md:col-start-6">
          <Reveal className="label mb-8 text-muted-foreground">ABOUT</Reveal>
          <Reveal><p className="text-3xl leading-[1.1] tracking-[-0.03em] md:text-5xl">{STUDIO.about}</p></Reveal>
          <Reveal delay={150} className="label mt-12 grid grid-cols-2 gap-6">
            <div><div className="text-muted-foreground">FOUNDER</div><div>{STUDIO.founder}, Interior Architect</div></div>
            <div><div className="text-muted-foreground">ROLE</div><div>CEO & Founder, HM Interiors</div></div>
            <div className="col-span-2"><div className="text-muted-foreground">EXPERIENCE</div><div>{STUDIO.experience}</div></div>
          </Reveal>
        </div>
      </section>
      <FullFooter />
    </main>
  );
}
