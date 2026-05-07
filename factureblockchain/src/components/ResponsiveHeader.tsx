"use client";

import Link from "next/link";
import { useState } from "react";

export default function ResponsiveHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/dashboard",     label: "Dashboard" },
    { href: "/scanner",      label: "Scanner IA" },
    { href: "/audit",        label: "Audit" },
    { href: "/observatoire", label: "Observatoire" },
    { href: "/preuves",      label: "Preuves" },
    { href: "/reclamation",  label: "Réclamation" },
    { href: "/suivi",        label: "Suivi" },
    { href: "/juridique",    label: "Portail ARSEL" },
    { href: "/conformite",   label: "Audit Trail" },
    { href: "/profile",      label: "Profil" },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm sm:text-base lg:text-lg font-black tracking-tight text-white flex-shrink-0 whitespace-nowrap"
            >
              <span>Facture</span>
              <span className="text-orange-400">Chain</span>
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm font-semibold text-slate-300 transition hover:text-white hover:bg-white/5 rounded-lg"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#impact"
                className="px-3 py-2 text-sm font-semibold text-slate-300 transition hover:text-white hover:bg-white/5 rounded-lg"
              >
                Impact
              </Link>
            </nav>

            {/* Desktop CTA Buttons - Right */}
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <Link
                href="/dashboard"
                className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-orange-500 rounded-full transition hover:bg-orange-400 whitespace-nowrap"
              >
                Accéder
              </Link>
              <Link
                href="/reclamation"
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-white border border-white/20 bg-white/5 rounded-full transition hover:border-white/40 hover:bg-white/10 whitespace-nowrap"
              >
                Réclamation
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-300 hover:bg-white/10 transition flex-shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-white/10 bg-gradient-to-b from-slate-900/50 to-transparent backdrop-blur pb-4">
              <div className="px-2 py-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 text-sm font-semibold text-slate-300 rounded-lg transition hover:text-white hover:bg-white/5 active:bg-white/10"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/#impact"
                  className="block px-3 py-2 text-sm font-semibold text-slate-300 rounded-lg transition hover:text-white hover:bg-white/5 active:bg-white/10"
                  onClick={closeMenu}
                >
                  Impact
                </Link>
              </div>

              {/* Mobile CTA Buttons */}
              <div className="px-2 py-3 border-t border-white/10 space-y-2">
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm font-bold text-slate-950 bg-orange-500 rounded-full transition hover:bg-orange-400 text-center"
                  onClick={closeMenu}
                >
                  Accéder à l'app
                </Link>
                <Link
                  href="/reclamation"
                  className="block px-4 py-2 text-sm font-semibold text-white border border-white/20 bg-white/5 rounded-full transition hover:border-white/40 hover:bg-white/10 text-center"
                  onClick={closeMenu}
                >
                  Réclamation
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
