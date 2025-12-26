"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-indigo-500 text-lg font-bold text-slate-950 shadow-lg shadow-emerald-500/25">
          ST
        </div>
        <div>
          <p className="text-sm text-slate-300">Multi-modal Travel</p>
          <p className="text-base font-semibold text-white">
            SwiftTickets
          </p>
        </div>
      </div>
      <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 sm:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`transition hover:text-white ${
              pathname === item.href
                ? "text-white border-b-2 border-emerald-400 pb-1"
                : "text-slate-200"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <button className="hidden rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5 sm:inline-flex">
          Docs
        </button>
        <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-400/20">
          Launch App
        </button>
      </div>
    </header>
  );
}

