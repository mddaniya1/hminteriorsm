import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";

export const STUDIO = {
  name: "HM Interiors",
  founder: "Haura M Merchant",
  email: "hmerchantinteriors@gmail.com",
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/",
  behance: "https://www.behance.net/hfmmerchan4692",
  about:
    "HM Interiors is a Karachi-based interior architecture studio led by Haura M Merchant. We craft transformative spaces across residential and commercial projects — translating conceptual visions into reality through spatial planning, premium material selection, and bespoke high-precision detailing, from concept to final execution.",
  experience: "5+ Years of Professional Journey · Available Fulltime / Design Consultancy",
};

export type Project = {
  slug: string;
  name: string;
  type: string;
  location: string;
  client?: string;
  commercial: boolean;
  inProgress?: boolean;
  tagline: string;
  images: [string, string, string, string, string, string, string];
};

const wide: string[] = [p1, p2, p5, p6];
const tall: string[] = [p3, p4, p7, p8];
const set = (i: number) => [
  wide[i % 4], tall[i % 4], wide[(i + 1) % 4], wide[(i + 2) % 4], tall[(i + 1) % 4], tall[(i + 2) % 4], wide[(i + 3) % 4],
];

export const projects: Project[] = [
  { slug: "greens-3", name: "Greens-3", type: "Premium Residential Development", location: "Karachi", client: "Machiyara Group", commercial: false, tagline: "A premium residential development for Machiyara Group, where spatial planning meets refined material selection.", images: set(0) },
  { slug: "zuno-cafe", name: "Zuno Cafe", type: "Commercial Hospitality / Cafe Design", location: "Khayaban-e-Bukhari, Karachi", commercial: true, tagline: "A neighbourhood cafe on Khayaban-e-Bukhari, shaped around warmth, texture and the ritual of gathering.", images: set(1) },
  { slug: "nm-residence", name: "NM Residence", type: "Luxury Bespoke Residential Layout", location: "Karachi", commercial: false, tagline: "A luxury residence in Karachi, laid out room by room around the way one family lives.", images: set(2) },
  { slug: "zw-residence", name: "ZW Residence", type: "Modern Architectural Interior Home Execution", location: "Karachi", commercial: false, tagline: "A modern Karachi home, carried from architectural intent through to the final detail.", images: set(3) },
  { slug: "is-residence", name: "IS Residence", type: "Contemporary Residential Living Space", location: "Karachi", commercial: false, tagline: "A contemporary living space in Karachi, calm in palette and generous in proportion.", images: set(0) },
  { slug: "sp-residence", name: "SP Residence", type: "Bespoke Premium Housing Project", location: "Karachi", commercial: false, inProgress: true, tagline: "A bespoke premium home in Karachi, currently taking shape on site.", images: set(1) },
  { slug: "sm-residence", name: "SM Residence", type: "Architectural Space Planning & Design", location: "Karachi", commercial: false, tagline: "A Karachi residence where space planning comes first and every surface follows.", images: set(2) },
  { slug: "mk-residence", name: "MK Residence", type: "Luxury Home Interior Architecture", location: "Karachi", commercial: false, tagline: "A luxury home in Karachi, defined by quiet materials and precise joinery.", images: set(3) },
  { slug: "greens-3-reception", name: "Greens-3 — Waiting & Reception", type: "Commercial Corporate Lounge Space", location: "Karachi", client: "Machiyara Group", commercial: true, tagline: "A corporate waiting and reception lounge for Machiyara Group, composed as a first impression.", images: [p5, p8, p1, p2, p3, p4, p6] },
  { slug: "qm-powder-bathroom", name: "QM Powder Bathroom", type: "Luxury High-End Washroom Architecture", location: "Canada", commercial: false, tagline: "A high-end powder room in Canada, small in footprint and considered in every detail.", images: [p4, p8, p6, p1, p3, p4, p5] },
  { slug: "home-office-design", name: "Home Office Design", type: "Premium Remote Workspace Layout", location: "USA", commercial: false, tagline: "A premium remote workspace in the USA, designed for focus and long days at the desk.", images: [p6, p7, p1, p5, p8, p3, p2] },
  { slug: "powder-bathroom", name: "Powder Bathroom", type: "Minimalist Sanitary Space Design", location: "Canada", commercial: false, tagline: "A minimalist powder bathroom in Canada, reduced to stone, light and proportion.", images: [p4, p3, p6, p2, p8, p4, p1] },
];

export const getProject = (slug: string) => projects.findIndex((p) => p.slug === slug);
export const pad = (n: number) => String(n).padStart(2, "0");
