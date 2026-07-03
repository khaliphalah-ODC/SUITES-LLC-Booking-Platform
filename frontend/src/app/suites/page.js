import PublicLayout from "@/components/layout/PublicLayout";
import SuiteCard from "@/components/public/SuiteCard";
import { getSuites } from "@/lib/api";

export const metadata = {
  title: "Suites | The SUITES LLC",
};

export default async function SuitesPage({ searchParams }) {
  const params = await searchParams;
  const { suites, meta } = await getSuites({
    page: params?.page || 1,
    limit: params?.limit || 8,
    search: params?.search || "",
    max_guests: params?.max_guests || "",
    sort: params?.sort || "featured",
  });

  return (
    <PublicLayout>
      <main className="mx-auto max-w-container px-5 pb-[120px] pt-32 md:px-16">
        <header className="mb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Experience
          </p>
          <h1 className="max-w-3xl font-serif text-[48px] font-semibold leading-[1.2] text-primary md:text-[64px] md:font-bold md:leading-[1.1]">
            Our Private Sanctuaries
          </h1>
          <div className="mt-8 h-px w-24 bg-secondary-container" />
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden space-y-10 lg:block">
            <section>
            <h2 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-primary">
              <span className="text-lg text-secondary">≡</span>
              Refined Search
            </h2>
            <form className="space-y-8">
              <div>
                <label className="label mb-4 block">
                  Primary Search
                </label>
                <input
                  name="search"
                  defaultValue={params?.search || ""}
                  placeholder="Garden, executive..."
                  className="field"
                />
              </div>
              <div>
                <label className="label mb-4 block">
                  Guests
                </label>
                <select
                  name="max_guests"
                  defaultValue={params?.max_guests || ""}
                  className="field"
                >
                  <option value="">Any</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
              <div>
                <label className="label mb-4 block">
                  Sort
                </label>
                <select
                  name="sort"
                  defaultValue={params?.sort || "featured"}
                  className="field"
                >
                  <option value="featured">Featured</option>
                  <option value="price_asc">Price low to high</option>
                  <option value="price_desc">Price high to low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
              <div>
                <label className="label mb-4 block">
                  Price Per Night
                </label>
                <input className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-outline-variant accent-primary" type="range" />
                <div className="mt-3 flex justify-between text-xs text-on-surface-variant">
                  <span>$180</span>
                  <span>$2,500+</span>
                </div>
              </div>
              <button className="w-full rounded-lg bg-primary px-5 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-on-primary transition-colors hover:bg-primary-container">
                Apply Filters
              </button>
            </form>
            </section>
          </aside>

          <section>
            <div className="mb-8 flex items-center justify-between gap-4">
              <p className="text-sm text-on-surface-variant">
                {meta?.total || suites.length} suites available
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2">
              {suites.map((suite, index) => (
                <div
                  key={suite.id || suite.slug}
                  className={index % 2 === 1 ? "md:mt-12" : index % 3 === 2 ? "lg:-mt-12" : ""}
                >
                  <SuiteCard suite={suite} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </PublicLayout>
  );
}
