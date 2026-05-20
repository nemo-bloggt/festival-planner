import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { loadFestivalBySlug } from "../services/festivalService";
import FestivalGroupsSection from "../components/festivals/FestivalGroupsSection";
import FestivalDetailHeader from "../components/festivals/FestivalDetailHeader";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { createGroup } from "../services/groupService";
import GroupForm from "../components/groups/GroupForm";


export default function FestivalDetailPage() {
  const { festivalSlug } = useParams();

  const [festivalData, setFestivalData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadFestivalBySlug(festivalSlug);
        setFestivalData(data);
      } catch (error) {
  console.error("Fehler beim Laden der Festivaldetails:", error);
  setError("Festival konnte nicht geladen werden.");
} finally {
  setLoading(false);
}
    };

    loadData();
  }, [festivalSlug]);

  if (loading) {
  return (
    <main className="min-h-screen bg-slate-950 p-10 text-slate-100">
      <LoadingSpinner text="Lade Festival..." />
    </main>
  );
}

  if (error) {
  return (
    <main className="min-h-screen bg-slate-950 p-10 text-slate-100">
      <Link to="/" className="text-blue-400 hover:underline">
        ← Zurück
      </Link>

      <div className="mt-6 rounded-2xl border border-red-900 bg-red-950/40 p-6">
        <h1 className="text-2xl font-bold text-red-300">
          Festival konnte nicht geladen werden
        </h1>

        <p className="mt-2 text-red-200">
          Prüfe bitte, ob der Festival-Slug korrekt ist.
        </p>
      </div>
    </main>
  );
}

  if (!festivalData?.festival) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-slate-100">
        <Link to="/" className="text-blue-400 hover:underline">
          ← Zurück
        </Link>

        <h1 className="mt-6 text-2xl font-bold">
          Festival nicht gefunden
        </h1>
      </main>
    );
  }

  async function handleCreateGroup(groupData) {
  if (!festivalData?.festival?.id) return;

  try {
    await createGroup({
      ...groupData,
      festival: festivalData.festival.id,
    });

    const updatedData = await loadFestivalBySlug(festivalSlug);
    setFestivalData(updatedData);
  } catch (error) {
    console.error("Fehler beim Anlegen der Gruppe:", error);
    alert("Gruppe konnte nicht angelegt werden.");
  }
}

  const { festival, groups, members, packingItems, carpools } = festivalData;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Link to="/" className="text-sm text-blue-400 hover:underline">
          ← Zurück zur Übersicht
        </Link>

        
        

<FestivalDetailHeader festival={festival} />

<GroupForm onCreateGroup={handleCreateGroup} />

<FestivalGroupsSection
  groups={groups}
  members={members}
  packingItems={packingItems}
  carpools={carpools}
/>
      </div>
    </main>
  );
}