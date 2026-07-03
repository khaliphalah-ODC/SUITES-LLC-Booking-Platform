import PublicLayout from "@/components/layout/PublicLayout";
import ContactForm from "./ContactForm";

const images = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcmNSVcfEvIRJ84rjJVn-9HDoOlD6j1emvivVi7NQDJsgI6eX2DFdsKwl8qU3Fk3uqhwMEPSJJ3kNY4ORikQJdb45OOmoXhqoGj10Jz82T056b8XrLz-kJG6dEX7QR3bQF81GaB6e57k_btHDVbRhLnVX3awX4ycOl_dcC51K9eXnoWxzKoDbp4XVNDZSb2XNTSGV9S_R9ysxlkLa7k5PncyvHg639rx19A1SWwprxGfu0wf8IdDyHQx3dIEXTWVKLdixU04imjJ8",
  table: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXkEBllCN1w1HS6E1-xzeVA4TX2io6HMVr4pE7EV0o31M4Gc2ynhYuFTffMLf_aHpLUZt1P4VHKGselOSvIDkfKt5hqISvqLzCGHSkfyIpdfdCm5l-FUsHLPOEbUPftUOpAsRc0whVi-u_rIsQQAo8-rZ_xOL68qMJbhCgT_5U03oHVYaetOM1wVl4CaVOyYGM-bokj7pOZhQOiwKC7SwaN85uLWPctIB-mEpUL77M1tEKC4AcZKS3jQGK6rGl_BedpqxX_OvEyU0",
  detail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlcmqUJdLW1cfMKmhBtmh4x7gSNzcz5CvNg3ogZyRN0XPD5HmCuKA14f20PE9wuHR6yYuHbZ5pATUZ9Ox4ydzyVgceRY8re9vkvMZsbQThHh7qMc8KadMIEEnrMgtdInqUd0zUNmaeLedVARhOF_GQPx-2dGtzyvRbgbjDts49_YdhGTyK8zxsIAzqFT91JhVje8C2yDEVRCWrLT4X67sl2g8tAUM8U8DnLJo6-IzI6pNDqWYFPZZJH0WMTsI0sF3kUk8Kv4_ua4Y",
  map: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnjZgSIKfxzDAePx_n48N5PhJB8xdlLtyPsl696xs772Tc5xEaVxi48go0Z3AM6pMqll8ySNW1Vi4usUb1MPFmVpscsJpKrRyut9c33zvj1kZg2B-bprOBagWTFv1ErWCAJrXZG-jre4UzCsdb2nmW3MUssIUPK-DtYpEkH2DbCcvdeApuWZnE88JGL0sx25Sd6ZZGNmEvegYzxfOM3T77Qk3GKYLn4M3Nkg2DPpk7NHtXpHUWxDuVDcKmss4PDGs8rSFHWMiu_8w",
};

const stripImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDvqlNrnfl8H7LqySOg0kiSul5gh_pw0sqgmeyVGRN-4iStZq9TKIY4k70Ze9ICAbiRYkGKmoC7czEKtBIME6IwbicnIOvc_Tj1QXxOMCQ4yq-ipa4Jr-x69hzMX25KDsXCqR-XX1VddcnidO42kqQPxGgGvLhQoSYI-4vWJUcIPtQ4a8fFOtS6lgiNvF7SPDcBbt8nfzVcbQwnAvsqKYcpJInkFC8lhKvBitLqnPqsIAUpGWCog7XrFyakDUt77PrZrSl53AGUWF4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB_soodPWBoM7dfkQZlDfy_2myBpCU214dXE5891vD5kgvMp69cUa2kcn14r9eUfLzb8vH-9e0iBuers76c4FlfQe-1tO_cZu8_6iwf8styN8ziABi2gP-ZB-Lmle4iiKfcTs_IKXD_QKjlJatzgaOiTU0hLnL2KRxfllr3qt5mCMA_U73Yd4fA0l_f4Rsrskw8Fb4dsPtJVj-q1AXB_zC_TEqk3ZaVCf7KJd7294uKxZReSxBWN9P6HZCNDeQbISCtDo-Yv6-f18Q",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB1MOS3dnrKrLd42lfPyI3fWnVXmrWbph7w2m3BxtMABCQ4-8h57jmUiukjeqvQyXyM1xvnlcEVAKODWRFFgJfW7txDpVh8WRHymtjKoV-FImEvgE6jwEPDwWPf9_t092YT9pQGNW7Egm2P9_s9V6SmkMK1uR1hjV9NrsI73pnOwcQ1QBsWcov7-JWCONI21RdZRNbayIzVPQKqjT9HCWUw0OFOfEHj_CxIeK-4isrmzW1phm4bDw55IuALT5amHcMfs7yzNZE__x0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBtrVF2R8dAR9o63bMTX5YxhhA23vlZ1tWgp_BcO41IkfOuGv49hqBQ4bSPQ78A-o5WzVfh7ArjJ7FljkxBTdMdOlsF0-BFDX7CaLskHS4JRUpptvn1am_yf6vsTy1B34rfHmTjWYWW-dCUo5WdphZTM6R7Xy7DlsbebVg6-uRGmD4komDJT8e3jqgKOBG_6Sq6qmPLemLFGjoRMBFr4OCHyP2SJST3p4KssrCWoPpF2yy8aMTcI6C8HvI-OFv9VLV8G_ZoYu2bong",
];

export default function AboutContactPage() {
  return (
    <PublicLayout>
      <main className="pt-20">
        <section className="relative flex h-[560px] w-full items-center justify-center overflow-hidden md:h-[716px]">
          <img className="absolute inset-0 h-full w-full object-cover brightness-[0.85]" src={images.hero} alt="Luxury hotel lobby in Monrovia" />
          <div className="relative z-10 px-5 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">The Legacy of Luxury</p>
            <h1 className="mx-auto max-w-3xl font-serif text-4xl font-semibold leading-tight text-white md:text-7xl">Quiet Confidence in the Heart of Sinkor.</h1>
          </div>
        </section>

        <section className="mx-auto max-w-container px-5 py-20 md:px-16 md:py-[120px]">
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
            <div className="relative md:col-span-5">
              <div className="mb-6 aspect-[4/5] w-full">
                <img className="h-full w-full object-cover shadow-[0_20px_40px_-10px_rgba(18,28,42,0.05)]" src={images.table} alt="Editorial dining detail at The Suites" />
              </div>
              <div className="absolute -bottom-10 -right-10 hidden aspect-square w-64 border border-secondary/20 bg-surface p-4 lg:block">
                <img className="h-full w-full object-cover" src={images.detail} alt="Gold and emerald architectural detail" />
              </div>
            </div>
            <div className="pt-12 md:col-span-6 md:col-start-7">
              <span className="mb-6 block text-sm font-semibold uppercase tracking-[0.2em] text-secondary after:mt-4 after:block after:h-px after:w-10 after:bg-secondary">Since 2018</span>
              <h2 className="mb-8 font-serif text-4xl font-semibold leading-tight text-primary md:text-5xl">Defining the New Standard of Liberian Hospitality.</h2>
              <div className="space-y-6 text-lg leading-relaxed text-on-surface-variant">
                <p>Founded with a vision to marry international luxury standards with the vibrant soul of Monrovia, THE SUITES LLC stands as a testament to Liberia&apos;s burgeoning spirit.</p>
                <p>Nestled in the diplomatic heart of Sinkor, our property offers more than just a place to stay. It is a curated experience where every thread of linen, every seasonal ingredient, and every interaction is intentional.</p>
                <p className="border-t border-secondary/10 pt-4 font-serif text-2xl italic text-secondary">&quot;We do not just host guests; we steward the memories of their time in our beautiful capital.&quot;</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-20 md:py-[120px]">
          <div className="mx-auto max-w-container px-5 md:px-16">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24">
              <div className="bg-surface p-5 shadow-[0_20px_40px_-10px_rgba(18,28,42,0.05)] md:p-12">
                <h3 className="mb-2 font-serif text-3xl font-semibold text-primary">Connect With Us</h3>
                <p className="mb-10 text-on-surface-variant">Inquire about reservations, private events, or partnership opportunities.</p>
                <ContactForm variant="editorial" />
              </div>

              <div className="flex flex-col">
                <div className="mb-8 min-h-[400px] flex-1 overflow-hidden shadow-[0_20px_40px_-10px_rgba(18,28,42,0.05)] grayscale transition-all duration-700 hover:grayscale-0">
                  <img className="h-full w-full object-cover" src={images.map} alt="Sinkor Monrovia location visual" />
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-primary">Location</h4>
                    <p className="text-on-surface-variant">Tubman Boulevard,<br />Sinkor, Monrovia<br />Liberia</p>
                  </div>
                  <div>
                    <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-primary">Direct Lines</h4>
                    <p className="text-on-surface-variant">Reservations: +231 77 000 0000<br />Events: events@thesuiteslr.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden px-5 py-20 md:px-16 md:py-[120px]">
          <div className="mx-auto mb-16 max-w-container text-center">
            <h3 className="font-serif text-3xl font-semibold text-primary md:text-4xl">A Vision of Elegance</h3>
            <div className="mx-auto mt-4 h-1 w-16 bg-secondary" />
          </div>
          <div className="flex snap-x gap-4 overflow-x-auto pb-8">
            {stripImages.map((src) => (
              <div className="h-96 w-80 flex-shrink-0 snap-center" key={src}>
                <img className="h-full w-full object-cover" src={src} alt="The Suites atmosphere" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
