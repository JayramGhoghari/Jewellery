import Navigation from "../components/Navigation";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(94,234,212,0.14),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(94,129,244,0.12),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(244,114,182,0.1),transparent_30%)]" />
      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 pb-16 pt-12 sm:px-10 lg:pb-24 lg:pt-16">
        <Navigation />

        <section className="space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 shadow-sm shadow-emerald-500/20">
              About SwiftTickets
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Reliable ticketing across bus, train, and flights
            </h1>
            <p className="text-lg text-slate-200">
              We connect travelers to thousands of routes daily with transparent
              fares, flexible options, and support that follows every journey.
            </p>
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-slate-300 leading-relaxed">
              Make multi-modal travel simple. Compare seats, fares, and policies
              across buses, trains, and airlines in seconds, then book with
              confidence.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Vision</h2>
            <p className="text-slate-300 leading-relaxed">
              A world where every trip is effortless: best routes surfaced,
              pricing stays clear, and travelers stay informed from booking to
              boarding.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">What We Do</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-sm">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-indigo-500 text-xl font-bold text-slate-950 shadow-lg shadow-emerald-500/25">
                🧭
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Smart routing
              </h3>
              <p className="text-sm text-slate-300">
                We surface the fastest and most reliable combinations across
                buses, trains, and flights—no more tab hopping.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-sm">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-indigo-500 text-xl font-bold text-slate-950 shadow-lg shadow-emerald-500/25">
                💳
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Clear pricing
              </h3>
              <p className="text-sm text-slate-300">
                Total fare transparency: seat classes, baggage rules, refund
                policies, and fees shown before you pay.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-sm">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-indigo-500 text-xl font-bold text-slate-950 shadow-lg shadow-emerald-500/25">
                🛡️
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Travel assurance
              </h3>
              <p className="text-sm text-slate-300">
                Live updates, instant e-tickets, and flexible changes keep every
                booking protected and on-time.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/15 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-slate-800/50 px-8 py-10 text-center shadow-xl backdrop-blur">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Travel with confidence
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-slate-200 mb-6">
            Join millions of travelers booking smarter routes with SwiftTickets.
            We keep you informed from checkout to check-in.
          </p>
          <button className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-400/25">
            Start booking
          </button>
        </section>
      </main>
    </div>
  );
}

