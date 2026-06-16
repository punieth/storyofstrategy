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
    title: "Reddit Radar",
    oneLiner:
      "Signal detection from Reddit. Scanning PM and SaaS subs for high-substance discussions.",
    status: "live",
    tags: ["automation", "python", "ai"],
    tone: "bridge",
  },
  {
    title: "Newsletter → Discord",
    oneLiner:
      "Summarizes my Gmail newsletters and pipes the digests straight to my Discord channel.",
    status: "live",
    tags: ["automation", "make", "ai"],
    tone: "principles",
  },
  {
    title: "Intelligence OS",
    oneLiner:
      "Daily intelligence brief from 60 RSS sources — enriched signals and cross-source pattern detection.",
    status: "live",
    tags: ["automation", "rss", "ai"],
    tone: "profile-engineer",
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
