"use client";

import { useState } from "react";
import { submitContactMessage } from "@/services/contact.service";

export default function ContactForm({ variant = "default" }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [notice, setNotice] = useState("");

  async function submit(event) {
    event.preventDefault();
    setNotice("Sending...");
    try {
      await submitContactMessage(form);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setNotice("Your message has been received.");
    } catch (error) {
      setNotice(error.message);
    }
  }

  if (variant === "editorial") {
    return (
      <form onSubmit={submit} className="space-y-8">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-secondary">Full Name</span>
          <input
            className="editorial-field"
            required
            type="text"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-secondary">Email Address</span>
          <input
            className="editorial-field"
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-secondary">Inquiry Type</span>
          <select
            className="editorial-field"
            required
            value={form.subject}
            onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
          >
            <option value="">Select a service</option>
            <option value="Room Reservation">Room Reservation</option>
            <option value="Private Dining">Private Dining</option>
            <option value="Media Inquiry">Media Inquiry</option>
            <option value="Concierge Services">Concierge Services</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-secondary">Message</span>
          <textarea
            className="editorial-field h-32 resize-none"
            required
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          />
        </label>

        <button className="bg-secondary px-10 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-on-primary transition-colors hover:bg-primary" type="submit">
          Send Inquiry
        </button>
        {notice ? <p className="text-sm text-secondary">{notice}</p> : null}
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
      {["name", "email", "phone", "subject"].map((field) => (
        <label key={field} className="grid gap-2">
          <span className="label">{field}</span>
          <input
            className="field"
            type={field === "email" ? "email" : "text"}
            required={field !== "phone"}
            value={form[field]}
            onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))}
          />
        </label>
      ))}
      <label className="grid gap-2">
        <span className="label">message</span>
        <textarea
          className="field min-h-36"
          required
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
        />
      </label>
      <button className="rounded bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-on-primary">
        Send Message
      </button>
      {notice ? <p className="text-sm text-secondary">{notice}</p> : null}
    </form>
  );
}
