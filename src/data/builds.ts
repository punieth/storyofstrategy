export interface Build {
  title: string;
  oneLiner: string;
  status: "live" | "building" | "idea";
  tags: string[];
  link?: string;
  tone:
    | "hero"
    | "bridge"
    | "principles"
    | "vision"
    | "case"
    | "profile-builder"
    | "profile-next"
    | "profile-engineer";
}

export const builds: Build[] = [
  {
    title: "Reddit → LinkedIn Pipeline",
    oneLiner:
      "Scrapes top posts from r/productmanagement daily, AI-summarizes them, and auto-posts to LinkedIn.",
    status: "live",
    tags: ["automation", "n8n", "ai"],
    tone: "bridge",
  },
  {
    title: "Newsletter → Discord",
    oneLiner:
      "Summarizes my Gmail newsletters and pipes the digests straight to my Discord channel.",
    status: "live",
    tags: ["automation", "n8n", "ai"],
    tone: "principles",
  },
  {
    title: "Story of Strategy",
    oneLiner:
      "This site. Neo-brutalist design system, visitor tracking, interactive terminal — built from scratch.",
    status: "live",
    tags: ["website", "design", "astro"],
    tone: "vision",
  },
  {
    title: "Urban Company Prototype",
    oneLiner:
      "Multi-actor service orchestration for remote homeowners. Working mobile prototype with SMS webhooks.",
    status: "live",
    tags: ["prototype", "product", "n8n"],
    tone: "profile-builder",
  },
  {
    title: "RoastMyLinkedIn",
    oneLiner:
      "AI roasts your LinkedIn profile. Fun, viral, one-page app.",
    status: "idea",
    tags: ["fun", "ai", "website"],
    tone: "hero",
  },
  {
    title: "Philosophy × Building",
    oneLiner:
      "Curated wisdom at the intersection of philosophy, spirituality, and entrepreneurship.",
    status: "idea",
    tags: ["website", "content", "philosophy"],
    tone: "profile-next",
  },
];
