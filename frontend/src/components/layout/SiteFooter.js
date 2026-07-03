import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-secondary/20 bg-surface-container-highest text-primary">
      <div className="mx-auto grid w-full max-w-container grid-cols-1 gap-6 px-5 py-28 md:grid-cols-4 md:px-16">
        <div className="space-y-6">
          <div className="font-serif text-3xl font-semibold text-secondary">THE SUITES</div>
          <p className="max-w-xs text-base leading-7 text-on-surface-variant">
            Redefining hospitality in West Africa through architectural excellence and
            unparalleled service.
          </p>
        </div>
        <div className="space-y-6">
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Discover
          </h4>
          <nav className="flex flex-col gap-3">
            <FooterLink href="/">Experience</FooterLink>
            <FooterLink href="/suites">The Residences</FooterLink>
            <FooterLink href="/dining">Gastronomy</FooterLink>
            <FooterLink href="/wellness">Wellness</FooterLink>
            <FooterLink href="/concierge">Concierge</FooterLink>
          </nav>
        </div>
        <div className="space-y-6">
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Information
          </h4>
          <nav className="flex flex-col gap-3">
            <FooterLink href="/about">Privacy Policy</FooterLink>
            <FooterLink href="/about">Terms of Service</FooterLink>
            <FooterLink href="/gallery">Press Kit</FooterLink>
            <FooterLink href="/contact">Careers</FooterLink>
          </nav>
        </div>
        <div className="space-y-6">
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Contact
          </h4>
          <div className="text-base leading-7 text-on-surface-variant">
            Monrovia, Liberia
            <br />
            West Africa
            <br />
            <a className="transition-colors hover:text-primary" href="tel:+231770000000">
              +231 (0) 77 000 0000
            </a>
            <br />
            <a className="transition-colors hover:text-primary" href="mailto:concierge@thesuites.com">
              concierge@thesuites.com
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-4 border-t border-secondary/10 px-5 py-8 md:flex-row md:px-16">
        <p className="text-xs font-medium text-on-surface-variant">
          © 2024 THE SUITES LLC. Monrovia, Liberia.
        </p>
        <div className="flex gap-6 text-on-surface-variant">
          <span className="transition-colors hover:text-secondary">share</span>
          <span className="transition-colors hover:text-secondary">public</span>
          <span className="transition-colors hover:text-secondary">mail</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-base text-on-surface-variant transition-colors hover:text-primary"
    >
      {children}
    </Link>
  );
}
