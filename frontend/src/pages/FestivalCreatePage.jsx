import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createFestival } from "../services/festivalService";

export default function FestivalCreatePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    start_date: "",
    end_date: "",
    location: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const createdFestival = await createFestival(formData);

      navigate(`/festivals/${createdFestival.id}`);
    } catch (error) {
      console.error("Fehler beim Erstellen:", error);
      alert("Festival konnte nicht erstellt werden.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold">
          Festival erstellen
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl bg-slate-900 p-6"
        >
          <div>
            <label className="mb-1 block text-sm">
              Festivalname
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-slate-800 p-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">
              Slug
            </label>

            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-slate-800 p-3"
              placeholder="rock-am-ring-2026"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">
              Startdatum
            </label>

            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-slate-800 p-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">
              Enddatum
            </label>

            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 p-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">
              Ort
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 p-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">
              Website
            </label>

            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-medium hover:bg-indigo-500 disabled:opacity-50"
          >
            {loading ? "Erstelle..." : "Festival erstellen"}
          </button>
        </form>
      </div>
    </main>
  );
}