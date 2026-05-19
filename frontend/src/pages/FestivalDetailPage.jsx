import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { loadFestivalById } from "../services/festivalService";
import FestivalGroupsSection from "../components/festivals/FestivalGroupsSection";
import FestivalDetailHeader from "../components/festivals/FestivalDetailHeader";

export default function FestivalDetailPage() {
  const { festivalId } = useParams();

  const [festivalData, setFestivalData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadFestivalById(festivalId);
        setFestivalData(data);
      } catch (error) {
  console.error("Fehler beim Laden der Festivaldetails:", error);
  setError("Festival konnte nicht geladen werden.");
} finally {
  setLoading(false);
}
    };

    loadData();
  }, [festivalId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-slate-100">
        Lade Festival...
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
          Prüfe bitte, ob die Festival-ID korrekt ist.
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

  const { festival, groups, members, packingItems, carpools } = festivalData;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Link to="/" className="text-sm text-blue-400 hover:underline">
          ← Zurück zur Übersicht
        </Link>

        <FestivalDetailHeader festival={festival} />
        

        <section className="mt-8 space-y-6">
          <h2 className="text-xl font-semibold">Gruppen</h2>

          {groups.map((group) => {
           const groupData = buildGroupData(
  group,
  members,
  packingItems,
  carpools
);

            return (
              <GroupCard key={group.id} group={group}>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <MembersList members={groupData.members} />
                  <PackingList items={groupData.packingItems} />
                </div>

                <CarpoolsList carpools={groupData.carpools} />
              </GroupCard>
            );
          })}
          <FestivalGroupsSection
  groups={groups}
  members={members}
  packingItems={packingItems}
  carpools={carpools}
/>
        </section>
      </div>
    </main>
  );
}