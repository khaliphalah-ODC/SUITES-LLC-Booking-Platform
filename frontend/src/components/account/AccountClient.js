"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { logout } from "@/services/auth.service";
import {
  getAccount,
  getAccountBookings,
  getAccountNotifications,
  getAccountPayments,
  markNotificationRead,
  updateAccount,
} from "@/services/account.service";

const guestImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC7wAEaPhHh7fvij9D0cpDA0YodONprpwgR1WA1rk_ROFJcguyBM1pfIf38TZCb6t7GdcBv-GT25iHaAeULpsGp4j_T5dcvBQivKYFdCOe2-ShlraVOTfVgcyAYV44F4HE7AIVb5O4GA6T0JeX1vItOW2q6CHJm-V3LlgAjNZBcMExQBWIV55dPqBxTC2juhPmiQDpEfWYQ4GjK6iZwaa1z_Gwm7sfIO2BL9uj9Ra_zfZ3RtmJhXR222-2VYW-KQHOPHVzOYXrC35A";
const suiteImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBGwUNlI1PiECazi7bPVwIqd-9GBV_nBHZkmpRj-OisUn7muTmW68_eWTvz5XqdoPuIpkopKbUxtBlcfaiXcqu_7VeeJHqQQq69Sdv8ToGiVMoiOa7xgbk2q9U2zIrMzPoDsIPUVK9hT8AFjWkmNb0yPD3dI3Hip4Ldz2_ID40iP9FPxdI2ZkGFxi7XnomnGHDkzCrVnAHrVUN1R08T93sJv8a7LMZNwloCKWixWfAyvYcUW0wQjA2n1VGzua7XX542reLhQm5Gal0";

const nav = [
  { href: "/account/reservations", label: "Reservations", icon: "⌂", view: "reservations" },
  { href: "/account/payments", label: "Payments", icon: "$", view: "payments" },
  { href: "/account/notifications", label: "Notifications", icon: "•", view: "notifications" },
  { href: "/account/profile", label: "Profile", icon: "○", view: "profile" },
];

const experiences = [
  {
    category: "Gastronomy",
    title: "Private Beachside Dining",
    description: "A personalized 5-course menu prepared under the stars.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvyHZgZjSvJbquaWmROQIU3HYstiIuIo1WiZcBzTjm6Saly_y7b3oyw5zCZcmEO2a4WYnwU_B5xIT062288z30UPL9wXe6QBd2Rj1xuZ8HnK1BK-04nTowXRrdeRM7_HTkOK8ib1lshlx-6WDSTST0C1t3oTntpSimso4khjI8x13qTirsX7Bucx_XVwPneHGhaZlPX0m-CUdzeAPhlLFikUSkodbhMuLqWe2vPWXIo_qmyzn0ZC87biQiD2co3cL92FSpQiPbR44",
  },
  {
    category: "Wellness",
    title: "Coastal Stone Ritual",
    description: "Rejuvenating 90-minute therapy using warmed Atlantic stones.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoQ777QA-Ez6J2PDmbZzmN5H5LB6xlKQR22ig4AMZIPvJB40QtG1fbQ4tEigiqEsIr0dV1lSia7W_IGa70P-zR_er5LzG9npVZtxJRxlz2svNUAIsQDeQFnPe3-sCkiD5yMfwUSDLWwaHBlUHzSwQ-uE-p1lPWKq2o7Y8ofqaCaKZh9jTJLrfz8OmrPTYr7yQBd5c7SQbJNh9hKHL5apaon9RJe-yyBhhBrK3DhnTv4mxT4ZFthfTNy7WtOvRTgGxsj484vbTHflk",
  },
  {
    category: "Adventure",
    title: "Sunset Coast Charter",
    description: "Explore hidden coves and beaches on a private coastal charter.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBeIX7b88MuM1hCu9tc0c0yiDmjk1MTBhVEzIVITNXj77C1ONuQp4RcEzzp3H8Bz4mUmv-sNSjcVHoFfvmhacu7qrKMASDHOAq9QSlLC-tdbvkBlKFKewCyGrsfPrJSAc2JphH95ghvPfy6sUohabkACpzmtSvkrRuwmx1PEUFC7OhvchARkHZlwUs60OZ1bNjy5XkmG_mWlDbXOUDRWw5Wdrc9jO6oCIjCwTmhqj1xqF5PpzPXNBk-tOmG0WBKZmyHrVo5SKmz9O4",
  },
];

export default function AccountClient({ view = "overview" }) {
  const [account, setAccount] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState({ first_name: "", last_name: "", phone: "" });
  const [message, setMessage] = useState("Loading account...");

  useEffect(() => {
    async function load() {
      try {
        const [me, stays, pay, notes] = await Promise.all([
          getAccount(),
          getAccountBookings(),
          getAccountPayments(),
          getAccountNotifications(),
        ]);
        if (me.user?.role === "admin" || me.user?.role === "staff") {
          window.location.href = "/dashboard";
          return;
        }

        setAccount(me.user);
        setProfile({
          first_name: me.user?.first_name || "",
          last_name: me.user?.last_name || "",
          phone: me.user?.phone || "",
        });
        setBookings(stays.bookings || []);
        setPayments(pay.payments || []);
        setNotifications(notes.notifications || []);
        setMessage("");
      } catch (error) {
        setMessage(`${error.message}. Please sign in first.`);
      }
    }
    load();
  }, []);

  const upcoming = useMemo(() => {
    const now = new Date();
    return (
      bookings
        .filter((booking) => new Date(booking.check_in_date) >= now && booking.status !== "cancelled")
        .sort((a, b) => new Date(a.check_in_date) - new Date(b.check_in_date))[0] ||
      bookings[0]
    );
  }, [bookings]);

  async function saveProfile(event) {
    event.preventDefault();
    setMessage("Saving profile...");
    try {
      const result = await updateAccount(profile);
      setAccount(result.user);
      setMessage("Profile updated.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function markRead(id) {
    try {
      const result = await markNotificationRead(id);
      setNotifications((current) => current.map((item) => (item.id === id ? result.notification : item)));
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function signOut() {
    await logout();
    window.location.href = "/login";
  }

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <AccountSidebar account={account} view={view} onLogout={signOut} />
      <main className="min-h-screen flex-1 px-5 py-10 pb-24 md:ml-72 md:px-16 md:py-12 md:pb-12">
        <header className="mb-16 flex flex-col justify-between gap-6 md:mb-[120px] md:flex-row md:items-end">
          <div>
            <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.1em] text-secondary">Guest Dashboard</span>
            <h1 className="font-serif text-3xl font-semibold leading-tight text-primary md:text-5xl">
              Welcome Back, {account?.first_name || "Guest"}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-on-surface-variant">
              Your next escape is just around the corner. We are preparing every detail for your arrival.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-secondary/10 bg-surface-container-low p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container">★</div>
            <div>
              <p className="text-xs font-medium uppercase text-secondary">Loyalty Status</p>
              <p className="font-serif text-2xl font-semibold text-primary">Gold Member</p>
            </div>
          </div>
        </header>

        {message ? <p className="mb-6 rounded-lg bg-surface-container p-4 text-sm text-secondary">{message}</p> : null}

        {view === "overview" ? (
          <Overview upcoming={upcoming} bookings={bookings} />
        ) : null}
        {view === "reservations" ? <Reservations bookings={bookings} /> : null}
        {view === "payments" ? <Payments payments={payments} /> : null}
        {view === "notifications" ? <Notifications notifications={notifications} onRead={markRead} /> : null}
        {view === "profile" ? (
          <Profile account={account} profile={profile} setProfile={setProfile} onSubmit={saveProfile} />
        ) : null}

        <footer className="mt-20 grid grid-cols-1 items-center gap-6 border-t border-secondary/10 pb-8 pt-12 md:mt-[120px] md:grid-cols-2">
          <p className="text-xs font-medium text-on-surface-variant">© 2026 THE SUITES LLC. Monrovia, Liberia. All Rights Reserved.</p>
          <div className="flex gap-6 md:justify-end">
            <Link className="text-xs font-medium text-on-surface-variant hover:text-primary" href="/contact">Concierge Desk</Link>
            <Link className="text-xs font-medium text-on-surface-variant hover:text-primary" href="/contact">Help Center</Link>
          </div>
        </footer>
      </main>
      <MobileNav view={view} />
    </div>
  );
}

function AccountSidebar({ account, view, onLogout }) {
  return (
    <aside className="fixed left-0 z-50 hidden h-screen w-72 flex-col border-r border-secondary/10 bg-surface pt-10 md:flex">
      <Link href="/" className="mb-12 px-7 font-serif text-2xl font-semibold tracking-tight text-secondary">THE SUITES</Link>
      <div className="mb-10 flex items-center gap-4 px-7">
        <div className="h-12 w-12 overflow-hidden rounded-full border border-secondary/20">
          <img className="h-full w-full object-cover" src={guestImage} alt="Guest profile" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-secondary">Welcome Back</p>
          <p className="font-medium text-on-surface-variant">{account?.first_name || "Guest"} Account</p>
        </div>
      </div>
      <nav className="flex-1">
        <LinkItem href="/account" icon="⌂" label="Overview" active={view === "overview"} />
        {nav.map((item) => (
          <LinkItem key={item.view} {...item} active={view === item.view} />
        ))}
      </nav>
      <div className="mt-auto border-t border-secondary/10 p-7">
        <button className="flex items-center gap-4 text-on-surface-variant hover:text-error" type="button" onClick={onLogout}>
          <span>↩</span>
          <span className="text-sm font-semibold uppercase tracking-[0.1em]">Logout</span>
        </button>
      </div>
    </aside>
  );
}

function LinkItem({ href, icon, label, active }) {
  return (
    <Link
      className={`flex items-center gap-4 py-4 transition-all ${
        active ? "border-l-4 border-secondary pl-6 font-bold text-primary" : "pl-7 text-on-surface-variant hover:text-primary"
      }`}
      href={href}
    >
      <span>{icon}</span>
      <span className="text-sm font-semibold uppercase tracking-[0.1em]">{label}</span>
    </Link>
  );
}

function MobileNav({ view }) {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t border-secondary/10 bg-white/90 backdrop-blur-xl md:hidden">
      {[
        { href: "/account/reservations", label: "Stays", icon: "⌂", view: "reservations" },
        { href: "/account/payments", label: "Billing", icon: "$", view: "payments" },
        { href: "/account/profile", label: "Profile", icon: "○", view: "profile" },
      ].map((item) => (
        <Link className={`flex flex-col items-center gap-1 ${view === item.view ? "text-primary" : "text-on-surface-variant"}`} href={item.href} key={item.href}>
          <span>{item.icon}</span>
          <span className="text-[10px] font-medium uppercase">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

function Overview({ upcoming, bookings }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <section className="group lg:col-span-8">
        <div className="relative flex h-full min-h-[400px] flex-col overflow-hidden rounded-xl border border-secondary/10 bg-white transition-all duration-500 hover:shadow-xl md:flex-row">
          <div className="relative h-72 w-full overflow-hidden md:h-auto md:w-1/2">
            <div className="absolute inset-0 z-10 bg-primary/20 transition-opacity duration-500 group-hover:opacity-0" />
            <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" src={suiteImage} alt="Luxury ocean-view suite" />
            <div className="absolute left-6 top-6 z-20">
              <span className="rounded-full bg-primary px-4 py-2 text-sm font-semibold uppercase tracking-widest text-on-primary">Upcoming</span>
            </div>
          </div>
          <div className="flex w-full flex-col justify-between p-5 md:w-1/2 md:p-12">
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-secondary">{upcoming?.suite_name || "Your Next Stay"}</h2>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-semibold text-primary">{daysUntil(upcoming?.check_in_date)}</span>
                <span className="text-on-surface-variant">days until check-in</span>
              </div>
              <InfoRow label="Dates" value={formatDateRange(upcoming)} />
              <InfoRow label="Guests" value={`${upcoming?.guest_count || 0} Guests`} />
            </div>
            <Link className="mt-8 w-full rounded-lg bg-primary py-4 text-center text-sm font-semibold uppercase tracking-widest text-on-primary hover:bg-primary-container" href="/account/reservations">
              View Reservation Details
            </Link>
          </div>
        </div>
      </section>
      <section className="space-y-6 lg:col-span-4">
        <div className="flex min-h-48 flex-col justify-between rounded-xl border border-secondary/20 bg-secondary-fixed p-8 text-on-secondary-fixed">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.1em] opacity-80">Suite Rewards</p>
            <h3 className="font-serif text-3xl font-semibold">14,250</h3>
            <p className="mt-1">Available Points</p>
          </div>
          <div className="mt-4">
            <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-on-secondary-fixed/10">
              <div className="h-full w-3/4 rounded-full bg-on-secondary-fixed" />
            </div>
            <p className="text-xs font-medium">5,750 points to Diamond status</p>
          </div>
        </div>
        <div className="flex min-h-48 flex-col justify-between rounded-xl bg-surface-container-highest p-8">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.1em] text-secondary">Exclusive Benefit</p>
            <h3 className="font-serif text-2xl font-semibold text-primary">Private Airport Transfer</h3>
          </div>
          <p className="text-on-surface-variant">Your Gold status includes complimentary chauffeur service from Roberts International.</p>
          <Link className="mt-4 text-sm font-semibold uppercase tracking-[0.1em] text-primary underline" href="/contact">Manage Amenities</Link>
        </div>
      </section>
      <ExperienceGrid />
      {bookings.length === 0 ? <EmptyState title="No stays yet" action="Book Your First Stay" href="/booking" /> : null}
    </div>
  );
}

function Reservations({ bookings }) {
  return (
    <section className="rounded-xl border border-secondary/10 bg-white p-6 md:p-8">
      <SectionTitle eyebrow="Reservations" title="My Stays" />
      <div className="mt-8 grid gap-4">
        {bookings.length ? bookings.map((booking) => (
          <article className="grid gap-4 rounded-lg border border-outline-variant/30 bg-surface p-5 md:grid-cols-[1fr_auto]" key={booking.id}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-secondary">{booking.booking_reference}</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-primary">{booking.suite_name}</h3>
              <p className="mt-2 text-on-surface-variant">{formatDateRange(booking)} • {booking.guest_count} guests</p>
            </div>
            <StatusBadge status={booking.status} />
          </article>
        )) : <EmptyText text="No reservations found." />}
      </div>
    </section>
  );
}

function Payments({ payments }) {
  return (
    <section className="rounded-xl border border-secondary/10 bg-white p-6 md:p-8">
      <SectionTitle eyebrow="Payments" title="Billing History" />
      <div className="mt-8 grid gap-4">
        {payments.length ? payments.map((payment) => (
          <article className="grid gap-4 rounded-lg border border-outline-variant/30 bg-surface p-5 md:grid-cols-[1fr_auto]" key={payment.id}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-secondary">{payment.booking_reference}</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-primary">${Number(payment.amount || 0).toLocaleString()}</h3>
              <p className="mt-2 text-on-surface-variant">{payment.provider || "Payment"} • {formatDate(payment.created_at)}</p>
            </div>
            <StatusBadge status={payment.payment_status || payment.status} />
          </article>
        )) : <EmptyText text="No payment records found." />}
      </div>
    </section>
  );
}

function Notifications({ notifications, onRead }) {
  return (
    <section className="rounded-xl border border-secondary/10 bg-white p-6 md:p-8">
      <SectionTitle eyebrow="Notifications" title="Guest Messages" />
      <div className="mt-8 grid gap-4">
        {notifications.length ? notifications.map((notification) => (
          <article className="rounded-lg border border-outline-variant/30 bg-surface p-5" key={notification.id}>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-secondary">{notification.type || "Notice"}</p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-primary">{notification.title}</h3>
                <p className="mt-2 text-on-surface-variant">{notification.message}</p>
              </div>
              {!notification.is_read ? (
                <button className="rounded border border-secondary px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-secondary" type="button" onClick={() => onRead(notification.id)}>
                  Mark Read
                </button>
              ) : <StatusBadge status="read" />}
            </div>
          </article>
        )) : <EmptyText text="No notifications found." />}
      </div>
    </section>
  );
}

function Profile({ account, profile, setProfile, onSubmit }) {
  return (
    <section className="rounded-xl border border-secondary/10 bg-white p-6 md:p-8">
      <SectionTitle eyebrow="Profile" title="Personal Details" />
      <form className="mt-8 grid gap-6 md:grid-cols-2" onSubmit={onSubmit}>
        <Field label="First Name" value={profile.first_name} onChange={(value) => setProfile((current) => ({ ...current, first_name: value }))} />
        <Field label="Last Name" value={profile.last_name} onChange={(value) => setProfile((current) => ({ ...current, last_name: value }))} />
        <Field className="md:col-span-2" label="Phone" value={profile.phone} onChange={(value) => setProfile((current) => ({ ...current, phone: value }))} />
        <label className="grid gap-2 md:col-span-2">
          <span className="label">Email</span>
          <input className="field bg-surface-container" disabled value={account?.email || ""} />
        </label>
        <button className="rounded-lg bg-primary px-6 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-on-primary md:w-fit">Save Profile</button>
      </form>
    </section>
  );
}

function ExperienceGrid() {
  return (
    <section className="mt-2 lg:col-span-12">
      <div className="mb-8 flex items-baseline justify-between border-b border-secondary/10 pb-4">
        <h2 className="font-serif text-3xl font-semibold text-primary">Curated for Your Stay</h2>
        <Link className="text-sm font-semibold uppercase tracking-[0.1em] text-secondary hover:underline" href="/amenities">Explore All Experiences</Link>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {experiences.map((experience) => (
          <article className="group cursor-pointer" key={experience.title}>
            <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-xl border border-secondary/5">
              <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={experience.image} alt={experience.title} />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Link className="rounded-lg bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-primary backdrop-blur-md" href="/booking">Book Experience</Link>
              </div>
            </div>
            <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-secondary">{experience.category}</span>
            <h3 className="font-serif text-2xl font-semibold text-primary transition-colors group-hover:text-secondary">{experience.title}</h3>
            <p className="mt-2 leading-relaxed text-on-surface-variant">{experience.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-3xl font-semibold text-primary md:text-4xl">{title}</h2>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="text-secondary">◇</span>
      <div>
        <p className="text-xs font-medium uppercase text-on-surface-variant">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Field({ className = "", label, value, onChange }) {
  return (
    <label className={`grid gap-2 ${className}`}>
      <span className="label">{label}</span>
      <input className="field" value={value || ""} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function StatusBadge({ status }) {
  return <span className="h-fit rounded-full bg-secondary-fixed px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-on-secondary-fixed">{status || "pending"}</span>;
}

function EmptyState({ title, action, href }) {
  return (
    <section className="rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-8 lg:col-span-12">
      <h2 className="font-serif text-2xl font-semibold text-primary">{title}</h2>
      <Link className="mt-4 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-on-primary" href={href}>{action}</Link>
    </section>
  );
}

function EmptyText({ text }) {
  return <p className="rounded-lg bg-surface-container p-5 text-on-surface-variant">{text}</p>;
}

function formatDate(value) {
  if (!value) return "Not scheduled";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

function formatDateRange(booking) {
  if (!booking?.check_in_date || !booking?.check_out_date) return "No dates selected";
  return `${formatDate(booking.check_in_date)} — ${formatDate(booking.check_out_date)}`;
}

function daysUntil(value) {
  if (!value) return 0;
  const diff = new Date(value) - new Date();
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
}
