export default function BookingSearch() {
  return (
    <form
      action="/booking"
      className="mx-auto mt-12 flex max-w-5xl flex-col items-stretch gap-2 rounded-xl bg-surface/95 p-2 shadow-2xl backdrop-blur-md md:flex-row md:items-center"
    >
      <div className="grid flex-1 grid-cols-2 gap-2 md:grid-cols-4">
        {[
          ["Check-in", "date"],
          ["Check-out", "date"],
          ["Guests", "number"],
        ].map(([label, type]) => (
          <label
            key={label}
            className="flex flex-col items-start border-outline-variant/30 px-4 py-2 md:border-r"
          >
            <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-outline">
              {label}
            </span>
            <input
              name={label === "Check-in" ? "check_in_date" : label === "Check-out" ? "check_out_date" : "guest_count"}
              type={type}
              min={type === "number" ? "1" : undefined}
              placeholder={type === "date" ? "Add date" : undefined}
              className="w-full min-w-0 border-none bg-transparent p-0 text-base text-on-surface outline-none placeholder:text-outline-variant"
            />
          </label>
        ))}
        <label className="flex flex-col items-start px-4 py-2">
          <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-outline">
            Suite Type
          </span>
          <select
            name="suite"
            className="w-full min-w-0 appearance-none border-none bg-transparent p-0 text-base text-on-surface outline-none"
          >
            <option value="">Any suite</option>
            <option value="deluxe-garden-suite">Deluxe Garden</option>
            <option value="executive-suite">Executive</option>
            <option value="presidential-suite">Presidential</option>
          </select>
        </label>
      </div>
      <button className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-10 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-on-primary transition-all hover:bg-on-secondary-fixed-variant">
        <span className="text-lg leading-none">⌕</span>
        Check Availability
      </button>
    </form>
  );
}
