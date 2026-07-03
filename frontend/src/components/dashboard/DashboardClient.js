"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/services/auth.service";
import {
  createUser,
  getBespokeRequests,
  getBookings,
  getDashboard,
  getMessages,
  getSettings,
  getUsers,
  updateBespokeRequestStatus,
  updateBookingStatus,
  updateMessageStatus,
  updateSettings,
  updateUser,
} from "@/services/dashboard.service";

const suiteImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDamF21OuE-Q3xYX8PCXmX3KP6B6regRM7OPDpeULeFQ8aXEmshAj5gUJGx1U7KVovMgb2pj3fygFllGoXBy0AMtPO_BxhEc39-c8MvroKoZ6qCMItmSN01jwXvBu5FKgbDMbkZqvr0HJtOLgdOYOkciEZQDzcsWFFGdzj-laP0fVjuRyT9U_tI3HKQMJjxmroMAjnmbV6V69CDFrESDPqeJv5QARAWmiy73FCRF35ashCWaGx0cHB4i3teKlBuXJW_obvFipoTvo8";

export default function DashboardClient({ view = "overview", currentUser = null }) {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("Loading dashboard...");
  const [filters, setFilters] = useState({ search: "", status: "", date_from: "", page: 1, limit: 10 });
  const [fallbackRole, setFallbackRole] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    if (currentUser) return undefined;

    let active = true;
    getCurrentUser()
      .then((user) => {
        if (active) setFallbackRole(user?.role || "");
      })
      .catch(() => {
        if (active) setFallbackRole("");
      });

    return () => {
      active = false;
    };
  }, [currentUser]);
  const role = currentUser?.role || fallbackRole;

  async function load() {
    try {
      if (view === "overview") {
        const [overview, recent] = await Promise.all([
          getDashboard(),
          getBookings({ limit: 4 }),
        ]);
        setData({ ...overview, bookings: recent.bookings || [], meta: recent.meta });
      } else if (view === "bookings") {
        const result = await getBookings(Object.fromEntries(Object.entries(filters).filter(([, value]) => value)));
        setData(result);
      } else {
        const result = await getDataForView(view);
        setData(result);
      }
      setMessage("");
    } catch (error) {
      setMessage(`${error.message}. Staff or admin access is required.`);
    }
  }

  useEffect(() => {
    let active = true;
    async function fetchData() {
      try {
        if (view === "overview") {
          const [overview, recent] = await Promise.all([
            getDashboard(),
            getBookings({ limit: 4 }),
          ]);
          if (active) setData({ ...overview, bookings: recent.bookings || [], meta: recent.meta });
        } else if (view === "bookings") {
          const result = await getBookings(Object.fromEntries(Object.entries(filters).filter(([, value]) => value)));
          if (active) setData(result);
        } else {
          const result = await getDataForView(view);
          if (active) setData(result);
        }
        if (active) setMessage("");
      } catch (error) {
        if (active) setMessage(`${error.message}. Staff or admin access is required.`);
      }
    }
    fetchData();
    return () => {
      active = false;
    };
  }, [view, filters]);

  async function updateStatus(kind, id, status) {
    setActionMessage("Saving status...");
    try {
      if (kind === "booking") await updateBookingStatus(id, status);
      else if (kind === "message") await updateMessageStatus(id, status);
      else await updateBespokeRequestStatus(id, status);
      await load();
      setActionMessage("Status updated.");
    } catch (error) {
      setActionMessage(error.message);
    }
  }

  if (message) {
    return (
      <div className="flex-1 overflow-y-auto p-8">
        <p className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 text-sm text-secondary">
          {message}
        </p>
      </div>
    );
  }

  if (view === "overview") return <Overview stats={data?.stats} bookings={data?.bookings || []} role={role} />;
  if (view === "bookings") {
    return (
      <Bookings
        bookings={data?.bookings || []}
        meta={data?.meta}
        filters={filters}
        setFilters={setFilters}
        onStatus={updateStatus}
        actionMessage={actionMessage}
      />
    );
  }
  if (view === "messages") return <Rows items={data?.messages || []} kind="message" onStatus={updateStatus} actionMessage={actionMessage} />;
  if (view === "users") return <Users users={data?.users || []} onReload={load} />;
  if (view === "settings") return <Settings settings={data?.settings || []} onReload={load} />;
  return <Rows items={data?.requests || []} kind="request" onStatus={updateStatus} actionMessage={actionMessage} />;
}

function getDataForView(view) {
  const loaders = {
    messages: getMessages,
    users: getUsers,
    settings: getSettings,
    requests: getBespokeRequests,
  };
  return (loaders[view] || getDashboard)();
}

function Overview({ stats = {}, bookings = [], role = "staff" }) {
  const cards = [
    ["Occupancy Rate", `${stats.occupancyRate ?? 0}%`, `${stats.occupiedToday ?? 0}/${stats.activeSuites ?? 0} occupied`, "▣", "bg-primary-container/10 text-primary"],
    ["Total Revenue", money(stats.totalRevenue), `${stats.bookings ?? 0} bookings`, "$", "bg-secondary-container/20 text-secondary"],
    ["Arriving Today", stats.arrivalsToday ?? 0, "Today", "⇣", "bg-surface-container-high text-tertiary"],
    ["Pending Requests", (stats.newRequests ?? 0) + (stats.pendingBookings ?? 0), `${stats.newRequests ?? 0} concierge, ${stats.pendingBookings ?? 0} bookings`, "!", "bg-error-container/30 text-error"],
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-container space-y-8">
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map(([label, value, trend, icon, tone]) => (
            <article
              className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-[0_10px_30px_-10px_rgba(0,53,39,0.08)]"
              key={label}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-xl font-semibold ${tone}`}>
                  {icon}
                </div>
                <span className="text-sm font-semibold text-primary">{trend}</span>
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-variant">{label}</p>
              <h3 className="mt-1 font-serif text-[32px] font-semibold text-on-surface">{value}</h3>
            </article>
          ))}
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <section className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-[0_10px_30px_-10px_rgba(0,53,39,0.08)] xl:col-span-2">
            <div className="flex items-center justify-between border-b border-outline-variant/20 p-6">
              <h4 className="font-serif text-2xl font-semibold text-on-surface">Recent Bookings</h4>
              <Link className="text-sm font-semibold uppercase tracking-[0.1em] text-primary hover:underline" href="/dashboard/bookings">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low">
                    {["Guest", "Suite", "Check-in", "Status"].map((heading) => (
                      <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-on-surface-variant" key={heading}>
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {bookings.slice(0, 4).map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4">
                        <Guest booking={booking} compact />
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">{booking.suite_name || "Presidential Suite"}</td>
                      <td className="px-6 py-4 text-on-surface-variant">{formatDate(booking.check_in_date)}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={booking.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!bookings.length ? <EmptyState message="No recent bookings found in the database." /> : null}
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-[0_10px_30px_-10px_rgba(0,53,39,0.08)]">
              <h4 className="mb-6 font-serif text-2xl font-semibold text-on-surface">Quick Actions</h4>
              <div className="grid gap-4">
                {(role === "admin"
                  ? [
                      ["◷", "Manage Bookings", "Reservations Queue", "/dashboard/bookings"],
                      ["✦", "Add Amenity", "Public Content", "/dashboard/amenities"],
                      ["◉", "Manage Users", "Roles & Access", "/dashboard/users"],
                    ]
                  : [
                      ["◷", "Manage Arrivals", "Bookings Queue", "/dashboard/bookings"],
                      ["✉", "Reply Messages", "Guest Inbox", "/dashboard/messages"],
                      ["◇", "Review Requests", "Concierge Queue", "/dashboard/bespoke-requests"],
                    ]
                ).map(([icon, title, copy, href]) => (
                  <Link
                    className="group flex items-center gap-4 rounded-lg border border-outline-variant/30 p-4 transition-colors hover:bg-surface-container-low"
                    href={href}
                    key={title}
                  >
                    <span className="text-xl text-primary transition-transform group-hover:scale-110">{icon}</span>
                    <span className="text-left">
                      <span className="block text-sm font-semibold uppercase tracking-[0.1em] text-on-surface">{title}</span>
                      <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">{copy}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="group relative overflow-hidden rounded-xl bg-primary p-6 text-on-primary shadow-[0_10px_30px_-10px_rgba(0,53,39,0.08)]">
              <h4 className="mb-2 font-serif text-2xl font-semibold">Operational Mix</h4>
              <p className="mb-6 text-sm opacity-80">Based on current records in PostgreSQL.</p>
              <div className="flex h-20 items-end gap-2">
                {metricBars(stats).map((height, index) => (
                  <div
                    className="flex-grow rounded-sm bg-on-primary/20 transition-all duration-700 group-hover:bg-secondary-container"
                    style={{ height: `${height}%` }}
                    key={index}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.1em] text-secondary-container">
                {stats.bookings ?? 0} bookings • {stats.newMessages ?? 0} new messages
              </p>
            </section>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-[0_10px_30px_-10px_rgba(0,53,39,0.08)] sm:flex-row sm:items-center">
            <div className="h-32 w-full shrink-0 overflow-hidden rounded-lg border border-outline-variant/10 sm:w-32">
              <img className="h-full w-full object-cover" src={suiteImage} alt="Luxury hotel suite bedroom" />
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Inventory</p>
              <h4 className="font-serif text-2xl font-semibold text-on-surface">{stats.suites ?? 0} Suite Types</h4>
              <p className="mb-4 text-sm text-on-surface-variant">{stats.activeSuites ?? 0} active units available in the property inventory.</p>
              <div className="flex gap-2">
                <span className="rounded bg-surface-container px-2 py-1 text-[10px] font-semibold">{stats.occupiedToday ?? 0} OCCUPIED</span>
                <span className="rounded bg-surface-container px-2 py-1 text-[10px] font-semibold">{stats.pendingBookings ?? 0} PENDING</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-[0_10px_30px_-10px_rgba(0,53,39,0.08)]">
            <div className="mb-6 flex items-center justify-between">
              <h4 className="font-serif text-2xl font-semibold text-on-surface">Attention Queue</h4>
              <span className="rounded-full bg-error-container/30 px-3 py-1 text-[10px] font-bold text-error">{(stats.newRequests ?? 0) + (stats.newMessages ?? 0)} OPEN</span>
            </div>
            <div className="space-y-4">
              <Alert icon="!" title="Bespoke Requests" copy={`${stats.newRequests ?? 0} new guest request records need review.`} tone="text-error" />
              <Alert icon="◌" title="Contact Messages" copy={`${stats.newMessages ?? 0} unread contact messages are waiting.`} tone="text-secondary" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Bookings({ bookings = [], meta, filters, setFilters, onStatus, actionMessage }) {
  const rows = bookings;
  const total = meta?.total || rows.length;
  const page = meta?.page || Number(filters.page || 1);
  const totalPages = meta?.totalPages || 1;
  const expectedArrivals = rows.filter((booking) => isToday(booking.check_in_date)).length;
  const dailyRevenue = rows
    .filter((booking) => isToday(booking.check_in_date))
    .reduce((sum, booking) => sum + Number(booking.total_amount || 0), 0);
  const activeStays = rows.filter((booking) => ["paid", "confirmed"].includes(booking.status)).length;

  return (
    <div className="flex-1 space-y-8 overflow-y-auto p-5 md:p-16">
      <section className="grid grid-cols-1 gap-6 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm md:grid-cols-4">
        <FilterField label="Date Range">
          <input
            className="field"
            type="date"
            value={filters.date_from}
            onChange={(event) => setFilters((current) => ({ ...current, date_from: event.target.value, page: 1 }))}
          />
        </FilterField>
        <FilterField label="Status">
          <select
            className="field"
            value={filters.status}
            onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value, page: 1 }))}
          >
            <option value="">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending_payment">Pending</option>
            <option value="paid">Paid</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </FilterField>
        <FilterField label="Search">
          <input
            className="field"
            placeholder="Guest or reference"
            value={filters.search}
            onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value, page: 1 }))}
          />
        </FilterField>
        <div className="flex items-end">
          <button
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-container text-sm font-semibold uppercase tracking-[0.1em] text-on-primary transition-opacity hover:opacity-90"
            type="button"
            onClick={() => setFilters((current) => ({ ...current, page: 1 }))}
          >
            Filter List
          </button>
        </div>
      </section>

      {actionMessage ? <p className="rounded-lg bg-surface-container px-4 py-3 text-sm text-secondary">{actionMessage}</p> : null}

      <section className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-low">
                {["Guest", "Suite", "Check In/Out", "Status", "Total", "Actions"].map((heading) => (
                  <th
                    className={`px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-outline ${
                      heading === "Actions" ? "text-right" : ""
                    }`}
                    key={heading}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {rows.map((booking) => (
                <tr className="group transition-colors hover:bg-surface-container-low" key={booking.id}>
                  <td className="px-6 py-5">
                    <Guest booking={booking} />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-on-surface">{booking.suite_name || "Presidential Suite"}</span>
                      <span className="text-xs italic text-outline">Floor 12, Unit A</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <p className="text-on-surface">{formatRange(booking.check_in_date, booking.check_out_date)}</p>
                      <p className="text-xs text-outline">{nights(booking.check_in_date, booking.check_out_date)} Nights</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <select
                      className="rounded-full border-0 bg-surface-container px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary focus:ring-secondary"
                      value={booking.status || "pending_payment"}
                      onChange={(event) => onStatus("booking", booking.id, event.target.value)}
                    >
                      {["pending_payment", "paid", "confirmed", "cancelled", "completed"].map((status) => (
                        <option key={status} value={status}>
                          {labelStatus(status)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-5 font-semibold text-on-surface">{money(booking.total_amount || booking.total)}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                      <a className="rounded border border-outline-variant px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-primary" href={`mailto:${booking.guest_email || booking.account_email}`}>
                        Mail
                      </a>
                      <button
                        className="rounded border border-outline-variant px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-primary"
                        type="button"
                        onClick={() => onStatus("booking", booking.id, "confirmed")}
                      >
                        Confirm
                      </button>
                      <button
                        className="rounded border border-error/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-error"
                        type="button"
                        onClick={() => onStatus("booking", booking.id, "cancelled")}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!rows.length ? <EmptyState message="No reservations match the current backend data or filters." /> : null}
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant/30 bg-surface-container-low px-6 py-4">
          <p className="text-xs italic text-outline">Showing {rows.length ? (page - 1) * Number(filters.limit || 10) + 1 : 0} to {Math.min(page * Number(filters.limit || 10), total)} of {total} reservations</p>
          <div className="flex items-center gap-2">
            <button
              className="rounded px-3 py-1 text-outline hover:bg-surface-container-high disabled:opacity-40"
              type="button"
              disabled={page <= 1}
              onClick={() => setFilters((current) => ({ ...current, page: Math.max(1, page - 1) }))}
            >
              ‹
            </button>
            <span className="rounded bg-primary px-3 py-1 text-xs font-semibold text-on-primary">{page}</span>
            <span className="px-1 text-xs text-outline">of {totalPages}</span>
            <button
              className="rounded px-3 py-1 text-outline hover:bg-surface-container-high disabled:opacity-40"
              type="button"
              disabled={page >= totalPages}
              onClick={() => setFilters((current) => ({ ...current, page: Math.min(totalPages, page + 1) }))}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 pb-16 md:grid-cols-3">
        <StatBento tone="bg-primary text-on-primary" label="Active Stays" value={activeStays} copy="Paid or confirmed in this view" />
        <StatBento tone="bg-surface-container-high text-primary border border-outline-variant/20" label="Expected Arrivals" value={expectedArrivals} copy="Guests checking in today" />
        <StatBento tone="bg-secondary-container text-on-secondary-container" label="Daily Revenue" value={money(dailyRevenue)} copy="From today's arrivals in this view" />
      </section>
    </div>
  );
}

function Rows({ items, kind, onStatus, actionMessage }) {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      {actionMessage ? <p className="mb-4 rounded-lg bg-surface-container px-4 py-3 text-sm text-secondary">{actionMessage}</p> : null}
      <div className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest">
        {items.length ? (
          items.map((item) => (
            <div key={item.id || item.key} className="grid gap-3 border-b border-outline-variant/20 p-4 text-sm md:grid-cols-[1fr_auto]">
              <div>
                <p className="font-semibold text-primary">
                  {item.booking_reference || item.name || item.email || item.key || item.title}
                </p>
                <p className="mt-1 text-on-surface-variant">
                  {item.status || item.role || item.value || item.guest_email || item.subject}
                </p>
              </div>
              {kind ? (
                <select
                  className="field max-w-48"
                  value={item.status || "new"}
                  onChange={(event) => onStatus(kind, item.id, event.target.value)}
                >
                  {(kind === "booking"
                    ? ["pending_payment", "paid", "confirmed", "cancelled", "completed"]
                    : ["new", "read", "resolved"]
                  ).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          ))
        ) : (
          <p className="p-6 text-sm text-on-surface-variant">No records found.</p>
        )}
      </div>
    </div>
  );
}

function Users({ users = [], onReload }) {
  const emptyForm = { first_name: "", last_name: "", email: "", phone: "", role: "staff", password: "" };
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) => {
    const roleMatch = roleFilter === "all" || user.role === roleFilter;
    const status = user.status || "active";
    const statusMatch = statusFilter === "all" || status === statusFilter;
    const haystack = `${user.first_name || ""} ${user.last_name || ""} ${user.email || ""}`.toLowerCase();
    return roleMatch && statusMatch && haystack.includes(search.toLowerCase());
  });

  const counts = {
    total: users.length,
    customers: users.filter((user) => user.role === "customer").length,
    staff: users.filter((user) => user.role === "staff").length,
    admins: users.filter((user) => user.role === "admin").length,
    suspended: users.filter((user) => user.status === "suspended").length,
  };

  async function submit(event) {
    event.preventDefault();
    setMessage("Inviting team member...");
    try {
      const payload = compactPayload(form);
      if (!["staff", "admin"].includes(payload.role)) {
        setMessage("Use guest registration for customers. Admin invites are only for staff or admin users.");
        return;
      }
      await createUser(payload);
      setForm(emptyForm);
      await onReload();
      setMessage("Team invite created. Share the temporary password securely.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function updateAccess(user, patch, label) {
    setMessage(`${label}...`);
    try {
      await updateUser(user.id, patch);
      await onReload();
      setMessage(`${label} complete.`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-5 md:p-8">
      <div className="grid gap-8 xl:grid-cols-[380px_1fr]">
        <form onSubmit={submit} className="grid content-start gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Invite Access</p>
            <h3 className="mt-2 font-serif text-3xl font-semibold text-primary">Staff & Roles</h3>
            <p className="mt-2 text-sm leading-6 text-on-surface-variant">
              Guests register through the public portal. Admins invite team members and assign operational access here.
            </p>
          </div>
          {["first_name", "last_name", "email", "phone"].map((field) => (
            <TextField field={field} value={form[field]} key={field} onChange={(value) => setForm((current) => ({ ...current, [field]: value }))} />
          ))}
          <label className="grid gap-2">
            <span className="label">access role</span>
            <select className="field" value={form.role} onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <TextField field="temporary_password" type="password" value={form.password} onChange={(value) => setForm((current) => ({ ...current, password: value }))} />
          <div className="rounded-lg bg-surface-container p-4 text-xs leading-6 text-on-surface-variant">
            Use a temporary password for preview. In production this becomes an email invite/reset-password flow.
          </div>
          <div className="flex gap-3">
            <button className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-on-primary">
              Invite Team Member
            </button>
          </div>
          {message ? <p className="rounded-lg bg-surface-container px-4 py-3 text-sm text-secondary">{message}</p> : null}
        </form>

        <section className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-sm">
          <div className="border-b border-outline-variant/20 p-6">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-primary">Access Control</h3>
              <p className="text-sm text-on-surface-variant">{counts.total} registered accounts from backend</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-5">
              <AccessStat label="Total" value={counts.total} />
              <AccessStat label="Guests" value={counts.customers} />
              <AccessStat label="Staff" value={counts.staff} />
              <AccessStat label="Admins" value={counts.admins} />
              <AccessStat label="Suspended" value={counts.suspended} />
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-[1fr_160px_160px_auto]">
              <input className="field" placeholder="Search name or email" value={search} onChange={(event) => setSearch(event.target.value)} />
              <select className="field" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
                <option value="all">All Roles</option>
                <option value="customer">Guests</option>
                <option value="staff">Staff</option>
                <option value="admin">Admins</option>
              </select>
              <select className="field" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
              <button className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold uppercase tracking-[0.1em] text-primary" type="button" onClick={onReload}>
                Refresh
              </button>
            </div>
          </div>
          {filteredUsers.length ? (
            <div className="divide-y divide-outline-variant/20">
              {filteredUsers.map((user) => (
                <article className="grid gap-4 p-5 xl:grid-cols-[1fr_auto]" key={user.id}>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-primary">{user.first_name} {user.last_name}</p>
                      <RoleBadge role={user.role} />
                      <StatusBadge status={user.status || "active"} />
                    </div>
                    <p className="mt-1 text-sm text-on-surface-variant">{user.email}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-outline">{user.membership_level || "standard"} • joined {formatDate(user.created_at)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 xl:justify-end">
                    {user.role !== "staff" ? (
                      <button className="rounded border border-outline-variant px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary" type="button" onClick={() => updateAccess(user, { role: "staff" }, "Assigning staff role")}>
                        Make Staff
                      </button>
                    ) : null}
                    {user.role !== "admin" ? (
                      <button className="rounded border border-outline-variant px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary" type="button" onClick={() => updateAccess(user, { role: "admin" }, "Assigning admin role")}>
                        Make Admin
                      </button>
                    ) : null}
                    {user.role !== "customer" ? (
                      <button className="rounded border border-outline-variant px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-on-surface-variant" type="button" onClick={() => updateAccess(user, { role: "customer", membership_level: "standard" }, "Setting customer role")}>
                        Set Guest
                      </button>
                    ) : null}
                    {(user.status || "active") === "active" ? (
                      <button className="rounded border border-error/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-error" type="button" onClick={() => updateAccess(user, { status: "suspended" }, "Suspending account")}>
                        Suspend
                      </button>
                    ) : (
                      <button className="rounded border border-secondary/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-secondary" type="button" onClick={() => updateAccess(user, { status: "active" }, "Reactivating account")}>
                        Reactivate
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="p-6 text-sm text-on-surface-variant">No accounts match the current filters.</p>
          )}
        </section>
      </div>
    </div>
  );
}

function AccessStat({ label, value }) {
  return (
    <div className="rounded-lg bg-surface-container-low p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-outline">{label}</p>
      <p className="mt-1 font-serif text-2xl font-semibold text-primary">{value}</p>
    </div>
  );
}

function RoleBadge({ role }) {
  const tone =
    role === "admin"
      ? "bg-primary text-on-primary"
      : role === "staff"
        ? "bg-secondary-container text-on-secondary-container"
        : "bg-surface-container text-on-surface-variant";

  return <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${tone}`}>{role}</span>;
}

function Settings({ settings = [], onReload }) {
  const initial = settings.reduce((next, setting) => {
    next[setting.key] = parseSetting(setting.value);
    return next;
  }, {});
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    setMessage("Saving settings...");
    try {
      await updateSettings(form);
      await onReload();
      setMessage("Settings saved.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  function addSetting() {
    const key = window.prompt("Setting key");
    if (!key) return;
    setForm((current) => ({ ...current, [key]: "" }));
  }

  return (
    <div className="flex-1 overflow-y-auto p-5 md:p-8">
      <form onSubmit={submit} className="mx-auto grid max-w-3xl gap-5 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Property Configuration</p>
            <h3 className="mt-2 font-serif text-3xl font-semibold text-primary">Settings</h3>
          </div>
          <button className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold uppercase tracking-[0.1em] text-primary" type="button" onClick={addSetting}>
            Add Key
          </button>
        </div>

        {Object.keys(form).length ? (
          Object.entries(form).map(([key, value]) => (
            <label className="grid gap-2" key={key}>
              <span className="label">{key}</span>
              <input className="field" value={value ?? ""} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} />
            </label>
          ))
        ) : (
          <p className="rounded-lg bg-surface-container p-4 text-sm text-on-surface-variant">No settings found. Add a setting key to create one.</p>
        )}

        <button className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-on-primary">
          Save Settings
        </button>
        {message ? <p className="rounded-lg bg-surface-container px-4 py-3 text-sm text-secondary">{message}</p> : null}
      </form>
    </div>
  );
}

function Guest({ booking, compact = false }) {
  const name = `${booking.guest_first_name || "Guest"} ${booking.guest_last_name || ""}`.trim();
  return (
    <div className="flex items-center gap-3">
      <div className={`${compact ? "h-8 w-8 rounded-full text-xs" : "h-10 w-10 rounded-lg text-sm"} flex items-center justify-center bg-secondary/10 font-bold text-secondary`}>
        {initials(name)}
      </div>
      <div>
        <p className="font-semibold text-on-surface">{name}</p>
        <p className="text-xs text-outline">{compact ? `#${booking.booking_reference || "BK-0000"}` : booking.guest_email || booking.account_email}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalized = String(status || "pending").toLowerCase();
  const tone = normalized.includes("confirm")
    ? "bg-primary/10 text-primary"
    : normalized.includes("pending")
      ? "bg-yellow-100 text-yellow-800"
      : normalized.includes("cancel")
        ? "bg-error-container text-error"
        : normalized.includes("paid")
          ? "bg-blue-100 text-blue-800"
          : "bg-surface-container text-on-surface-variant";

  return <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${tone}`}>{labelStatus(status)}</span>;
}

function FilterField({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold uppercase tracking-wider text-outline">{label}</span>
      {children}
    </label>
  );
}

function Alert({ icon, title, copy, tone }) {
  return (
    <div className="flex items-start gap-4">
      <span className={`mt-0.5 font-bold ${tone}`}>{icon}</span>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-on-surface">{title}</p>
        <p className="text-xs text-on-surface-variant">{copy}</p>
      </div>
    </div>
  );
}

function StatBento({ tone, label, value, copy }) {
  return (
    <div className={`flex h-32 flex-col justify-between rounded-xl p-6 ${tone}`}>
      <p className="text-sm font-semibold uppercase tracking-wider opacity-80">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-3xl font-semibold">{value}</span>
        <span className="text-xs opacity-70">{copy}</span>
      </div>
    </div>
  );
}

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function labelStatus(status) {
  return String(status || "Pending").replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric" }).format(new Date(value));
}

function formatRange(start, end) {
  if (!start || !end) return "Not set";
  const startDate = new Date(start);
  const endDate = new Date(end);
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(startDate);
  return `${month} ${startDate.getUTCDate()} - ${endDate.getUTCDate()}`;
}

function nights(start, end) {
  if (!start || !end) return 0;
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(1, Math.round(diff / 86400000));
}

function money(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

function TextField({ field, value, onChange, type = "text" }) {
  return (
    <label className="grid gap-2">
      <span className="label">{field.replaceAll("_", " ")}</span>
      <input className="field" type={type} value={value || ""} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function compactPayload(form) {
  return Object.fromEntries(Object.entries(form).filter(([, value]) => value !== undefined && value !== ""));
}

function parseSetting(value) {
  if (value === null || value === undefined) return "";
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function EmptyState({ message }) {
  return (
    <div className="border-t border-outline-variant/20 px-6 py-10 text-center text-sm text-on-surface-variant">
      {message}
    </div>
  );
}

function isToday(value) {
  if (!value) return false;
  const date = new Date(value);
  const today = new Date();
  return (
    date.getUTCFullYear() === today.getUTCFullYear() &&
    date.getUTCMonth() === today.getUTCMonth() &&
    date.getUTCDate() === today.getUTCDate()
  );
}

function metricBars(stats = {}) {
  const values = [
    stats.bookings || 0,
    stats.suites || 0,
    stats.newMessages || 0,
    stats.newRequests || 0,
    stats.pendingBookings || 0,
  ];
  const max = Math.max(...values, 1);
  return values.map((value) => Math.max(8, Math.round((value / max) * 100)));
}
