"use client";

import { useState } from "react";
import Navigation from "../components/Navigation";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(94,234,212,0.14),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(94,129,244,0.12),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(244,114,182,0.1),transparent_30%)]" />
      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 pb-16 pt-12 sm:px-10 lg:pb-24 lg:pt-16">
        <Navigation />

        <section className="grid gap-10 lg:grid-cols-[1.2fr,1fr] lg:items-start">
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 shadow-sm shadow-emerald-500/20">
                Travel support
              </div>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Questions about your trip?
              </h1>
              <p className="text-lg text-slate-200">
                We help with bookings, refunds, and live route updates across bus,
                train, and flights. Reach out and we&apos;ll respond quickly.
              </p>
            </div>

            <div className="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-indigo-500 text-xl font-bold text-slate-950 shadow-lg shadow-emerald-500/25 flex-shrink-0">
                  📧
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Email us
                  </h3>
                  <p className="text-slate-300">support@swifttickets.com</p>
                  <p className="text-slate-300">refunds@swifttickets.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-indigo-500 text-xl font-bold text-slate-950 shadow-lg shadow-emerald-500/25 flex-shrink-0">
                  📞
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Call us
                  </h3>
                  <p className="text-slate-300">+1 (555) 202-7788</p>
                  <p className="text-sm text-slate-400">
                    24/7 travel assistance
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-indigo-500 text-xl font-bold text-slate-950 shadow-lg shadow-emerald-500/25 flex-shrink-0">
                  📍
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Visit us
                  </h3>
                  <p className="text-slate-300">
                    45 Transit Plaza
                    <br />
                    Suite 1200
                    <br />
                    San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/20 via-indigo-500/10 to-transparent blur-3xl" />
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/20 bg-slate-900/60 px-4 py-3 text-white placeholder-slate-400 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 transition"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/20 bg-slate-900/60 px-4 py-3 text-white placeholder-slate-400 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 transition"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-xl border border-white/20 bg-slate-900/60 px-4 py-3 text-white placeholder-slate-400 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 transition resize-none"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-400 to-indigo-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:shadow-emerald-400/40"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

