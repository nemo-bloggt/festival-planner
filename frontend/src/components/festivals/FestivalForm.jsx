export default function FestivalForm({
  formData,
  onChange,
  onSubmit,
  loading,
  submitLabel,
  loadingLabel,
  children,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-xl bg-slate-900 p-6"
    >
      <div>
        <label className="mb-1 block text-sm">Festivalname</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          className="w-full rounded-lg bg-slate-800 p-3"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm">Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          readOnly
          className="w-full rounded-lg bg-slate-700 p-3 text-slate-400"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm">Startdatum</label>
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={onChange}
          required
          className="w-full rounded-lg bg-slate-800 p-3"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm">Enddatum</label>
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={onChange}
          className="w-full rounded-lg bg-slate-800 p-3"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm">Ort</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={onChange}
          className="w-full rounded-lg bg-slate-800 p-3"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm">Website</label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={onChange}
          className="w-full rounded-lg bg-slate-800 p-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-indigo-600 px-4 py-2 font-medium hover:bg-indigo-500 disabled:opacity-50"
      >
        {loading ? loadingLabel : submitLabel}
      </button>

      {children}
    </form>
  );
}