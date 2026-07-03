"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSuiteImage } from "@/services/suites.service";
import { checkAvailability, createBooking } from "@/services/booking.service";

const fallbackSuiteImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAAngZttH-Q24PJe39462BD2kxCaR9OZw7BbEmq2x9T82jRUETAUg-5vSJyhRA-qGWn37j0Q7IB2LmjFjSp5TYhIZeyPCSji9q2vl6GoNWQLVhWfsOB3pEfIhaoQ8ZRwqMuw8vvF-HhdxhFJmLxBqiRcPBkgHBZA4BWjXzduVQj8aXEVKS2E5tUCxMPRYg1sjs6rWsToRT0bKHTmXPEHh715QoCwVI-YJS4xyQ9_3X_IUyaLO6ZwuYSDIhSjuQKFddKNuT8pviXWkE";

export default function BookingForm({ suites, defaults = {} }) {
  const router = useRouter();
  const defaultSuite =
    suites.find((item) => item.id === defaults.suite || item.slug === defaults.suite) || suites?.[0];
  const [form, setForm] = useState({
    suite_type_id: defaultSuite?.id || defaultSuite?.slug || "",
    check_in_date: defaults.check_in_date || "",
    check_out_date: defaults.check_out_date || "",
    guest_count: defaults.guest_count || 2,
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    special_requests: "",
  });
  const [payment, setPayment] = useState({ card_number: "", expiry: "", cvv: "" });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const suite = useMemo(
    () => suites.find((item) => item.id === form.suite_type_id || item.slug === form.suite_type_id),
    [form.suite_type_id, suites]
  );
  const nights = getNightCount(form.check_in_date, form.check_out_date);
  const nightlyRate = Number(suite?.price_per_night || 0);
  const subtotal = nightlyRate * nights;
  const serviceCharge = subtotal * 0.1;
  const tourismTax = subtotal * 0.085;
  const estimatedTotal = subtotal + serviceCharge + tourismTax;

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const [firstName, ...rest] = form.guest_name.trim().split(/\s+/);
    const lastName = rest.join(" ");

    if (!firstName || !lastName) {
      setError("Please enter your full first and last name.");
      return;
    }

    setError("");
    setStatus("Checking availability...");
    setIsSubmitting(true);

    try {
      await checkAvailability({
          suite_type_id: form.suite_type_id,
          check_in_date: form.check_in_date,
          check_out_date: form.check_out_date,
          guest_count: Number(form.guest_count),
      });

      setStatus("Creating booking...");
      const result = await createBooking({
          suite_type_id: form.suite_type_id,
          check_in_date: form.check_in_date,
          check_out_date: form.check_out_date,
          guest_count: Number(form.guest_count),
          guest_first_name: firstName,
          guest_last_name: lastName,
          guest_email: form.guest_email,
          guest_phone: form.guest_phone,
          special_requests: form.special_requests,
      });
      const booking = result.booking || result;
      const confirmation = {
        reference: booking.booking_reference || "",
        total: Number(booking.total_amount || estimatedTotal),
        suite: suite?.name || "Selected Suite",
        suiteImage: suite ? getSuiteImage(suite) : fallbackSuiteImage,
        checkIn: form.check_in_date,
        checkOut: form.check_out_date,
        guests: Number(form.guest_count || 1),
        nights,
        subtotal,
        serviceCharge,
        tourismTax,
        guestName: form.guest_name,
        guestEmail: form.guest_email,
        specialRequests: form.special_requests,
      };

      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("suites_last_booking", JSON.stringify(confirmation));
      }

      const confirmationParams = new URLSearchParams({
        reference: confirmation.reference,
        total: String(confirmation.total),
        suite: confirmation.suite,
        checkIn: form.check_in_date,
        checkOut: form.check_out_date,
        guests: String(confirmation.guests),
        nights: String(nights),
        subtotal: String(subtotal),
        serviceCharge: String(serviceCharge),
        tourismTax: String(tourismTax),
      });

      router.push(`/booking/confirmation?${confirmationParams.toString()}`);
    } catch (err) {
      setStatus("");
      setError(err.message);
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="mb-10">
          <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Reservation</span>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-primary md:text-5xl">Complete Your Booking</h1>
        </div>

        <div className="mb-12 flex items-center gap-4 overflow-x-auto pb-4">
          <Step number="1" label="Guest Info" active />
          <div className="h-px w-8 flex-shrink-0 bg-outline-variant" />
          <Step number="2" label="Stay Details" />
          <div className="h-px w-8 flex-shrink-0 bg-outline-variant" />
          <Step number="3" label="Payment" />
        </div>

        <div className="space-y-16 md:space-y-[120px]">
          <section>
            <div className="mb-8 flex items-center gap-3">
              <Symbol>person_outline</Symbol>
              <h2 className="font-serif text-2xl font-semibold leading-snug text-primary">Guest Information</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextField
                label="Full Name"
                placeholder="John Doe"
                required
                value={form.guest_name}
                onChange={(value) => update("guest_name", value)}
              />
              <TextField
                label="Email Address"
                placeholder="john@example.com"
                required
                type="email"
                value={form.guest_email}
                onChange={(value) => update("guest_email", value)}
              />
              <TextField
                className="md:col-span-2"
                label="Phone Number"
                placeholder="+231 000 000 000"
                type="tel"
                value={form.guest_phone}
                onChange={(value) => update("guest_phone", value)}
              />
            </div>
          </section>

          <section>
            <div className="mb-8 flex items-center gap-3">
              <Symbol>event_available</Symbol>
              <h2 className="font-serif text-2xl font-semibold leading-snug text-primary">Stay Details &amp; Requests</h2>
            </div>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <DateField
                label="Check-in"
                value={form.check_in_date}
                onChange={(value) => update("check_in_date", value)}
              />
              <DateField
                label="Check-out"
                value={form.check_out_date}
                onChange={(value) => update("check_out_date", value)}
              />
              <label className="space-y-2 md:col-span-2">
                <span className="label">Suite</span>
                <select
                  className="field"
                  required
                  value={form.suite_type_id}
                  onChange={(event) => update("suite_type_id", event.target.value)}
                >
                  {suites.map((item) => (
                    <option key={item.id || item.slug} value={item.id || item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <TextField
                label="Guests"
                min="1"
                required
                type="number"
                value={form.guest_count}
                onChange={(value) => update("guest_count", value)}
              />
              <label className="space-y-2 md:col-span-2">
                <span className="label">Special Requests</span>
                <textarea
                  className="field min-h-32"
                  placeholder="Dietary requirements, early check-in, anniversary arrangements..."
                  value={form.special_requests}
                  onChange={(event) => update("special_requests", event.target.value)}
                />
              </label>
            </div>
          </section>

          <section>
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Symbol>shield</Symbol>
                <h2 className="font-serif text-2xl font-semibold leading-snug text-primary">Secure Payment</h2>
              </div>
              <div className="flex gap-2 text-on-surface-variant/50">
                <Symbol muted>credit_card</Symbol>
                <Symbol muted>contactless</Symbol>
              </div>
            </div>
            <div className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-5 md:p-8">
              <div className="space-y-6">
                <TextField
                  label="Card Number"
                  placeholder="0000 0000 0000 0000"
                  value={payment.card_number}
                  onChange={(value) => setPayment((current) => ({ ...current, card_number: value }))}
                />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <TextField
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={payment.expiry}
                    onChange={(value) => setPayment((current) => ({ ...current, expiry: value }))}
                  />
                  <TextField
                    label="CVV"
                    placeholder="***"
                    type="password"
                    value={payment.cvv}
                    onChange={(value) => setPayment((current) => ({ ...current, cvv: value }))}
                  />
                </div>
              </div>
            </div>

            <div className="mt-12">
              <button
                className="w-full rounded bg-secondary px-12 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-on-primary shadow-lg transition-all hover:bg-secondary-container hover:text-on-secondary-container active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Processing..." : `Confirm & Pay ${formatMoney(estimatedTotal)}`}
              </button>
              <p className="mt-4 flex items-center gap-2 text-xs text-outline">
                <Symbol small>verified_user</Symbol>
                Your payment is encrypted and processed securely.
              </p>
              {error ? <p className="mt-4 text-sm text-error">{error}</p> : null}
              {status ? <p className="mt-4 text-sm text-secondary">{status}</p> : null}
            </div>
          </section>
        </div>
      </div>

      <aside className="lg:sticky lg:top-32 lg:col-span-4">
        <div className="rounded-xl border border-secondary/5 bg-surface-container-high p-8">
          <div className="mb-6">
            <img
              className="mb-4 h-48 w-full rounded object-cover"
              src={suite ? getSuiteImage(suite) : fallbackSuiteImage}
              alt={suite?.name || "A luxurious hotel suite in Liberia"}
            />
            <h3 className="font-serif text-2xl font-semibold leading-snug text-primary">{suite?.name || "Selected Suite"}</h3>
            <p className="mt-1 text-on-surface-variant">
              {nights} {nights === 1 ? "Night" : "Nights"} • {form.guest_count || 1} Guests
            </p>
          </div>

          <div className="space-y-4 border-t border-outline-variant/30 pt-6">
            <SummaryRow label="Standard Rate" value={`${formatMoney(nightlyRate)} / night`} />
            <SummaryRow label="Stay Duration" value={`${nights} ${nights === 1 ? "Night" : "Nights"}`} />
            <SummaryRow label="Service Charge (10%)" value={formatMoney(serviceCharge)} />
            <SummaryRow label="Tourism Tax" value={formatMoney(tourismTax)} />
          </div>

          <div className="mt-8 border-t border-primary/20 pt-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="block text-sm font-semibold uppercase tracking-[0.1em] text-secondary">Total Amount</span>
                <span className="font-serif text-3xl font-semibold text-primary">{formatMoney(estimatedTotal)}</span>
              </div>
              <span className="pb-2 text-xs text-on-surface-variant">USD</span>
            </div>
          </div>

          <div className="mt-8 rounded border border-outline-variant/20 bg-surface p-4">
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.1em] text-secondary">Policy Summary</h4>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <PolicyItem>Free cancellation before arrival window</PolicyItem>
              <PolicyItem>Check-in: 3:00 PM</PolicyItem>
              <PolicyItem>No hidden resort fees</PolicyItem>
            </ul>
          </div>
        </div>
      </aside>
    </form>
  );
}

function Step({ number, label, active = false }) {
  return (
    <div className="flex flex-shrink-0 items-center gap-2">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
          active ? "bg-primary text-on-primary" : "border border-outline text-outline"
        }`}
      >
        {number}
      </span>
      <span className={`text-sm font-semibold uppercase tracking-[0.1em] ${active ? "text-primary" : "text-outline"}`}>{label}</span>
    </div>
  );
}

function Symbol({ children, muted = false, small = false }) {
  return (
    <span className={`${small ? "text-base" : "text-2xl"} ${muted ? "text-on-surface-variant/50" : "text-secondary"}`} aria-hidden="true">
      {iconMap[children] || children}
    </span>
  );
}

function TextField({ className = "", label, value, onChange, ...props }) {
  return (
    <label className={`field-shell ${className}`}>
      <span className="label">{label}</span>
      <input
        className="field"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </label>
  );
}

function DateField({ label, value, onChange }) {
  return (
    <label className="field-shell">
      <span className="label">{label}</span>
      <input
        className="field"
        required
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-on-surface-variant">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function PolicyItem({ children }) {
  return (
    <li className="flex gap-2">
      <span className="text-secondary" aria-hidden="true">✓</span>
      {children}
    </li>
  );
}

function getNightCount(checkInDate, checkOutDate) {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime()) || checkOut <= checkIn) return 1;
  return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
}

function formatMoney(value) {
  return `$${Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const iconMap = {
  person_outline: "◇",
  event_available: "◷",
  shield: "◇",
  credit_card: "▭",
  contactless: "◌",
  verified_user: "✓",
};
