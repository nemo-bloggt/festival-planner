import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createFestival } from "../services/festivalService";
import { slugify } from "../utils/slugify";
import FestivalForm from "../components/festivals/FestivalForm";

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
    ...(name === "name" && {
      slug: slugify(value),
    }),
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

        <FestivalForm
  formData={formData}
  onChange={handleChange}
  onSubmit={handleSubmit}
  loading={loading}
  submitLabel="Festival erstellen"
  loadingLabel="Erstelle..."
/>
      </div>
    </main>
  );
}