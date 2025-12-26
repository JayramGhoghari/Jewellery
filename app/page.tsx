import Image from "next/image";
import Navigation from "./components/Navigation";

const highlights = [
  { label: "Daily trips", value: "28k+", detail: "Bus · Train · Flights" },
  { label: "Avg. savings", value: "18%", detail: "Smart fare matching" },
  { label: "Support", value: "24/7", detail: "Chat & phone help" },
];

const features = [
  {
    title: "Instant booking",
    desc: "Compare routes across bus, train, and airlines with live availability.",
  },
  {
    title: "Transparent pricing",
    desc: "No hidden fees. Seat class, baggage, and refund rules shown upfront.",
  },
  {
    title: "Travel-ready",
    desc: "e-Tickets, live updates, and easy cancellations in one place.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(94,234,212,0.14),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(94,129,244,0.12),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(244,114,182,0.1),transparent_30%)]" />
      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 pb-16 pt-12 sm:px-10 lg:pb-24 lg:pt-16">
        <Navigation />

        <section className="grid gap-10 lg:grid-cols-[1.2fr,1fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 shadow-sm shadow-emerald-500/20">
              Bus · Train · Flight
            </div>
            <div className="space-y-5">
              <p className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Book every ride from one polished, travel-ready experience.
              </p>
              <p className="text-lg text-slate-200">
                Search, compare, and secure seats across buses, trains, and
                airlines with transparent pricing and instant confirmations.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button className="rounded-xl bg-gradient-to-r from-emerald-400 to-indigo-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:shadow-emerald-400/40">
                Search routes
              </button>
              <button className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5">
                View timetables
              </button>
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <div className="flex -space-x-2">
                  <Image
                    src="/vercel.svg"
                    alt="Vercel"
                    width={28}
                    height={28}
                    className="rounded-full bg-white p-1"
                  />
                  <Image
                    src="/next.svg"
                    alt="Next.js"
                    width={28}
                    height={28}
                    className="rounded-full bg-white p-1"
                  />
                </div>
                <span>Trusted by 2M+ travelers</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/20 via-indigo-500/10 to-transparent blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Realtime seats
                </span>
                <span>Live status</span>
              </div>
              <div className="mt-6 grid gap-4 rounded-2xl bg-slate-900/60 p-4">
                <div className="flex items-center justify-between text-sm text-slate-200">
                  <span>On-time performance</span>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                    94% on-time
                  </span>
                </div>
                <div className="h-36 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(94,234,212,0.25),transparent_30%),radial-gradient(circle_at_70%_60%,rgba(129,140,248,0.25),transparent_35%)]" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {highlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/10 bg-white/5 p-3"
                    >
                      <p className="text-xs text-slate-300">{item.label}</p>
                      <p className="text-xl font-semibold text-white">
                        {item.value}
                      </p>
                      <p className="text-xs text-slate-400">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-200">
                <div>
                  <p className="font-semibold text-white">Price lock</p>
                  <p className="text-slate-400">Hold fares while you decide</p>
                </div>
                <button className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-950 hover:-translate-y-0.5 transition">
                  Lock fare
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:grid-cols-3"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-sm"
            >
              <p className="text-lg font-semibold text-white">
                {feature.title}
              </p>
              <p className="mt-2 text-sm text-slate-300">{feature.desc}</p>
            </div>
          ))}
        </section>

        <section
          id="cta"
          className="flex flex-col items-center gap-6 rounded-3xl border border-white/15 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-slate-800/50 px-8 py-10 text-center shadow-xl backdrop-blur"
        >
          <p className="text-3xl font-semibold text-white sm:text-4xl">
            Ready to book your next trip?
          </p>
          <p className="max-w-2xl text-sm text-slate-200">
            One place for buses, trains, and flights. Transparent fares, instant
            confirmations, and reliable support for every journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-400/25">
              Book now
            </button>
            <button className="rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5">
              Explore routes
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
