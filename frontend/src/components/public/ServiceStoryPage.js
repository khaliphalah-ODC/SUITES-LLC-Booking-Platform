import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";

const pages = {
  dining: {
    eyebrow: "Dining",
    title: "Private Tables, Local Flavor, Quiet Ritual.",
    intro:
      "From chef-led tasting menus to discreet in-suite service, dining at The SUITES is composed around timing, privacy, and Liberian ingredients.",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
    features: ["Private rooftop dinners", "In-suite breakfast service", "Chef-led seasonal menus"],
  },
  wellness: {
    eyebrow: "Wellness",
    title: "Restorative Calm Before the City Begins.",
    intro:
      "Wellness is designed as a pause: massage rituals, quiet movement, poolside recovery, and personal care arranged around each guest.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
    features: ["Spa-inspired treatments", "Personal movement support", "Poolside recovery rituals"],
  },
  concierge: {
    eyebrow: "Concierge",
    title: "Every Detail Arranged Before You Ask.",
    intro:
      "Our concierge team coordinates airport transfers, dining reservations, cultural plans, and the bespoke details that make a stay feel effortless.",
    image:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1600&q=80",
    features: ["Airport transfers", "Local itinerary planning", "Special requests and events"],
  },
};

export default function ServiceStoryPage({ type }) {
  const page = pages[type] || pages.dining;

  return (
    <PublicLayout>
      <main className="pt-20">
        <section className="relative flex min-h-[520px] items-end overflow-hidden md:min-h-[620px]">
          <img className="absolute inset-0 h-full w-full object-cover" src={page.image} alt={page.eyebrow} />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/45 to-transparent" />
          <div className="relative mx-auto w-full max-w-container px-5 pb-20 md:px-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-secondary-fixed">{page.eyebrow}</p>
            <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-tight text-white md:text-7xl">{page.title}</h1>
          </div>
        </section>

        <section className="mx-auto grid max-w-container gap-12 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:px-16 md:py-[120px]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">The Experience</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-primary">Curated with precision.</h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-on-surface-variant">{page.intro}</p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {page.features.map((feature) => (
                <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low p-5" key={feature}>
                  <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">{feature}</p>
                </div>
              ))}
            </div>
            <Link className="mt-10 inline-flex rounded bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-on-primary" href="/contact">
              Contact Concierge
            </Link>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
