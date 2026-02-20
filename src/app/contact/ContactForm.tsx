"use client";
import { useState } from "react";

const WEB3FORMS_KEY = "2b6afd65-6bb9-4704-b1c3-5a681d4ceb21";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // If Web3Forms key is configured, send via API
    if (WEB3FORMS_KEY) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `New inquiry from ${form.name} - Koncept India`,
            from_name: form.name,
            ...form,
          }),
        });
        if (res.ok) {
          setStatus("sent");
          setForm({ name: "", email: "", phone: "", inquiry: "" });
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
      return;
    }

    // Fallback: open mailto
    const subject = encodeURIComponent(`Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.inquiry}`
    );
    window.open(
      `mailto:Konceptindia.enterprises@gmail.com?subject=${subject}&body=${body}`,
      "_self"
    );
    setStatus("sent");
    setForm({ name: "", email: "", phone: "", inquiry: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-gray-900"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-gray-900"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-gray-900"
          placeholder="+91 XXXXX XXXXX"
        />
      </div>

      <div>
        <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-1">
          Inquiry Details *
        </label>
        <textarea
          id="inquiry"
          required
          rows={5}
          value={form.inquiry}
          onChange={(e) => setForm({ ...form, inquiry: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none text-gray-900"
          placeholder="Tell us about your project requirements..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full px-6 py-3 bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 text-white font-semibold rounded-lg transition-colors"
      >
        {status === "sending" ? "Sending..." : "Send Inquiry"}
      </button>

      {status === "sent" && (
        <p className="text-green-600 text-sm font-medium">
          Thank you! Your inquiry has been sent successfully. We&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm font-medium">
          Something went wrong. Please try again or contact us directly.
        </p>
      )}
    </form>
  );
}
