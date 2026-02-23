"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteContent } from "@/lib/content";
import contentData from "@/data/content.json";

type Tab = "home" | "about" | "products" | "printing" | "packaging" | "gallery" | "clients" | "images" | "siteInfo";

export default function AdminDashboard() {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") !== "true") {
      router.push("/admin/login");
      return;
    }
    setContent(contentData as SiteContent);
  }, [router]);

  function downloadJSON() {
    if (!content) return;
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.json";
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Downloaded! Replace src/data/content.json and redeploy.");
    setTimeout(() => setMessage(""), 5000);
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_auth");
    router.push("/admin/login");
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "printing", label: "Printing" },
    { id: "packaging", label: "Packaging" },
    { id: "products", label: "Products (Legacy)" },
    { id: "gallery", label: "Gallery" },
    { id: "clients", label: "Clients" },
    { id: "images", label: "Images" },
    { id: "siteInfo", label: "Site Info" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <span className="font-bold text-gray-900">Admin Panel</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {message && (
              <span className="text-sm font-medium text-green-600">{message}</span>
            )}
            <button
              onClick={downloadJSON}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Download content.json
            </button>
            <a href="/" className="text-sm text-gray-500 hover:text-gray-700">
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* How it works banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <strong>How to update the website:</strong> Edit content below, click &quot;Download content.json&quot;,
          then replace <code className="bg-blue-100 px-1 rounded">src/data/content.json</code> in the repository and redeploy.
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-amber-700 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {activeTab === "home" && <HomeEditor content={content} setContent={setContent} />}
          {activeTab === "about" && <AboutEditor content={content} setContent={setContent} />}
          {activeTab === "printing" && <PrintingEditor content={content} setContent={setContent} />}
          {activeTab === "packaging" && <PackagingEditor content={content} setContent={setContent} />}
          {activeTab === "products" && <ProductsEditor content={content} setContent={setContent} />}
          {activeTab === "gallery" && <GalleryEditor content={content} setContent={setContent} />}
          {activeTab === "clients" && <ClientsEditor content={content} setContent={setContent} />}
          {activeTab === "images" && <ImagesEditor content={content} setContent={setContent} />}
          {activeTab === "siteInfo" && <SiteInfoEditor content={content} setContent={setContent} />}
        </div>
      </div>
    </div>
  );
}

/* ========= Editor Components ========= */

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm text-gray-900"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm resize-none text-gray-900"
      />
    </div>
  );
}

function ListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            value={item}
            onChange={(e) => {
              const updated = [...items];
              updated[i] = e.target.value;
              onChange(updated);
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, ""])}
        className="text-sm text-amber-700 hover:text-amber-800 font-medium"
      >
        + Add item
      </button>
    </div>
  );
}

type EditorProps = {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent | null>>;
};

function HomeEditor({ content, setContent }: EditorProps) {
  const { home } = content;
  const update = (field: string, value: unknown) => {
    setContent({ ...content, home: { ...home, [field]: value } });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Home Page</h3>
      <InputField label="Hero Title" value={home.heroTitle} onChange={(v) => update("heroTitle", v)} />
      <TextAreaField label="Hero Subtitle" value={home.heroSubtitle} onChange={(v) => update("heroSubtitle", v)} />
      <InputField label="CTA Button Text" value={home.heroCta} onChange={(v) => update("heroCta", v)} />

      {/* Hero Background & Text Color */}
      <div className="border border-gray-200 rounded-lg p-4 space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Hero Background & Text Color</h4>
        <InputField
          label="Background Image URL (paste any image URL)"
          value={home.heroBackground}
          onChange={(v) => update("heroBackground", v)}
        />

        {/* Text Color Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Text Color
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => update("heroTextColor", "light")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all ${
                home.heroTextColor === "light"
                  ? "border-amber-700 bg-amber-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Light text</span>
              <span className="text-xs text-gray-400">(for dark backgrounds)</span>
            </button>
            <button
              onClick={() => update("heroTextColor", "dark")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all ${
                home.heroTextColor === "dark"
                  ? "border-amber-700 bg-amber-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center">
                <span className="text-gray-900 text-xs font-bold">A</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Dark text</span>
              <span className="text-xs text-gray-400">(for light backgrounds)</span>
            </button>
          </div>
        </div>

        {/* Preview */}
        {home.heroBackground && (
          <div>
            <p className="text-xs text-gray-500 mb-2">Preview:</p>
            <div className="relative h-36 rounded-lg overflow-hidden">
              <img
                src={home.heroBackground}
                alt="Hero background preview"
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${
                home.heroTextColor === "dark"
                  ? "bg-gradient-to-r from-white/80 via-white/60 to-white/40"
                  : "bg-gradient-to-r from-gray-900/90 via-gray-900/75 to-gray-900/60"
              }`} />
              <div className="absolute bottom-3 left-4">
                <span className={`text-lg font-bold ${home.heroTextColor === "dark" ? "text-gray-900" : "text-white"}`}>
                  Sample Title Text
                </span>
                <p className={`text-xs ${home.heroTextColor === "dark" ? "text-gray-600" : "text-gray-300"}`}>
                  Subtitle text preview
                </p>
              </div>
            </div>
          </div>
        )}
        <p className="text-xs text-gray-400">
          Tip: Use free images from Unsplash — e.g. https://images.unsplash.com/photo-ID?w=1920&amp;q=80
        </p>
      </div>

      {/* Client Strip */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Client Strip (Logo priority, text fallback)</h4>
        {home.clientStrip.map((client, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-3 mb-2 bg-gray-50">
            <div className="flex gap-2 items-start">
              <div className="flex-1 space-y-2">
                <input
                  value={client.name}
                  onChange={(e) => {
                    const updated = [...home.clientStrip];
                    updated[i] = { ...updated[i], name: e.target.value };
                    update("clientStrip", updated);
                  }}
                  placeholder="Client name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  value={client.logo}
                  onChange={(e) => {
                    const updated = [...home.clientStrip];
                    updated[i] = { ...updated[i], logo: e.target.value };
                    update("clientStrip", updated);
                  }}
                  placeholder="Logo image URL (displays instead of text when set)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              {client.logo && (
                <img src={client.logo} alt={client.name} className="w-16 h-10 object-contain rounded border border-gray-200 bg-white p-1 shrink-0" />
              )}
              <button
                onClick={() => update("clientStrip", home.clientStrip.filter((_, idx) => idx !== i))}
                className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm shrink-0"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() => update("clientStrip", [...home.clientStrip, { name: "", logo: "" }])}
          className="text-sm text-amber-700 hover:text-amber-800 font-medium"
        >
          + Add Client
        </button>
      </div>

      {/* Hero Products Showcase */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Hero Product Showcase (Carousel)</h4>
        {home.heroProducts.map((product, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 mb-3">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-gray-400 uppercase">Product {i + 1}</span>
              <button
                onClick={() => {
                  const updated = home.heroProducts.filter((_, idx) => idx !== i);
                  setContent({ ...content, home: { ...home, heroProducts: updated } });
                }}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Title"
                value={product.title}
                onChange={(v) => {
                  const updated = [...home.heroProducts];
                  updated[i] = { ...updated[i], title: v };
                  setContent({ ...content, home: { ...home, heroProducts: updated } });
                }}
              />
              <InputField
                label="Link"
                value={product.href}
                onChange={(v) => {
                  const updated = [...home.heroProducts];
                  updated[i] = { ...updated[i], href: v };
                  setContent({ ...content, home: { ...home, heroProducts: updated } });
                }}
              />
            </div>
            <div className="mt-3">
              <InputField
                label="Tagline"
                value={product.tagline}
                onChange={(v) => {
                  const updated = [...home.heroProducts];
                  updated[i] = { ...updated[i], tagline: v };
                  setContent({ ...content, home: { ...home, heroProducts: updated } });
                }}
              />
            </div>
            <div className="mt-3">
              <InputField
                label="Image URL (leave empty for gradient placeholder)"
                value={product.image}
                onChange={(v) => {
                  const updated = [...home.heroProducts];
                  updated[i] = { ...updated[i], image: v };
                  setContent({ ...content, home: { ...home, heroProducts: updated } });
                }}
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            const updated = [
              ...home.heroProducts,
              { title: "New Product", tagline: "", image: "", href: "/products" },
            ];
            setContent({ ...content, home: { ...home, heroProducts: updated } });
          }}
          className="text-sm text-amber-700 hover:text-amber-800 font-medium"
        >
          + Add Hero Product
        </button>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Links</h4>
        {home.quickLinks.map((link, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 mb-3">
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Title"
                value={link.title}
                onChange={(v) => {
                  const updated = [...home.quickLinks];
                  updated[i] = { ...updated[i], title: v };
                  setContent({ ...content, home: { ...home, quickLinks: updated } });
                }}
              />
              <InputField
                label="Link"
                value={link.href}
                onChange={(v) => {
                  const updated = [...home.quickLinks];
                  updated[i] = { ...updated[i], href: v };
                  setContent({ ...content, home: { ...home, quickLinks: updated } });
                }}
              />
            </div>
            <div className="mt-3">
              <TextAreaField
                label="Description"
                value={link.description}
                rows={2}
                onChange={(v) => {
                  const updated = [...home.quickLinks];
                  updated[i] = { ...updated[i], description: v };
                  setContent({ ...content, home: { ...home, quickLinks: updated } });
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">What Our Clients Say (Testimonials)</h4>
        {(home.testimonials || []).map((t, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 mb-3">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-gray-400 uppercase">Testimonial {i + 1}</span>
              <button
                onClick={() => {
                  const updated = (home.testimonials || []).filter((_, idx) => idx !== i);
                  update("testimonials", updated);
                }}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <TextAreaField
                label="Quote"
                value={t.quote}
                rows={2}
                onChange={(v) => {
                  const updated = [...(home.testimonials || [])];
                  updated[i] = { ...updated[i], quote: v };
                  update("testimonials", updated);
                }}
              />
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="Author / Role"
                  value={t.author}
                  onChange={(v) => {
                    const updated = [...(home.testimonials || [])];
                    updated[i] = { ...updated[i], author: v };
                    update("testimonials", updated);
                  }}
                />
                <InputField
                  label="Company"
                  value={t.company}
                  onChange={(v) => {
                    const updated = [...(home.testimonials || [])];
                    updated[i] = { ...updated[i], company: v };
                    update("testimonials", updated);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            const updated = [...(home.testimonials || []), { quote: "", author: "", company: "" }];
            update("testimonials", updated);
          }}
          className="text-sm text-amber-700 hover:text-amber-800 font-medium"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Premium Intro Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Premium Intro Section</h4>
        <div className="space-y-4">
          <InputField
            label="Section Title"
            value={(home.premiumIntro || { title: "" }).title}
            onChange={(v) => update("premiumIntro", { ...(home.premiumIntro || { title: "", paragraphs: [], linkText: "", linkHref: "", image: "" }), title: v })}
          />
          <ListEditor
            label="Paragraphs"
            items={(home.premiumIntro || { paragraphs: [] }).paragraphs}
            onChange={(v) => update("premiumIntro", { ...(home.premiumIntro || { title: "", paragraphs: [], linkText: "", linkHref: "", image: "" }), paragraphs: v })}
          />
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Link Text"
              value={(home.premiumIntro || { linkText: "" }).linkText}
              onChange={(v) => update("premiumIntro", { ...(home.premiumIntro || { title: "", paragraphs: [], linkText: "", linkHref: "", image: "" }), linkText: v })}
            />
            <InputField
              label="Link URL"
              value={(home.premiumIntro || { linkHref: "" }).linkHref}
              onChange={(v) => update("premiumIntro", { ...(home.premiumIntro || { title: "", paragraphs: [], linkText: "", linkHref: "", image: "" }), linkHref: v })}
            />
          </div>
          <InputField
            label="Image URL"
            value={(home.premiumIntro || { image: "" }).image}
            onChange={(v) => update("premiumIntro", { ...(home.premiumIntro || { title: "", paragraphs: [], linkText: "", linkHref: "", image: "" }), image: v })}
          />
          {(home.premiumIntro || { image: "" }).image && (
            <img src={(home.premiumIntro || { image: "" }).image} alt="Preview" className="w-full h-24 object-cover rounded-lg" />
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Stats Counter Section</h4>
        {(home.stats || []).map((stat, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 mb-3">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-gray-400 uppercase">Stat {i + 1}</span>
              <button
                onClick={() => {
                  const updated = (home.stats || []).filter((_, idx) => idx !== i);
                  update("stats", updated);
                }}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input
                  type="number"
                  value={stat.value}
                  onChange={(e) => {
                    const updated = [...(home.stats || [])];
                    updated[i] = { ...updated[i], value: parseInt(e.target.value) || 0 };
                    update("stats", updated);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <InputField
                label="Suffix (e.g. +)"
                value={stat.suffix}
                onChange={(v) => {
                  const updated = [...(home.stats || [])];
                  updated[i] = { ...updated[i], suffix: v };
                  update("stats", updated);
                }}
              />
              <InputField
                label="Label"
                value={stat.label}
                onChange={(v) => {
                  const updated = [...(home.stats || [])];
                  updated[i] = { ...updated[i], label: v };
                  update("stats", updated);
                }}
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => update("stats", [...(home.stats || []), { value: 0, suffix: "+", label: "" }])}
          className="text-sm text-amber-700 hover:text-amber-800 font-medium"
        >
          + Add Stat
        </button>
      </div>

      {/* Rotating CTA Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Rotating CTA Section</h4>
        <div className="space-y-4">
          <InputField
            label="Title Prefix (before rotating word)"
            value={(home.rotatingCTA || { titlePrefix: "" }).titlePrefix}
            onChange={(v) => update("rotatingCTA", { ...(home.rotatingCTA || { words: [], titlePrefix: "", subtitle: "", buttonText: "", buttonHref: "" }), titlePrefix: v })}
          />
          <ListEditor
            label="Rotating Words"
            items={(home.rotatingCTA || { words: [] }).words}
            onChange={(v) => update("rotatingCTA", { ...(home.rotatingCTA || { words: [], titlePrefix: "", subtitle: "", buttonText: "", buttonHref: "" }), words: v })}
          />
          <TextAreaField
            label="Subtitle"
            value={(home.rotatingCTA || { subtitle: "" }).subtitle}
            onChange={(v) => update("rotatingCTA", { ...(home.rotatingCTA || { words: [], titlePrefix: "", subtitle: "", buttonText: "", buttonHref: "" }), subtitle: v })}
          />
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Button Text"
              value={(home.rotatingCTA || { buttonText: "" }).buttonText}
              onChange={(v) => update("rotatingCTA", { ...(home.rotatingCTA || { words: [], titlePrefix: "", subtitle: "", buttonText: "", buttonHref: "" }), buttonText: v })}
            />
            <InputField
              label="Button Link"
              value={(home.rotatingCTA || { buttonHref: "" }).buttonHref}
              onChange={(v) => update("rotatingCTA", { ...(home.rotatingCTA || { words: [], titlePrefix: "", subtitle: "", buttonText: "", buttonHref: "" }), buttonHref: v })}
            />
          </div>
        </div>
      </div>

      {/* Industry Tabs Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Industries Section</h4>
        <div className="space-y-4">
          <InputField
            label="Section Title"
            value={(home.industries || { sectionTitle: "" }).sectionTitle}
            onChange={(v) => update("industries", { ...(home.industries || { sectionTitle: "", sectionSubtitle: "", items: [] }), sectionTitle: v })}
          />
          <TextAreaField
            label="Section Subtitle"
            value={(home.industries || { sectionSubtitle: "" }).sectionSubtitle}
            onChange={(v) => update("industries", { ...(home.industries || { sectionTitle: "", sectionSubtitle: "", items: [] }), sectionSubtitle: v })}
          />

          {((home.industries || { items: [] }).items || []).map((ind, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase">Industry {i + 1}</span>
                <button
                  onClick={() => {
                    const updated = { ...(home.industries || { sectionTitle: "", sectionSubtitle: "", items: [] }) };
                    updated.items = updated.items.filter((_, idx) => idx !== i);
                    update("industries", updated);
                  }}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <InputField
                  label="Tab Label"
                  value={ind.label}
                  onChange={(v) => {
                    const updated = { ...(home.industries || { sectionTitle: "", sectionSubtitle: "", items: [] }) };
                    const items = [...updated.items];
                    items[i] = { ...items[i], label: v };
                    update("industries", { ...updated, items });
                  }}
                />
                <InputField
                  label="Full Title"
                  value={ind.title}
                  onChange={(v) => {
                    const updated = { ...(home.industries || { sectionTitle: "", sectionSubtitle: "", items: [] }) };
                    const items = [...updated.items];
                    items[i] = { ...items[i], title: v };
                    update("industries", { ...updated, items });
                  }}
                />
              </div>
              <div className="mb-3">
                <TextAreaField
                  label="Description"
                  value={ind.description}
                  onChange={(v) => {
                    const updated = { ...(home.industries || { sectionTitle: "", sectionSubtitle: "", items: [] }) };
                    const items = [...updated.items];
                    items[i] = { ...items[i], description: v };
                    update("industries", { ...updated, items });
                  }}
                />
              </div>
              <div className="mb-3">
                <ListEditor
                  label="Features"
                  items={ind.features}
                  onChange={(v) => {
                    const updated = { ...(home.industries || { sectionTitle: "", sectionSubtitle: "", items: [] }) };
                    const items = [...updated.items];
                    items[i] = { ...items[i], features: v };
                    update("industries", { ...updated, items });
                  }}
                />
              </div>
              <InputField
                label="Image URL"
                value={ind.image}
                onChange={(v) => {
                  const updated = { ...(home.industries || { sectionTitle: "", sectionSubtitle: "", items: [] }) };
                  const items = [...updated.items];
                  items[i] = { ...items[i], image: v };
                  update("industries", { ...updated, items });
                }}
              />
              {ind.image && (
                <img src={ind.image} alt={ind.title} className="w-full h-20 object-cover rounded-lg mt-2" />
              )}
            </div>
          ))}
          <button
            onClick={() => {
              const updated = { ...(home.industries || { sectionTitle: "", sectionSubtitle: "", items: [] }) };
              updated.items = [...updated.items, { id: `ind-${Date.now()}`, label: "", title: "", description: "", features: [], image: "" }];
              update("industries", updated);
            }}
            className="text-sm text-amber-700 hover:text-amber-800 font-medium"
          >
            + Add Industry
          </button>
        </div>
      </div>

      {/* Portfolio Grid Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Portfolio / Our Work Section</h4>
        <div className="space-y-4">
          <InputField
            label="Section Title"
            value={(home.portfolio || { title: "" }).title}
            onChange={(v) => update("portfolio", { ...(home.portfolio || { title: "", subtitle: "", images: [] }), title: v })}
          />
          <TextAreaField
            label="Section Subtitle"
            value={(home.portfolio || { subtitle: "" }).subtitle}
            onChange={(v) => update("portfolio", { ...(home.portfolio || { title: "", subtitle: "", images: [] }), subtitle: v })}
          />
          {((home.portfolio || { images: [] }).images || []).map((img, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
              <div className="flex gap-2 items-start">
                <div className="flex-1 space-y-2">
                  <input
                    value={img.src}
                    onChange={(e) => {
                      const updated = { ...(home.portfolio || { title: "", subtitle: "", images: [] }) };
                      const images = [...updated.images];
                      images[i] = { ...images[i], src: e.target.value };
                      update("portfolio", { ...updated, images });
                    }}
                    placeholder="Image URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    value={img.alt}
                    onChange={(e) => {
                      const updated = { ...(home.portfolio || { title: "", subtitle: "", images: [] }) };
                      const images = [...updated.images];
                      images[i] = { ...images[i], alt: e.target.value };
                      update("portfolio", { ...updated, images });
                    }}
                    placeholder="Alt text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                {img.src && (
                  <img src={img.src} alt={img.alt} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                )}
                <button
                  onClick={() => {
                    const updated = { ...(home.portfolio || { title: "", subtitle: "", images: [] }) };
                    updated.images = updated.images.filter((_, idx) => idx !== i);
                    update("portfolio", updated);
                  }}
                  className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm shrink-0"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const updated = { ...(home.portfolio || { title: "", subtitle: "", images: [] }) };
              updated.images = [...updated.images, { src: "", alt: "" }];
              update("portfolio", updated);
            }}
            className="text-sm text-amber-700 hover:text-amber-800 font-medium"
          >
            + Add Portfolio Image
          </button>
        </div>
      </div>

      {/* Client Strip Title */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Client Strip</h4>
        <InputField
          label="Client Strip Section Title"
          value={home.clientStripTitle || "Trusted By Leading Brands"}
          onChange={(v) => update("clientStripTitle", v)}
        />
      </div>

      {/* Cross-Sell CTA Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Cross-Sell CTA Section (Bottom)</h4>
        <div className="space-y-4">
          <InputField
            label="Title"
            value={(home.crossSellCTA || { title: "" }).title}
            onChange={(v) => update("crossSellCTA", { ...(home.crossSellCTA || { title: "", description: "", buttonText: "", buttonHref: "", image: "" }), title: v })}
          />
          <TextAreaField
            label="Description"
            value={(home.crossSellCTA || { description: "" }).description}
            onChange={(v) => update("crossSellCTA", { ...(home.crossSellCTA || { title: "", description: "", buttonText: "", buttonHref: "", image: "" }), description: v })}
          />
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Button Text"
              value={(home.crossSellCTA || { buttonText: "" }).buttonText}
              onChange={(v) => update("crossSellCTA", { ...(home.crossSellCTA || { title: "", description: "", buttonText: "", buttonHref: "", image: "" }), buttonText: v })}
            />
            <InputField
              label="Button Link"
              value={(home.crossSellCTA || { buttonHref: "" }).buttonHref}
              onChange={(v) => update("crossSellCTA", { ...(home.crossSellCTA || { title: "", description: "", buttonText: "", buttonHref: "", image: "" }), buttonHref: v })}
            />
          </div>
          <InputField
            label="Image URL"
            value={(home.crossSellCTA || { image: "" }).image}
            onChange={(v) => update("crossSellCTA", { ...(home.crossSellCTA || { title: "", description: "", buttonText: "", buttonHref: "", image: "" }), image: v })}
          />
          {(home.crossSellCTA || { image: "" }).image && (
            <img src={(home.crossSellCTA || { image: "" }).image} alt="Preview" className="w-full h-24 object-cover rounded-lg" />
          )}
        </div>
      </div>
    </div>
  );
}

function AboutEditor({ content, setContent }: EditorProps) {
  const { about } = content;
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">About Page</h3>
      <InputField
        label="Page Title"
        value={about.title}
        onChange={(v) => setContent({ ...content, about: { ...about, title: v } })}
      />
      <ListEditor
        label="Company Overview Paragraphs"
        items={about.overview}
        onChange={(v) => setContent({ ...content, about: { ...about, overview: v } })}
      />
      <ListEditor
        label="Capabilities"
        items={about.capabilities}
        onChange={(v) => setContent({ ...content, about: { ...about, capabilities: v } })}
      />
      <ListEditor
        label="Vision & Mission Points"
        items={about.visionMission}
        onChange={(v) => setContent({ ...content, about: { ...about, visionMission: v } })}
      />
    </div>
  );
}

function ProductsEditor({ content, setContent }: EditorProps) {
  const { products } = content;

  function updateCategory(catIdx: number, field: string, value: string | string[]) {
    const updated = [...products.categories];
    updated[catIdx] = { ...updated[catIdx], [field]: value };
    setContent({ ...content, products: { ...products, categories: updated } });
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Products & Services</h3>
      <InputField
        label="Page Title"
        value={products.title}
        onChange={(v) => setContent({ ...content, products: { ...products, title: v } })}
      />
      <InputField
        label="Subtitle"
        value={products.subtitle}
        onChange={(v) => setContent({ ...content, products: { ...products, subtitle: v } })}
      />

      {products.categories.map((cat, catIdx) => (
        <div key={cat.id} className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">{cat.name}</h4>
          <InputField label="Category Name" value={cat.name} onChange={(v) => updateCategory(catIdx, "name", v)} />
          <div className="mt-3">
            <TextAreaField label="Description" value={cat.description} onChange={(v) => updateCategory(catIdx, "description", v)} />
          </div>
          <div className="mt-3">
            <ListEditor label="Items" items={cat.items} onChange={(v) => updateCategory(catIdx, "items", v)} />
          </div>
        </div>
      ))}

      <button
        onClick={() => {
          const newCat = {
            id: `category-${Date.now()}`,
            name: "New Category",
            description: "",
            items: [] as string[],
          };
          setContent({
            ...content,
            products: { ...products, categories: [...products.categories, newCat] },
          });
        }}
        className="text-sm text-amber-700 hover:text-amber-800 font-medium"
      >
        + Add Category
      </button>
    </div>
  );
}

function GalleryEditor({ content, setContent }: EditorProps) {
  const { gallery } = content;

  function updateCategory(catIdx: number, field: string, value: string | string[]) {
    const updated = [...gallery.categories];
    updated[catIdx] = { ...updated[catIdx], [field]: value };
    setContent({ ...content, gallery: { ...gallery, categories: updated } });
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Gallery & Portfolio</h3>
      <InputField
        label="Page Title"
        value={gallery.title}
        onChange={(v) => setContent({ ...content, gallery: { ...gallery, title: v } })}
      />
      <InputField
        label="Subtitle"
        value={gallery.subtitle}
        onChange={(v) => setContent({ ...content, gallery: { ...gallery, subtitle: v } })}
      />

      {gallery.categories.map((cat, catIdx) => (
        <div key={cat.id} className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">{cat.name}</h4>
          <InputField label="Category Name" value={cat.name} onChange={(v) => updateCategory(catIdx, "name", v)} />
          <div className="mt-3">
            <TextAreaField label="Description" value={cat.description} onChange={(v) => updateCategory(catIdx, "description", v)} />
          </div>
          <div className="mt-3">
            <ListEditor
              label="Image URLs"
              items={cat.images}
              onChange={(v) => updateCategory(catIdx, "images", v)}
            />
          </div>
        </div>
      ))}

      <button
        onClick={() => {
          const newCat = {
            id: `gallery-${Date.now()}`,
            name: "New Gallery Section",
            description: "",
            images: [] as string[],
          };
          setContent({
            ...content,
            gallery: { ...gallery, categories: [...gallery.categories, newCat] },
          });
        }}
        className="text-sm text-amber-700 hover:text-amber-800 font-medium"
      >
        + Add Gallery Section
      </button>
    </div>
  );
}

function ClientsEditor({ content, setContent }: EditorProps) {
  const { clients } = content;

  function updateCategory(catIdx: number, field: string, value: string | string[]) {
    const updated = [...clients.categories];
    updated[catIdx] = { ...updated[catIdx], [field]: value };
    setContent({ ...content, clients: { ...clients, categories: updated } });
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Our Clients</h3>
      <InputField
        label="Page Title"
        value={clients.title}
        onChange={(v) => setContent({ ...content, clients: { ...clients, title: v } })}
      />
      <InputField
        label="Subtitle"
        value={clients.subtitle}
        onChange={(v) => setContent({ ...content, clients: { ...clients, subtitle: v } })}
      />

      {clients.categories.map((cat, catIdx) => (
        <div key={catIdx} className="border border-gray-200 rounded-lg p-4">
          <InputField
            label="Category Name"
            value={cat.name}
            onChange={(v) => updateCategory(catIdx, "name", v)}
          />
          <div className="mt-3">
            <ListEditor
              label="Client Names"
              items={cat.clients}
              onChange={(v) => updateCategory(catIdx, "clients", v)}
            />
          </div>
        </div>
      ))}

      <button
        onClick={() => {
          setContent({
            ...content,
            clients: {
              ...clients,
              categories: [...clients.categories, { name: "New Category", clients: [] }],
            },
          });
        }}
        className="text-sm text-amber-700 hover:text-amber-800 font-medium"
      >
        + Add Client Category
      </button>
    </div>
  );
}

function ServiceItemsEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: { name: string; image: string }[];
  onChange: (items: { name: string; image: string }[]) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {items.map((item, i) => (
        <div key={i} className="border border-gray-100 rounded-lg p-3 mb-2 bg-gray-50">
          <div className="flex gap-2 items-start">
            <div className="flex-1 space-y-2">
              <input
                value={item.name}
                onChange={(e) => {
                  const updated = [...items];
                  updated[i] = { ...updated[i], name: e.target.value };
                  onChange(updated);
                }}
                placeholder="Item name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                value={item.image}
                onChange={(e) => {
                  const updated = [...items];
                  updated[i] = { ...updated[i], image: e.target.value };
                  onChange(updated);
                }}
                placeholder="Image URL (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            {item.image && (
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg shrink-0" />
            )}
            <button
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm shrink-0"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, { name: "", image: "" }])}
        className="text-sm text-amber-700 hover:text-amber-800 font-medium"
      >
        + Add item
      </button>
    </div>
  );
}

function PrintingEditor({ content, setContent }: EditorProps) {
  const printing = content.printing;
  if (!printing) return <p className="text-gray-500">Printing data not found in content.</p>;

  function updateCategory(catIdx: number, field: string, value: unknown) {
    const updated = [...printing.categories];
    updated[catIdx] = { ...updated[catIdx], [field]: value };
    setContent({ ...content, printing: { ...printing, categories: updated } });
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Printing Services Page</h3>
      <InputField
        label="Page Title"
        value={printing.title}
        onChange={(v) => setContent({ ...content, printing: { ...printing, title: v } })}
      />
      <InputField
        label="Subtitle"
        value={printing.subtitle}
        onChange={(v) => setContent({ ...content, printing: { ...printing, subtitle: v } })}
      />
      <InputField
        label="Banner Image URL"
        value={printing.bannerImage}
        onChange={(v) => setContent({ ...content, printing: { ...printing, bannerImage: v } })}
      />
      {printing.bannerImage && (
        <div>
          <p className="text-xs text-gray-500 mb-2">Banner Preview:</p>
          <img src={printing.bannerImage} alt="Banner preview" className="w-full h-32 object-cover rounded-lg" />
        </div>
      )}

      {printing.categories.map((cat, catIdx) => (
        <div key={cat.id} className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">{cat.name}</h4>
          <InputField label="Category Name" value={cat.name} onChange={(v) => updateCategory(catIdx, "name", v)} />
          <div className="mt-3">
            <TextAreaField label="Description" value={cat.description} onChange={(v) => updateCategory(catIdx, "description", v)} />
          </div>
          <div className="mt-3">
            <ServiceItemsEditor label="Items" items={cat.items} onChange={(v) => updateCategory(catIdx, "items", v)} />
          </div>
        </div>
      ))}

      <button
        onClick={() => {
          const newCat = { id: `printing-${Date.now()}`, name: "New Category", description: "", items: [] as { name: string; image: string }[] };
          setContent({ ...content, printing: { ...printing, categories: [...printing.categories, newCat] } });
        }}
        className="text-sm text-amber-700 hover:text-amber-800 font-medium"
      >
        + Add Category
      </button>
    </div>
  );
}

function PackagingEditor({ content, setContent }: EditorProps) {
  const packaging = content.packaging;
  if (!packaging) return <p className="text-gray-500">Packaging data not found in content.</p>;

  function updateCategory(catIdx: number, field: string, value: unknown) {
    const updated = [...packaging.categories];
    updated[catIdx] = { ...updated[catIdx], [field]: value };
    setContent({ ...content, packaging: { ...packaging, categories: updated } });
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Packaging Solutions Page</h3>
      <InputField
        label="Page Title"
        value={packaging.title}
        onChange={(v) => setContent({ ...content, packaging: { ...packaging, title: v } })}
      />
      <InputField
        label="Subtitle"
        value={packaging.subtitle}
        onChange={(v) => setContent({ ...content, packaging: { ...packaging, subtitle: v } })}
      />
      <InputField
        label="Banner Image URL"
        value={packaging.bannerImage}
        onChange={(v) => setContent({ ...content, packaging: { ...packaging, bannerImage: v } })}
      />
      {packaging.bannerImage && (
        <div>
          <p className="text-xs text-gray-500 mb-2">Banner Preview:</p>
          <img src={packaging.bannerImage} alt="Banner preview" className="w-full h-32 object-cover rounded-lg" />
        </div>
      )}

      {packaging.categories.map((cat, catIdx) => (
        <div key={cat.id} className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">{cat.name}</h4>
          <InputField label="Category Name" value={cat.name} onChange={(v) => updateCategory(catIdx, "name", v)} />
          <div className="mt-3">
            <TextAreaField label="Description" value={cat.description} onChange={(v) => updateCategory(catIdx, "description", v)} />
          </div>
          <div className="mt-3">
            <ServiceItemsEditor label="Items" items={cat.items} onChange={(v) => updateCategory(catIdx, "items", v)} />
          </div>
        </div>
      ))}

      <button
        onClick={() => {
          const newCat = { id: `packaging-${Date.now()}`, name: "New Category", description: "", items: [] as { name: string; image: string }[] };
          setContent({ ...content, packaging: { ...packaging, categories: [...packaging.categories, newCat] } });
        }}
        className="text-sm text-amber-700 hover:text-amber-800 font-medium"
      >
        + Add Category
      </button>
    </div>
  );
}

function ImagesEditor({ content, setContent }: EditorProps) {
  const images = content.images || { aboutStory: "", aboutMachinery: "", aboutFounder: "", ctaBackground: "" };
  const pageBackgrounds = content.pageBackgrounds || {};

  function updateImage(field: string, value: string) {
    setContent({ ...content, images: { ...images, [field]: value } });
  }

  function updatePageBg(page: string, field: string, value: string | number) {
    const current = pageBackgrounds[page] || { image: "", opacity: 0.05 };
    setContent({
      ...content,
      pageBackgrounds: {
        ...pageBackgrounds,
        [page]: { ...current, [field]: value },
      },
    });
  }

  const imageFields = [
    { key: "aboutStory", label: "About Page — Our Story Image" },
    { key: "aboutMachinery", label: "About Page — Machinery Image" },
    { key: "aboutFounder", label: "About Page — Founder Photo" },
    { key: "ctaBackground", label: "Home Page — CTA Background Image" },
  ];

  const pages = [
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
    { key: "gallery", label: "Gallery" },
    { key: "clients", label: "Clients" },
    { key: "printing", label: "Printing Services" },
    { key: "packaging", label: "Packaging Solutions" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Website Images</h3>
        <p className="text-sm text-gray-500 mb-6">Manage all images used across the website. Use external public image URLs (e.g. Unsplash, Imgur, or your own CDN).</p>

        <div className="space-y-4">
          {imageFields.map(({ key, label }) => (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <InputField
                label={label}
                value={(images as Record<string, string>)[key] || ""}
                onChange={(v) => updateImage(key, v)}
              />
              {(images as Record<string, string>)[key] && (
                <div className="mt-2">
                  <img
                    src={(images as Record<string, string>)[key]}
                    alt={label}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Page Banner Images</h3>
        <p className="text-sm text-gray-500 mb-6">Full-width banner images shown at the top of each page.</p>

        <div className="space-y-4">
          {[
            { section: "about", label: "About Page" },
            { section: "contact", label: "Contact Page" },
            { section: "gallery", label: "Gallery Page" },
            { section: "clients", label: "Clients Page" },
            { section: "printing", label: "Printing Services" },
            { section: "packaging", label: "Packaging Solutions" },
          ].map(({ section, label }) => {
            const sectionData = (content as Record<string, Record<string, unknown>>)[section];
            const bannerImage = (sectionData?.bannerImage as string) || "";
            return (
              <div key={section} className="border border-gray-200 rounded-lg p-4">
                <InputField
                  label={`${label} Banner`}
                  value={bannerImage}
                  onChange={(v) => {
                    setContent({
                      ...content,
                      [section]: { ...sectionData, bannerImage: v },
                    } as SiteContent);
                  }}
                />
                {bannerImage && (
                  <div className="mt-2">
                    <img src={bannerImage} alt={`${label} banner`} className="w-full h-24 object-cover rounded-lg" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Page Background Images</h3>
        <p className="text-sm text-gray-500 mb-6">Add a subtle background image with transparency to non-home pages. Leave the URL empty to disable.</p>

        <div className="space-y-4">
          {pages.map(({ key, label }) => {
            const bg = pageBackgrounds[key] || { image: "", opacity: 0.05 };
            return (
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">{label} Page</h4>
                <InputField
                  label="Background Image URL"
                  value={bg.image}
                  onChange={(v) => updatePageBg(key, "image", v)}
                />
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Opacity: {(bg.opacity * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={Math.round(bg.opacity * 100)}
                    onChange={(e) => updatePageBg(key, "opacity", parseInt(e.target.value) / 100)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1% (very subtle)</span>
                    <span>30% (strong)</span>
                  </div>
                </div>
                {bg.image && (
                  <div className="mt-3 relative h-20 rounded-lg overflow-hidden">
                    <img src={bg.image} alt={`${label} background`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-white" style={{ opacity: 1 - bg.opacity }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600 bg-white/80 px-2 py-1 rounded">
                        Preview at {(bg.opacity * 100).toFixed(0)}% opacity
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SiteInfoEditor({ content, setContent }: EditorProps) {
  const { siteInfo } = content;
  const update = (field: string, value: string) => {
    setContent({ ...content, siteInfo: { ...siteInfo, [field]: value } });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Site Information</h3>
      <InputField label="Company Name" value={siteInfo.companyName} onChange={(v) => update("companyName", v)} />
      <InputField label="Tagline" value={siteInfo.tagline} onChange={(v) => update("tagline", v)} />
      <InputField label="Phone" value={siteInfo.phone} onChange={(v) => update("phone", v)} />
      <InputField label="Email" value={siteInfo.email} onChange={(v) => update("email", v)} />

      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Registered Office (New Delhi)</h4>
        <InputField
          label="Address"
          value={siteInfo.registeredOffice.address}
          onChange={(v) =>
            setContent({
              ...content,
              siteInfo: { ...siteInfo, registeredOffice: { ...siteInfo.registeredOffice, address: v } },
            })
          }
        />
        <div className="mt-3">
          <InputField
            label="Google Maps Embed URL"
            value={siteInfo.registeredOffice.mapUrl}
            onChange={(v) =>
              setContent({
                ...content,
                siteInfo: { ...siteInfo, registeredOffice: { ...siteInfo.registeredOffice, mapUrl: v } },
              })
            }
          />
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Branch Office (Jaipur)</h4>
        <InputField
          label="Address"
          value={siteInfo.branchOffice.address}
          onChange={(v) =>
            setContent({
              ...content,
              siteInfo: { ...siteInfo, branchOffice: { ...siteInfo.branchOffice, address: v } },
            })
          }
        />
        <div className="mt-3">
          <InputField
            label="Google Maps Embed URL"
            value={siteInfo.branchOffice.mapUrl}
            onChange={(v) =>
              setContent({
                ...content,
                siteInfo: { ...siteInfo, branchOffice: { ...siteInfo.branchOffice, mapUrl: v } },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
