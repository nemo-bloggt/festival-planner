import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { slugify } from "../utils/slugify";
import {
  loadFestivalBySlug,
  updateFestival,
  deleteFestival,
} from "../services/festivalService";
import FestivalForm from "../components/festivals/FestivalForm";

export default function FestivalEditPage() {
  const { festivalSlug } = useParams();
  const navigate = useNavigate();

  const [festivalId, setFestivalId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    start_date: "",
    end_date: "",
    location: "",
    website: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
  async function loadData() {
    try {
      const data = await loadFestivalBySlug(festivalSlug);

      setFestivalId(data.festival.id);
        setFormData({
          name: data.festival.name || "",
          slug: data.festival.slug || "",
          start_date: data.festival.start_date?.slice(0, 10) || "",
          end_date: data.festival.end_date?.slice(0, 10) || "",
          location: data.festival.location || "",
          website: data.festival.website || "",
        });
      } catch (error) {
        console.error("Fehler beim Laden:", error);
        alert("Festival konnte nicht geladen werden.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [festivalSlug]);

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
    if (!festivalId) return;

    try {
      setSaving(true);

      await updateFestival(festivalId, formData);

      navigate(`/festivals/${formData.slug}`);
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      alert("Festival konnte nicht gespeichert werden.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
  const confirmed = window.confirm(
    "Festival wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden."
  );

  if (!confirmed) return;

  try {
    await deleteFestival(festivalId);
    navigate("/");
  } catch (error) {
    console.error("Fehler beim Löschen:", error);
    alert("Festival konnte nicht gelöscht werden.");
  }
}

  if (loading) {
    return <p className="p-6 text-slate-100">Lade Festival...</p>;
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold">Festival bearbeiten</h1>

        <FestivalForm
  formData={formData}
  onChange={handleChange}
  onSubmit={handleSubmit}
  loading={saving || !festivalId}
  submitLabel="Änderungen speichern"
  loadingLabel="Speichert..."
>
  <button
    type="button"
    onClick={handleDelete}
    className="rounded-lg bg-red-600 px-4 py-2 font-medium hover:bg-red-500"
  >
    Festival löschen
  </button>
</FestivalForm>
      </div>
    </main>
  );
}