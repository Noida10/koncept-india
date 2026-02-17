import fs from "fs";
import path from "path";

const CONTENT_FILE = path.join(process.cwd(), "src/data/content.json");

export type SiteContent = {
  siteInfo: {
    companyName: string;
    tagline: string;
    phone: string;
    email: string;
    registeredOffice: { address: string; mapUrl: string };
    branchOffice: { address: string; mapUrl: string };
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroCta: string;
    quickLinks: { title: string; description: string; icon: string; href: string }[];
    clientStrip: string[];
  };
  about: {
    title: string;
    overview: string[];
    capabilities: string[];
    visionMission: string[];
  };
  products: {
    title: string;
    subtitle: string;
    categories: {
      id: string;
      name: string;
      description: string;
      items: string[];
    }[];
  };
  gallery: {
    title: string;
    subtitle: string;
    categories: {
      id: string;
      name: string;
      description: string;
      images: string[];
    }[];
  };
  clients: {
    title: string;
    subtitle: string;
    categories: {
      name: string;
      clients: string[];
    }[];
  };
};

export function getContent(): SiteContent {
  const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
  return JSON.parse(raw);
}

export function saveContent(content: SiteContent): void {
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), "utf-8");
}
