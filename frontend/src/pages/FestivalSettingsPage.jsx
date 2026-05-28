import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { loadFestivalBySlug } from "../services/festivalService";
import { loadPeople } from "../services/personService";
import {
  addFestivalMember,
  loadFestivalMembers,
  removeFestivalMember,
  updateFestivalMemberRole,
} from "../services/festivalMemberService";
import {
  getCurrentPersonId,
  isFestivalAdmin,
} from "../utils/authHelpers";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import PersonSelect from "../components/people/PersonSelect";
import FestivalMembersSettings from "../components/festivals/FestivalMembersSettings";
import FestivalSettingsNavigation from "../components/festivals/FestivalSettingsNavigation";
import { deleteFestival } from "../services/festivalService";
import FestivalDangerZone from "../components/festivals/FestivalDangerZone";
import FestivalForm from "../components/festivals/FestivalForm";
import { updateFestival } from "../services/festivalService";

export default function FestivalSettingsPage() {
  const { festivalSlug } = useParams();
  const navigate = useNavigate();

  const [festival, setFestival] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [festivalMembers, setFestivalMembers] = useState([]);
  const [newFestivalMemberPersonId, setNewFestivalMemberPersonId] = useState("");
  const [newFestivalMemberRole, setNewFestivalMemberRole] = useState("member");
  const [activeTab, setActiveTab] = useState("general");
  const [generalFormData, setGeneralFormData] = useState({
  name: "",
  slug: "",
  start_date: "",
  end_date: "",
  location: "",
  website: "",
});

const [savingGeneralSettings, setSavingGeneralSettings] = useState(false);

  const currentPersonId = getCurrentPersonId();

  const currentUserIsFestivalAdmin = isFestivalAdmin(
    festivalMembers,
    currentPersonId
  );

  useEffect(() => {
    async function loadData() {
      try {
        const data = await loadFestivalBySlug(festivalSlug);
        setFestival(data.festival);
        setGeneralFormData({
  name: data.festival.name || "",
  slug: data.festival.slug || "",
  start_date: data.festival.start_date || "",
  end_date: data.festival.end_date || "",
  location: data.festival.location || "",
  website: data.festival.website || "",
});

        const members = await loadFestivalMembers(data.festival.id);
        setFestivalMembers(members);

        await loadPeople();
      } catch (error) {
        console.error("Fehler beim Laden der Festival-Einstellungen:", error);
        setError("Festival-Einstellungen konnten nicht geladen werden.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [festivalSlug]);

  async function refreshFestivalMembers() {
    if (!festival?.id) return;

    const members = await loadFestivalMembers(festival.id);
    setFestivalMembers(members);
  }

  function handleGeneralSettingsChange(event) {
  const { name, value } = event.target;

  setGeneralFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
}

async function handleUpdateGeneralSettings(event) {
  event.preventDefault();

  if (!festival?.id) return;

  try {
    setSavingGeneralSettings(true);

    const updatedFestival = await updateFestival(festival.id, generalFormData);

    setFestival(updatedFestival);

    alert("Festival wurde gespeichert.");
  } catch (error) {
    console.error("Fehler beim Speichern der Festivaldaten:", error);
    alert(error.message || "Festivaldaten konnten nicht gespeichert werden.");
  } finally {
    setSavingGeneralSettings(false);
  }
}

  async function handleAddFestivalMember() {
    if (!festival?.id) return;

    if (!newFestivalMemberPersonId) {
      alert("Bitte zuerst eine Person auswählen.");
      return;
    }

    try {
      await addFestivalMember({
        festival: festival.id,
        person: newFestivalMemberPersonId,
        role: newFestivalMemberRole,
      });

      setNewFestivalMemberPersonId("");
      setNewFestivalMemberRole("member");

      await refreshFestivalMembers();
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Festival-Mitglieds:", error);
      alert(error.message || "Festival-Mitglied konnte nicht hinzugefügt werden.");
    }
  }

  async function handleRemoveFestivalMember(memberId) {
    try {
      await removeFestivalMember(memberId);
      await refreshFestivalMembers();
    } catch (error) {
      console.error("Fehler beim Entfernen des Festival-Mitglieds:", error);
      alert(error.message || "Festival-Mitglied konnte nicht entfernt werden.");
    }
  }

  async function handleDeleteFestival() {
  if (!festival?.id) return;

  const confirmed = window.confirm(
    `Festival "${festival.name}" wirklich endgültig löschen?`
  );

  if (!confirmed) return;

  try {
    await deleteFestival(festival.id);
    navigate("/");
  } catch (error) {
    console.error("Fehler beim Löschen des Festivals:", error);
    alert(error.message || "Festival konnte nicht gelöscht werden.");
  }
}

  async function handleUpdateFestivalMemberRole(memberId, role) {
    try {
      await updateFestivalMemberRole(memberId, role);
      await refreshFestivalMembers();
    } catch (error) {
      console.error("Fehler beim Ändern der Rolle:", error);
      alert(error.message || "Rolle konnte nicht geändert werden.");
      await refreshFestivalMembers();
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-slate-100">
        <LoadingSpinner text="Lade Einstellungen..." />
      </main>
    );
  }

  if (error || !festival) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-slate-100">
        <Link to={`/festivals/${festivalSlug}`} className="text-blue-400 hover:underline">
          ← Zurück zum Festival
        </Link>

        <div className="mt-6 rounded-2xl border border-red-900 bg-red-950/40 p-6">
          <h1 className="text-2xl font-bold text-red-300">
            Einstellungen konnten nicht geladen werden
          </h1>
        </div>
      </main>
    );
  }

  if (!currentUserIsFestivalAdmin) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-slate-100">
        <Link to={`/festivals/${festivalSlug}`} className="text-blue-400 hover:underline">
          ← Zurück zum Festival
        </Link>

        <div className="mt-6 rounded-2xl border border-yellow-900 bg-yellow-950/30 p-6">
          <h1 className="text-2xl font-bold text-yellow-200">
            Keine Berechtigung
          </h1>
          <p className="mt-2 text-yellow-100">
            Nur Festival-Admins können diese Einstellungen bearbeiten.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Link
          to={`/festivals/${festival.slug}`}
          className="text-sm text-blue-400 hover:underline"
        >
          ← Zurück zum Festival
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold">{festival.name} verwalten</h1>
          <p className="mt-2 text-slate-400">
            Einstellungen, Mitglieder und Berechtigungen für dieses Festival.
          </p>
          <FestivalSettingsNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>



       {activeTab === "members" && (
  <FestivalMembersSettings
    festivalMembers={festivalMembers}
    newFestivalMemberPersonId={newFestivalMemberPersonId}
    setNewFestivalMemberPersonId={setNewFestivalMemberPersonId}
    newFestivalMemberRole={newFestivalMemberRole}
    setNewFestivalMemberRole={setNewFestivalMemberRole}
    onAddFestivalMember={handleAddFestivalMember}
    onRemoveFestivalMember={handleRemoveFestivalMember}
    onUpdateFestivalMemberRole={handleUpdateFestivalMemberRole}
  />
)}

{activeTab === "general" && (
  <section className="mt-8 rounded-2xl bg-slate-900 p-6">
    <h2 className="mb-4 text-xl font-semibold">
      Allgemeine Einstellungen
    </h2>

    <FestivalForm
      formData={generalFormData}
      onChange={handleGeneralSettingsChange}
      onSubmit={handleUpdateGeneralSettings}
      loading={savingGeneralSettings}
      submitLabel="Änderungen speichern"
      loadingLabel="Speichere..."
    />
  </section>
)}

{activeTab === "danger" && (
  <FestivalDangerZone
    festival={festival}
    onDeleteFestival={handleDeleteFestival}
  />
)}
      </div>
    </main>
  );
}