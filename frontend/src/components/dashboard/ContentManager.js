"use client";

import { useEffect, useState } from "react";
import {
  createDashboardResource,
  deleteDashboardResource,
  listDashboardResource,
  updateDashboardResource,
  uploadImage,
} from "@/services/dashboard.service";

const configs = {
  suites: {
    list: "/api/suites?limit=50",
    create: "/api/dashboard/suites",
    update: "/api/dashboard/suites",
    remove: "/api/dashboard/suites",
    key: "suites",
    title: "Suites",
    primary: "name",
    secondary: "slug",
    fields: ["name", "slug", "short_description", "description", "price_per_night", "quantity", "max_guests", "bed_type", "size", "status", "featured"],
    numeric: ["price_per_night", "quantity", "max_guests"],
    boolean: ["featured"],
    defaults: { status: "active", quantity: 1, max_guests: 2, price_per_night: 200, featured: false },
  },
  amenities: {
    list: "/api/amenities?limit=50",
    create: "/api/dashboard/amenities",
    update: "/api/dashboard/amenities",
    remove: "/api/dashboard/amenities",
    key: "amenities",
    title: "Amenities",
    primary: "name",
    secondary: "category",
    fields: ["name", "slug", "description", "icon", "category"],
    numeric: [],
    boolean: [],
    defaults: {},
  },
  experiences: {
    list: "/api/experiences?limit=50",
    create: "/api/dashboard/experiences",
    update: "/api/dashboard/experiences",
    remove: "/api/dashboard/experiences",
    key: "experiences",
    title: "Experiences",
    primary: "title",
    secondary: "category",
    fields: ["title", "slug", "description", "category", "image_url", "price", "status"],
    numeric: ["price"],
    boolean: [],
    defaults: { status: "active", price: 0 },
  },
  gallery: {
    list: "/api/gallery?limit=50",
    create: "/api/dashboard/gallery",
    update: "/api/dashboard/gallery",
    remove: "/api/dashboard/gallery",
    key: "images",
    title: "Gallery",
    primary: "title",
    secondary: "category",
    fields: ["title", "image_url", "alt_text", "category", "sort_order"],
    numeric: ["sort_order"],
    boolean: [],
    defaults: { sort_order: 0 },
  },
};

export default function ContentManager({ type }) {
  const config = configs[type];
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(config.defaults);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("Loading...");
  const [uploadingField, setUploadingField] = useState("");

  async function load() {
    try {
      const data = await listDashboardResource(config.list.replace(/^\/api/, ""));
      setItems(data[config.key] || []);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    let active = true;
    async function fetchItems() {
      try {
        const data = await listDashboardResource(config.list.replace(/^\/api/, ""));
        if (!active) return;
        setItems(data[config.key] || []);
        setMessage("");
      } catch (error) {
        if (active) setMessage(error.message);
      }
    }
    fetchItems();
    return () => {
      active = false;
    };
  }, [config]);

  async function submit(event) {
    event.preventDefault();
    setMessage(editingId ? "Updating..." : "Saving...");
    try {
      const payload = normalize(form, config);
      if (editingId) {
        await updateDashboardResource(config.update.replace(/^\/api/, ""), editingId, payload);
      } else {
        await createDashboardResource(config.create.replace(/^\/api/, ""), payload);
      }
      resetForm();
      await load();
      setMessage(editingId ? "Updated." : "Created.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function remove(item) {
    setMessage("Deleting...");
    try {
      await deleteDashboardResource(config.remove.replace(/^\/api/, ""), item.id);
      if (editingId === item.id) resetForm();
      await load();
      setMessage("Deleted.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  function edit(item) {
    setEditingId(item.id);
    setForm(pickFields(item, config.fields));
    setMessage("");
  }

  function resetForm() {
    setEditingId(null);
    setForm(config.defaults);
  }

  async function handleUpload(field, file) {
    if (!file) return;
    setUploadingField(field);
    setMessage("Uploading image...");
    try {
      const image = await uploadImage(file);
      setForm((current) => ({ ...current, [field]: image.url }));
      setMessage("Image uploaded. Save the record to keep this URL.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setUploadingField("");
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-surface p-4 md:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 rounded-xl border border-secondary/10 bg-surface-container-lowest p-6 shadow-sm md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Content Studio</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-primary">{config.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
            Create, update, and publish the records that power the public website.
          </p>
        </div>
        <button className="rounded-lg border border-secondary px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-secondary" type="button" onClick={load}>
          Refresh Data
        </button>
      </div>
      <div className="grid gap-8 xl:grid-cols-[minmax(320px,420px)_1fr]">
        <form onSubmit={submit} className="grid content-start gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              {editingId ? "Edit Record" : "Create Record"}
            </p>
            <h3 className="mt-2 font-serif text-3xl font-semibold text-primary">{config.title}</h3>
          </div>

          {config.fields.map((field) => (
            <Field
              config={config}
              field={field}
              key={field}
              value={form[field]}
              onChange={(value) => setForm((current) => ({ ...current, [field]: value }))}
              onUpload={(file) => handleUpload(field, file)}
              uploading={uploadingField === field}
            />
          ))}

          <div className="flex gap-3">
            <button className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-on-primary">
              {editingId ? "Save Changes" : `Create ${config.title}`}
            </button>
            {editingId ? (
              <button className="rounded-lg border border-outline-variant px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-on-surface-variant" type="button" onClick={resetForm}>
                Cancel
              </button>
            ) : null}
          </div>

          {message ? <p className="rounded-lg bg-surface-container px-4 py-3 text-sm text-secondary">{message}</p> : null}
        </form>

        <section className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-outline-variant/20 p-6 md:flex-row md:items-center">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-primary">Existing {config.title}</h3>
              <p className="text-sm text-on-surface-variant">{items.length} records from backend</p>
            </div>
            <span className="rounded-full bg-secondary-fixed px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-on-secondary-fixed">Live Data</span>
          </div>

          {items.length ? (
            <div className="divide-y divide-outline-variant/20">
              {items.map((item) => (
                <article className="grid gap-4 p-5 transition-colors hover:bg-surface-container-low md:grid-cols-[96px_1fr_auto]" key={item.id || item.slug}>
                  {"image_url" in item && item.image_url ? (
                    <img className="h-24 w-24 rounded-lg object-cover" src={item.image_url} alt={item[config.primary] || "Content preview"} />
                  ) : (
                    <div className="hidden h-24 w-24 items-center justify-center rounded-lg bg-surface-container text-secondary md:flex">
                      {String(item[config.primary] || item.name || item.title || "S").slice(0, 1)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-primary">{item[config.primary] || item.name || item.title}</p>
                    <p className="mt-1 text-sm text-on-surface-variant">{item.status || item[config.secondary] || item.slug}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-outline">{item.description || item.short_description || item.image_url || item.alt_text}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded border border-outline-variant px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary" type="button" onClick={() => edit(item)}>
                      Edit
                    </button>
                    <button className="rounded border border-error/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-error" type="button" onClick={() => remove(item)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="p-6 text-sm text-on-surface-variant">No records found.</p>
          )}
        </section>
      </div>
    </div>
  );
}

function Field({ config, field, value, onChange, onUpload, uploading }) {
  const label = field.replaceAll("_", " ");
  if (config.boolean.includes(field)) {
    return (
      <label className="flex items-center gap-3 rounded-lg bg-surface-container p-3">
        <input checked={Boolean(value)} className="h-4 w-4" type="checkbox" onChange={(event) => onChange(event.target.checked)} />
        <span className="label">{label}</span>
      </label>
    );
  }

  if (field === "description" || field === "short_description" || field === "alt_text") {
    return (
      <label className="grid gap-2">
        <span className="label">{label}</span>
        <textarea className="field min-h-24" value={value || ""} onChange={(event) => onChange(event.target.value)} />
      </label>
    );
  }

  if (field === "image_url") {
    return (
      <label className="grid gap-2">
        <span className="label">{label}</span>
        {value ? (
          <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container">
            <img className="h-40 w-full object-cover" src={value} alt="Uploaded preview" />
          </div>
        ) : null}
        <input className="field" value={value ?? ""} onChange={(event) => onChange(event.target.value)} />
        <input
          accept="image/jpeg,image/png,image/webp"
          className="block w-full text-sm text-on-surface-variant file:mr-4 file:rounded file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-on-primary"
          disabled={uploading}
          type="file"
          onChange={(event) => onUpload(event.target.files?.[0])}
        />
        <span className="text-xs text-on-surface-variant">
          {uploading ? "Uploading to Cloudinary..." : "Upload JPG, PNG, or WEBP. Maximum backend size is 5MB."}
        </span>
      </label>
    );
  }

  return (
    <label className="grid gap-2">
      <span className="label">{label}</span>
      <input
        className="field"
        type={config.numeric.includes(field) ? "number" : "text"}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function normalize(form, config) {
  const next = {};
  config.fields.forEach((field) => {
    const value = form[field];
    if (value === undefined || value === "") return;
    next[field] = config.numeric.includes(field) ? Number(value) : value;
  });
  return next;
}

function pickFields(item, fields) {
  return fields.reduce((picked, field) => {
    picked[field] = item[field] ?? "";
    return picked;
  }, {});
}
