import PublicLayout from "@/components/layout/PublicLayout";

const galleryItems = [
  {
    title: "The Main Pavilion",
    category: "Architecture",
    className: "h-[360px] md:col-span-8 md:h-[600px]",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAldYCETbna2gShmUzf0De8L-j89ONHYWdbM5iJrq_dLQK1oSg79-23yL0ADbJsJ443CRprdpiWd0LaskKGEmU9-IazjIKJRVlAK5w4XsnIxGaUx2wH9EW9oJf5abjTAIWyoG8N4V3JWVNR9bSZTC3X7k2tJO6p1oLweNU2a7Jl_eCSx_Ie7d4gw62_OgNFp7bAWRKDYy-KjqNKYfRk2_74QU4fckQ1rcarwvwGt8dxUZ7UCyQ0RH4POktRsUxhazlboZZ0v9waEwo",
  },
  {
    title: "Detail & Tactility",
    category: "Suites",
    className: "h-[360px] md:col-span-4 md:h-[600px]",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsHoj9OJoNFJkCbVQ-7kwd8j3zgzLpkGDqYkHgyLRrMva9eclgVcYiNMY7x0h-gUL-_4x8a9DNoYk-dCuX0ENjDGUHeoKec04KXJ1TQ-fWk-uPuQ1R18h6rGoaZeGPk_DLGzdG6reG8uCaR-bp9BsuW_pz6Wg-KfZCx-MCBFZtrEPNSe4fzFvhlkIMifj-Zfxc5Y0_3T1Kb5aEn3I2F020nYBPptU2RD_nLwxHvXaCmJPjXtMR1zDStDzm42OOFVxWrAzJSlR41ew",
  },
  {
    title: "Epicurean Art",
    category: "Dining",
    className: "h-[320px] md:col-span-4 md:h-[400px]",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAO2XPVxUDBkETSUqi3g4ffJmtdwwekj8Z5C9_PQgRx-KZJknIn6bSg5SkyGOmKugDHsPLHGBik7ukoFRU9dfO1tAkqAoS8JoOkIr2IcqvS3VGMDU7PV9r8aaFk7PdeG5fJqUfyksZO_VUdFeHvyxu09zujVLGPk1YOWyJ1-aoBuOATqd0tPyHh8rQbmVPjdzqADM71zRci1_2UaaJUA81hNKkbaqJhcMVV4dpj4xPVjG36HQl5hfpTSIUiQtsTwYToUVMJq7_NA0g",
  },
  {
    title: "Coastal Serenity",
    category: "Surroundings",
    className: "h-[320px] md:col-span-4 md:h-[400px]",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW0o0KGm6oSE0hH3kWp__T0c97LiyQfWvzwr6S2SjvhL9a6f2UB2gynvC0sEehK6WZgiUakyU5ujCfw8E0TMJ87k55kZMOGMs76CYZ84qv7LTqBvAhav1Wo-rY72ikLlwCedUYKgZUpsdwjmVsavcHdNrBejbAOMw7PwFgKj8d_6baWbBg5BzZ0uYdpwNsDJw88jjFwC19uiEJHHE0ZgyXWLqXL6xyxquyiCRXumFEmgpZwj5MArzz_tmCN7O23wq9NKNUJS-40Jw",
  },
  {
    title: "Presidential Vista",
    category: "Suites",
    className: "h-[320px] md:col-span-4 md:h-[400px]",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjQO4VoATuYv044BKsCGOSe5YtArNyNeSyHlGEf6wMnhqBiX9R-ROEclhVVOnl0I59pLA3N6_wLi_IK_MVkeA_hbyeq2Klqs49rX7_T6ehjDD1QL-sO0Iia58FuqmPcbAxB7jdB7aw3i2bJHyw2L9DcZmkiyGHa6UMAdbseft8Ti2-wpgnJCJauA1ZhV9-37rKiwi06iNkcrIub7YvHrhJAt2FgpWCI6teQY1MTyiioTNnJI0RLrB8Sijmenf5pnEhChKlb7Jt6P0",
  },
  {
    title: "The Great Hall",
    category: "Architecture",
    className: "h-[420px] md:col-span-12 md:h-[700px]",
    feature: true,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPFEKGSLs_qSEIkujo4hB4W0s3dr6NFayADLUSJmAznUbDZzr-V1nwwPfOzBEKL_mEsJSngxHFzW93BF1g714vJyjmcxjcBQZphMh54RDq-43pc2jop5Ns2r5tXPzQn5Q1HMM4uZ1KRfKeAa7a_9Fjwj74cczFNv8zNuASkEokVBNIQHz3YWoQBZbd-fBPLVFItty-ehDqXqE3o2yNNed5k6d9rwSDdThsIacoEv1AnxuO7MLRm2tvXyr3WoVkFsUEDMgqRLNMMAU",
  },
  {
    title: "Starlit Table",
    category: "Dining",
    className: "h-[360px] md:col-span-6 md:h-[500px]",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdnJIS_29OYHn5Zz6OloF0-0C4O13h9ej_MZMVKgR5243ekrdLt219LxYTIDOAsWnOCctYJVUaeBl-dCm_sNTT1mNbNuvqzLz_le0UZtXC_3-CIiakkseONQsqFttlrujIhUNgBWbEe7tXaSt-mcrDXTDINrQjfRAAIoWMu2VV5uY_ltqirtuFDj0BHOXIGRRvEnfNAdBt3NakbZgT0dLvCCD-XJrd8qeImgugn70AwklZ6nj3iWzxTJGoxxi5vO634lys3YMPQ-s",
  },
  {
    title: "Sanctuary of Wellness",
    category: "Experience",
    className: "h-[360px] md:col-span-6 md:h-[500px]",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCoN9ew6vcwCiBOcVhmjQrivyItyP97gFAiNbaYOAVXqL5FmWjbg1K_G3f3nCONWhdLgAT6QwhIz7plVaKYGGi0x51fpYUI6DMxbRcF2OWUi3rPdez5jf0q_Jyvd4HqDLPL8QQyjRIJf3bJ652-ypaEpj1o-Cn0rCgIXaJnGBraVZJLJYQzwi2NJjIqI9cAEIl441QZybuMg7wNdxEcIW3CsELKZ1aR1IV1OvYXgk7QwNt7SSpfHBgjs1J0xTzX4oq4jxjzHZ0pe4",
  },
];

export default function GalleryPage() {
  return (
    <PublicLayout>
      <main className="mx-auto max-w-container px-6 pb-[120px] pt-32 md:px-16">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Visual Journey</span>
          <h1 className="mb-6 font-serif text-4xl font-semibold text-primary md:text-6xl">A Curated Perspective</h1>
          <div className="mx-auto mb-8 h-px w-12 bg-secondary" />
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-8 border-b border-outline-variant/30 pb-6">
          {["All", "Architecture", "Suites", "Dining", "Surroundings"].map((filter, index) => (
            <button
              className={`pb-2 text-sm font-semibold uppercase tracking-[0.1em] transition-colors ${
                index === 0 ? "border-b border-secondary text-secondary" : "text-on-surface-variant hover:text-secondary"
              }`}
              key={filter}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {galleryItems.map((item) => (
            <figure className={`group relative col-span-12 overflow-hidden ${item.className}`} key={item.title}>
              <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={item.src} alt={item.title} />
              <figcaption className={`absolute inset-0 flex flex-col justify-end ${item.feature ? "bg-primary/30 md:p-12" : "bg-primary/20"} p-8 text-on-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100`}>
                <span className="mb-2 text-xs font-medium uppercase tracking-[0.2em]">{item.category}</span>
                <h3 className={`font-serif font-semibold ${item.feature ? "text-5xl" : "text-2xl"}`}>{item.title}</h3>
                {item.feature ? (
                  <p className="mt-4 max-w-xl leading-relaxed opacity-90">
                    An orchestration of light and space designed to evoke a sense of profound calm upon arrival.
                  </p>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="rounded-lg border border-secondary px-12 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-secondary transition-colors hover:bg-secondary/5" type="button">
            View Full Collection
          </button>
        </div>
      </main>
    </PublicLayout>
  );
}
