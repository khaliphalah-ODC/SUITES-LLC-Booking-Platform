import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";
import BookingSearch from "@/components/public/BookingSearch";

const featuredSuites = [
  {
    badge: "Royal Executive",
    title: "The Presidential Wing",
    description:
      "Our most exclusive accommodation featuring panoramic views and bespoke 24-hour butler service.",
    tags: ["King Bed", "Ocean Front"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcS0f2GUYvLu6-fqx58nArSS0RMaJ32tuPsYftOxRMs1vmLnDl05TKy92htduyBzy0VyOGoZsFuMPhzeOZSfdj9XPxJvPV6AZHjtkyO9cXN70xav1H1tEhXJ3mHthBKQ6VDulfYj_02NXAJlPiH4LHkIVnkCeh7r7F_s399RT2p0QR6MBRUzPfR2dCu2iG6_1O_A02_-CvH_mpX2iuUHAm_rb--Bgx_o8OJTRnT2V9q5W9LKEh3OP_P-2n9_Q_F06nteoGj3IJ3Cg",
  },
  {
    badge: "Signature Suite",
    title: "The Garden Pavilion",
    description:
      "An immersive indoor-outdoor experience surrounded by private botanical gardens and water features.",
    tags: ["Terrace", "Spa Bath"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBXeMqcVudEs9MPZHy8TE8aQlyr3T8gVGNq5amGDTtsJLmvgdmJGNz03qltgso7loHBAj38FG5kwrTOvBtEpiS0rnBj4NMnMhHMccGj6gvsqAND0MGU5T1_P1KBTJ51H7eRpGkxX6ifvh1wTeGbZ8x9SbUAkKM52gb3SOmqaPHHOnQvd9AksDi6FvDYMCs_CS-D9kkPfueXG5gb-_lvfeoiyA4OaBixJSF0eEW9tfwTbLZhG-H2vANgkwdndVY3ZvICU3JpohAI8VE",
  },
  {
    badge: "Deluxe View",
    title: "The Skyline Atelier",
    description:
      "A sophisticated urban sanctuary designed for the modern diplomat, featuring state-of-the-art office amenities.",
    tags: ["Workspace", "City View"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWaz3mmx-dzglPXGDP-mYE0S5xHy_bF1TvJfZtC39CL7e56rd4bJ9igBmxictmCqwIyBwbh53BE1xQmbU4cd-_bDfjo1MOnn2DGTAeUuMLSocVW94GPLPZnPsuUgP03nIIFObcidS5IgQS8rMtGjomP79GUHUQOJoB7eoJHr3O1O4S1GGcyB-KpjWj-z0KBbxNqB12h9ZY8wQr9RV1E0uOSwH6yLxtsBPXdlJcvPqAApo_XoQ6Fw8u3kmkFpMWU0hsjxDPK2DdmN4",
  },
];

const experienceImages = [
  {
    className: "aspect-[3/4]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDA3a2uME-xzcLnaeNGQt0mkGo3fjqmEUMYhVKtoDclrfby0QUIoh5l66Xt3xleoi-EUv99E7uxgo-00Dr-DQhYhfKTTLi9f51ybUJzgvkQK1uQpr6Y4vA0FM4wAsRcB0JvHONdoOOQBxGrjG5zKWkIwFYrGdOUWoSbCyThY7eMyGDvYaglteOQ7f8iYC8mCbJTSBfgp_g8ZvO3lem_7eMfzM1pROePNS0QwhhiJ4YM1He5gNhqeuQIFE8RmnYB8Kw0aiRr7Z7a7Xk",
  },
  {
    className: "aspect-square",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi6SZj9AZYypSUaq7vxO607ZVEKLP0ltSIeyKwy-uYrmintQGUz14lp3fuMDek1L9PThTPWhc7YCRL6inoMUwbkAdVJ109d2PU-GuUdKRsV92kpFhihOt3TX6pL1pSqYbXuoSwTQ-w3-QxRPNQJ1Lo7tOjq76fkmngVXk528NkS36cCUCMgmddQPjovY60qvuYXnngHR-NL8tSa-7PUWicVRsbguNxRdF64ZTAkplNew7JEAbOLFrlfHzPjKODQFXzcCmfZ-_aMUg",
  },
  {
    className: "aspect-square",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzC-RV_PeyszUtmjjFt8bO9SZZIK9X71ehYfjZLAHrKsP2Gx69cFRLps9n221Z_pokiqPVVZdeK1iV2kwTMLTHa2JS79q9PkOkKvni-deW-65DH6ijvJGuAj0RENwZmYr6D_26gx_BCChHJjCaWs5DDB72ltD0f0ZmRfDuR-8quYY9-VW1GlRpjpPREEXwueTNSRAAxziUyPJDLeoT5jMwj7czE5g9lFXTaA3o3m04ZRnGrmnTk8PVRRqP96XVIKb8CeYPl3uthdI",
  },
  {
    className: "aspect-[3/4]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8L_pIYMzlMNP0cGE925ehxWfj7zSYId5pPrhj72o3fzwhi2mgPvPtUW1ZTP9fTzapYD1uAu2MC79idfPs6I9oOzvGxur03VAKNHLPq0pnW0q5fEWFqA9wmOoVO9RJq4Ez2GZ9rnLhQdrl0iFba2yoSbAgyZ2pVHIoZD5yfWXxvyDrf0FIEkZPjhHuURJ4tlxMC9MqyJrLXDFN6RDgUmS-dYm-EFZ9AIxDQOePtNOv4WUcLslbgWdgtqTdXVK419wAUqJ0nvZA6RE",
  },
];

export default function Home() {
  return (
    <PublicLayout>
      <main>
        <section className="relative flex min-h-[680px] w-full items-center justify-center overflow-hidden md:h-screen">
          <div className="absolute inset-0 z-0">
            <img
              className="h-full w-full object-cover"
              alt="An expansive high-end luxury suite interior in Monrovia Liberia"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5OOBm7YWJpj9Ec_3WUyblfIMAejMoJ3c68Uxend_XgB4M7Z_YVf_3SRHSstuBnORA5brUvbFHO7qO76EXuSo9GRaXgREFQFLOvZ-D4xJLmJY2_pPt8QWplRt_2QDgFwfqimX9iAB2waayOcpXE8orGdnaX_0vAVZXA2czwq29dElb5evrspA_i4p01weD7uAT_A2090rWLXFGNJozNw_yxLLmEIObJbBta5lEkJf0-bkSkbm4GxZEFPYaHoaexJOPi6xgBIewOec"
            />
            <div className="hero-gradient absolute inset-0" />
          </div>
          <div className="relative z-10 max-w-4xl px-5 text-center">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-on-primary">
              Experience Liberia
            </p>
            <h1 className="mb-8 font-serif text-[40px] font-bold leading-[1.2] text-white md:text-[64px] md:leading-[1.1]">
              The New Standard of Liberian Luxury
            </h1>
            <BookingSearch />
          </div>
        </section>

        <section className="mx-auto grid max-w-container grid-cols-1 items-center gap-10 px-5 py-20 md:grid-cols-12 md:px-16 md:py-[120px]">
          <div className="space-y-8 md:col-span-5">
            <div>
              <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                The Philosophy
              </span>
              <h2 className="font-serif text-[32px] font-semibold leading-[1.3] text-primary md:text-[48px] md:leading-[1.2]">
                Quiet Confidence. Timeless Heritage.
              </h2>
            </div>
            <p className="text-lg leading-[1.6] text-on-surface-variant">
              At THE SUITES, we believe luxury is not found in noise, but in the curated silence of
              exceptional service and thoughtful design. Our presence in Monrovia is an homage to
              the lush Liberian landscape, blending modern sophistication with a deep respect for
              our cultural roots.
            </p>
            <div className="pt-4">
              <Link className="group inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.1em] text-secondary" href="/about">
                Discover Our Story
                <span className="h-px w-12 bg-secondary transition-all group-hover:w-20" />
              </Link>
            </div>
          </div>
          <div className="relative md:col-span-6 md:col-start-7">
            <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-xl">
              <img
                className="h-full w-full object-cover"
                alt="Editorial hand-carved Liberian mahogany dining table"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFz0MpuAoKuVyfvnSZv8NLnY8B2wSXEnpiIC76-_ZfMROBVXm4cc6LOm1wbMYi2DNxopZ1esd3PYbIKkZOP4BHp4LHqSPtFbgamGNPdMomrtajiRKQBisbSkmxBBcmGPcjiCdKNHbxbRvrpHqFoEV4jjOg_4FymJMu4u7EVFinxy97iTYPItB3wguVrCD519Q1bFFLaXvetJBqUAlNN1-n81_EUhKy2pSYEWYED-y4ShAvOHeZ-FTNW9fHjGlsETCqRe1GYjFCTns"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 hidden h-48 w-48 border border-secondary/20 bg-surface-container-lowest p-4 lg:block">
              <div className="flex h-full w-full flex-col items-center justify-center border border-secondary/10 text-center">
                <span className="font-serif text-3xl text-secondary">01</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">Est. 2024</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-20 md:py-[120px]">
          <div className="mx-auto max-w-container px-5 md:px-16">
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                  The Sanctuary
                </span>
                <h2 className="font-serif text-[32px] font-semibold leading-[1.3] text-primary md:text-[48px] md:leading-[1.2]">
                  Featured Suites
                </h2>
              </div>
              <Link
                className="text-sm font-semibold uppercase tracking-[0.1em] text-on-surface-variant underline decoration-secondary/30 underline-offset-8 transition-colors hover:text-secondary"
                href="/suites"
              >
                View All Accommodations
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featuredSuites.map((suite) => (
                <HomeSuiteCard key={suite.title} suite={suite} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-container px-5 py-20 md:px-16 md:py-[120px]">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="order-2 lg:col-span-7 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {experienceImages.slice(0, 2).map((item) => (
                    <ExperienceImage key={item.image} item={item} />
                  ))}
                </div>
                <div className="space-y-4 pt-8 md:pt-12">
                  {experienceImages.slice(2).map((item) => (
                    <ExperienceImage key={item.image} item={item} />
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 mb-12 lg:order-2 lg:col-span-4 lg:col-start-9 lg:mb-0">
              <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Beyond the Suite
              </span>
              <h2 className="mb-6 font-serif text-[32px] font-semibold leading-[1.3] text-primary md:text-[48px] md:leading-[1.2]">
                Curated Experiences
              </h2>
              <p className="mb-8 leading-[1.6] text-on-surface-variant">
                Our concierge team specializes in the extraordinary. From private coastal
                expeditions to exclusive culinary journeys through Liberian heritage, we bridge the
                gap between global luxury and local soul.
              </p>
              <ul className="mb-10 space-y-4">
                {["Private Atlantic Sailing", "Coastal Foraging Gastronomy", "Monrovia Heritage Tours"].map((item) => (
                  <li className="group flex cursor-pointer items-center gap-3 text-on-surface" key={item}>
                    <span className="text-sm text-secondary">→</span>
                    <span className="text-sm font-semibold uppercase tracking-[0.1em] transition-transform group-hover:translate-x-2">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/gallery"
                className="block w-full border border-secondary py-4 text-center text-sm font-semibold uppercase tracking-[0.1em] text-secondary transition-all duration-300 hover:bg-secondary hover:text-on-primary"
              >
                Explore the Gallery
              </Link>
            </div>
          </div>
        </section>

        <section className="relative bg-primary py-24 text-center text-on-primary">
          <div className="relative z-10 mx-auto max-w-2xl px-5">
            <h2 className="mb-4 font-serif text-[32px] font-semibold leading-[1.3] text-white md:text-[48px] md:leading-[1.2]">
              Join The Circle
            </h2>
            <p className="mb-8 leading-[1.6] opacity-80">
              Receive exclusive invitations to seasonal events and early access to our most
              sought-after suites.
            </p>
            <form className="flex flex-col gap-4 md:flex-row">
              <input
                className="flex-1 rounded-lg border border-white/25 bg-white/10 px-6 py-4 text-white shadow-inner outline-none transition-all placeholder:text-white/50 focus:border-secondary focus:bg-white/15 focus:shadow-[0_0_0_3px_rgba(254,214,91,0.18)]"
                placeholder="Email Address"
                type="email"
              />
              <button className="whitespace-nowrap rounded-lg bg-secondary px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-on-primary transition-transform active:scale-95">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}

function HomeSuiteCard({ suite }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative mb-6 aspect-square overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={suite.title}
          src={suite.image}
        />
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-surface/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-on-surface shadow-sm backdrop-blur">
            {suite.badge}
          </span>
        </div>
      </div>
      <h3 className="mb-2 font-serif text-2xl font-semibold text-on-surface transition-colors group-hover:text-secondary">
        {suite.title}
      </h3>
      <p className="mb-4 line-clamp-2 text-sm leading-6 text-on-surface-variant">
        {suite.description}
      </p>
      <div className="flex gap-4">
        {suite.tags.map((tag) => (
          <span
            className="rounded bg-surface-container-highest px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-outline"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExperienceImage({ item }) {
  return (
    <div className={`${item.className} overflow-hidden rounded-sm`}>
      <img className="h-full w-full object-cover" alt="Curated luxury experience" src={item.image} />
    </div>
  );
}
