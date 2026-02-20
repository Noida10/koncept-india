import contentData from "@/data/content.json";

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
    heroBackground: string;
    heroTextColor: "light" | "dark";
    heroProducts: { title: string; tagline: string; image: string; href: string }[];
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
  printing: {
    title: string;
    subtitle: string;
    bannerImage: string;
    categories: {
      id: string;
      name: string;
      description: string;
      items: string[];
    }[];
  };
  packaging: {
    title: string;
    subtitle: string;
    bannerImage: string;
    categories: {
      id: string;
      name: string;
      description: string;
      items: string[];
    }[];
  };
  images: {
    aboutStory: string;
    aboutMachinery: string;
    aboutFounder: string;
    ctaBackground: string;
  };
  pageBackgrounds: {
    [key: string]: {
      image: string;
      opacity: number;
    };
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
  return contentData as SiteContent;
}
