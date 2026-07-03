"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PublicLayout from "@/components/layout/PublicLayout";

const suiteImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA04g1dDm2qecSyvnXYWXFvSDrr7mD5k9ap9BXd4BUwHB-T84E10m9uE-4wSbiGyUeroGSa72r7vYDXYvwWzHVaarmPHZMO7FoBfIkWnPiBcO-h8mMfWUFFNLdmlHy-RdgVJBgMTZzEhGpzv2uo4PYi4LvRGCR2yfvY8s1rkw7or7Wwp05e2_9d8H6k9rHa7Oll0MSyaqMhuXlhHrwLLI8sU4E8mAZFnYqIpkuzm7XjuEMv407X5fBe5fT7Fq5VYdVXqbarkb-NDYc";

const spaImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCtOqVmH4yGzr-PWJAv4cowd1f9wZsjbmYCltopRbwnPRMxisqo3ZKqOxR36tNQhO9rDlAQhynlBl6Sl4_kQlkyMH0c9oRpfVSkPtWnNIZSPGzA4R11GzNRZjJmdNaEFeCRViQye861d4d2acBgc3VAD5xOUIjKGcvQ5e371ZhUhetHKRRRxEekeHxG05B7C8TZ5ro70rXABkiE1dWlIOkhtE1SUQbBicB4o7EVhZS1YSBgP5pC90ZT8d2ckkSFSojN7ufFVPZMhPA";

const diningImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA5goVlMOAxN3gLeh0A3Yl9G5Vl3tjN9DP1p_xYdfdu9P1E6z02QaKs_jdqUp5AFwTYzNnAWV51yegM0fQQ154cHI1CnhsX6jvqKc8u4fhIniiabX4lCDwKR1Ctqp8C4WvA2Xr6oAdbmDyxzMd6B89S3rmj9thEAOgZ2px8PXn3oMO0YAQaQUpVqEzngU81lqbkfF0uYuvbu1dHsiJJWEzadku2m5MtCKKqhRJYnAAvaeJmdW0T6CAdxZpcx27SZW05vNWpUA42OL8";

function Icon({ children, className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

function CheckIcon() {
  return (
    <Icon className="h-12 w-12 text-secondary">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function LineIcon({ type }) {
  const paths = {
    calendar: (
      <>
        <path d="M8 3v3M16 3v3M4 9h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      </>
    ),
    event: (
      <>
        <path d="M8 3v3M16 3v3M4 9h16M8 13h3M8 17h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      </>
    ),
    person: (
      <>
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 20c1.4-3.4 3.7-5 7-5s5.6 1.6 7 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
    print: (
      <>
        <path d="M7 8V4h10v4M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 14h10v6H7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </>
    ),
    waves: (
      <path d="M3 8c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M3 14c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M3 20c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    ),
    dining: (
      <>
        <path d="M7 3v18M4 3v5a3 3 0 1 0 6 0V3M17 3v18M17 3c2 2 3 4 3 7 0 2.3-1.2 4-3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
    car: (
      <>
        <path d="m5 12 1.8-5h10.4L19 12M5 12h14v6H5zM7 18v2M17 18v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 15h.01M16.5 15h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </>
    ),
    arrow: <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  };

  return <Icon className="h-6 w-6">{paths[type]}</Icon>;
}

const tips = [
  {
    icon: "waves",
    title: "Robertsport Surfing",
    copy: "Visit Robertsport for world-class point breaks. Even if you do not surf, the pristine beaches and colonial history make for a perfect day trip.",
    tags: ["Adventure", "Coastal"],
  },
  {
    icon: "dining",
    title: "Authentic Flavors",
    copy: 'Do not miss out on Jollof rice and "Cassava Leaf" stew. Our concierge can recommend the most authentic family-run spots in Sinkor.',
    tags: ["Dining", "Culture"],
  },
  {
    icon: "car",
    title: "The SUITES Shuttle",
    copy: "For seamless travel, use our private hotel chauffeur service. Traffic in Monrovia can be complex; let our experts navigate for you.",
    tags: ["Services", "Essential"],
  },
];

function money(value, fallback = "$1,507.00") {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return fallback;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(value, suffix) {
  if (!value) return "To be confirmed";

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "To be confirmed";

  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

  return suffix ? `${formatted} ${suffix}` : formatted;
}

function numberParam(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function getStoredConfirmation() {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.sessionStorage.getItem("suites_last_booking");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [storedConfirmation] = useState(() => getStoredConfirmation());

  const confirmation = useMemo(
    () => ({
      reference: searchParams.get("reference") || storedConfirmation?.reference || "Pending confirmation",
      suite: searchParams.get("suite") || storedConfirmation?.suite || "Selected Suite",
      suiteImage: storedConfirmation?.suiteImage || suiteImage,
      checkIn: searchParams.get("checkIn") || storedConfirmation?.checkIn,
      checkOut: searchParams.get("checkOut") || storedConfirmation?.checkOut,
      guests: searchParams.get("guests") || storedConfirmation?.guests,
      nights: searchParams.get("nights") || storedConfirmation?.nights,
      subtotal: searchParams.get("subtotal") || storedConfirmation?.subtotal,
      serviceCharge: searchParams.get("serviceCharge") || storedConfirmation?.serviceCharge,
      tourismTax: searchParams.get("tourismTax") || storedConfirmation?.tourismTax,
      total: searchParams.get("total") || storedConfirmation?.total,
    }),
    [searchParams, storedConfirmation]
  );

  const reference = confirmation.reference;
  const suite = confirmation.suite;
  const nights = numberParam(confirmation.nights, 1);
  const guests = numberParam(confirmation.guests, 1);
  const subtotal = numberParam(confirmation.subtotal, 0);
  const serviceCharge = numberParam(confirmation.serviceCharge, 0);
  const tourismTax = numberParam(confirmation.tourismTax, 0);
  const total = money(confirmation.total, money(subtotal + serviceCharge + tourismTax));
  const stayDetails = [
    ["calendar", "Check-in", formatDate(confirmation.checkIn, "(from 3:00 PM)")],
    ["event", "Check-out", formatDate(confirmation.checkOut, "(until 11:00 AM)")],
    ["person", "Guests", `${guests} ${guests === 1 ? "Guest" : "Guests"}`],
  ];

  return (
    <PublicLayout>
      <main className="pb-20 pt-28 md:pb-[120px] md:pt-32">
        <section className="mx-auto mb-16 max-w-container px-5 text-center md:mb-24 md:px-16">
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full border border-secondary/20 bg-secondary-container/20">
            <CheckIcon />
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Reservation Confirmed</span>
            <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight text-primary md:text-6xl">
              Your stay is confirmed.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant">
              We are preparing for your arrival at The SUITES Liberia. A detailed itinerary has been sent to your email.
            </p>
          </div>
        </section>

        <section className="mx-auto mb-20 max-w-container px-5 md:mb-[120px] md:px-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-[0_20px_40px_-10px_rgba(18,28,42,0.05)] lg:col-span-8">
              <div className="flex h-full flex-col md:flex-row">
                <div className="h-[300px] overflow-hidden md:h-auto md:w-1/2">
	                  <div
	                    className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
	                    style={{ backgroundImage: `url('${confirmation.suiteImage}')` }}
	                    aria-label="Luxury suite at The SUITES Liberia"
	                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-10">
                  <div className="mb-6">
                    <h3 className="mb-1 font-serif text-3xl font-semibold leading-tight text-primary">
                      {suite}
                    </h3>
                    <p className="text-xs font-semibold uppercase text-secondary">Confirmation ID: {reference}</p>
                  </div>

                  <div className="space-y-6">
                    {stayDetails.map(([icon, label, value]) => (
                      <div className="flex items-center gap-4" key={label}>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/20 bg-surface-container text-primary">
                          <LineIcon type={icon} />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase text-on-surface-variant">{label}</p>
                          <p className="font-semibold leading-relaxed text-on-surface">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col gap-4 border-t border-secondary/10 pt-8 sm:flex-row">
                    <Link
                      href="/login"
                      className="flex-1 rounded bg-secondary px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.1em] text-on-primary transition-all hover:bg-on-secondary-container hover:shadow-lg active:scale-95"
                    >
                      Sign In to Manage Stay
                    </Link>
                    <button
                      className="rounded border border-secondary p-4 text-secondary transition-colors hover:bg-secondary-fixed"
                      type="button"
                      aria-label="Print booking confirmation"
                    >
                      <LineIcon type="print" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-6 lg:col-span-4">
              <div className="flex h-full flex-col rounded-xl bg-primary p-8 text-on-primary">
                <h4 className="mb-6 font-serif text-2xl font-semibold">Payment Summary</h4>
                <div className="flex-grow space-y-4">
                  <div className="flex justify-between leading-relaxed opacity-80">
                    <span>
                      {nights} {nights === 1 ? "Night" : "Nights"} Stay
                    </span>
                    <span>{money(subtotal, "$0.00")}</span>
                  </div>
                  <div className="flex justify-between leading-relaxed opacity-80">
                    <span>Service Fee</span>
                    <span>{money(serviceCharge, "$0.00")}</span>
                  </div>
                  <div className="flex justify-between leading-relaxed opacity-80">
                    <span>Taxes</span>
                    <span>{money(tourismTax, "$0.00")}</span>
                  </div>
                  <div className="mt-4 flex justify-between border-t border-on-primary/10 pt-4 font-serif text-2xl font-semibold">
                    <span>Total Paid</span>
                    <span>{total}</span>
                  </div>
                </div>
                <div className="mt-8 flex items-start gap-3 rounded-lg bg-primary-container p-4">
                  <span className="text-secondary-fixed">
                    <LineIcon type="info" />
                  </span>
                  <p className="text-sm leading-relaxed opacity-90">
                    Your credit card has been charged. Cancellations are free up to 48 hours before check-in.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="relative mx-5 mb-20 max-w-container overflow-hidden rounded-3xl bg-surface-container-low px-5 py-16 md:mx-auto md:mb-[120px] md:px-16 md:py-20">
          <div className="relative z-10 mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <div className="mb-4 inline-block rounded-full bg-secondary-container/40 px-3 py-1 text-xs font-medium uppercase text-secondary">
                Insider Guide
              </div>
              <h2 className="mb-4 font-serif text-3xl font-semibold text-primary">Local Travel Tips for Liberia</h2>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                Elevate your stay with our curated insights into the local culture and vibrant pulse of Monrovia.
              </p>
            </div>
            <Link
              href="/experiences"
              className="flex items-center gap-2 border-b border-secondary pb-1 text-sm font-semibold uppercase tracking-[0.1em] text-secondary transition-all duration-300 hover:gap-4"
            >
              Full City Guide <LineIcon type="arrow" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {tips.map((tip) => (
              <article
                className="group rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-8 transition-all duration-300 hover:-translate-y-2 hover:border-secondary/30"
                key={tip.title}
              >
                <span className="mb-6 block text-secondary">
                  <LineIcon type={tip.icon} />
                </span>
                <h4 className="mb-3 font-serif text-2xl font-semibold text-primary">{tip.title}</h4>
                <p className="mb-6 leading-relaxed text-on-surface-variant">{tip.copy}</p>
                <div className="flex flex-wrap gap-2">
                  {tip.tags.map((tag) => (
                    <span
                      className="rounded-full bg-surface-container px-3 py-1 text-xs font-semibold uppercase text-outline"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-container px-5 md:px-16">
          <div className="relative flex flex-col items-center gap-12 overflow-hidden rounded-3xl bg-[#002117] p-6 text-on-primary md:p-20 lg:flex-row">
            <div className="z-10 lg:w-1/2">
              <h2 className="mb-6 font-serif text-4xl font-semibold leading-tight md:text-6xl">Enhance Your Experience.</h2>
              <p className="mb-10 text-lg leading-relaxed opacity-80">
                Book a spa treatment or a rooftop dinner at our signature restaurant, The Veranda, before you arrive to ensure availability.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/experiences"
                  className="rounded-full bg-secondary px-10 py-5 text-center text-sm font-semibold uppercase tracking-[0.1em] text-on-primary transition-transform hover:scale-105"
                >
                  Browse Experiences
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-on-primary/30 px-10 py-5 text-center text-sm font-semibold uppercase tracking-[0.1em] transition-colors hover:bg-on-primary/10"
                >
                  Contact Concierge
                </Link>
              </div>
            </div>
            <div className="z-10 grid gap-4 lg:w-1/2 lg:grid-cols-2">
              <div className="h-40 overflow-hidden rounded-2xl">
                <img
                  className="h-full w-full object-cover"
                  src={spaImage}
                  alt="Luxury spa treatment with stones, oils, orchids, and candlelit textures"
                />
              </div>
              <div className="h-40 overflow-hidden rounded-2xl lg:mt-8">
                <img
                  className="h-full w-full object-cover"
                  src={diningImage}
                  alt="Rooftop dining scene overlooking Monrovia at dusk"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmationContent />
    </Suspense>
  );
}
