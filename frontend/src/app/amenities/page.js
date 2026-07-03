import PublicLayout from "@/components/layout/PublicLayout";
import { getAmenities, getExperiences } from "@/lib/api";

const categoryTabs = ["Amenities", "Experiences", "Dining", "Wellness", "Concierge"];

const editorialCategories = [
  {
    title: "Dining",
    eyebrow: "Gastronomy",
    description:
      "Private dining, lounge service, chef-led menus, and curated moments around local flavor.",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Wellness",
    eyebrow: "Restoration",
    description:
      "Calm wellness rituals, spa-inspired spaces, poolside quiet, and personal movement support.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Concierge",
    eyebrow: "Service",
    description:
      "Transport, reservations, special requests, local guidance, and bespoke guest coordination.",
    image:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1200&q=80",
  },
];

export default async function AmenitiesPage() {
  const [{ amenities }, { experiences }] = await Promise.all([
    getAmenities({ limit: 50 }),
    getExperiences({ limit: 50 }),
  ]);

  return (
    <PublicLayout>
      <main className="pt-20">
        <section className="relative flex h-[640px] items-center justify-center overflow-hidden md:h-[819px]">
          <div className="absolute inset-0 z-0">
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-1000 hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCNWIYtzgpVIXlYcaLZPxg6CY4Vht_3lEMKHoWefiH4-m0y1m745vUXMtkYsjIBxujnhnWo9u5lEe5ubTf7l6mKb0QYwNjfFCObZweCDwqmM1Il2F5wQH-paLQ6VkDj1fLHKM8qZiqWW9pMFGZKjMgpL1ehkiBxhTO224v0eNm2UM2jbh_oAHE1fILddbp36D_XbB8PrFgVAVRnpsploaNIz9AOb7uOav8JGqkugRyX2Iu1T7xh4CKSPgXvEXHl4jJwmTfxzUt5N9M')",
              }}
            />
            <div className="hero-gradient absolute inset-0" />
          </div>
          <div className="relative z-10 px-4 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Curated Experiences
            </p>
            <h1 className="mx-auto max-w-4xl font-serif text-[40px] font-bold leading-[1.2] text-primary md:text-[64px] md:leading-[1.1]">
              Transcending the Everyday
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-container px-5 py-12 md:px-16">
          <div className="flex flex-wrap justify-center gap-3">
            {categoryTabs.map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase()}`}
                className="rounded-full border border-outline-variant bg-surface px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant transition-colors hover:border-secondary hover:text-secondary"
              >
                {category}
              </a>
            ))}
          </div>
        </section>

        <section id="amenities" className="mx-auto max-w-container px-5 py-[120px] md:px-16">
          <div className="mb-20 grid grid-cols-1 items-center gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.1em] text-secondary">
                — On-site Sanctuary
              </span>
              <h2 className="mb-6 font-serif text-[32px] font-semibold leading-[1.3] text-primary md:text-[48px] md:leading-[1.2]">
                The Art of Living
              </h2>
              <p className="mb-8 text-lg leading-[1.6] text-on-surface-variant">
                Within the walls of THE SUITES, every detail is choreographed to enhance your
                well-being. Discovery begins at your doorstep.
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-xl md:col-span-7">
              <img
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCduoz6Pvv2o3jnQhz1ZfZc4DQE0nCuW44Fxb0r90aJgkrWs4NKenJD-iul7GQ8Rx0R0D_SNLQMeVZ_BiXa8clJy-x6mm9kXq0b1hBR2HNkeqzMChQwnpLjdRy6zi7k424fhoPX_S_cud5FRVJEVsyTAA94eBCeiwavy8C_7xxI1X4go_4c7lzPQZiIJ8kS9TULxNGVVcpub9ilp7x_Qq1BC0dXW7x1aUSYEcSkp5R__meeuS7_G_bXbT9HEIGZEPp5W_9XDXJUHE4"
                alt="Luxury spa interior"
              />
            </div>
          </div>
          <CardGrid items={amenities} titleKey="name" />
        </section>

        <section id="experiences" className="bg-primary py-[120px] text-on-primary">
          <div className="mx-auto max-w-container px-5 md:px-16">
            <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <div>
                <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.18em] text-secondary-fixed">
                  Beyond the Threshold
                </span>
                <h2 className="font-serif text-[40px] font-bold leading-[1.2] text-on-primary md:text-[64px] md:leading-[1.1]">
                  Liberian Adventures
                </h2>
              </div>
              <p className="max-w-md text-lg italic leading-[1.6] text-white/75">
                To travel is to find the soul of a place, hidden in its whispers and its tides.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {experiences.map((experience) => (
                <article key={experience.id || experience.slug} className="rounded-xl border border-white/15 bg-white/5 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary-fixed">
                    {experience.category}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl text-white">{experience.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/75">{experience.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-container px-5 py-[120px] md:px-16">
          <div className="grid gap-8 md:grid-cols-3">
            {editorialCategories.map((item) => (
              <article id={item.title.toLowerCase()} key={item.title} className="group">
                <div className="mb-6 aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-secondary">
                  {item.eyebrow}
                </p>
                <h3 className="mb-2 font-serif text-2xl text-primary">{item.title}</h3>
                <p className="leading-7 text-on-surface-variant">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}

function CardGrid({ items, titleKey }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {items.map((item, index) => (
        <article key={item.id || item.slug} className={`group cursor-pointer ${index === 1 ? "md:mt-12" : ""}`}>
          <div className="mb-6 rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              {item.category || "Amenity"}
            </p>
            <h3 className="font-serif text-2xl text-primary">{item[titleKey]}</h3>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
