import Link from "next/link";
import { getSuiteImage } from "@/services/suites.service";

export default function SuiteCard({ suite }) {
  return (
    <article className="suite-card group">
      <Link href={`/suites/${suite.slug}`} className="block">
        <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-lg bg-surface-container luxury-shadow">
          <img
            src={getSuiteImage(suite)}
            alt={suite.images?.[0]?.alt_text || suite.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {suite.featured ? (
            <span className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-primary backdrop-blur">
              Signature
            </span>
          ) : null}
        </div>
        <div className="mb-2 flex items-start justify-between gap-5">
          <h3 className="font-serif text-2xl font-semibold leading-snug text-primary transition-colors group-hover:text-secondary">
            {suite.name}
          </h3>
          <p className="shrink-0 text-sm font-semibold text-secondary">
            ${Number(suite.price_per_night).toLocaleString()}
            <span className="text-xs font-normal text-outline-variant"> / night</span>
          </p>
        </div>
        <div className="mb-6 flex flex-wrap gap-4 text-xs font-medium tracking-wide text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <span className="text-sm text-secondary">●</span>
            {suite.max_guests} Guests
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-sm text-secondary">□</span>
            {suite.size || suite.bed_type}
          </span>
        </div>
        <div className="rounded-lg border border-primary py-4 text-center text-sm font-semibold uppercase tracking-[0.1em] text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-on-primary">
          Reserve Suite
        </div>
      </Link>
    </article>
  );
}
