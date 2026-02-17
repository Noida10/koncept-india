"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteContent } from "@/lib/content";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  inquiry: string;
  createdAt: string;
};

type Tab = "home" | "about" | "products" | "gallery" | "clients" | "siteInfo" | "leads";

export default function AdminDashboard() {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchContent();
    fetchLeads();
  }, []);

  async function fetchContent() {
    const res = await fetch("/api/content");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await res.json();
    setContent(data);
  }

  async function fetchLeads() {
    const res = await fetch("/api/contact");
    if (res.ok) {
      const data = await res.json();
      setLeads(data);
    }
  }

  async function saveContent() {
    if (!content) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage("Content saved successfully!");
      } else {
        setMessage("Failed to save content.");
      }
    } catch {
      setMessage("Error saving content.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
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
    { id: "products", label: "Products" },
    { id: "gallery", label: "Gallery" },
    { id: "clients", label: "Clients" },
    { id: "siteInfo", label: "Site Info" },
    { id: "leads", label: `Leads (${leads.length})` },
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
          <div className="flex items-center gap-4">
            {message && (
              <span className={`text-sm font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </span>
            )}
            <button
              onClick={saveContent}
              disabled={saving}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {saving ? "Saving..." : "Save All Changes"}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
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
          {activeTab === "products" && <ProductsEditor content={content} setContent={setContent} />}
          {activeTab === "gallery" && <GalleryEditor content={content} setContent={setContent} />}
          {activeTab === "clients" && <ClientsEditor content={content} setContent={setContent} />}
          {activeTab === "siteInfo" && <SiteInfoEditor content={content} setContent={setContent} />}
          {activeTab === "leads" && <LeadsViewer leads={leads} />}
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
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
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
  const update = (field: string, value: string | string[]) => {
    setContent({ ...content, home: { ...home, [field]: value } });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Home Page</h3>
      <InputField label="Hero Title" value={home.heroTitle} onChange={(v) => update("heroTitle", v)} />
      <TextAreaField label="Hero Subtitle" value={home.heroSubtitle} onChange={(v) => update("heroSubtitle", v)} />
      <InputField label="CTA Button Text" value={home.heroCta} onChange={(v) => update("heroCta", v)} />
      <ListEditor label="Client Strip Names" items={home.clientStrip} onChange={(v) => update("clientStrip", v)} />

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
            items: [],
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
            images: [],
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
        <div key={cat.name} className="border border-gray-200 rounded-lg p-4">
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

function LeadsViewer({ leads }: { leads: Lead[] }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Contact Form Leads ({leads.length})
      </h3>
      {leads.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No leads yet.</p>
      ) : (
        <div className="space-y-4">
          {[...leads].reverse().map((lead) => (
            <div
              key={lead.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{lead.name}</h4>
                  <p className="text-sm text-gray-500">{lead.email} {lead.phone && `| ${lead.phone}`}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{lead.inquiry}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
