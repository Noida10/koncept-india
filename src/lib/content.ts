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
  contact: {
    bannerImage: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroCta: string;
    heroBackground: string;
    heroTextColor: "light" | "dark";
    heroProducts: { title: string; tagline: string; image: string; href: string }[];
    quickLinks: { title: string; description: string; icon: string; href: string; image: string }[];
    clientStrip: { name: string; logo: string }[];
    testimonials: { quote: string; author: string; company: string }[];
    premiumIntro: {
      title: string;
      paragraphs: string[];
      linkText: string;
      linkHref: string;
      image: string;
    };
    stats: { value: number; suffix: string; label: string }[];
    rotatingCTA: {
      words: string[];
      titlePrefix: string;
      subtitle: string;
      buttonText: string;
      buttonHref: string;
    };
    industries: {
      sectionTitle: string;
      sectionSubtitle: string;
      items: {
        id: string;
        label: string;
        title: string;
        description: string;
        features: string[];
        image: string;
      }[];
    };
    portfolio: {
      title: string;
      subtitle: string;
      images: { src: string; alt: string }[];
    };
    crossSellCTA: {
      title: string;
      description: string;
      buttonText: string;
      buttonHref: string;
      image: string;
    };
    clientStripTitle: string;
    expertiseTitle: string;
    expertiseSubtitle: string;
  };
  about: {
    bannerImage: string;
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
      items: { name: string; image: string }[];
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
      items: { name: string; image: string }[];
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
    bannerImage: string;
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
    bannerImage: string;
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
