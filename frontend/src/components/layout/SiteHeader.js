"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Experience", active: ["/"] },
  { href: "/suites", label: "Suites", active: ["/suites"] },
  { href: "/amenities", label: "Amenities", active: ["/amenities", "/experiences", "/dining", "/wellness", "/concierge"] },
  { href: "/gallery", label: "Gallery", active: ["/gallery"] },
  { href: "/contact", label: "Contact", active: ["/contact", "/about"] },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isBooking = pathname.startsWith("/booking");
  const isAccount = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/account");
  const menuItems = [
    ...navItems,
    { href: "/login", label: "Sign In", active: ["/login", "/register", "/account"] },
  ];

  return (
    <header className="fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b border-secondary/10 bg-surface/90 px-5 opacity-95 shadow-sm backdrop-blur-xl lg:px-16">
      <div className="mx-auto flex h-full w-full max-w-container items-center justify-between">
        <Link
          href="/"
          className="shrink-0 font-serif text-xl font-semibold tracking-tight text-primary sm:text-2xl lg:text-3xl"
        >
          THE SUITES
        </Link>
        <nav className="hidden items-center gap-6 xl:gap-10 lg:flex">
          {navItems.map((item) => {
            const active = item.active.some((prefix) =>
              prefix === "/" ? pathname === "/" : pathname.startsWith(prefix)
            );

            if (item.label === "Suites" || item.label === "Amenities") {
              const links =
                item.label === "Suites"
                  ? [
                      ["All Suites", "/suites"],
                      ["Presidential Suite", "/suites/presidential-suite"],
                    ]
                  : [
                      ["Amenities", "/amenities"],
                      ["Experiences", "/experiences"],
                      ["Dining", "/dining"],
                      ["Wellness", "/wellness"],
                      ["Concierge", "/concierge"],
                    ];

              return (
                <div className="group relative" key={item.href}>
                  <Link
                    href={item.href}
                    className={`whitespace-nowrap border-b pb-1 text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${
                      active
                        ? "border-secondary text-secondary"
                        : "border-transparent text-on-surface hover:text-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 mt-5 w-64 -translate-x-1/2 border border-secondary/10 bg-surface-container-lowest p-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {links.map(([label, href]) => (
                      <Link
                        href={href}
                        className="block rounded px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-on-surface-variant hover:bg-surface-container-low hover:text-secondary"
                        key={href}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap border-b pb-1 text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${
                  active
                    ? "border-secondary text-secondary"
                    : "border-transparent text-on-surface hover:text-secondary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className={`hidden whitespace-nowrap border-b pb-1 text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-300 sm:inline-flex lg:inline-flex ${
              isAccount
                ? "border-secondary text-secondary"
                : "border-transparent text-on-surface hover:text-secondary"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/booking"
            className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition-transform duration-200 active:scale-95 sm:text-sm lg:px-5 xl:px-6 ${
              isBooking
                ? "bg-secondary text-on-primary"
                : "bg-primary text-on-primary hover:bg-primary-container"
            }`}
          >
            Book Now
          </Link>
          <button
            className="flex h-10 w-10 items-center justify-center rounded border border-outline-variant text-primary sm:h-11 sm:w-11 lg:hidden"
            type="button"
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>
      {open ? (
        <div className="absolute left-0 top-20 w-full border-b border-secondary/10 bg-surface-container-lowest px-5 py-4 shadow-xl lg:hidden">
          <nav className="grid gap-2">
            {menuItems.map((item) => (
              <Link
                className="rounded px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-on-surface-variant hover:bg-surface-container-low hover:text-secondary"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link className="rounded bg-surface-container-low px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.1em] text-primary" href="/dining" onClick={() => setOpen(false)}>Dining</Link>
              <Link className="rounded bg-surface-container-low px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.1em] text-primary" href="/wellness" onClick={() => setOpen(false)}>Wellness</Link>
              <Link className="rounded bg-surface-container-low px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.1em] text-primary" href="/concierge" onClick={() => setOpen(false)}>Concierge</Link>
              <Link className="rounded bg-surface-container-low px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.1em] text-primary" href="/suites/presidential-suite" onClick={() => setOpen(false)}>Presidential</Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
