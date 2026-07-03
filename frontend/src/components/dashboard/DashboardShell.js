"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Children, cloneElement, isValidElement, useEffect, useMemo, useState } from "react";
import { getCurrentUser, logout } from "@/services/auth.service";

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: "□", roles: ["admin", "staff"] },
  { href: "/dashboard/bookings", label: "Bookings", icon: "◷", roles: ["admin", "staff"] },
  { href: "/dashboard/messages", label: "Messages", icon: "✉", roles: ["admin", "staff"] },
  { href: "/dashboard/bespoke-requests", label: "Requests", icon: "◇", roles: ["admin", "staff"] },
  { href: "/dashboard/suites", label: "Suites", icon: "▣", roles: ["admin"] },
  { href: "/dashboard/amenities", label: "Amenities", icon: "✦", roles: ["admin"] },
  { href: "/dashboard/experiences", label: "Experiences", icon: "◎", roles: ["admin"] },
  { href: "/dashboard/gallery", label: "Gallery", icon: "▤", roles: ["admin"] },
  { href: "/dashboard/users", label: "Staff & Roles", icon: "◉", roles: ["admin"] },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙", roles: ["admin"] },
];

export default function DashboardShell({ title, children }) {
  const pathname = usePathname();
  const isBookings = pathname.startsWith("/dashboard/bookings");
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        if (active) setUser(currentUser);
      } catch {
        if (active) {
          setUser(null);
          window.location.href = "/login";
        }
      } finally {
        if (active) setIsLoadingUser(false);
      }
    }

    loadUser();
    return () => {
      active = false;
    };
  }, []);

  const role = user?.role || "";
  const visibleLinks = useMemo(
    () => navLinks.filter((item) => item.roles.includes(role)),
    [role]
  );
  const initials = `${user?.first_name?.[0] || "S"}${user?.last_name?.[0] || "U"}`.toUpperCase();
  const displayName = user ? `${user.first_name} ${user.last_name}` : "Staff User";
  const portalLabel = role === "admin" ? "Admin Portal" : "Staff Portal";
  const roleLabel = role === "admin" ? "Administrator" : "Front Desk Staff";
  const currentRoute = navLinks.find((item) =>
    item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href)
  );
  const blockedForRole = currentRoute && !currentRoute.roles.includes(role);
  const childrenWithUser = Children.map(children, (child) =>
    isValidElement(child) ? cloneElement(child, { currentUser: user }) : child
  );

  async function signOut() {
    await logout();
    window.location.href = "/login";
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-on-surface md:h-screen md:overflow-hidden">
      {isLoadingUser ? (
        <div className="flex min-h-screen items-center justify-center bg-background p-8">
          <p className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-secondary">
            Loading dashboard access...
          </p>
        </div>
      ) : null}
      {!isLoadingUser ? (
        <div className="flex h-full w-full">
        <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 shrink-0 flex-col gap-4 border-r border-outline-variant/30 bg-surface-container-low py-8 md:flex">
          <div className="mb-4 px-6">
            <h1 className="font-serif text-2xl font-semibold tracking-tight text-primary">THE SUITES</h1>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-outline">{portalLabel}</p>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
            {visibleLinks.map(({ href, label, icon }) => {
              const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  className={`mx-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.04em] transition-all ${
                    active
                      ? "translate-x-1 bg-primary text-on-primary"
                      : "text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                  href={href}
                  key={href}
                >
                  <span className="w-5 text-center text-base leading-none">{icon}</span>
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-1 border-t border-outline-variant/20 pt-4">
            {!isBookings ? (
              <div className="mb-2 flex items-center gap-3 px-6 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-container font-bold text-on-secondary-container">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none text-on-surface">{displayName}</p>
                  <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">{roleLabel}</p>
                </div>
              </div>
            ) : null}
            <Link
              className="mx-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.04em] text-on-surface-variant transition-all hover:bg-surface-container-high"
              href="/contact"
            >
              <span className="w-5 text-center">?</span>
              Help
            </Link>
            <button
              className="mx-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.04em] text-error transition-all hover:bg-error-container/30"
              type="button"
              onClick={signOut}
            >
              <span className="w-5 text-center">↪</span>
              Logout
            </button>
          </div>
        </aside>

        <section className="flex min-h-screen min-w-0 flex-1 flex-col bg-background pb-20 md:ml-64 md:h-full md:overflow-hidden md:pb-0">
          <header className="sticky top-0 z-30 flex min-h-20 w-full items-center justify-between gap-4 border-b border-secondary/10 bg-surface/90 px-5 py-4 shadow-sm backdrop-blur-xl md:h-20 md:px-16 md:py-0">
            <div className="flex flex-col">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary md:hidden">{portalLabel}</p>
              <h2 className="font-serif text-xl font-semibold tracking-tight text-primary md:text-2xl">{title}</h2>
              {isBookings ? (
                <p className="text-xs font-medium text-outline">The Suites Liberia • Guest Management</p>
              ) : null}
            </div>
            <div className="flex items-center gap-6">
              <button
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-primary md:hidden"
                type="button"
                aria-label="Open dashboard menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((current) => !current)}
              >
                <span className="text-xl leading-none">{menuOpen ? "×" : "☰"}</span>
              </button>
              <div className="hidden items-center gap-3 rounded-full border border-outline-variant/30 bg-surface-container px-4 py-2 lg:flex">
                <span className="text-outline">⌕</span>
                <input
                  className="w-48 border-none bg-transparent p-0 text-sm text-on-surface outline-none placeholder:text-outline/60"
                  placeholder={isBookings ? "Search guests..." : "Search bookings, guests..."}
                  type="text"
                />
              </div>
              <div className="hidden items-center gap-3 border-l border-outline-variant/30 pl-6 sm:flex">
                <div className="text-right">
                  <p className="text-sm font-semibold uppercase tracking-[0.1em] text-on-surface">{portalLabel}</p>
                  <p className="text-xs text-outline">{roleLabel}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-secondary/20 bg-secondary-container text-sm font-bold text-secondary">
                  {initials}
                </div>
              </div>
            </div>
          </header>

          {menuOpen ? (
            <div className="fixed inset-0 z-40 bg-primary/35 backdrop-blur-sm md:hidden" onClick={() => setMenuOpen(false)}>
              <aside
                className="absolute right-0 top-0 flex h-full w-[86vw] max-w-sm flex-col bg-surface-container-lowest shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="border-b border-outline-variant/20 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{portalLabel}</p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-primary">Dashboard Menu</h3>
                  <p className="mt-1 text-sm text-on-surface-variant">{roleLabel}</p>
                </div>

                <nav className="flex-1 overflow-y-auto p-4">
                  {visibleLinks.map(({ href, label, icon }) => {
                    const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
                    return (
                      <Link
                        className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-4 text-sm font-semibold uppercase tracking-[0.06em] ${
                          active ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant"
                        }`}
                        href={href}
                        key={href}
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/50 text-base leading-none text-primary">
                          {icon}
                        </span>
                        <span>{label}</span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="border-t border-outline-variant/20 p-4">
                  <Link
                    className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-on-primary"
                    href="/dashboard/bookings"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>◷</span>
                    Manage Bookings
                  </Link>
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-error/30 px-4 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-error"
                    type="button"
                    onClick={signOut}
                  >
                    <span>↪</span>
                    Logout
                  </button>
                </div>
              </aside>
            </div>
          ) : null}

          {blockedForRole ? (
            <div className="flex-1 overflow-y-auto p-8">
              <section className="mx-auto max-w-2xl rounded-xl border border-secondary/10 bg-surface-container-lowest p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Staff Access</p>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-primary">This area is admin-only.</h2>
                <p className="mt-4 leading-7 text-on-surface-variant">
                  Staff accounts can manage bookings, contact messages, and bespoke guest requests. Suite content, users, uploads, and settings are reserved for admin accounts.
                </p>
                <Link className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-on-primary" href="/dashboard/bookings">
                  Go to Bookings
                </Link>
              </section>
            </div>
          ) : childrenWithUser}
        </section>
        </div>
      ) : null}
      {!isLoadingUser ? (
        <nav className="fixed bottom-0 left-0 z-50 grid h-16 w-full grid-cols-5 border-t border-secondary/10 bg-surface-container-lowest/95 text-on-surface-variant shadow-xl backdrop-blur md:hidden">
          {visibleLinks.slice(0, 4).map(({ href, label, icon }) => {
            const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
            return (
              <Link className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold uppercase ${active ? "text-primary" : ""}`} href={href} key={href}>
                <span className="text-base leading-none">{icon}</span>
                <span>{label}</span>
              </Link>
            );
          })}
          <button
            className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold uppercase ${menuOpen ? "text-primary" : ""}`}
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span className="text-base leading-none">☰</span>
            <span>More</span>
          </button>
        </nav>
      ) : null}
    </main>
  );
}
