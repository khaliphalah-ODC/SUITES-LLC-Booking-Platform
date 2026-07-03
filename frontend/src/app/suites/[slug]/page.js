import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";
import { getSuite, getSuiteImage } from "@/lib/api";

const galleryImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB5c-wqlNvKq-cL2I62bkdqdjqhiF9jJ3Z201UsAYjPLxCtqvvspLW8RjMUVapET4P8X-Y84QBAXNg2p4sPrRTBbUQI63_nRNAtbgK8Mce6U4zsD1-5LW16cpR_3OMYS7puWrHltl4E9TbgZrq6asYu2n0xt8xnD45truPspeA0D5Wgsm9x9_NN8lJB8iMyPDxLNIP3TMRhEzS_lWi3SZY35mkv0WkF99x6phkQw9za9vNf9iX5AoxBJ-uYc4anC8KVscRRLXPJtnM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA3dFBhadyMNClIlbC1WJa3dgG2n55DM5NPGu7ldjonDu1dOriXEOwXjgcwUtT8INnIj3q8hGjzWpBss73FMeJfABcGOMHIzkEtkJ360BXFJcvOxut_NIoXGSLNizsauGEYiwQkSOhU2vyWGTtx1LG-xkcNvEDXUyYWaetCB8re3KO9NW0iHsTZ2JaHgS5Wlgf_4zTCTw1YssXKQxT6o2EEqVHRSjf8dcTRBu7Fp7dFAyoLUtHB7QAKIOg8aHs_lN_fUBSe9NvFYs0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBxrjJq3aj_e4JWYlfDBOrQze58Hq_fuM4qViRakmN7RNStCJVmUZbd-zsMEyoH5FwhCNy77GEpVbAt8OlfSjnh9swMlkFaj8jQzuHHgBbBjVcQeIWhyryB-BH2WbKvCJwUyCOePmDWNY3_Fl0SKHlzFOhCDTiQs6XeOJqIsOgizbIHdgw3toymegOwYO4LzHCP2tLWccIEDZJz4OpQfikiPg0pOY5WfVnJGQoc9ZgCPtVfDUz2oB0Dl7Ztbt3H-R2TXab6i6HTCX8",
];

const related = [
  {
    title: "The Terrace Suite",
    copy: "Garden-facing privacy with calm outdoor living.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Executive Panorama Suite",
    copy: "A polished residence for longer luxury stays.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "The Penthouse Residence",
    copy: "Expansive entertaining spaces above the city.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeqYlewbaj1wHLdPO3PCpLg4iRzZ1UHcYgngQZwnE0qUsTAQb7L9VpziFioKCx3nz8T1MebXIM0lRXiPFDZ5UUpdrZmPU95AvjflRv0PnSNc2WIG_6K6EOh1puazTsNCsN-lzrBRbmvoAnYiehclUUnrrPpJt-N227K5N_rtmge0kYlRr09078ZFgx21wRd5zZh1aduOY3BWwFpndZ1mvimY9ZXOoG8YtQqrd5DoFa1wnRZ6Wv5D1kY5Ye5L7qBc7df2wOqlkcZlA",
  },
];

const amenities = [
  ["♟", "24/7 Butler Service", "Dedicated professional concierge for every need."],
  ["▱", "Private Wraparound Balcony", "Panoramic views of the ocean and lush gardens."],
  ["≈", "Full Ocean View", "Floor-to-ceiling windows with unobstructed horizons."],
  ["◈", "Private Bar & Cellar", "Curated selection of spirits and fine wines."],
];

export default async function SuiteDetailsPage({ params }) {
  const { slug } = await params;
  const { suite } = await getSuite(slug);
  const isPresidential = slug === "presidential-suite";
  const name = isPresidential ? "The Presidential Suite" : suite.name;
  const price = Number(suite.price_per_night || 1200);
  const primaryImage = isPresidential ? galleryImages[0] : getSuiteImage(suite);
  const total = price * 5 + 450;

  return (
    <PublicLayout>
      <main className="pt-20">
        <header className="mx-auto max-w-container px-5 pt-16 md:px-16">
          <div className="mb-8 flex flex-col gap-2">
            <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              <span className="h-px w-8 bg-secondary" />
              The Ultimate Experience
            </span>
            <h1 className="max-w-3xl font-serif text-4xl font-semibold text-primary md:text-6xl">{name}</h1>
          </div>
        </header>

        <section className="mx-auto mb-20 max-w-container px-5 md:mb-[120px] md:px-16">
          <div className="grid h-auto grid-cols-1 gap-6 lg:h-[600px] lg:grid-cols-12">
            <div className="group relative h-[360px] overflow-hidden lg:col-span-8 lg:h-full">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${primaryImage}')` }}
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
            <div className="grid gap-6 lg:col-span-4 lg:grid-rows-2">
              {galleryImages.slice(1).map((image) => (
                <div className="group h-[260px] overflow-hidden lg:h-full" key={image}>
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${image}')` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto mb-20 grid max-w-container grid-cols-1 gap-10 px-5 md:mb-[120px] md:px-16 lg:grid-cols-12">
          <div className="flex flex-col gap-12 lg:col-span-8">
            <div>
              <h2 className="mb-6 font-serif text-3xl font-semibold text-primary md:text-4xl">Unrivaled Grandeur</h2>
              <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
                {suite.description ||
                  "Spanning over 250 square meters of curated luxury, the Presidential Suite is our most prestigious sanctuary. Designed with an unwavering commitment to editorial minimalism, the suite merges local Liberian craftsmanship with international sophistication."}
              </p>
            </div>

            <div className="h-px w-full bg-secondary/20" />

            <div>
              <h3 className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Exclusive Amenities</h3>
              <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
                {amenities.map(([icon, title, copy]) => (
                  <div className="flex gap-4" key={title}>
                    <span className="text-3xl text-primary">{icon}</span>
                    <div>
                      <h4 className="mb-1 text-sm font-semibold uppercase tracking-[0.1em] text-on-surface">{title}</h4>
                      <p className="text-sm text-on-surface-variant">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 bg-surface-container-low p-8 md:p-10">
              <h3 className="font-serif text-2xl font-semibold text-primary">The Sanctuary Experience</h3>
              <p className="leading-relaxed text-on-surface-variant">
                Guests of the Presidential Suite receive complimentary airport transfers, a welcome bottle of vintage champagne, and priority reservations at our dining establishments.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Ultra-fast WiFi", "Netflix & Apple TV", "In-room Spa", suite.bed_type, suite.size].filter(Boolean).map((tag) => (
                  <span className="rounded-full bg-secondary-container/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-secondary" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="border border-secondary/10 bg-surface-container-lowest p-5 shadow-xl shadow-on-surface/5 md:p-8 lg:sticky lg:top-32">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <span className="text-sm text-on-surface-variant">Starting at</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-semibold text-primary">${price.toLocaleString()}</span>
                    <span className="text-sm text-on-surface-variant">/ night</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-secondary">
                  <span>★</span>
                  <span className="text-sm font-semibold">4.9</span>
                </div>
              </div>

              <div className="mb-8 space-y-4">
                <InfoBox label="Suite Capacity" value={`${suite.max_guests || 4} guests`} />
                <InfoBox label="Bed & Size" value={`${suite.bed_type || "King"} • ${suite.size || "120 sqm"}`} />
              </div>

              <div className="mb-8 space-y-3">
                <div className="flex justify-between text-on-surface-variant">
                  <span>${price.toLocaleString()} x 5 nights</span>
                  <span>${(price * 5).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Service Fee</span>
                  <span>$450</span>
                </div>
                <div className="h-px w-full bg-outline-variant/30" />
                <div className="flex justify-between text-lg font-bold text-primary">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              <Link
                href={`/booking?suite=${suite.id || suite.slug}`}
                className="block w-full bg-secondary py-4 text-center text-sm font-semibold uppercase tracking-[0.1em] text-on-primary transition-colors duration-300 hover:bg-primary"
              >
                Continue to Booking
              </Link>
              <p className="mt-4 text-center text-xs text-on-surface-variant">No payment required at this step</p>
            </div>
          </aside>
        </section>

        <section className="bg-surface-container-low px-5 py-20 md:px-16 md:py-[120px]">
          <div className="mx-auto max-w-container">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Curated Selection</span>
                <h2 className="font-serif text-3xl font-semibold text-primary md:text-4xl">Discover Other Suites</h2>
              </div>
              <Link className="border-b border-primary pb-1 text-sm font-semibold uppercase tracking-[0.1em] text-primary transition-colors hover:border-secondary hover:text-secondary" href="/suites">
                View All Suites
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((item) => (
                <article className="group bg-surface-container-lowest" key={item.title}>
                  <div className="h-72 overflow-hidden">
                    <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" src={item.image} alt={item.title} />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-serif text-2xl font-semibold text-primary">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-on-surface-variant">{item.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="flex flex-col gap-1 border border-outline-variant p-4">
      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-secondary">{label}</span>
      <span className="text-on-surface">{value}</span>
    </div>
  );
}
