export default function Home() {
  return (
    <main className="min-h-screen bg-background text-on-surface">
      <section className="mx-auto flex min-h-screen max-w-container items-center px-5 py-24 md:px-16">
        <div className="max-w-3xl">
          <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            The SUITES LLC
          </p>
          <h1 className="font-serif text-5xl font-bold leading-tight text-primary md:text-7xl">
            Frontend server is running.
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-lg leading-8 text-on-surface-variant">
            Next.js and Tailwind CSS are set up for The SUITES. This is only
            the project foundation; public pages and components will be added
            in the next phase.
          </p>
          <div className="mt-10 rounded-2xl border border-outline-variant bg-surface-container-low p-6 font-sans text-sm text-on-surface-variant">
            <p>
              Stack: <span className="font-semibold text-primary">Next.js</span>{" "}
              + <span className="font-semibold text-primary">Tailwind CSS</span>
            </p>
            <p className="mt-2">
              Backend API target:{" "}
              <span className="font-semibold text-primary">
                {process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}
              </span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
